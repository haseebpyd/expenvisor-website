import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_spacing.dart';

/// Custom card widget with Midnight Aurora styling
///
/// Supports different variants and interactive states
class CustomCard extends StatelessWidget {
  final Widget child;
  final CardVariant variant;
  final VoidCallback? onTap;
  final EdgeInsets? padding;
  final EdgeInsets? margin;
  final Color? backgroundColor;
  final double? elevation;
  final BorderRadius? borderRadius;
  final bool isLoading;
  final Widget? loadingWidget;

  const CustomCard({
    super.key,
    required this.child,
    this.variant = CardVariant.elevated,
    this.onTap,
    this.padding,
    this.margin,
    this.backgroundColor,
    this.elevation,
    this.borderRadius,
    this.isLoading = false,
    this.loadingWidget,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: margin ?? const EdgeInsets.all(AppSpacing.sm),
      child: Material(
        color: _getBackgroundColor(isDark),
        elevation: _getElevation(),
        shadowColor: _getShadowColor(isDark),
        borderRadius:
            borderRadius ?? BorderRadius.circular(AppSpacing.cardRadius),
        child: InkWell(
          onTap: onTap,
          borderRadius:
              borderRadius ?? BorderRadius.circular(AppSpacing.cardRadius),
          child: Container(
            padding: padding ?? const EdgeInsets.all(AppSpacing.cardPadding),
            child: isLoading ? _buildLoadingWidget() : child,
          ),
        ),
      ),
    );
  }

  Widget _buildLoadingWidget() {
    if (loadingWidget != null) {
      return loadingWidget!;
    }

    return const Center(
      child: CircularProgressIndicator(
        strokeWidth: 2,
        valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
      ),
    );
  }

  Color _getBackgroundColor(bool isDark) {
    if (backgroundColor != null) return backgroundColor!;

    switch (variant) {
      case CardVariant.elevated:
        return isDark ? AppColors.surfaceDark : AppColors.surfaceLight;
      case CardVariant.outlined:
        return isDark ? AppColors.surfaceDark : AppColors.surfaceLight;
      case CardVariant.filled:
        return isDark
            ? AppColors.surfaceElevatedDark
            : AppColors.surfaceElevatedLight;
      case CardVariant.glass:
        return (isDark ? AppColors.surfaceDark : AppColors.surfaceLight)
            .withOpacity(0.8);
    }
  }

  double _getElevation() {
    if (elevation != null) return elevation!;

    switch (variant) {
      case CardVariant.elevated:
        return AppSpacing.cardElevation;
      case CardVariant.outlined:
        return 0;
      case CardVariant.filled:
        return 0;
      case CardVariant.glass:
        return 1;
    }
  }

  Color _getShadowColor(bool isDark) {
    return isDark ? Colors.black87 : Colors.black26;
  }
}

/// Card variants
enum CardVariant {
  elevated, // Standard elevated card
  outlined, // Card with border only
  filled, // Card with background color
  glass, // Semi-transparent card
}

/// Specialized expense card
class ExpenseCard extends StatelessWidget {
  final String title;
  final String amount;
  final String category;
  final String date;
  final IconData categoryIcon;
  final VoidCallback? onTap;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;
  final bool isIncome;
  final bool isLoading;

  const ExpenseCard({
    super.key,
    required this.title,
    required this.amount,
    required this.category,
    required this.date,
    required this.categoryIcon,
    this.onTap,
    this.onEdit,
    this.onDelete,
    this.isIncome = false,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    return CustomCard(
      onTap: onTap,
      isLoading: isLoading,
      child: Row(
        children: [
          // Category icon
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: (isIncome ? AppColors.income : AppColors.expense)
                  .withOpacity(0.1),
              borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
            ),
            child: Icon(
              categoryIcon,
              color: isIncome ? AppColors.income : AppColors.expense,
              size: AppSpacing.iconLarge,
            ),
          ),

          const SizedBox(width: AppSpacing.md),

          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  category,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context)
                            .textTheme
                            .bodySmall
                            ?.color
                            ?.withOpacity(0.7),
                      ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  date,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),

          // Amount
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                amount,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: isIncome ? AppColors.income : AppColors.expense,
                      fontWeight: FontWeight.w600,
                    ),
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                isIncome ? 'Income' : 'Expense',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: isIncome ? AppColors.income : AppColors.expense,
                    ),
              ),
            ],
          ),

          // Actions
          if (onEdit != null || onDelete != null) ...[
            const SizedBox(width: AppSpacing.sm),
            PopupMenuButton<String>(
              onSelected: (value) {
                switch (value) {
                  case 'edit':
                    onEdit?.call();
                    break;
                  case 'delete':
                    onDelete?.call();
                    break;
                }
              },
              itemBuilder: (context) => [
                if (onEdit != null)
                  const PopupMenuItem(
                    value: 'edit',
                    child: Row(
                      children: [
                        Icon(Icons.edit, size: 16),
                        SizedBox(width: 8),
                        Text('Edit'),
                      ],
                    ),
                  ),
                if (onDelete != null)
                  const PopupMenuItem(
                    value: 'delete',
                    child: Row(
                      children: [
                        Icon(Icons.delete, size: 16, color: AppColors.error),
                        SizedBox(width: 8),
                        Text('Delete',
                            style: TextStyle(color: AppColors.error)),
                      ],
                    ),
                  ),
              ],
              child: const Icon(Icons.more_vert),
            ),
          ],
        ],
      ),
    );
  }
}

/// Budget progress card
class BudgetProgressCard extends StatelessWidget {
  final String title;
  final double spent;
  final double budget;
  final String period;
  final VoidCallback? onTap;

  const BudgetProgressCard({
    super.key,
    required this.title,
    required this.spent,
    required this.budget,
    required this.period,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final percentage = budget > 0 ? (spent / budget).clamp(0.0, 1.0) : 0.0;
    final isOverBudget = spent > budget;
    final remaining = budget - spent;

    return CustomCard(
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              Text(
                period,
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.md),

          // Progress bar
          LinearProgressIndicator(
            value: percentage,
            backgroundColor: AppColors.borderLight,
            valueColor: AlwaysStoppedAnimation<Color>(
              isOverBudget ? AppColors.error : AppColors.primary,
            ),
            minHeight: 8,
          ),

          const SizedBox(height: AppSpacing.sm),

          // Amounts
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '\$${spent.toStringAsFixed(0)}',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: isOverBudget
                          ? AppColors.error
                          : AppColors.textPrimaryLight,
                    ),
              ),
              Text(
                'of \$${budget.toStringAsFixed(0)}',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.xs),

          // Remaining/Over
          Text(
            isOverBudget
                ? 'Over budget by \$${(-remaining).toStringAsFixed(0)}'
                : '\$${remaining.toStringAsFixed(0)} remaining',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: isOverBudget
                      ? AppColors.error
                      : AppColors.textSecondaryLight,
                ),
          ),
        ],
      ),
    );
  }
}

/// Stats card for dashboard
class StatsCard extends StatelessWidget {
  final String title;
  final String value;
  final String subtitle;
  final IconData icon;
  final Color? iconColor;
  final VoidCallback? onTap;

  const StatsCard({
    super.key,
    required this.title,
    required this.value,
    required this.subtitle,
    required this.icon,
    this.iconColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return CustomCard(
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              Icon(
                icon,
                color: iconColor ?? AppColors.primary,
                size: AppSpacing.iconMedium,
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            value,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            subtitle,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
