import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';
import '../../../shared/widgets/custom_button.dart';

class AiAdvisorScreen extends StatefulWidget {
  const AiAdvisorScreen({super.key});

  @override
  State<AiAdvisorScreen> createState() => _AiAdvisorScreenState();
}

class _AiAdvisorScreenState extends State<AiAdvisorScreen> {
  String _selectedTimeframe = 'This Month';
  String _selectedCategory = 'All Categories';

  // Mock financial advice data
  final List<Map<String, dynamic>> _adviceCards = [
    {
      'title': 'Budget Alert',
      'subtitle': 'You\'re spending 85% of your monthly budget',
      'description':
          'You\'ve spent \$2,550 out of \$3,000 this month. Consider reducing dining out expenses to stay within budget.',
      'type': 'warning',
      'icon': Icons.warning_amber_outlined,
      'action': 'View Budget Details',
      'priority': 'high',
    },
    {
      'title': 'Spending Trend',
      'subtitle': 'Grocery expenses increased by 15%',
      'description':
          'Your grocery spending has increased from \$400 to \$460 this month. This might be due to inflation or buying premium brands.',
      'type': 'info',
      'icon': Icons.trending_up,
      'action': 'Analyze Grocery Spending',
      'priority': 'medium',
    },
    {
      'title': 'Savings Opportunity',
      'subtitle': 'You could save \$200 this month',
      'description':
          'By reducing subscription services and dining out by 20%, you could save approximately \$200 and reach your savings goal.',
      'type': 'success',
      'icon': Icons.savings_outlined,
      'action': 'View Savings Plan',
      'priority': 'high',
    },
    {
      'title': 'Investment Suggestion',
      'subtitle': 'Consider investing your surplus',
      'description':
          'You have \$500 surplus this month. Consider investing in a high-yield savings account or low-risk mutual fund.',
      'type': 'info',
      'icon': Icons.trending_up,
      'action': 'Explore Investment Options',
      'priority': 'low',
    },
    {
      'title': 'Bill Reminder',
      'subtitle': 'Electricity bill due in 3 days',
      'description':
          'Your electricity bill of \$85 is due on January 18th. Set up auto-pay to avoid late fees.',
      'type': 'reminder',
      'icon': Icons.schedule_outlined,
      'action': 'Pay Now',
      'priority': 'high',
    },
    {
      'title': 'Financial Health Score',
      'subtitle': 'Your score is 78/100',
      'description':
          'Great job! Your financial health is good. Focus on building emergency fund and reducing debt to improve further.',
      'type': 'success',
      'icon': Icons.health_and_safety_outlined,
      'action': 'View Detailed Report',
      'priority': 'medium',
    },
  ];

  final List<String> _timeframes = [
    'This Week',
    'This Month',
    'Last 3 Months',
    'This Year',
  ];

  final List<String> _categories = [
    'All Categories',
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'AI Financial Advisor',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        backgroundColor:
            isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(
              Icons.refresh,
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
            onPressed: _refreshAdvice,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildFilters(isDark),
            const SizedBox(height: AppSpacing.lg),
            _buildAdviceCards(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildQuickActions(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  gradient: AppColors.aiGlowGradient,
                  borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
                ),
                child: const Icon(
                  Icons.psychology,
                  color: Colors.white,
                  size: 28,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Your AI Financial Advisor',
                      style: AppTypography.titleLarge(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.textPrimaryLight,
                      ),
                    ),
                    Text(
                      'Personalized insights based on your spending patterns',
                      style: AppTypography.bodyMedium(
                        color: isDark
                            ? AppColors.textSecondaryDark
                            : AppColors.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          Row(
            children: [
              Expanded(
                child: _buildStatCard(
                  title: 'Active Alerts',
                  value: '3',
                  color: AppColors.warning,
                  isDark: isDark,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: _buildStatCard(
                  title: 'Savings Tips',
                  value: '5',
                  color: AppColors.success,
                  isDark: isDark,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: _buildStatCard(
                  title: 'Health Score',
                  value: '78',
                  color: AppColors.primary,
                  isDark: isDark,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard({
    required String title,
    required String value,
    required Color color,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: color.withOpacity(0.3),
        ),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: AppTypography.headlineSmall(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            title,
            style: AppTypography.bodySmall(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildFilters(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Filters',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Row(
            children: [
              Expanded(
                child: _buildFilterDropdown(
                  value: _selectedTimeframe,
                  items: _timeframes,
                  onChanged: (value) =>
                      setState(() => _selectedTimeframe = value!),
                  isDark: isDark,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: _buildFilterDropdown(
                  value: _selectedCategory,
                  items: _categories,
                  onChanged: (value) =>
                      setState(() => _selectedCategory = value!),
                  isDark: isDark,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFilterDropdown({
    required String value,
    required List<String> items,
    required ValueChanged<String?> onChanged,
    required bool isDark,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          isExpanded: true,
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
          items: items.map((String item) {
            return DropdownMenuItem<String>(
              value: item,
              child: Text(
                item,
                style: AppTypography.bodyMedium(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            );
          }).toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }

  Widget _buildAdviceCards(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Financial Insights',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        ..._adviceCards
            .map((advice) => _buildAdviceCard(advice, isDark))
            .toList(),
      ],
    );
  }

  Widget _buildAdviceCard(Map<String, dynamic> advice, bool isDark) {
    Color cardColor;
    Color iconColor;

    switch (advice['type']) {
      case 'warning':
        cardColor = AppColors.warning.withOpacity(0.1);
        iconColor = AppColors.warning;
        break;
      case 'success':
        cardColor = AppColors.success.withOpacity(0.1);
        iconColor = AppColors.success;
        break;
      case 'reminder':
        cardColor = AppColors.info.withOpacity(0.1);
        iconColor = AppColors.info;
        break;
      default:
        cardColor = AppColors.primary.withOpacity(0.1);
        iconColor = AppColors.primary;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      child: CustomCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(AppSpacing.sm),
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
                  ),
                  child: Icon(
                    advice['icon'],
                    color: iconColor,
                    size: 24,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        advice['title'],
                        style: AppTypography.titleMedium(
                          color: isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight,
                        ),
                      ),
                      Text(
                        advice['subtitle'],
                        style: AppTypography.bodyMedium(
                          color: iconColor,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
                if (advice['priority'] == 'high')
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.error,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      'HIGH',
                      style: AppTypography.labelSmall(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              advice['description'],
              style: AppTypography.bodyMedium(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            Row(
              children: [
                Expanded(
                  child: CustomButton(
                    text: advice['action'],
                    onPressed: () => _handleAdviceAction(advice['action']),
                    variant: ButtonVariant.outline,
                    size: ButtonSize.small,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                IconButton(
                  icon: Icon(
                    Icons.more_vert,
                    color: isDark
                        ? AppColors.textSecondaryDark
                        : AppColors.textSecondaryLight,
                  ),
                  onPressed: () => _showAdviceOptions(advice),
                ),
              ],
            ),
          ],
        ),
      ),
    ).animate().fadeIn(
          duration: 600.ms,
          curve: Curves.easeOut,
        );
  }

  Widget _buildQuickActions(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Quick Actions',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Row(
            children: [
              Expanded(
                child: _buildQuickActionButton(
                  icon: Icons.analytics_outlined,
                  title: 'Generate Report',
                  onTap: () => _generateReport(),
                  isDark: isDark,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: _buildQuickActionButton(
                  icon: Icons.trending_up,
                  title: 'Spending Analysis',
                  onTap: () => _analyzeSpending(),
                  isDark: isDark,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Row(
            children: [
              Expanded(
                child: _buildQuickActionButton(
                  icon: Icons.savings_outlined,
                  title: 'Savings Plan',
                  onTap: () => _createSavingsPlan(),
                  isDark: isDark,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: _buildQuickActionButton(
                  icon: Icons.chat_outlined,
                  title: 'Ask AI',
                  onTap: () => _askAI(),
                  isDark: isDark,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionButton({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
          ),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              color: AppColors.primary,
              size: 24,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              title,
              style: AppTypography.labelMedium(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  void _refreshAdvice() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Refreshing financial insights...'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _handleAdviceAction(String action) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Action: $action'),
        backgroundColor: AppColors.primary,
      ),
    );
  }

  void _showAdviceOptions(Map<String, dynamic> advice) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              advice['title'],
              style: AppTypography.titleMedium(),
            ),
            const SizedBox(height: AppSpacing.lg),
            ListTile(
              leading: const Icon(Icons.bookmark_outline),
              title: const Text('Save for Later'),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Advice saved for later'),
                    backgroundColor: AppColors.success,
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.share_outlined),
              title: const Text('Share'),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Sharing advice...'),
                    backgroundColor: AppColors.info,
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.close),
              title: const Text('Dismiss'),
              onTap: () {
                Navigator.pop(context);
                setState(() {
                  _adviceCards.remove(advice);
                });
              },
            ),
          ],
        ),
      ),
    );
  }

  void _generateReport() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Generating financial report...'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _analyzeSpending() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Analyzing spending patterns...'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _createSavingsPlan() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Creating personalized savings plan...'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _askAI() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening AI chat...'),
        backgroundColor: AppColors.info,
      ),
    );
  }
}
