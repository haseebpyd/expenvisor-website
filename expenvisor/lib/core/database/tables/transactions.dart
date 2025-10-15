import 'package:drift/drift.dart';

class Transactions extends Table {
  TextColumn get id => text()();
  RealColumn get amount => real()();
  TextColumn get merchant => text()();
  TextColumn get category => text()();
  DateTimeColumn get date => dateTime()();
  BoolColumn get isIncome => boolean().withDefault(const Constant(false))();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
  TextColumn get syncStatus => text().withDefault(const Constant('pending'))();
  TextColumn get cloudId => text().nullable()();

  @override
  Set<Column> get primaryKey => {id};
}
