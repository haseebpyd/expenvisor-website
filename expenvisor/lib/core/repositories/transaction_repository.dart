import 'package:uuid/uuid.dart';

import '../models/transaction_model.dart';

abstract class TransactionRepository {
  Future<TransactionModel> create({
    required double amount,
    required String merchant,
    required String category,
    required DateTime date,
    required bool isIncome,
  });

  Future<List<TransactionModel>> list();
  
  Future<List<TransactionModel>> getByDateRange(DateTime start, DateTime end);
  Future<TransactionModel?> getById(String id);
  Future<bool> update(TransactionModel transaction);
  Future<int> delete(String id);
}

class InMemoryTransactionRepository implements TransactionRepository {
  final List<TransactionModel> _items = <TransactionModel>[];
  final Uuid _uuid = const Uuid();

  @override
  Future<TransactionModel> create({
    required double amount,
    required String merchant,
    required String category,
    required DateTime date,
    required bool isIncome,
  }) async {
    final model = TransactionModel(
      id: _uuid.v4(),
      amount: amount,
      merchant: merchant,
      category: category,
      date: date,
      isIncome: isIncome,
    );
    _items.add(model);
    return model;
  }

  @override
  Future<List<TransactionModel>> list() async {
    return List<TransactionModel>.unmodifiable(_items);
  }

  @override
  Future<List<TransactionModel>> getByDateRange(DateTime start, DateTime end) async {
    return _items.where((t) => 
      t.date.isAfter(start.subtract(const Duration(days: 1))) && 
      t.date.isBefore(end.add(const Duration(days: 1)))
    ).toList();
  }

  @override
  Future<TransactionModel?> getById(String id) async {
    try {
      return _items.firstWhere((t) => t.id == id);
    } catch (e) {
      return null;
    }
  }

  @override
  Future<bool> update(TransactionModel transaction) async {
    final index = _items.indexWhere((t) => t.id == transaction.id);
    if (index != -1) {
      _items[index] = transaction;
      return true;
    }
    return false;
  }

  @override
  Future<int> delete(String id) async {
    final initialLength = _items.length;
    _items.removeWhere((t) => t.id == id);
    return initialLength - _items.length;
  }
}
