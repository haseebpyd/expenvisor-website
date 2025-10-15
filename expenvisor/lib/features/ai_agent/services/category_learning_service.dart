import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/database/app_database.dart';
import '../../../core/repositories/transaction_repository.dart';

class CategoryLearningService {
  static const String _merchantCategoryKey = 'merchant_category_mapping';
  static const String _categoryPatternsKey = 'category_patterns';
  
  final TransactionRepository _transactionRepository;
  Map<String, String> _merchantCategoryMap = {};
  Map<String, List<String>> _categoryPatterns = {};

  CategoryLearningService(this._transactionRepository) {
    _loadLearningData();
  }

  // Load learned patterns from local storage
  Future<void> _loadLearningData() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Load merchant to category mapping
    final merchantData = prefs.getString(_merchantCategoryKey);
    if (merchantData != null) {
      _merchantCategoryMap = Map<String, String>.from(jsonDecode(merchantData));
    }
    
    // Load category patterns
    final patternsData = prefs.getString(_categoryPatternsKey);
    if (patternsData != null) {
      _categoryPatterns = Map<String, List<String>>.from(
        jsonDecode(patternsData).map((key, value) => 
          MapEntry(key, List<String>.from(value))
        )
      );
    }
  }

  // Save learned patterns to local storage
  Future<void> _saveLearningData() async {
    final prefs = await SharedPreferences.getInstance();
    
    await prefs.setString(_merchantCategoryKey, jsonEncode(_merchantCategoryMap));
    await prefs.setString(_categoryPatternsKey, jsonEncode(_categoryPatterns));
  }

  // Learn from user correction
  Future<void> learnFromCorrection({
    required String merchant,
    required String originalCategory,
    required String correctedCategory,
  }) async {
    // Update merchant to category mapping
    _merchantCategoryMap[merchant.toLowerCase()] = correctedCategory;
    
    // Update category patterns
    if (!_categoryPatterns.containsKey(correctedCategory)) {
      _categoryPatterns[correctedCategory] = [];
    }
    
    // Add merchant name as a pattern for this category
    final merchantWords = merchant.toLowerCase().split(' ');
    for (final word in merchantWords) {
      if (word.length > 2 && !_categoryPatterns[correctedCategory]!.contains(word)) {
        _categoryPatterns[correctedCategory]!.add(word);
      }
    }
    
    // Remove from original category if it was there
    if (_categoryPatterns.containsKey(originalCategory)) {
      _categoryPatterns[originalCategory]!.removeWhere((pattern) => 
        merchantWords.contains(pattern));
    }
    
    await _saveLearningData();
  }

  // Predict category based on learned patterns
  String? predictCategory(String merchant, String description) {
    final merchantLower = merchant.toLowerCase();
    final descriptionLower = description.toLowerCase();
    
    // First check direct merchant mapping
    if (_merchantCategoryMap.containsKey(merchantLower)) {
      return _merchantCategoryMap[merchantLower];
    }
    
    // Check partial merchant matches
    for (final entry in _merchantCategoryMap.entries) {
      if (merchantLower.contains(entry.key) || entry.key.contains(merchantLower)) {
        return entry.value;
      }
    }
    
    // Check description patterns
    for (final category in _categoryPatterns.keys) {
      final patterns = _categoryPatterns[category]!;
      for (final pattern in patterns) {
        if (descriptionLower.contains(pattern)) {
          return category;
        }
      }
    }
    
    return null;
  }

  // Get confidence score for category prediction
  double getCategoryConfidence(String merchant, String description) {
    final merchantLower = merchant.toLowerCase();
    final descriptionLower = description.toLowerCase();
    
    // Direct merchant match - highest confidence
    if (_merchantCategoryMap.containsKey(merchantLower)) {
      return 0.95;
    }
    
    // Partial merchant match - high confidence
    for (final entry in _merchantCategoryMap.entries) {
      if (merchantLower.contains(entry.key) || entry.key.contains(merchantLower)) {
        return 0.8;
      }
    }
    
    // Description pattern match - medium confidence
    for (final category in _categoryPatterns.keys) {
      final patterns = _categoryPatterns[category]!;
      int matchCount = 0;
      for (final pattern in patterns) {
        if (descriptionLower.contains(pattern)) {
          matchCount++;
        }
      }
      if (matchCount > 0) {
        return (matchCount / patterns.length * 0.6).clamp(0.3, 0.6);
      }
    }
    
    return 0.0;
  }

  // Get suggested categories based on merchant
  List<String> getSuggestedCategories(String merchant) {
    final suggestions = <String>[];
    final merchantLower = merchant.toLowerCase();
    
    // Get categories that have patterns matching this merchant
    for (final category in _categoryPatterns.keys) {
      final patterns = _categoryPatterns[category]!;
      for (final pattern in patterns) {
        if (merchantLower.contains(pattern) || pattern.contains(merchantLower)) {
          if (!suggestions.contains(category)) {
            suggestions.add(category);
          }
        }
      }
    }
    
    return suggestions;
  }

  // Get learning statistics
  Map<String, dynamic> getLearningStats() {
    return {
      'merchantMappings': _merchantCategoryMap.length,
      'categoryPatterns': _categoryPatterns.length,
      'totalPatterns': _categoryPatterns.values
          .fold(0, (sum, patterns) => sum + patterns.length),
    };
  }

  // Clear all learned data
  Future<void> clearLearningData() async {
    _merchantCategoryMap.clear();
    _categoryPatterns.clear();
    await _saveLearningData();
  }

  // Export learning data for backup
  Map<String, dynamic> exportLearningData() {
    return {
      'merchantCategoryMap': _merchantCategoryMap,
      'categoryPatterns': _categoryPatterns,
      'exportedAt': DateTime.now().toIso8601String(),
    };
  }

  // Import learning data from backup
  Future<void> importLearningData(Map<String, dynamic> data) async {
    if (data.containsKey('merchantCategoryMap')) {
      _merchantCategoryMap = Map<String, String>.from(data['merchantCategoryMap']);
    }
    
    if (data.containsKey('categoryPatterns')) {
      _categoryPatterns = Map<String, List<String>>.from(
        data['categoryPatterns'].map((key, value) => 
          MapEntry(key, List<String>.from(value))
        )
      );
    }
    
    await _saveLearningData();
  }
}