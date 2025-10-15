import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

enum UsageType { aiChat, voiceInput, ocrScan, exportData }

class UsageLimit {
  final int monthlyLimit;
  final int currentUsage;
  final DateTime resetDate;

  UsageLimit({
    required this.monthlyLimit,
    required this.currentUsage,
    required this.resetDate,
  });

  bool get isExceeded => currentUsage >= monthlyLimit;
  int get remaining => monthlyLimit - currentUsage;
  double get percentage => (currentUsage / monthlyLimit).clamp(0.0, 1.0);

  Map<String, dynamic> toJson() => {
    'monthlyLimit': monthlyLimit,
    'currentUsage': currentUsage,
    'resetDate': resetDate.toIso8601String(),
  };

  factory UsageLimit.fromJson(Map<String, dynamic> json) => UsageLimit(
    monthlyLimit: json['monthlyLimit'],
    currentUsage: json['currentUsage'],
    resetDate: DateTime.parse(json['resetDate']),
  );
}

class UsageTracker {
  static const String _usageKey = 'usage_tracking';
  static const String _subscriptionKey = 'subscription_tier';
  
  // Default limits for free tier
  static const Map<UsageType, int> _freeLimits = {
    UsageType.aiChat: 50,
    UsageType.voiceInput: 30,
    UsageType.ocrScan: 5,
    UsageType.exportData: 0, // Not allowed in free tier
  };

  // Premium limits (unlimited)
  static const Map<UsageType, int> _premiumLimits = {
    UsageType.aiChat: -1, // -1 means unlimited
    UsageType.voiceInput: -1,
    UsageType.ocrScan: -1,
    UsageType.exportData: -1,
  };

  String _subscriptionTier = 'free';
  Map<UsageType, UsageLimit> _usageLimits = {};

  UsageTracker() {
    _loadUsageData();
  }

  // Load usage data from local storage
  Future<void> _loadUsageData() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Load subscription tier
    _subscriptionTier = prefs.getString(_subscriptionKey) ?? 'free';
    
    // Load usage limits
    final usageData = prefs.getString(_usageKey);
    if (usageData != null) {
      final Map<String, dynamic> data = jsonDecode(usageData);
      _usageLimits = data.map((key, value) => 
        MapEntry(UsageType.values.firstWhere((e) => e.toString() == key), 
                 UsageLimit.fromJson(value)));
    } else {
      // Initialize with default limits
      await _initializeUsageLimits();
    }
  }

  // Initialize usage limits
  Future<void> _initializeUsageLimits() async {
    final now = DateTime.now();
    final nextMonth = DateTime(now.year, now.month + 1, 1);
    
    _usageLimits = {};
    for (final type in UsageType.values) {
      final limit = _getLimitForType(type);
      _usageLimits[type] = UsageLimit(
        monthlyLimit: limit,
        currentUsage: 0,
        resetDate: nextMonth,
      );
    }
    
    await _saveUsageData();
  }

  // Get limit for usage type based on subscription
  int _getLimitForType(UsageType type) {
    final limits = _subscriptionTier == 'premium' ? _premiumLimits : _freeLimits;
    return limits[type] ?? 0;
  }

  // Save usage data to local storage
  Future<void> _saveUsageData() async {
    final prefs = await SharedPreferences.getInstance();
    
    await prefs.setString(_subscriptionKey, _subscriptionTier);
    
    final usageData = _usageLimits.map((key, value) => 
      MapEntry(key.toString(), value.toJson()));
    await prefs.setString(_usageKey, jsonEncode(usageData));
  }

  // Check if usage is allowed
  bool canUse(UsageType type) {
    final limit = _usageLimits[type];
    if (limit == null) return false;
    
    // Check if reset date has passed
    if (DateTime.now().isAfter(limit.resetDate)) {
      _resetUsageLimit(type);
      return true;
    }
    
    // Check if limit is exceeded
    return !limit.isExceeded;
  }

  // Record usage
  Future<bool> recordUsage(UsageType type) async {
    if (!canUse(type)) return false;
    
    final limit = _usageLimits[type];
    if (limit == null) return false;
    
    // Don't increment if unlimited
    if (limit.monthlyLimit == -1) return true;
    
    _usageLimits[type] = UsageLimit(
      monthlyLimit: limit.monthlyLimit,
      currentUsage: limit.currentUsage + 1,
      resetDate: limit.resetDate,
    );
    
    await _saveUsageData();
    return true;
  }

  // Reset usage limit (called when month changes)
  void _resetUsageLimit(UsageType type) {
    final now = DateTime.now();
    final nextMonth = DateTime(now.year, now.month + 1, 1);
    final limit = _getLimitForType(type);
    
    _usageLimits[type] = UsageLimit(
      monthlyLimit: limit,
      currentUsage: 0,
      resetDate: nextMonth,
    );
  }

  // Get usage limit for type
  UsageLimit? getUsageLimit(UsageType type) {
    return _usageLimits[type];
  }

  // Get all usage limits
  Map<UsageType, UsageLimit> getAllUsageLimits() {
    return Map.from(_usageLimits);
  }

  // Update subscription tier
  Future<void> updateSubscriptionTier(String tier) async {
    _subscriptionTier = tier;
    
    // Update limits for new tier
    for (final type in UsageType.values) {
      final limit = _getLimitForType(type);
      final currentLimit = _usageLimits[type];
      
      if (currentLimit != null) {
        _usageLimits[type] = UsageLimit(
          monthlyLimit: limit,
          currentUsage: currentLimit.currentUsage,
          resetDate: currentLimit.resetDate,
        );
      }
    }
    
    await _saveUsageData();
  }

  // Get subscription tier
  String get subscriptionTier => _subscriptionTier;

  // Check if user is on premium
  bool get isPremium => _subscriptionTier == 'premium';

  // Get usage statistics
  Map<String, dynamic> getUsageStats() {
    final stats = <String, dynamic>{};
    
    for (final entry in _usageLimits.entries) {
      final type = entry.key.toString().split('.').last;
      final limit = entry.value;
      
      stats[type] = {
        'currentUsage': limit.currentUsage,
        'monthlyLimit': limit.monthlyLimit,
        'remaining': limit.remaining,
        'percentage': limit.percentage,
        'isExceeded': limit.isExceeded,
        'isUnlimited': limit.monthlyLimit == -1,
      };
    }
    
    return stats;
  }

  // Get usage summary for UI
  String getUsageSummary(UsageType type) {
    final limit = _usageLimits[type];
    if (limit == null) return 'Unknown';
    
    if (limit.monthlyLimit == -1) {
      return 'Unlimited';
    }
    
    return '${limit.currentUsage}/${limit.monthlyLimit}';
  }

  // Check if any limits are exceeded
  bool get hasExceededLimits {
    return _usageLimits.values.any((limit) => limit.isExceeded);
  }

  // Get exceeded limits
  List<UsageType> getExceededLimits() {
    return _usageLimits.entries
        .where((entry) => entry.value.isExceeded)
        .map((entry) => entry.key)
        .toList();
  }

  // Reset all usage (for testing or admin)
  Future<void> resetAllUsage() async {
    await _initializeUsageLimits();
  }

  // Export usage data
  Map<String, dynamic> exportUsageData() {
    return {
      'subscriptionTier': _subscriptionTier,
      'usageLimits': _usageLimits.map((key, value) => 
        MapEntry(key.toString(), value.toJson())),
      'exportedAt': DateTime.now().toIso8601String(),
    };
  }
}