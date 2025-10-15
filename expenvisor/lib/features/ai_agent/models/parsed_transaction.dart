import 'package:flutter/foundation.dart';

@immutable
class ParsedTransaction {
  final double amount;
  final String merchant;
  final String category;
  final DateTime date;
  final bool isIncome;

  const ParsedTransaction({
    required this.amount,
    required this.merchant,
    required this.category,
    required this.date,
    this.isIncome = false,
  });
}
