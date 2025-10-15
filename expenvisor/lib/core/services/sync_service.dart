import 'dart:async';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../database/app_database.dart';
import '../models/transaction_model.dart';
import 'firebase_service.dart';

enum SyncStatus { pending, syncing, synced, failed }

class SyncQueueItem {
  final String id;
  final String operation; // 'create', 'update', 'delete'
  final String table;
  final Map<String, dynamic> data;
  final DateTime createdAt;
  final int retryCount;
  final String? error;

  SyncQueueItem({
    required this.id,
    required this.operation,
    required this.table,
    required this.data,
    required this.createdAt,
    this.retryCount = 0,
    this.error,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'operation': operation,
    'table': table,
    'data': data,
    'createdAt': createdAt.toIso8601String(),
    'retryCount': retryCount,
    'error': error,
  };

  factory SyncQueueItem.fromJson(Map<String, dynamic> json) => SyncQueueItem(
    id: json['id'],
    operation: json['operation'],
    table: json['table'],
    data: Map<String, dynamic>.from(json['data']),
    createdAt: DateTime.parse(json['createdAt']),
    retryCount: json['retryCount'] ?? 0,
    error: json['error'],
  );
}

class SyncService {
  static const String _syncQueueKey = 'sync_queue';
  static const int _maxRetries = 3;
  static const Duration _retryDelay = Duration(minutes: 5);
  
  final AppDatabase _database;
  Timer? _syncTimer;
  bool _isSyncing = false;
  StreamController<SyncStatus> _statusController = StreamController<SyncStatus>.broadcast();

  SyncService(this._database) {
    _startPeriodicSync();
  }

  Stream<SyncStatus> get statusStream => _statusController.stream;
  SyncStatus get currentStatus => _isSyncing ? SyncStatus.syncing : SyncStatus.synced;

  // Start periodic sync every 30 seconds
  void _startPeriodicSync() {
    _syncTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (!_isSyncing) {
        syncPendingItems();
      }
    });
  }

  // Add item to sync queue
  Future<void> addToSyncQueue({
    required String operation,
    required String table,
    required Map<String, dynamic> data,
  }) async {
    final item = SyncQueueItem(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      operation: operation,
      table: table,
      data: data,
      createdAt: DateTime.now(),
    );

    final queue = await _getSyncQueue();
    queue.add(item);
    await _saveSyncQueue(queue);

    // Try to sync immediately if online
    if (await FirebaseService.isOnline()) {
      syncPendingItems();
    }
  }

  // Sync all pending items
  Future<void> syncPendingItems() async {
    if (_isSyncing) return;
    
    _isSyncing = true;
    _statusController.add(SyncStatus.syncing);

    try {
      final queue = await _getSyncQueue();
      if (queue.isEmpty) {
        _isSyncing = false;
        _statusController.add(SyncStatus.synced);
        return;
      }

      final online = await FirebaseService.isOnline();
      if (!online) {
        _isSyncing = false;
        _statusController.add(SyncStatus.failed);
        return;
      }

      final itemsToRetry = <SyncQueueItem>[];
      
      for (final item in queue) {
        try {
          await _syncItem(item);
          // Remove successfully synced item
        } catch (e) {
          print('Sync error for item ${item.id}: $e');
          
          if (item.retryCount < _maxRetries) {
            // Retry later
            final retryItem = SyncQueueItem(
              id: item.id,
              operation: item.operation,
              table: item.table,
              data: item.data,
              createdAt: item.createdAt,
              retryCount: item.retryCount + 1,
              error: e.toString(),
            );
            itemsToRetry.add(retryItem);
          } else {
            // Max retries reached, keep for manual review
            itemsToRetry.add(item);
          }
        }
      }

      await _saveSyncQueue(itemsToRetry);
      
      if (itemsToRetry.isEmpty) {
        _statusController.add(SyncStatus.synced);
      } else {
        _statusController.add(SyncStatus.failed);
      }
    } catch (e) {
      print('Sync service error: $e');
      _statusController.add(SyncStatus.failed);
    } finally {
      _isSyncing = false;
    }
  }

  // Sync individual item
  Future<void> _syncItem(SyncQueueItem item) async {
    switch (item.table) {
      case 'transactions':
        await _syncTransaction(item);
        break;
      case 'categories':
        await _syncCategory(item);
        break;
      case 'budgets':
        await _syncBudget(item);
        break;
      default:
        throw Exception('Unknown table: ${item.table}');
    }
  }

  // Sync transaction
  Future<void> _syncTransaction(SyncQueueItem item) async {
    final transaction = TransactionModel.fromJson(item.data);
    
    switch (item.operation) {
      case 'create':
        await FirebaseService.createTransaction(transaction);
        break;
      case 'update':
        await FirebaseService.updateTransaction(transaction);
        break;
      case 'delete':
        await FirebaseService.deleteTransaction(transaction.id);
        break;
      default:
        throw Exception('Unknown operation: ${item.operation}');
    }
  }

  // Sync category
  Future<void> _syncCategory(SyncQueueItem item) async {
    switch (item.operation) {
      case 'create':
        await FirebaseService.createCategory(
          item.data['name'],
          item.data['color'],
        );
        break;
      default:
        throw Exception('Category operation not supported: ${item.operation}');
    }
  }

  // Sync budget
  Future<void> _syncBudget(SyncQueueItem item) async {
    switch (item.operation) {
      case 'create':
        await FirebaseService.createBudget(
          item.data['category'],
          item.data['amount'].toDouble(),
          item.data['period'],
        );
        break;
      default:
        throw Exception('Budget operation not supported: ${item.operation}');
    }
  }

  // Download data from Firebase
  Future<void> downloadFromFirebase() async {
    try {
      final online = await FirebaseService.isOnline();
      if (!online) return;

      // Download transactions
      final cloudTransactions = await FirebaseService.getTransactions();
      for (final transaction in cloudTransactions) {
        // Check if transaction exists locally
        final localTransaction = await _database.transactionDao.getTransactionById(transaction.id);
        if (localTransaction == null) {
          // Add new transaction
          await _database.transactionDao.insertTransaction(transaction);
        } else if (transaction.updatedAt.isAfter(localTransaction.updatedAt)) {
          // Update if cloud version is newer
          await _database.transactionDao.updateTransaction(transaction);
        }
      }
    } catch (e) {
      print('Download error: $e');
    }
  }

  // Get sync queue from local storage
  Future<List<SyncQueueItem>> _getSyncQueue() async {
    final prefs = await SharedPreferences.getInstance();
    final queueData = prefs.getString(_syncQueueKey);
    
    if (queueData == null) return [];
    
    final List<dynamic> queueJson = jsonDecode(queueData);
    return queueJson.map((json) => SyncQueueItem.fromJson(json)).toList();
  }

  // Save sync queue to local storage
  Future<void> _saveSyncQueue(List<SyncQueueItem> queue) async {
    final prefs = await SharedPreferences.getInstance();
    final queueJson = queue.map((item) => item.toJson()).toList();
    await prefs.setString(_syncQueueKey, jsonEncode(queueJson));
  }

  // Get sync status
  Future<Map<String, dynamic>> getSyncStatus() async {
    final queue = await _getSyncQueue();
    final online = await FirebaseService.isOnline();
    
    return {
      'isOnline': online,
      'isSyncing': _isSyncing,
      'pendingItems': queue.length,
      'failedItems': queue.where((item) => item.retryCount >= _maxRetries).length,
    };
  }

  // Clear failed items
  Future<void> clearFailedItems() async {
    final queue = await _getSyncQueue();
    final activeItems = queue.where((item) => item.retryCount < _maxRetries).toList();
    await _saveSyncQueue(activeItems);
  }

  // Force sync
  Future<void> forceSync() async {
    await syncPendingItems();
  }

  // Dispose
  void dispose() {
    _syncTimer?.cancel();
    _statusController.close();
  }
}