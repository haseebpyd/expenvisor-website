import 'package:drift/drift.dart';

class UserPreferences extends Table {
  TextColumn get id => text()();
  TextColumn get key => text()();
  TextColumn get value => text()();
  DateTimeColumn get updatedAt => dateTime().withDefault(currentDateAndTime)();
  TextColumn get syncStatus => text().withDefault(const Constant('pending'))();
  TextColumn get cloudId => text().nullable()();

  @override
  Set<Column> get primaryKey => {id};
}
