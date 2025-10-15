import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import '../database/app_database.dart';
import '../models/transaction_model.dart';

class FirebaseService {
  static FirebaseAuth get auth => FirebaseAuth.instance;
  static FirebaseFirestore get firestore => FirebaseFirestore.instance;
  static FirebaseStorage get storage => FirebaseStorage.instance;
  static FirebaseAnalytics get analytics => FirebaseAnalytics.instance;
  static FirebaseCrashlytics get crashlytics => FirebaseCrashlytics.instance;

  static bool _initialized = false;

  static Future<void> initialize() async {
    if (_initialized) return;
    
    await Firebase.initializeApp();
    await _setupCrashlytics();
    _initialized = true;
  }

  static Future<void> _setupCrashlytics() async {
    // Pass all uncaught "fatal" errors from the framework to Crashlytics
    FlutterError.onError = (errorDetails) {
      FirebaseCrashlytics.instance.recordFlutterFatalError(errorDetails);
    };
    
    // Pass all uncaught asynchronous errors that aren't handled by the Flutter framework to Crashlytics
    PlatformDispatcher.instance.onError = (error, stack) {
      FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      return true;
    };
  }

  // User authentication
  static Future<UserCredential?> signInWithEmail(String email, String password) async {
    try {
      return await auth.signInWithEmailAndPassword(email: email, password: password);
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  static Future<UserCredential?> createUserWithEmail(String email, String password) async {
    try {
      return await auth.createUserWithEmailAndPassword(email: email, password: password);
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  static Future<void> signOut() async {
    await auth.signOut();
  }

  static User? get currentUser => auth.currentUser;

  // Firestore collections
  static CollectionReference get usersCollection => firestore.collection('users');
  static CollectionReference get transactionsCollection => firestore.collection('transactions');
  static CollectionReference get categoriesCollection => firestore.collection('categories');
  static CollectionReference get budgetsCollection => firestore.collection('budgets');
  static CollectionReference get userPreferencesCollection => firestore.collection('user_preferences');

  // Transaction operations
  static Future<void> createTransaction(TransactionModel transaction) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      await transactionsCollection.doc(transaction.id.toString()).set({
        'id': transaction.id,
        'userId': user.uid,
        'amount': transaction.amount,
        'description': transaction.description,
        'merchant': transaction.merchant,
        'category': transaction.category,
        'isIncome': transaction.isIncome,
        'date': transaction.date.toIso8601String(),
        'createdAt': transaction.createdAt.toIso8601String(),
        'updatedAt': transaction.updatedAt.toIso8601String(),
        'syncStatus': 'synced',
      });
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  static Future<void> updateTransaction(TransactionModel transaction) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      await transactionsCollection.doc(transaction.id.toString()).update({
        'amount': transaction.amount,
        'description': transaction.description,
        'merchant': transaction.merchant,
        'category': transaction.category,
        'isIncome': transaction.isIncome,
        'date': transaction.date.toIso8601String(),
        'updatedAt': transaction.updatedAt.toIso8601String(),
        'syncStatus': 'synced',
      });
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  static Future<void> deleteTransaction(int transactionId) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      await transactionsCollection.doc(transactionId.toString()).delete();
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  static Future<List<TransactionModel>> getTransactions() async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      final snapshot = await transactionsCollection
          .where('userId', isEqualTo: user.uid)
          .orderBy('date', descending: true)
          .get();

      return snapshot.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return TransactionModel(
          id: data['id'],
          amount: data['amount'].toDouble(),
          description: data['description'] ?? '',
          merchant: data['merchant'] ?? '',
          category: data['category'] ?? 'Other',
          isIncome: data['isIncome'] ?? false,
          date: DateTime.parse(data['date']),
          createdAt: DateTime.parse(data['createdAt']),
          updatedAt: DateTime.parse(data['updatedAt']),
        );
      }).toList();
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  // Category operations
  static Future<void> createCategory(String name, String color) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      await categoriesCollection.add({
        'userId': user.uid,
        'name': name,
        'color': color,
        'createdAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  // Budget operations
  static Future<void> createBudget(String category, double amount, String period) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      await budgetsCollection.add({
        'userId': user.uid,
        'category': category,
        'amount': amount,
        'period': period,
        'createdAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  // User preferences
  static Future<void> updateUserPreferences(Map<String, dynamic> preferences) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      await userPreferencesCollection.doc(user.uid).set({
        'userId': user.uid,
        ...preferences,
        'updatedAt': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  // Analytics
  static Future<void> logEvent(String name, Map<String, dynamic> parameters) async {
    try {
      await analytics.logEvent(name: name, parameters: parameters);
    } catch (e) {
      // Analytics errors shouldn't crash the app
      print('Analytics error: $e');
    }
  }

  // Storage operations
  static Future<String> uploadReceiptImage(String transactionId, List<int> imageBytes) async {
    try {
      final user = currentUser;
      if (user == null) throw Exception('User not authenticated');

      final ref = storage.ref().child('receipts/${user.uid}/$transactionId.jpg');
      final uploadTask = ref.putData(Uint8List.fromList(imageBytes));
      final snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      await crashlytics.recordError(e, null);
      rethrow;
    }
  }

  // Check if user is online
  static Future<bool> isOnline() async {
    try {
      await firestore.doc('_health_check/online').get();
      return true;
    } catch (e) {
      return false;
    }
  }
}