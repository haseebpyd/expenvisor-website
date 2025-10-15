import 'package:drift/drift.dart';

class UsageTracking extends Table {
  TextColumn get id => text()();
  TextColumn get userId => text()();
  TextColumn get feature => text()(); // ai_chat, voice_input, ocr_scan
  IntColumn get count => integer()();
  TextColumn get period => text()(); // 2024-01 (YYYY-MM)
  DateTimeColumn get lastReset => dateTime()();
  DateTimeColumn get createdAt => dateTime().withDefault(currentDateAndTime)();
  TextColumn get syncStatus => text().withDefault(const Constant('pending'))();
  TextColumn get cloudId => text().nullable()();

  @override
  Set<Column> get primaryKey => {id};
}
