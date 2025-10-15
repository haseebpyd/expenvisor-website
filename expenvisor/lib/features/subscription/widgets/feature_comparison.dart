import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';

class FeatureComparison extends StatelessWidget {
  const FeatureComparison({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Feature Comparison',
          style: AppTypography.titleLarge(
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        
        const SizedBox(height: AppSpacing.lg),
        
        Container(
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
            borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
            border: Border.all(
              color: isDark ? AppColors.borderDark : AppColors.borderLight,
            ),
          ),
          child: Column(
            children: [
              // Header
              Container(
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(AppSpacing.radiusMedium),
                    topRight: Radius.circular(AppSpacing.radiusMedium),
                  ),
                ),
                child: Row(
                  children: [
                    Expanded(
                      flex: 2,
                      child: Text(
                        'Features',
                        style: AppTypography.labelMedium(
                          color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(
                        'Free',
                        style: AppTypography.labelMedium(
                          color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    Expanded(
                      child: Text(
                        'Premium',
                        style: AppTypography.labelMedium(
                          color: AppColors.accent,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ),
              ),
              
              // Features
              ..._buildFeatureRows(isDark),
            ],
          ),
        ),
      ],
    );
  }

  List<Widget> _buildFeatureRows(bool isDark) {
    final features = [
      ('Manual Transactions', 'Unlimited', 'Unlimited'),
      ('Basic Charts', '✓', '✓'),
      ('AI Chat Messages', '50/month', 'Unlimited'),
      ('Voice Input', '30/month', 'Unlimited'),
      ('Receipt Scanning', '5/month', 'Unlimited'),
      ('Cloud Sync', '✗', '✓'),
      ('Export Data', '✗', '✓'),
      ('Advanced Insights', '✗', '✓'),
      ('Priority Support', '✗', '✓'),
      ('Custom Categories', '✗', '✓'),
    ];

    return features.asMap().entries.map((entry) {
      final index = entry.key;
      final feature = entry.value;
      final isLast = index == features.length - 1;

      return Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          border: isLast ? null : Border(
            bottom: BorderSide(
              color: isDark ? AppColors.borderDark : AppColors.borderLight,
              width: 1,
            ),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              flex: 2,
              child: Text(
                feature.$1,
                style: AppTypography.bodyMedium(
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
            ),
            Expanded(
              child: Text(
                feature.$2,
                style: AppTypography.bodyMedium(
                  color: feature.$2 == '✓' 
                    ? AppColors.primary
                    : (feature.$2 == '✗' 
                        ? Colors.red 
                        : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight)),
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Expanded(
              child: Text(
                feature.$3,
                style: AppTypography.bodyMedium(
                  color: feature.$3 == '✓' 
                    ? AppColors.accent
                    : (feature.$3 == '✗' 
                        ? Colors.red 
                        : AppColors.accent),
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      );
    }).toList();
  }
}