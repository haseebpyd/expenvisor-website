import 'dart:core';

import '../models/parsed_transaction.dart';

class TransactionParser {
  static final RegExp _amountRegex = RegExp(r'(?:\$)?(-?\d+(?:[\.,]\d{1,2})?)');
  static final RegExp _dateYesterday =
      RegExp(r'\b(yesterday|yd)\b', caseSensitive: false);
  static final RegExp _dateToday =
      RegExp(r'\b(today|td)\b', caseSensitive: false);
  static final RegExp _incomeKeywords = RegExp(
      r'\b(salary|paycheck|income|refund|got paid|received)\b',
      caseSensitive: false);

  ParsedTransaction? tryParse(String input) {
    final normalized = input.trim();
    if (normalized.isEmpty) return null;

    final amountMatch = _amountRegex.firstMatch(normalized);
    if (amountMatch == null) return null;

    final rawAmount = amountMatch.group(1)!.replaceAll(',', '.');
    final amount = double.tryParse(rawAmount);
    if (amount == null) return null;

    final beforeAmount = normalized.substring(0, amountMatch.start).trim();
    final afterAmount = normalized.substring(amountMatch.end).trim();

    final isIncome = _incomeKeywords.hasMatch(normalized) ||
        normalized.contains('-') == false &&
            normalized.toLowerCase().startsWith('refund');

    final merchant = _guessMerchant(beforeAmount, afterAmount);
    final category = _guessCategory(merchant, normalized);
    final date = _guessDate(normalized);

    return ParsedTransaction(
      amount: isIncome ? amount.abs() : amount.abs(),
      merchant: merchant.isEmpty ? 'Unknown' : merchant,
      category: category,
      date: date,
      isIncome: isIncome,
    );
  }

  String _guessMerchant(String beforeAmount, String afterAmount) {
    final candidate = beforeAmount.isNotEmpty ? beforeAmount : afterAmount;
    final cleaned = candidate.replaceAll(RegExp(r'[^A-Za-z\s]'), '').trim();
    if (cleaned.isEmpty) return '';
    final words = cleaned.split(RegExp(r'\s+'));
    if (words.length > 3) {
      return words.sublist(0, 3).join(' ');
    }
    return cleaned;
  }

  String _guessCategory(String merchant, String fullText) {
    final text = fullText.toLowerCase();
    if (merchant.toLowerCase().contains('starbucks') ||
        text.contains('coffee') ||
        text.contains('lunch') ||
        text.contains('dinner')) {
      return 'Food & Dining';
    }
    if (text.contains('uber') ||
        text.contains('lyft') ||
        text.contains('bus') ||
        text.contains('train')) {
      return 'Transportation';
    }
    if (text.contains('rent') ||
        text.contains('electric') ||
        text.contains('internet')) {
      return 'Bills & Utilities';
    }
    if (text.contains('salary') ||
        text.contains('paycheck') ||
        text.contains('refund')) {
      return 'Income';
    }
    return 'General';
  }

  DateTime _guessDate(String fullText) {
    final now = DateTime.now();
    if (_dateYesterday.hasMatch(fullText)) {
      return now.subtract(const Duration(days: 1));
    }
    if (_dateToday.hasMatch(fullText)) {
      return now;
    }
    return now;
  }
}
