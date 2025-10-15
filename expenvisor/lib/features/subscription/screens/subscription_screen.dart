import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../core/services/usage_tracker.dart';
import '../../../shared/widgets/custom_button.dart';
import 'widgets/plan_card.dart';
import 'widgets/feature_comparison.dart';

class SubscriptionScreen extends StatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  State<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends State<SubscriptionScreen> {
  final UsageTracker _usageTracker = UsageTracker();
  String _selectedPlan = 'free';
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _selectedPlan = _usageTracker.subscriptionTier;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Subscription'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Current Plan Status
            _buildCurrentPlanCard(isDark),
            
            const SizedBox(height: AppSpacing.xl),
            
            // Plan Selection
            Text(
              'Choose Your Plan',
              style: AppTypography.titleLarge(
                color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
              ),
            ),
            
            const SizedBox(height: AppSpacing.lg),
            
            // Free Plan
            PlanCard(
              title: 'Free',
              price: '\$0',
              period: 'forever',
              features: const [
                'Unlimited manual transactions',
                'Basic charts & analytics',
                '50 AI chat messages/month',
                '30 voice inputs/month',
                '5 receipt scans/month',
                'Local data storage',
              ],
              isSelected: _selectedPlan == 'free',
              isPopular: false,
              onTap: () => setState(() => _selectedPlan = 'free'),
            ),
            
            const SizedBox(height: AppSpacing.md),
            
            // Premium Plan
            PlanCard(
              title: 'Premium',
              price: '\$4.99',
              period: 'per month',
              features: const [
                'Everything in Free',
                'Unlimited AI chat',
                'Unlimited voice input',
                'Unlimited receipt scanning',
                'Advanced AI insights',
                'Cloud sync & backup',
                'Export data (CSV, PDF)',
                'Priority support',
                'Custom categories',
                'Multi-account support',
              ],
              isSelected: _selectedPlan == 'premium',
              isPopular: true,
              onTap: () => setState(() => _selectedPlan = 'premium'),
            ),
            
            const SizedBox(height: AppSpacing.xl),
            
            // Feature Comparison
            const FeatureComparison(),
            
            const SizedBox(height: AppSpacing.xl),
            
            // Subscribe Button
            SizedBox(
              width: double.infinity,
              child: CustomButton(
                text: _selectedPlan == 'free' ? 'Continue with Free' : 'Subscribe to Premium',
                onPressed: _handleSubscription,
                variant: ButtonVariant.gradient,
                size: ButtonSize.large,
                isLoading: _isLoading,
              ),
            ),
            
            const SizedBox(height: AppSpacing.lg),
            
            // Terms and Privacy
            Center(
              child: Text(
                'By subscribing, you agree to our Terms of Service and Privacy Policy',
                style: AppTypography.captionSmall(
                  color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCurrentPlanCard(bool isDark) {
    final currentPlan = _usageTracker.subscriptionTier;
    final isPremium = _usageTracker.isPremium;
    
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        border: Border.all(
          color: isPremium ? AppColors.accent : AppColors.primary,
          width: 2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                isPremium ? Icons.star : Icons.person,
                color: isPremium ? AppColors.accent : AppColors.primary,
                size: 24,
              ),
              const SizedBox(width: AppSpacing.sm),
              Text(
                'Current Plan: ${currentPlan.toUpperCase()}',
                style: AppTypography.titleMedium(
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
            ],
          ),
          
          const SizedBox(height: AppSpacing.sm),
          
          if (isPremium) ...[
            Text(
              'You have access to all premium features!',
              style: AppTypography.bodyMedium(
                color: AppColors.accent,
              ),
            ),
          ] else ...[
            Text(
              'Upgrade to unlock unlimited features',
              style: AppTypography.bodyMedium(
                color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
              ),
            ),
          ],
          
          const SizedBox(height: AppSpacing.md),
          
          // Usage Summary
          _buildUsageSummary(isDark),
        ],
      ),
    );
  }

  Widget _buildUsageSummary(bool isDark) {
    final stats = _usageTracker.getUsageStats();
    
    return Column(
      children: [
        _buildUsageItem('AI Chat', stats['aiChat'], isDark),
        const SizedBox(height: AppSpacing.sm),
        _buildUsageItem('Voice Input', stats['voiceInput'], isDark),
        const SizedBox(height: AppSpacing.sm),
        _buildUsageItem('Receipt Scan', stats['ocrScan'], isDark),
      ],
    );
  }

  Widget _buildUsageItem(String label, Map<String, dynamic>? stats, bool isDark) {
    if (stats == null) return const SizedBox.shrink();
    
    final isUnlimited = stats['isUnlimited'] == true;
    final isExceeded = stats['isExceeded'] == true;
    
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: AppTypography.bodyMedium(
            color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          ),
        ),
        Text(
          isUnlimited ? 'Unlimited' : '${stats['currentUsage']}/${stats['monthlyLimit']}',
          style: AppTypography.bodyMedium(
            color: isExceeded ? Colors.red : AppColors.accent,
          ),
        ),
      ],
    );
  }

  Future<void> _handleSubscription() async {
    if (_selectedPlan == _usageTracker.subscriptionTier) {
      Navigator.pop(context);
      return;
    }
    
    setState(() => _isLoading = true);
    
    try {
      // TODO: Implement actual subscription logic with RevenueCat
      await _usageTracker.updateSubscriptionTier(_selectedPlan);
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              _selectedPlan == 'premium' 
                ? 'Welcome to Premium! 🎉' 
                : 'Switched to Free plan',
            ),
            backgroundColor: AppColors.accent,
          ),
        );
        
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }
}