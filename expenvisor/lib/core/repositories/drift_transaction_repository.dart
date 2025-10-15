import 'package:drift/drift.dart';
import 'package:uuid/uuid.dart';
import '../database/app_database.dart';
import '../models/transaction_model.dart';

class DriftTransactionRepository implements TransactionRepository {
  final AppDatabase _database;
  final Uuid _uuid = const Uuid();

  DriftTransactionRepository(this._database);

  @override
  Future<TransactionModel> create({
    required double amount,
    required String merchant,
    required String category,
    required DateTime date,
    required bool isIncome,
  }) async {
    final id = _uuid.v4();
    final transaction = TransactionsCompanion.insert(
      id: id,
      amount: amount,
      merchant: merchant,
      category: category,
      date: date,
      isIncome: Value(isIncome),
    );

    await _database.insertTransaction(transaction);
    
    return TransactionModel(
      id: id,
      amount: amount,
      merchant: merchant,
      category: category,
      date: date,
      isIncome: isIncome,
    );
  }

  @override
  Future<List<TransactionModel>> list() async {
    final transactions = await _database.getAllTransactions();
    return transactions.map((t) => TransactionModel(
      id: t.id,
      amount: t.amount,
      merchant: t.merchant,
      category: t.category,
      date: t.date,
      isIncome: t.isIncome,
    )).toList();
  }

  Future<List<TransactionModel>> getByDateRange(DateTime start, DateTime end) async {
    final transactions = await _database.getTransactionsByDateRange(start, end);
    return transactions.map((t) => TransactionModel(
      id: t.id,
      amount: t.amount,
      merchant: t.merchant,
      category: t.category,
      date: t.date,
      isIncome: t.isIncome,
    )).toList();
  }

  Future<TransactionModel?> getById(String id) async {
    final transaction = await _database.getTransactionById(id);
    if (transaction == null) return null;
    
    return TransactionModel(
      id: transaction.id,
      amount: transaction.amount,
      merchant: transaction.merchant,
      category: transaction.category,
      date: transaction.date,
      isIncome: transaction.isIncome,
    );
  }

  Future<bool> update(TransactionModel transaction) async {
    final driftTransaction = Transaction(
      id: transaction.id,
      amount: transaction.amount,
      merchant: transaction.merchant,
      category: transaction.category,
      date: transaction.date,
      isIncome: transaction.isIncome,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      syncStatus: 'pending',
      cloudId: null,
    );
    
    return await _database.updateTransaction(driftTransaction);
  }

  Future<int> delete(String id) async {
    return await _database.deleteTransaction(id);
  }
}
