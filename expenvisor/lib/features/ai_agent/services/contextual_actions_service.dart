import 'dart:math';
import '../models/parsed_transaction.dart';

class QuickAction {
  final String text;
  final String action;
  final String icon;
  final double priority;

  QuickAction({
    required this.text,
    required this.action,
    required this.icon,
    this.priority = 1.0,
  });
}

class ContextualActionsService {
  static const List<String> _morningActions = [
    'Add breakfast',
    'Coffee expense',
    'Morning commute',
    'Grocery shopping',
  ];

  static const List<String> _afternoonActions = [
    'Add lunch',
    'Afternoon snack',
    'Work expense',
    'Transportation',
  ];

  static const List<String> _eveningActions = [
    'Add dinner',
    'Evening activity',
    'Shopping',
    'Entertainment',
  ];

  static const List<String> _weekendActions = [
    'Weekend activity',
    'Dining out',
    'Shopping',
    'Entertainment',
  ];

  static const List<String> _commonQueries = [
    'How much did I spend this week?',
    'What\'s my budget status?',
    'Show me this month\'s summary',
    'Where am I overspending?',
  ];

  static const List<String> _quickAddActions = [
    'Add expense',
    'Add income',
    'Scan receipt',
    'Voice input',
  ];

  List<QuickAction> getContextualActions({
    List<ParsedTransaction>? recentTransactions,
    DateTime? currentTime,
    bool isWeekend = false,
  }) {
    final now = currentTime ?? DateTime.now();
    final hour = now.hour;
    final dayOfWeek = now.weekday;

    List<QuickAction> actions = [];

    // Time-based actions
    if (isWeekend || dayOfWeek == DateTime.saturday || dayOfWeek == DateTime.sunday) {
      actions.addAll(_weekendActions.map((action) => QuickAction(
        text: action,
        action: 'add_expense',
        icon: _getIconForAction(action),
        priority: 0.9,
      )));
    } else if (hour < 10) {
      // Morning
      actions.addAll(_morningActions.map((action) => QuickAction(
        text: action,
        action: 'add_expense',
        icon: _getIconForAction(action),
        priority: 0.9,
      )));
    } else if (hour < 17) {
      // Afternoon
      actions.addAll(_afternoonActions.map((action) => QuickAction(
        text: action,
        action: 'add_expense',
        icon: _getIconForAction(action),
        priority: 0.9,
      )));
    } else {
      // Evening
      actions.addAll(_eveningActions.map((action) => QuickAction(
        text: action,
        action: 'add_expense',
        icon: _getIconForAction(action),
        priority: 0.9,
      )));
    }

    // Pattern-based actions from recent transactions
    if (recentTransactions != null && recentTransactions.isNotEmpty) {
      final recentMerchants = recentTransactions
          .take(5)
          .map((t) => t.merchant)
          .where((m) => m.isNotEmpty)
          .toSet();

      for (final merchant in recentMerchants) {
        actions.add(QuickAction(
          text: 'Similar to $merchant',
          action: 'add_expense',
          icon: '🔄',
          priority: 0.8,
        ));
      }
    }

    // Common queries
    actions.addAll(_commonQueries.map((query) => QuickAction(
      text: query,
      action: 'query',
      icon: '❓',
      priority: 0.7,
    )));

    // Quick add actions
    actions.addAll(_quickAddActions.map((action) => QuickAction(
      text: action,
      action: action.toLowerCase().replaceAll(' ', '_'),
      icon: _getIconForAction(action),
      priority: 0.6,
    )));

    // Sort by priority and return top 6
    actions.sort((a, b) => b.priority.compareTo(a.priority));
    return actions.take(6).toList();
  }

  String _getIconForAction(String action) {
    final actionLower = action.toLowerCase();
    
    if (actionLower.contains('breakfast') || actionLower.contains('coffee')) return '☕';
    if (actionLower.contains('lunch') || actionLower.contains('dinner')) return '🍽️';
    if (actionLower.contains('commute') || actionLower.contains('transportation')) return '🚗';
    if (actionLower.contains('shopping') || actionLower.contains('grocery')) return '🛒';
    if (actionLower.contains('work')) return '💼';
    if (actionLower.contains('entertainment') || actionLower.contains('activity')) return '🎬';
    if (actionLower.contains('snack')) return '🍿';
    if (actionLower.contains('expense')) return '💰';
    if (actionLower.contains('income')) return '💵';
    if (actionLower.contains('receipt')) return '📄';
    if (actionLower.contains('voice')) return '🎤';
    if (actionLower.contains('scan')) return '📷';
    
    return '💡';
  }

  List<QuickAction> getQuickActionsForIntent(String intent) {
    switch (intent.toLowerCase()) {
      case 'add_expense':
        return [
          QuickAction(text: 'Voice input', action: 'voice_input', icon: '🎤'),
          QuickAction(text: 'Scan receipt', action: 'scan_receipt', icon: '📷'),
          QuickAction(text: 'Manual entry', action: 'manual_entry', icon: '✏️'),
        ];
      case 'query':
        return [
          QuickAction(text: 'This week', action: 'query_week', icon: '📅'),
          QuickAction(text: 'This month', action: 'query_month', icon: '📊'),
          QuickAction(text: 'Budget status', action: 'budget_status', icon: '💰'),
          QuickAction(text: 'Categories', action: 'query_categories', icon: '📋'),
        ];
      case 'budget':
        return [
          QuickAction(text: 'Set budget', action: 'set_budget', icon: '🎯'),
          QuickAction(text: 'View budgets', action: 'view_budgets', icon: '📊'),
          QuickAction(text: 'Budget alerts', action: 'budget_alerts', icon: '🔔'),
        ];
      default:
        return getContextualActions();
    }
  }
}