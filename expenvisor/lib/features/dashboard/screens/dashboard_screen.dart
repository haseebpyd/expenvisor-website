import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/add_transaction_fab.dart';
import '../../../shared/widgets/feature_card.dart';
import '../../../shared/widgets/glass_container.dart';
import '../../expense/screens/add_expense_screen.dart';
import '../../income/screens/add_income_screen.dart';
import '../../history/screens/history_screen.dart';
import '../../analytics/screens/analytics_screen.dart';
import '../../ai_chat/screens/ai_chat_screen.dart';
import '../../settings/screens/settings_screen.dart';
import '../../notifications/screens/notifications_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Expenvisor',
          style: AppTypography.appTitle(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const NotificationsScreen(),
                ),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const SettingsScreen(),
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome section
            _buildWelcomeSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Quick stats
            _buildQuickStats(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Budget progress
            _buildBudgetProgress(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Recent transactions
            _buildRecentTransactions(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Quick actions
            _buildQuickActions(isDark),
          ],
        ),
      ),
      floatingActionButton: const AddTransactionFAB(),
    );
  }

  Widget _buildWelcomeSection(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        gradient: AppColors.heroGradient,
        borderRadius: BorderRadius.circular(AppSpacing.radiusLarge),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Welcome back!',
            style: AppTypography.headlineMedium(
              color: Colors.white,
            ),
          ).animate().fadeIn(duration: 600.ms),
          const SizedBox(height: AppSpacing.sm),
          Text(
            'Track your expenses and achieve your financial goals',
            style: AppTypography.bodyLarge(
              color: Colors.white.withOpacity(0.9),
            ),
          ).animate().fadeIn(duration: 600.ms, delay: 200.ms),
          const SizedBox(height: AppSpacing.lg),
          Row(
            children: [
              Expanded(
                child: CustomButton(
                  text: 'Add Expense',
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const AddExpenseScreen(),
                      ),
                    );
                  },
                  variant: ButtonVariant.outline,
                  customColor: Colors.white,
                  size: ButtonSize.medium,
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: CustomButton(
                  text: 'Add Income',
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const AddIncomeScreen(),
                      ),
                    );
                  },
                  variant: ButtonVariant.outline,
                  customColor: Colors.white,
                  size: ButtonSize.medium,
                ),
              ),
            ],
          ).animate().fadeIn(duration: 600.ms, delay: 400.ms),
        ],
      ),
    );
  }

  Widget _buildQuickStats(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'This Month',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: StatsCard(
                title: 'Total Income',
                value: '\$4,250',
                subtitle: '+12% from last month',
                icon: Icons.trending_up,
                iconColor: AppColors.income,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: StatsCard(
                title: 'Total Expenses',
                value: '\$2,890',
                subtitle: '-8% from last month',
                icon: Icons.trending_down,
                iconColor: AppColors.expense,
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: StatsCard(
                title: 'Savings',
                value: '\$1,360',
                subtitle: '32% of income',
                icon: Icons.savings,
                iconColor: AppColors.success,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: StatsCard(
                title: 'Transactions',
                value: '47',
                subtitle: 'This month',
                icon: Icons.receipt_long,
                iconColor: AppColors.info,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBudgetProgress(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Budget Progress',
              style: AppTypography.titleLarge(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
            TextButton(
              onPressed: () {
                // Navigate to Analytics screen
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => const AnalyticsScreen(),
                  ),
                );
              },
              child: Text('View All'),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        BudgetProgressCard(
          title: 'Monthly Budget',
          spent: 2890,
          budget: 3500,
          period: 'December 2024',
        ),
      ],
    );
  }

  Widget _buildRecentTransactions(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Recent Transactions',
              style: AppTypography.titleLarge(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
            TextButton(
              onPressed: () {
                // Navigate to History screen
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => const HistoryScreen(),
                  ),
                );
              },
              child: Text('View All'),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        ...List.generate(3, (index) {
          final transactions = [
            {
              'title': 'Grocery Shopping',
              'amount': '-\$85.50',
              'category': 'Food & Dining',
              'date': 'Today',
              'icon': Icons.shopping_cart,
              'isIncome': false,
            },
            {
              'title': 'Freelance Payment',
              'amount': '+\$500.00',
              'category': 'Work',
              'date': 'Yesterday',
              'icon': Icons.work,
              'isIncome': true,
            },
            {
              'title': 'Coffee',
              'amount': '-\$4.50',
              'category': 'Food & Dining',
              'date': '2 days ago',
              'icon': Icons.local_cafe,
              'isIncome': false,
            },
          ];

          final transaction = transactions[index];

          return ExpenseCard(
            title: transaction['title'] as String,
            amount: transaction['amount'] as String,
            category: transaction['category'] as String,
            date: transaction['date'] as String,
            categoryIcon: transaction['icon'] as IconData,
            isIncome: transaction['isIncome'] as bool,
            onEdit: () {},
            onDelete: () {},
          );
        }),
      ],
    );
  }

  Widget _buildQuickActions(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Actions',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: CustomCard(
                onTap: () {
                  _showVoiceInputModal(context);
                },
                child: Column(
                  children: [
                    Icon(
                      Icons.mic_outlined,
                      size: 32,
                      color: AppColors.primary,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Voice Input',
                      style: AppTypography.labelMedium(),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: CustomCard(
                onTap: () {
                  _showScanReceiptModal(context);
                },
                child: Column(
                  children: [
                    Icon(
                      Icons.camera_alt_outlined,
                      size: 32,
                      color: AppColors.secondary,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Scan Receipt',
                      style: AppTypography.labelMedium(),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: CustomCard(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const AiChatScreen(),
                    ),
                  );
                },
                child: Column(
                  children: [
                    Icon(
                      Icons.psychology_outlined,
                      size: 32,
                      color: AppColors.getAiFeaturesColor(isDark),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'AI Chat',
                      style: AppTypography.labelMedium(),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  void _showVoiceInputModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.6,
        decoration: BoxDecoration(
          color: Theme.of(context).scaffoldBackgroundColor,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(AppSpacing.radiusLarge),
            topRight: Radius.circular(AppSpacing.radiusLarge),
          ),
        ),
        child: Column(
          children: [
            // Handle bar
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: AppSpacing.md),
              decoration: BoxDecoration(
                color: AppColors.borderLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),

            // Header
            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                children: [
                  Icon(
                    Icons.mic_outlined,
                    size: 60,
                    color: AppColors.primary,
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'Voice Input',
                    style: AppTypography.titleLarge(),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Speak your expense details and I\'ll help you add them quickly.',
                    style: AppTypography.bodyLarge(
                      color: AppColors.textSecondaryLight,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),

            // Voice recording area
            Expanded(
              child: Container(
                margin: const EdgeInsets.all(AppSpacing.lg),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppSpacing.radiusLarge),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.mic,
                        size: 50,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Text(
                      'Tap to start recording',
                      style: AppTypography.titleMedium(),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Example: "Spent \$25 on lunch at McDonald\'s"',
                      style: AppTypography.bodyMedium(
                        color: AppColors.textSecondaryLight,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),

            // Action buttons
            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                children: [
                  Expanded(
                    child: CustomButton(
                      text: 'Cancel',
                      onPressed: () => Navigator.pop(context),
                      variant: ButtonVariant.outline,
                      size: ButtonSize.large,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: CustomButton(
                      text: 'Start Recording',
                      onPressed: () {
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Voice input feature coming soon!'),
                            backgroundColor: AppColors.primary,
                          ),
                        );
                      },
                      variant: ButtonVariant.gradient,
                      size: ButtonSize.large,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showScanReceiptModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.6,
        decoration: BoxDecoration(
          color: Theme.of(context).scaffoldBackgroundColor,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(AppSpacing.radiusLarge),
            topRight: Radius.circular(AppSpacing.radiusLarge),
          ),
        ),
        child: Column(
          children: [
            // Handle bar
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: AppSpacing.md),
              decoration: BoxDecoration(
                color: AppColors.borderLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),

            // Header
            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                children: [
                  Icon(
                    Icons.camera_alt_outlined,
                    size: 60,
                    color: AppColors.secondary,
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'Scan Receipt',
                    style: AppTypography.titleLarge(),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Take a photo of your receipt and I\'ll extract the expense details automatically.',
                    style: AppTypography.bodyLarge(
                      color: AppColors.textSecondaryLight,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),

            // Camera area
            Expanded(
              child: Container(
                margin: const EdgeInsets.all(AppSpacing.lg),
                decoration: BoxDecoration(
                  color: AppColors.secondary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppSpacing.radiusLarge),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        color: AppColors.secondary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.camera_alt,
                        size: 50,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Text(
                      'Tap to open camera',
                      style: AppTypography.titleMedium(),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Make sure the receipt is well-lit and clearly visible',
                      style: AppTypography.bodyMedium(
                        color: AppColors.textSecondaryLight,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ),

            // Action buttons
            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                children: [
                  Expanded(
                    child: CustomButton(
                      text: 'Cancel',
                      onPressed: () => Navigator.pop(context),
                      variant: ButtonVariant.outline,
                      size: ButtonSize.large,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: CustomButton(
                      text: 'Open Camera',
                      onPressed: () {
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content:
                                Text('Receipt scanning feature coming soon!'),
                            backgroundColor: AppColors.secondary,
                          ),
                        );
                      },
                      variant: ButtonVariant.gradient,
                      size: ButtonSize.large,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
