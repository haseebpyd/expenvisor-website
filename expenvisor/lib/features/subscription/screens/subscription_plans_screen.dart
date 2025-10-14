import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_card.dart';

class SubscriptionPlansScreen extends StatefulWidget {
  const SubscriptionPlansScreen({super.key});

  @override
  State<SubscriptionPlansScreen> createState() =>
      _SubscriptionPlansScreenState();
}

class _SubscriptionPlansScreenState extends State<SubscriptionPlansScreen> {
  String _selectedPlan = 'standard';
  bool _isYearly = false;

  final List<Map<String, dynamic>> _plans = [
    {
      'id': 'free',
      'name': 'Free',
      'price': 0,
      'yearlyPrice': 0,
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
      'yearlyPrice': 49.99,
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
      'yearlyPrice': 99.99,
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
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Choose Your Plan',
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          children: [
            _buildHeader(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildBillingToggle(isDark),
            const SizedBox(height: AppSpacing.lg),
            _buildPlansGrid(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildFeaturesComparison(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildFAQ(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildActionButtons(isDark),
            const SizedBox(height: AppSpacing.lg),
            _buildFooter(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(bool isDark) {
    return Column(
      children: [
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            gradient: AppColors.heroGradient,
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: AppColors.primary.withOpacity(0.3),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: const Icon(
            Icons.star,
            size: 50,
            color: Colors.white,
          ),
        ).animate().scale(
              duration: 600.ms,
              curve: Curves.elasticOut,
            ),
        const SizedBox(height: AppSpacing.lg),
        Text(
          'Unlock Your Financial Potential',
          style: AppTypography.headlineMedium(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
          textAlign: TextAlign.center,
        ).animate().fadeIn(
              duration: 800.ms,
              delay: 200.ms,
            ),
        const SizedBox(height: AppSpacing.md),
        Text(
          'Choose the perfect plan for your financial journey. Upgrade or downgrade anytime.',
          style: AppTypography.bodyLarge(
            color: isDark
                ? AppColors.textSecondaryDark
                : AppColors.textSecondaryLight,
          ),
          textAlign: TextAlign.center,
        ).animate().fadeIn(
              duration: 800.ms,
              delay: 400.ms,
            ),
      ],
    );
  }

  Widget _buildBillingToggle(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.sm),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'Monthly',
            style: AppTypography.labelMedium(
              color: !_isYearly
                  ? (isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight)
                  : (isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight),
            ),
          ),
          Switch(
            value: _isYearly,
            onChanged: (value) => setState(() => _isYearly = value),
            activeColor: AppColors.primary,
          ),
          Text(
            'Yearly',
            style: AppTypography.labelMedium(
              color: _isYearly
                  ? (isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight)
                  : (isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight),
            ),
          ),
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
              'Save 17%',
              style: AppTypography.labelSmall(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    ).animate().fadeIn(
          duration: 800.ms,
          delay: 600.ms,
        );
  }

  Widget _buildPlansGrid(bool isDark) {
    return Column(
      children: [
        ..._plans.map((plan) => _buildPlanCard(plan, isDark)).toList(),
      ],
    );
  }

  Widget _buildPlanCard(Map<String, dynamic> plan, bool isDark) {
    final isSelected = _selectedPlan == plan['id'];
    final price = _isYearly ? plan['yearlyPrice'] : plan['price'];
    final period = _isYearly ? 'year' : plan['period'];

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isSelected
              ? AppColors.primary
              : (isDark ? AppColors.borderDark : AppColors.borderLight),
          width: isSelected ? 2 : 1,
        ),
        boxShadow: isSelected
            ? [
                BoxShadow(
                  color: AppColors.primary.withOpacity(0.2),
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
                  ? AppColors.primary.withOpacity(0.1)
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
                                    color: AppColors.secondary,
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
                              if (plan['isCurrent']) ...[
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
                            price == 0
                                ? 'Free Forever'
                                : '\$${price.toStringAsFixed(2)}/$period',
                            style: AppTypography.headlineSmall(
                              color: AppColors.primary,
                            ),
                          ),
                          if (_isYearly && price > 0) ...[
                            const SizedBox(height: AppSpacing.xs),
                            Text(
                              'Billed annually (\$${(price / 12).toStringAsFixed(2)}/month)',
                              style: AppTypography.bodySmall(
                                color: isDark
                                    ? AppColors.textSecondaryDark
                                    : AppColors.textSecondaryLight,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    if (!plan['isCurrent'])
                      Radio<String>(
                        value: plan['id'],
                        groupValue: _selectedPlan,
                        onChanged: (value) =>
                            setState(() => _selectedPlan = value!),
                        activeColor: AppColors.primary,
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
                if (!plan['isCurrent'])
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

  Widget _buildFeaturesComparison(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Feature Comparison',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildComparisonTable(isDark),
        ],
      ),
    );
  }

  Widget _buildComparisonTable(bool isDark) {
    final features = [
      {
        'name': 'Monthly Transactions',
        'free': '50',
        'standard': 'Unlimited',
        'premium': 'Unlimited'
      },
      {'name': 'Voice Input', 'free': '❌', 'standard': '✅', 'premium': '✅'},
      {
        'name': 'Receipt Scanning',
        'free': '❌',
        'standard': '✅',
        'premium': '✅'
      },
      {
        'name': 'AI Chat Assistant',
        'free': '❌',
        'standard': '✅',
        'premium': '✅'
      },
      {
        'name': 'AI Financial Advisor',
        'free': '❌',
        'standard': '❌',
        'premium': '✅'
      },
      {
        'name': 'Advanced Analytics',
        'free': '❌',
        'standard': 'Basic',
        'premium': 'Advanced'
      },
      {
        'name': 'Data History',
        'free': '1 month',
        'standard': '1 year',
        'premium': 'Unlimited'
      },
      {'name': 'Export Data', 'free': '❌', 'standard': '✅', 'premium': '✅'},
      {
        'name': 'Priority Support',
        'free': '❌',
        'standard': 'Email',
        'premium': 'Phone + Email'
      },
    ];

    return Column(
      children: [
        // Header
        Row(
          children: [
            Expanded(
              flex: 2,
              child: Text(
                'Features',
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            ),
            Expanded(
              child: Text(
                'Free',
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Expanded(
              child: Text(
                'Standard',
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Expanded(
              child: Text(
                'Premium',
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
        const Divider(),
        // Rows
        ...features
            .map((feature) => Padding(
                  padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
                  child: Row(
                    children: [
                      Expanded(
                        flex: 2,
                        child: Text(
                          feature['name']!,
                          style: AppTypography.bodyMedium(
                            color: isDark
                                ? AppColors.textPrimaryDark
                                : AppColors.textPrimaryLight,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          feature['free']!,
                          style: AppTypography.bodyMedium(
                            color: isDark
                                ? AppColors.textSecondaryDark
                                : AppColors.textSecondaryLight,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Expanded(
                        child: Text(
                          feature['standard']!,
                          style: AppTypography.bodyMedium(
                            color: isDark
                                ? AppColors.textSecondaryDark
                                : AppColors.textSecondaryLight,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Expanded(
                        child: Text(
                          feature['premium']!,
                          style: AppTypography.bodyMedium(
                            color: isDark
                                ? AppColors.textSecondaryDark
                                : AppColors.textSecondaryLight,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ))
            .toList(),
      ],
    );
  }

  Widget _buildFAQ(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Frequently Asked Questions',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildFAQItem(
            question: 'Can I change my plan anytime?',
            answer:
                'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
            isDark: isDark,
          ),
          _buildFAQItem(
            question: 'Is there a free trial?',
            answer:
                'Yes! All paid plans come with a 7-day free trial. No credit card required.',
            isDark: isDark,
          ),
          _buildFAQItem(
            question: 'What happens to my data if I cancel?',
            answer:
                'Your data is always yours. You can export it anytime, even after cancellation.',
            isDark: isDark,
          ),
          _buildFAQItem(
            question: 'Do you offer refunds?',
            answer:
                'Yes! We offer a 30-day money-back guarantee for all paid plans.',
            isDark: isDark,
          ),
        ],
      ),
    );
  }

  Widget _buildFAQItem({
    required String question,
    required String answer,
    required bool isDark,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            question,
            style: AppTypography.labelLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            answer,
            style: AppTypography.bodyMedium(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons(bool isDark) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: CustomButton(
            text: 'Start Free Trial',
            onPressed: () => _startFreeTrial(),
            variant: ButtonVariant.primary,
            size: ButtonSize.large,
            icon: Icons.star,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        SizedBox(
          width: double.infinity,
          child: CustomButton(
            text: 'Contact Sales',
            onPressed: () => _contactSales(),
            variant: ButtonVariant.outline,
            size: ButtonSize.large,
            icon: Icons.phone,
          ),
        ),
      ],
    );
  }

  Widget _buildFooter(bool isDark) {
    return Column(
      children: [
        Text(
          'Cancel anytime. No commitment. 30-day money-back guarantee.',
          style: AppTypography.bodySmall(
            color: isDark
                ? AppColors.textSecondaryDark
                : AppColors.textSecondaryLight,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: AppSpacing.sm),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextButton(
              onPressed: () => _showTerms(),
              child: Text(
                'Terms of Service',
                style: AppTypography.bodySmall(
                  color: AppColors.primary,
                ),
              ),
            ),
            Text(
              ' • ',
              style: AppTypography.bodySmall(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
            ),
            TextButton(
              onPressed: () => _showPrivacy(),
              child: Text(
                'Privacy Policy',
                style: AppTypography.bodySmall(
                  color: AppColors.primary,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  void _selectPlan(Map<String, dynamic> plan) {
    setState(() => _selectedPlan = plan['id']);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${plan['name']} plan selected!'),
        backgroundColor: AppColors.success,
      ),
    );
  }

  void _startFreeTrial() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Starting 7-day free trial...'),
        backgroundColor: AppColors.success,
      ),
    );
    Navigator.of(context).pop();
  }

  void _contactSales() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening contact form...'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _showTerms() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening Terms of Service...'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _showPrivacy() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening Privacy Policy...'),
        backgroundColor: AppColors.info,
      ),
    );
  }
}
