import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  String _selectedFilter = 'All';
  String _searchQuery = '';
  final TextEditingController _searchController = TextEditingController();

  final List<String> _filters = [
    'All',
    'Income',
    'Expense',
    'This Month',
    'Last Month'
  ];

  final List<Map<String, dynamic>> _mockTransactions = [
    {
      'title': 'Grocery Shopping',
      'amount': '-\$85.50',
      'category': 'Food & Dining',
      'date': '2024-12-15',
      'icon': Icons.shopping_cart,
      'isIncome': false,
    },
    {
      'title': 'Freelance Payment',
      'amount': '+\$500.00',
      'category': 'Work',
      'date': '2024-12-14',
      'icon': Icons.work,
      'isIncome': true,
    },
    {
      'title': 'Coffee',
      'amount': '-\$4.50',
      'category': 'Food & Dining',
      'date': '2024-12-13',
      'icon': Icons.local_cafe,
      'isIncome': false,
    },
    {
      'title': 'Gas Station',
      'amount': '-\$45.00',
      'category': 'Transportation',
      'date': '2024-12-12',
      'icon': Icons.local_gas_station,
      'isIncome': false,
    },
    {
      'title': 'Salary',
      'amount': '+\$3,500.00',
      'category': 'Work',
      'date': '2024-12-01',
      'icon': Icons.account_balance,
      'isIncome': true,
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Transaction History',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: _showFilterBottomSheet,
          ),
        ],
      ),
      body: Column(
        children: [
          // Search and Filter Section
          _buildSearchAndFilter(isDark),

          // Filter Chips
          _buildFilterChips(),

          // Transaction List
          Expanded(
            child: _buildTransactionList(isDark),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchAndFilter(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Row(
        children: [
          Expanded(
            child: SearchInput(
              hint: 'Search transactions...',
              controller: _searchController,
              onChanged: (value) {
                setState(() {
                  _searchQuery = value;
                });
              },
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          IconButton(
            onPressed: _showFilterBottomSheet,
            icon: const Icon(Icons.tune),
            style: IconButton.styleFrom(
              backgroundColor: AppColors.primary.withOpacity(0.1),
              foregroundColor: AppColors.primary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChips() {
    return SizedBox(
      height: 50,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
        itemCount: _filters.length,
        itemBuilder: (context, index) {
          final filter = _filters[index];
          final isSelected = _selectedFilter == filter;

          return Padding(
            padding: const EdgeInsets.only(right: AppSpacing.sm),
            child: FilterChip(
              label: Text(filter),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  _selectedFilter = filter;
                });
              },
              selectedColor: AppColors.primary.withOpacity(0.2),
              checkmarkColor: AppColors.primary,
              labelStyle: AppTypography.labelMedium(
                color: isSelected ? AppColors.primary : null,
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildTransactionList(bool isDark) {
    final filteredTransactions = _getFilteredTransactions();

    if (filteredTransactions.isEmpty) {
      return _buildEmptyState(isDark);
    }

    return ListView.builder(
      padding: const EdgeInsets.all(AppSpacing.lg),
      itemCount: filteredTransactions.length,
      itemBuilder: (context, index) {
        final transaction = filteredTransactions[index];

        return ExpenseCard(
          title: transaction['title'] as String,
          amount: transaction['amount'] as String,
          category: transaction['category'] as String,
          date: _formatDate(transaction['date'] as String),
          categoryIcon: transaction['icon'] as IconData,
          isIncome: transaction['isIncome'] as bool,
          onEdit: () => _editTransaction(transaction),
          onDelete: () => _deleteTransaction(index),
        )
            .animate()
            .fadeIn(
              duration: 300.ms,
              delay: (index * 100).ms,
            )
            .slideX(
              begin: 0.3,
              end: 0,
              duration: 300.ms,
              delay: (index * 100).ms,
            );
      },
    );
  }

  Widget _buildEmptyState(bool isDark) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.receipt_long_outlined,
            size: 80,
            color: isDark
                ? AppColors.textTertiaryDark
                : AppColors.textTertiaryLight,
          ),
          const SizedBox(height: AppSpacing.lg),
          Text(
            'No transactions found',
            style: AppTypography.titleLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            'Start adding expenses and income to see them here',
            style: AppTypography.bodyLarge(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: AppSpacing.xl),
          ElevatedButton.icon(
            onPressed: () {
              // TODO: Navigate to add expense screen
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Add transaction pressed!'),
                  backgroundColor: AppColors.primary,
                ),
              );
            },
            icon: const Icon(Icons.add),
            label: const Text('Add Transaction'),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  List<Map<String, dynamic>> _getFilteredTransactions() {
    var transactions = _mockTransactions;

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      transactions = transactions.where((transaction) {
        final title = transaction['title'] as String;
        final category = transaction['category'] as String;
        return title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
            category.toLowerCase().contains(_searchQuery.toLowerCase());
      }).toList();
    }

    // Apply category filter
    switch (_selectedFilter) {
      case 'Income':
        transactions =
            transactions.where((t) => t['isIncome'] == true).toList();
        break;
      case 'Expense':
        transactions =
            transactions.where((t) => t['isIncome'] == false).toList();
        break;
      case 'This Month':
        // Filter for current month (simplified)
        break;
      case 'Last Month':
        // Filter for last month (simplified)
        break;
    }

    return transactions;
  }

  String _formatDate(String dateString) {
    final date = DateTime.parse(dateString);
    final now = DateTime.now();
    final difference = now.difference(date).inDays;

    if (difference == 0) {
      return 'Today';
    } else if (difference == 1) {
      return 'Yesterday';
    } else if (difference < 7) {
      return '$difference days ago';
    } else {
      return '${date.day}/${date.month}/${date.year}';
    }
  }

  void _editTransaction(Map<String, dynamic> transaction) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Edit ${transaction['title']}'),
        backgroundColor: AppColors.primary,
      ),
    );
  }

  void _deleteTransaction(int index) {
    setState(() {
      _mockTransactions.removeAt(index);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Transaction deleted'),
        backgroundColor: AppColors.error,
      ),
    );
  }

  void _showFilterBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle bar
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.borderLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: AppSpacing.lg),

            Text(
              'Filter Transactions',
              style: AppTypography.titleLarge(),
            ),
            const SizedBox(height: AppSpacing.lg),

            // Date Range Filter
            _buildFilterSection(
              title: 'Date Range',
              children: [
                _buildFilterChip('Today', () => _applyDateFilter('Today')),
                _buildFilterChip(
                    'This Week', () => _applyDateFilter('This Week')),
                _buildFilterChip(
                    'This Month', () => _applyDateFilter('This Month')),
                _buildFilterChip(
                    'Last Month', () => _applyDateFilter('Last Month')),
                _buildFilterChip(
                    'This Year', () => _applyDateFilter('This Year')),
              ],
            ),

            const SizedBox(height: AppSpacing.lg),

            // Category Filter
            _buildFilterSection(
              title: 'Category',
              children: [
                _buildFilterChip('All', () => _applyCategoryFilter('All')),
                _buildFilterChip('Food & Dining',
                    () => _applyCategoryFilter('Food & Dining')),
                _buildFilterChip('Transportation',
                    () => _applyCategoryFilter('Transportation')),
                _buildFilterChip(
                    'Shopping', () => _applyCategoryFilter('Shopping')),
                _buildFilterChip('Entertainment',
                    () => _applyCategoryFilter('Entertainment')),
                _buildFilterChip('Other', () => _applyCategoryFilter('Other')),
              ],
            ),

            const SizedBox(height: AppSpacing.lg),

            // Amount Range Filter
            _buildFilterSection(
              title: 'Amount Range',
              children: [
                _buildFilterChip('All', () => _applyAmountFilter('All')),
                _buildFilterChip(
                    'Under \$50', () => _applyAmountFilter('Under \$50')),
                _buildFilterChip(
                    '\$50 - \$200', () => _applyAmountFilter('\$50 - \$200')),
                _buildFilterChip(
                    '\$200 - \$500', () => _applyAmountFilter('\$200 - \$500')),
                _buildFilterChip(
                    'Over \$500', () => _applyAmountFilter('Over \$500')),
              ],
            ),

            const SizedBox(height: AppSpacing.xl),

            // Action Buttons
            Row(
              children: [
                Expanded(
                  child: CustomButton(
                    text: 'Clear All',
                    onPressed: () {
                      setState(() {
                        _selectedFilter = 'All';
                        _searchQuery = '';
                        _searchController.clear();
                      });
                      Navigator.pop(context);
                    },
                    variant: ButtonVariant.outline,
                    size: ButtonSize.medium,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: CustomButton(
                    text: 'Apply Filters',
                    onPressed: () => Navigator.pop(context),
                    variant: ButtonVariant.gradient,
                    size: ButtonSize.medium,
                  ),
                ),
              ],
            ),

            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterSection({
    required String title,
    required List<Widget> children,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: AppTypography.labelLarge(
            color: Theme.of(context).textTheme.labelLarge?.color,
          ),
        ),
        const SizedBox(height: AppSpacing.sm),
        Wrap(
          spacing: AppSpacing.sm,
          runSpacing: AppSpacing.sm,
          children: children,
        ),
      ],
    );
  }

  Widget _buildFilterChip(String text, VoidCallback onTap) {
    final isSelected = _selectedFilter == text;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.getPrimaryColor(isDark).withOpacity(0.2)
              : (isDark ? AppColors.surfaceDark : AppColors.surfaceLight),
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isSelected
                ? AppColors.getPrimaryColor(isDark)
                : (isDark ? AppColors.borderDark : AppColors.borderLight),
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          text,
          style: AppTypography.labelMedium(
            color: isSelected
                ? AppColors.getPrimaryColor(isDark)
                : (isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight),
          ),
        ),
      ),
    );
  }

  void _applyDateFilter(String filter) {
    setState(() {
      _selectedFilter = filter;
    });
  }

  void _applyCategoryFilter(String filter) {
    setState(() {
      _selectedFilter = filter;
    });
  }

  void _applyAmountFilter(String filter) {
    setState(() {
      _selectedFilter = filter;
    });
  }
}
