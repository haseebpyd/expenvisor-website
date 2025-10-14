import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';

class SubscriptionManagementScreen extends StatefulWidget {
  const SubscriptionManagementScreen({super.key});

  @override
  State<SubscriptionManagementScreen> createState() =>
      _SubscriptionManagementScreenState();
}

class _SubscriptionManagementScreenState
    extends State<SubscriptionManagementScreen> {
  String _selectedPlan = 'Free';

  // Mock subscription plans data
  final List<Map<String, dynamic>> _plans = [
    {
      'id': 'free',
      'name': 'Free',
      'price': 0,
      'period': 'forever',
      'features': [
        'Up to 50 transactions per month',
        'Basic expense tracking',
        'Simple charts and reports',
        'Email support',
        '1 month of history',
      ],
      'limitations': [
        'Limited AI features',
        'No voice input',
        'No receipt scanning',
        'Basic analytics only',
      ],
      'isPopular': false,
      'isCurrent': true,
    },
    {
      'id': 'standard',
      'name': 'Standard',
      'price': 4.99,
      'period': 'month',
      'features': [
        'Unlimited transactions',
        'Advanced expense tracking',
        'Voice input for expenses',
        'Receipt scanning (OCR)',
        'AI chat assistant',
        'Advanced charts and reports',
        '1 year of history',
        'Priority email support',
        'Export to CSV/PDF',
        'Budget alerts and notifications',
      ],
      'limitations': [],
      'isPopular': true,
      'isCurrent': false,
    },
    {
      'id': 'premium',
      'name': 'Premium',
      'price': 9.99,
      'period': 'month',
      'features': [
        'Everything in Standard',
        'AI Financial Advisor',
        'Advanced analytics and insights',
        'Unlimited history',
        'Multiple currency support',
        'Team/family sharing',
        'Custom categories and tags',
        'Advanced budgeting tools',
        'Investment tracking',
        'Tax preparation features',
        'Priority phone support',
        'Early access to new features',
      ],
      'limitations': [],
      'isPopular': false,
      'isCurrent': false,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Subscription Management',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        backgroundColor:
            isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        elevation: 0,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildCurrentPlanCard(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildPlansSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildBillingHistorySection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildManageSubscriptionSection(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildCurrentPlanCard(bool isDark) {
    final currentPlan = _plans.firstWhere((plan) => plan['isCurrent']);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.getPrimaryColor(isDark),
            AppColors.getPrimaryColor(isDark).withOpacity(0.8),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.star,
                color: Colors.white,
                size: 24,
              ),
              const SizedBox(width: AppSpacing.sm),
              Text(
                'Current Plan',
                style: AppTypography.labelLarge(
                  color: Colors.white.withOpacity(0.9),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            currentPlan['name'],
            style: AppTypography.headlineMedium(
              color: Colors.white,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            currentPlan['price'] == 0
                ? 'Free Forever'
                : '\$${currentPlan['price'].toStringAsFixed(2)}/${currentPlan['period']}',
            style: AppTypography.titleLarge(
              color: Colors.white.withOpacity(0.9),
            ),
          ),
          if (currentPlan['price'] > 0) ...[
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Next billing: January 15, 2024',
              style: AppTypography.bodyMedium(
                color: Colors.white.withOpacity(0.8),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildPlansSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Choose Your Plan',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Text(
          'Upgrade to unlock more features and get the most out of Expenvisor',
          style: AppTypography.bodyMedium(
            color: isDark
                ? AppColors.textSecondaryDark
                : AppColors.textSecondaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.lg),
        ..._plans.map((plan) => _buildPlanCard(plan, isDark)).toList(),
      ],
    );
  }

  Widget _buildPlanCard(Map<String, dynamic> plan, bool isDark) {
    final isCurrentPlan = plan['isCurrent'];
    final isSelected = _selectedPlan == plan['name'];

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isSelected
              ? AppColors.getPrimaryColor(isDark)
              : (isDark ? AppColors.borderDark : AppColors.borderLight),
          width: isSelected ? 2 : 1,
        ),
        boxShadow: isSelected
            ? [
                BoxShadow(
                  color: AppColors.getPrimaryColor(isDark).withOpacity(0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ]
            : null,
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              color: isSelected
                  ? AppColors.getPrimaryColor(isDark).withOpacity(0.1)
                  : Colors.transparent,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(AppSpacing.radiusRound),
                topRight: Radius.circular(AppSpacing.radiusRound),
              ),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                plan['name'],
                                style: AppTypography.titleLarge(
                                  color: isDark
                                      ? AppColors.textPrimaryDark
                                      : AppColors.textPrimaryLight,
                                ),
                              ),
                              if (plan['isPopular']) ...[
                                const SizedBox(width: AppSpacing.sm),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: AppSpacing.sm,
                                    vertical: 2,
                                  ),
                                  decoration: BoxDecoration(
                                    color: AppColors.getSecondaryColor(isDark),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    'POPULAR',
                                    style: AppTypography.labelSmall(
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ],
                              if (isCurrentPlan) ...[
                                const SizedBox(width: AppSpacing.sm),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: AppSpacing.sm,
                                    vertical: 2,
                                  ),
                                  decoration: BoxDecoration(
                                    color: AppColors.success,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    'CURRENT',
                                    style: AppTypography.labelSmall(
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ],
                            ],
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          Text(
                            plan['price'] == 0
                                ? 'Free Forever'
                                : '\$${plan['price'].toStringAsFixed(2)}/${plan['period']}',
                            style: AppTypography.headlineSmall(
                              color: AppColors.getPrimaryColor(isDark),
                            ),
                          ),
                        ],
                      ),
                    ),
                    if (!isCurrentPlan)
                      Radio<String>(
                        value: plan['name'],
                        groupValue: _selectedPlan,
                        onChanged: (value) =>
                            setState(() => _selectedPlan = value!),
                        activeColor: AppColors.getPrimaryColor(isDark),
                      ),
                  ],
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Features:',
                  style: AppTypography.labelLarge(
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                const SizedBox(height: AppSpacing.sm),
                ...plan['features']
                    .map<Widget>((feature) => _buildFeatureItem(
                          feature,
                          true,
                          isDark,
                        ))
                    .toList(),
                if (plan['limitations'].isNotEmpty) ...[
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'Limitations:',
                    style: AppTypography.labelLarge(
                      color: AppColors.warning,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  ...plan['limitations']
                      .map<Widget>((limitation) => _buildFeatureItem(
                            limitation,
                            false,
                            isDark,
                          ))
                      .toList(),
                ],
                const SizedBox(height: AppSpacing.lg),
                if (!isCurrentPlan)
                  SizedBox(
                    width: double.infinity,
                    child: CustomButton(
                      text: isSelected ? 'Select Plan' : 'Choose Plan',
                      onPressed: () => _selectPlan(plan),
                      variant: isSelected
                          ? ButtonVariant.primary
                          : ButtonVariant.outline,
                      size: ButtonSize.large,
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureItem(String feature, bool isPositive, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: Row(
        children: [
          Icon(
            isPositive ? Icons.check_circle : Icons.cancel,
            size: 16,
            color: isPositive ? AppColors.success : AppColors.warning,
          ),
          const SizedBox(width: AppSpacing.sm),
          Expanded(
            child: Text(
              feature,
              style: AppTypography.bodyMedium(
                color: isPositive
                    ? (isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight)
                    : AppColors.warning,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBillingHistorySection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Billing History',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Container(
          padding: const EdgeInsets.all(AppSpacing.lg),
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
            border: Border.all(
              color: isDark ? AppColors.borderDark : AppColors.borderLight,
            ),
          ),
          child: Column(
            children: [
              _buildBillingItem(
                  'Standard Plan', 'Dec 15, 2023', '\$4.99', 'Paid', isDark),
              const Divider(),
              _buildBillingItem(
                  'Standard Plan', 'Nov 15, 2023', '\$4.99', 'Paid', isDark),
              const Divider(),
              _buildBillingItem(
                  'Standard Plan', 'Oct 15, 2023', '\$4.99', 'Paid', isDark),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        TextButton(
          onPressed: () => _viewAllBillingHistory(),
          child: Text(
            'View All Billing History',
            style: AppTypography.labelMedium(
              color: AppColors.getPrimaryColor(isDark),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBillingItem(
      String plan, String date, String amount, String status, bool isDark) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  plan,
                  style: AppTypography.labelLarge(
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                Text(
                  date,
                  style: AppTypography.bodySmall(
                    color: isDark
                        ? AppColors.textSecondaryDark
                        : AppColors.textSecondaryLight,
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                amount,
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.sm,
                  vertical: 2,
                ),
                decoration: BoxDecoration(
                  color: AppColors.success.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  status,
                  style: AppTypography.labelSmall(
                    color: AppColors.success,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildManageSubscriptionSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Manage Subscription',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        _buildManagementOption(
          icon: Icons.pause,
          title: 'Pause Subscription',
          subtitle: 'Temporarily pause your subscription',
          onTap: () => _pauseSubscription(isDark),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildManagementOption(
          icon: Icons.cancel,
          title: 'Cancel Subscription',
          subtitle: 'Cancel your subscription and switch to Free plan',
          onTap: () => _cancelSubscription(isDark),
          isDark: isDark,
          isDanger: true,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildManagementOption(
          icon: Icons.help_outline,
          title: 'Get Help',
          subtitle: 'Contact support for subscription issues',
          onTap: () => _contactSupport(isDark),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildManagementOption({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required bool isDark,
    bool isDanger = false,
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
        child: Row(
          children: [
            Icon(
              icon,
              color: isDanger
                  ? AppColors.error
                  : (isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTypography.labelLarge(
                      color: isDanger
                          ? AppColors.error
                          : (isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight),
                    ),
                  ),
                  Text(
                    subtitle,
                    style: AppTypography.bodySmall(
                      color: isDark
                          ? AppColors.textSecondaryDark
                          : AppColors.textSecondaryLight,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
          ],
        ),
      ),
    );
  }

  void _selectPlan(Map<String, dynamic> plan) {
    setState(() => _selectedPlan = plan['name']);
    // TODO: Implement plan selection logic
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${plan['name']} plan selected!'),
        backgroundColor: AppColors.success,
      ),
    );
  }

  void _viewAllBillingHistory() {
    // TODO: Implement billing history view
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Billing history view coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _pauseSubscription(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Pause Subscription'),
        content: const Text(
          'Your subscription will be paused and you\'ll switch to the Free plan. You can resume anytime.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Pause',
            onPressed: () {
              // TODO: Implement pause functionality
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Subscription paused successfully!'),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            variant: ButtonVariant.primary,
          ),
        ],
      ),
    );
  }

  void _cancelSubscription(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Subscription'),
        content: const Text(
          'Are you sure you want to cancel your subscription? You\'ll lose access to premium features and switch to the Free plan.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Keep Subscription'),
          ),
          CustomButton(
            text: 'Cancel Subscription',
            onPressed: () {
              // TODO: Implement cancellation functionality
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Subscription cancelled successfully!'),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            variant: ButtonVariant.outline,
            customColor: AppColors.error,
          ),
        ],
      ),
    );
  }

  void _contactSupport(bool isDark) {
    // TODO: Implement support contact
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Support contact coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }
}
