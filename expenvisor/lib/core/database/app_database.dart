import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift_flutter/drift_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import 'package:sqlite3_flutter_libs/sqlite3_flutter_libs.dart';
import 'package:uuid/uuid.dart';
import 'package:drift/native.dart';

import 'tables/transactions.dart';
import 'tables/categories.dart';
import 'tables/budgets.dart';
import 'tables/user_preferences.dart';
import 'tables/usage_tracking.dart';

part 'app_database.g.dart';

@DriftDatabase(tables: [
  Transactions,
  Categories,
  Budgets,
  UserPreferences,
  UsageTracking,
])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;

  @override
  MigrationStrategy get migration => MigrationStrategy(
    onCreate: (Migrator m) async {
      await m.createAll();
      await _insertDefaultCategories();
    },
  );

  Future<void> _insertDefaultCategories() async {
    final defaultCategories = [
      CategoriesCompanion.insert(
        id: 'food-dining',
        name: 'Food & Dining',
        icon: 'restaurant',
        color: '#FF6B6B',
        isDefault: const Value(true),
      ),
      CategoriesCompanion.insert(
        id: 'transportation',
        name: 'Transportation',
        icon: 'directions_car',
        color: '#4ECDC4',
        isDefault: const Value(true),
      ),
      CategoriesCompanion.insert(
        id: 'shopping',
        name: 'Shopping',
        icon: 'shopping_bag',
        color: '#45B7D1',
        isDefault: const Value(true),
      ),
      CategoriesCompanion.insert(
        id: 'entertainment',
        name: 'Entertainment',
        icon: 'movie',
        color: '#96CEB4',
        isDefault: const Value(true),
      ),
      CategoriesCompanion.insert(
        id: 'bills-utilities',
        name: 'Bills & Utilities',
        icon: 'receipt',
        color: '#FFEAA7',
        isDefault: const Value(true),
      ),
      CategoriesCompanion.insert(
        id: 'healthcare',
        name: 'Healthcare',
        icon: 'local_hospital',
        color: '#DDA0DD',
        isDefault: const Value(true),
      ),
      CategoriesCompanion.insert(
        id: 'income',
        name: 'Income',
        icon: 'account_balance',
        color: '#98D8C8',
        isDefault: const Value(true),
      ),
    ];

    for (final category in defaultCategories) {
      await into(categories).insert(category, mode: InsertMode.insertOrIgnore);
    }
  }

  // Transaction queries
  Future<List<Transaction>> getAllTransactions() => select(transactions).get();
  
  Future<List<Transaction>> getTransactionsByDateRange(DateTime start, DateTime end) =>
      (select(transactions)
        ..where((t) => t.date.isBetweenValues(start, end))
        ..orderBy([(t) => OrderingTerm.desc(t.date)]))
      .get();

  Future<Transaction?> getTransactionById(String id) =>
      (select(transactions)..where((t) => t.id.equals(id))).getSingleOrNull();

  Future<int> insertTransaction(TransactionsCompanion transaction) =>
      into(transactions).insert(transaction);

  Future<bool> updateTransaction(Transaction transaction) =>
      update(transactions).replace(transaction);

  Future<int> deleteTransaction(String id) =>
      (delete(transactions)..where((t) => t.id.equals(id))).go();

  // Category queries
  Future<List<Category>> getAllCategories() => select(categories).get();
  
  Future<Category?> getCategoryById(String id) =>
      (select(categories)..where((c) => c.id.equals(id))).getSingleOrNull();

  Future<int> insertCategory(CategoriesCompanion category) =>
      into(categories).insert(category);

  // Budget queries
  Future<List<Budget>> getAllBudgets() => select(budgets).get();
  
  Future<List<Budget>> getActiveBudgets() =>
      (select(budgets)..where((b) => b.isActive.equals(true))).get();

  Future<int> insertBudget(BudgetsCompanion budget) =>
      into(budgets).insert(budget);

  // Usage tracking queries - simplified for now
  Future<int> incrementUsage(String userId, String feature, String period) async {
    // TODO: Implement proper usage tracking
    return 1;
  }

  Future<int> getUsageCount(String userId, String feature, String period) async {
    // TODO: Implement proper usage tracking
    return 0;
  }
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'expenvisor.db'));
    return NativeDatabase.createInBackground(file);
  });
}
