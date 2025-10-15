enum UserIntent { 
  addExpense, 
  addIncome, 
  query, 
  budgetCheck, 
  insight, 
  chat 
}

class IntentClassifier {
  static final RegExp _amountRegex = RegExp(r'(?:\$)?(-?\d+(?:[\.,]\d{1,2})?)');
  static final RegExp _queryKeywords = RegExp(r'\b(how much|spent|spending|total|summary|this month|this week|last month|last week)\b', caseSensitive: false);
  static final RegExp _budgetKeywords = RegExp(r'\b(budget|over budget|under budget|remaining|left)\b', caseSensitive: false);
  static final RegExp _insightKeywords = RegExp(r'\b(insight|advice|save|optimize|recommend|suggest|pattern|trend)\b', caseSensitive: false);
  static final RegExp _incomeKeywords = RegExp(r'\b(salary|paycheck|income|refund|got paid|received|earned)\b', caseSensitive: false);

  UserIntent classify(String message) {
    final normalized = message.toLowerCase().trim();
    
    // Check for amount first (expense/income)
    if (_amountRegex.hasMatch(normalized)) {
      if (_incomeKeywords.hasMatch(normalized) || 
          normalized.contains('refund') || 
          normalized.contains('+')) {
        return UserIntent.addIncome;
      }
      return UserIntent.addExpense;
    }
    
    // Check for query patterns
    if (_queryKeywords.hasMatch(normalized)) {
      return UserIntent.query;
    }
    
    // Check for budget-related queries
    if (_budgetKeywords.hasMatch(normalized)) {
      return UserIntent.budgetCheck;
    }
    
    // Check for insight requests
    if (_insightKeywords.hasMatch(normalized)) {
      return UserIntent.insight;
    }
    
    // Default to general chat
    return UserIntent.chat;
  }
}
