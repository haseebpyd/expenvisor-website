enum UserIntent { 
  addExpense, 
  addIncome, 
  query, 
  budgetCheck, 
  insight, 
  chat,
  categoryQuery,
  timeQuery,
  exportData,
  settings
}

class IntentClassifier {
  static final RegExp _amountRegex = RegExp(r'(?:\$)?(-?\d+(?:[\.,]\d{1,2})?)');
  static final RegExp _queryKeywords = RegExp(r'\b(how much|spent|spending|total|summary|this month|this week|last month|last week|show me|display)\b', caseSensitive: false);
  static final RegExp _budgetKeywords = RegExp(r'\b(budget|over budget|under budget|remaining|left|budget status|budget check)\b', caseSensitive: false);
  static final RegExp _insightKeywords = RegExp(r'\b(insight|advice|save|optimize|recommend|suggest|pattern|trend|analysis|where can i save|how to save)\b', caseSensitive: false);
  static final RegExp _incomeKeywords = RegExp(r'\b(salary|paycheck|income|refund|got paid|received|earned|bonus|freelance)\b', caseSensitive: false);
  static final RegExp _categoryKeywords = RegExp(r'\b(category|categories|food|dining|transport|entertainment|shopping|utilities|health|education)\b', caseSensitive: false);
  static final RegExp _timeKeywords = RegExp(r'\b(today|yesterday|this week|last week|this month|last month|this year|last year|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b', caseSensitive: false);
  static final RegExp _exportKeywords = RegExp(r'\b(export|download|csv|pdf|backup|save data|download data)\b', caseSensitive: false);
  static final RegExp _settingsKeywords = RegExp(r'\b(settings|preferences|configure|setup|change|modify|update)\b', caseSensitive: false);

  UserIntent classify(String message) {
    final normalized = message.toLowerCase().trim();
    
    // Check for amount first (expense/income)
    if (_amountRegex.hasMatch(normalized)) {
      if (_incomeKeywords.hasMatch(normalized) || 
          normalized.contains('refund') || 
          normalized.contains('+') ||
          normalized.contains('received') ||
          normalized.contains('earned')) {
        return UserIntent.addIncome;
      }
      return UserIntent.addExpense;
    }
    
    // Check for export requests
    if (_exportKeywords.hasMatch(normalized)) {
      return UserIntent.exportData;
    }
    
    // Check for settings requests
    if (_settingsKeywords.hasMatch(normalized)) {
      return UserIntent.settings;
    }
    
    // Check for category-specific queries
    if (_categoryKeywords.hasMatch(normalized) && _queryKeywords.hasMatch(normalized)) {
      return UserIntent.categoryQuery;
    }
    
    // Check for time-specific queries
    if (_timeKeywords.hasMatch(normalized) && _queryKeywords.hasMatch(normalized)) {
      return UserIntent.timeQuery;
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

  // Enhanced classification with confidence scoring
  Map<UserIntent, double> classifyWithConfidence(String message) {
    final normalized = message.toLowerCase().trim();
    final scores = <UserIntent, double>{};
    
    // Amount-based classification
    if (_amountRegex.hasMatch(normalized)) {
      if (_incomeKeywords.hasMatch(normalized) || 
          normalized.contains('refund') || 
          normalized.contains('+')) {
        scores[UserIntent.addIncome] = 0.9;
      } else {
        scores[UserIntent.addExpense] = 0.9;
      }
    }
    
    // Export requests
    if (_exportKeywords.hasMatch(normalized)) {
      scores[UserIntent.exportData] = 0.8;
    }
    
    // Settings requests
    if (_settingsKeywords.hasMatch(normalized)) {
      scores[UserIntent.settings] = 0.8;
    }
    
    // Category queries
    if (_categoryKeywords.hasMatch(normalized) && _queryKeywords.hasMatch(normalized)) {
      scores[UserIntent.categoryQuery] = 0.85;
    }
    
    // Time queries
    if (_timeKeywords.hasMatch(normalized) && _queryKeywords.hasMatch(normalized)) {
      scores[UserIntent.timeQuery] = 0.85;
    }
    
    // General queries
    if (_queryKeywords.hasMatch(normalized)) {
      scores[UserIntent.query] = 0.7;
    }
    
    // Budget queries
    if (_budgetKeywords.hasMatch(normalized)) {
      scores[UserIntent.budgetCheck] = 0.8;
    }
    
    // Insight requests
    if (_insightKeywords.hasMatch(normalized)) {
      scores[UserIntent.insight] = 0.8;
    }
    
    // Default chat
    scores[UserIntent.chat] = 0.3;
    
    return scores;
  }

  // Get the most confident intent
  UserIntent getMostConfidentIntent(String message) {
    final scores = classifyWithConfidence(message);
    if (scores.isEmpty) return UserIntent.chat;
    
    return scores.entries
        .reduce((a, b) => a.value > b.value ? a : b)
        .key;
  }
}
