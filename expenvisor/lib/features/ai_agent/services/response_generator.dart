import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../core/repositories/transaction_repository.dart';
import 'intent_classifier.dart';

class ResponseGenerator {
  final TransactionRepository _transactionRepository;

  ResponseGenerator(this._transactionRepository);

  Future<Widget> generateResponse(UserIntent intent, String message, BuildContext context) async {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    switch (intent) {
      case UserIntent.addExpense:
      case UserIntent.addIncome:
        return _buildConfirmationMessage(message, isDark);
      
      case UserIntent.query:
        return await _buildSpendingQueryResponse(message, isDark);
      
      case UserIntent.budgetCheck:
        return await _buildBudgetStatusResponse(isDark);
      
      case UserIntent.insight:
        return await _buildInsightResponse(message, isDark);
      
      case UserIntent.chat:
        return _buildGeneralChatResponse(message, isDark);
    }
  }

  Widget _buildConfirmationMessage(String message, bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        border: Border.all(
          color: AppColors.primary.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.check_circle_outline, color: AppColors.primary, size: 20),
              const SizedBox(width: AppSpacing.sm),
              Text(
                'I understood that as:',
                style: AppTypography.labelMedium(
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            message,
            style: AppTypography.bodyMedium(
              color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Future<Widget> _buildSpendingQueryResponse(String message, bool isDark) async {
    final now = DateTime.now();
    final startOfMonth = DateTime(now.year, now.month, 1);
    final transactions = await _transactionRepository.getByDateRange(startOfMonth, now);
    
    final totalSpent = transactions
        .where((t) => !t.isIncome)
        .fold(0.0, (sum, t) => sum + t.amount);
    
    final totalIncome = transactions
        .where((t) => t.isIncome)
        .fold(0.0, (sum, t) => sum + t.amount);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'This Month Summary',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildStatCard('Total Spent', '-\$${totalSpent.toStringAsFixed(2)}', Colors.red, isDark),
              _buildStatCard('Total Income', '+\$${totalIncome.toStringAsFixed(2)}', Colors.green, isDark),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          _buildStatCard('Net', '${totalIncome >= totalSpent ? '+' : ''}\$${(totalIncome - totalSpent).toStringAsFixed(2)}', 
                        totalIncome >= totalSpent ? Colors.green : Colors.red, isDark),
        ],
      ),
    );
  }

  Future<Widget> _buildBudgetStatusResponse(bool isDark) async {
    // Mock budget data for now
    final budgetAmount = 2000.0;
    final spentAmount = 1200.0;
    final remaining = budgetAmount - spentAmount;
    final percentage = (spentAmount / budgetAmount * 100).clamp(0, 100);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Budget Status',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          LinearProgressIndicator(
            value: percentage / 100,
            backgroundColor: AppColors.primary.withOpacity(0.2),
            valueColor: AlwaysStoppedAnimation<Color>(
              percentage > 80 ? Colors.red : AppColors.primary,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Spent: \$${spentAmount.toStringAsFixed(2)}',
                style: AppTypography.bodyMedium(
                  color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
                ),
              ),
              Text(
                'Remaining: \$${remaining.toStringAsFixed(2)}',
                style: AppTypography.bodyMedium(
                  color: remaining > 0 ? Colors.green : Colors.red,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<Widget> _buildInsightResponse(String message, bool isDark) async {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '💡 Financial Insight',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            'Based on your spending patterns, I notice you spend more on dining out during weekends. Consider meal prepping to save around \$200-300 per month.',
            style: AppTypography.bodyMedium(
              color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGeneralChatResponse(String message, bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
      ),
      child: Text(
        'I\'m here to help you manage your finances! You can ask me about your spending, budgets, or just tell me about a transaction you want to add.',
        style: AppTypography.bodyMedium(
          color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value, Color color, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppTypography.captionSmall(
            color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          value,
          style: AppTypography.titleMedium(color: color),
        ),
      ],
    );
  }
}
