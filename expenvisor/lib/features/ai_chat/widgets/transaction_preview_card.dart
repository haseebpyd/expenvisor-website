import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../ai_agent/models/parsed_transaction.dart';

class TransactionPreviewCard extends StatelessWidget {
  final ParsedTransaction tx;
  final VoidCallback onConfirm;
  final VoidCallback onCancel;
  final VoidCallback? onEdit;

  const TransactionPreviewCard({
    super.key,
    required this.tx,
    required this.onConfirm,
    required this.onCancel,
    this.onEdit,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.surfaceElevatedDark
            : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        border: Border.all(
            color: isDark ? AppColors.borderDark : AppColors.borderLight),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Confirm this ${tx.isIncome ? 'income' : 'expense'}?',
              style: AppTypography.titleSmall(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              )),
          const SizedBox(height: AppSpacing.sm),
          Row(
            children: [
              Icon(tx.isIncome ? Icons.south_west : Icons.north_east,
                  color: tx.isIncome ? Colors.teal : AppColors.primary),
              const SizedBox(width: AppSpacing.sm),
              Text(
                (tx.isIncome ? '+' : '-') + tx.amount.toStringAsFixed(2),
                style: AppTypography.titleLarge(
                  color: tx.isIncome ? Colors.teal : AppColors.primary,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          Text('Merchant: ${tx.merchant}',
              style: AppTypography.bodyMedium(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              )),
          Text('Category: ${tx.category}',
              style: AppTypography.bodyMedium(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              )),
          Text('Date: ${tx.date}',
              style: AppTypography.bodySmall(
                color: isDark
                    ? AppColors.textTertiaryDark
                    : AppColors.textTertiaryLight,
              )),
          const SizedBox(height: AppSpacing.md),
          Row(
            children: [
              TextButton(onPressed: onCancel, child: const Text('Cancel')),
              const SizedBox(width: AppSpacing.sm),
              if (onEdit != null)
                OutlinedButton(onPressed: onEdit, child: const Text('Edit')),
              const Spacer(),
              ElevatedButton(
                  onPressed: onConfirm, child: const Text('Confirm')),
            ],
          ),
        ],
      ),
    );
  }
}
