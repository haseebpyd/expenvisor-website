import 'package:flutter/foundation.dart';

@immutable
class TransactionModel {
  final String id;
  final double amount;
  final String merchant;
  final String category;
  final DateTime date;
  final bool isIncome;

  const TransactionModel({
    required this.id,
    required this.amount,
    required this.merchant,
    required this.category,
    required this.date,
    required this.isIncome,
  });
}
