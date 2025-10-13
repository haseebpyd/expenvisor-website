import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_spacing.dart';
import '../../features/expense/screens/add_expense_screen.dart';
import '../../features/income/screens/add_income_screen.dart';

class AddTransactionFAB extends StatefulWidget {
  const AddTransactionFAB({super.key});

  @override
  State<AddTransactionFAB> createState() => _AddTransactionFABState();
}

class _AddTransactionFABState extends State<AddTransactionFAB>
    with TickerProviderStateMixin {
  bool _isExpanded = false;
  late AnimationController _animationController;
  late Animation<double> _expandAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Expense Option
        if (_isExpanded) ...[
          _buildOptionButton(
            icon: Icons.remove,
            label: 'Add Expense',
            color: AppColors.expense,
            onTap: () {
              _toggleExpanded();
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const AddExpenseScreen(),
                ),
              );
            },
          ),
          const SizedBox(height: AppSpacing.sm),
        ],
        
        // Income Option
        if (_isExpanded) ...[
          _buildOptionButton(
            icon: Icons.add,
            label: 'Add Income',
            color: AppColors.income,
            onTap: () {
              _toggleExpanded();
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const AddIncomeScreen(),
                ),
              );
            },
          ),
          const SizedBox(height: AppSpacing.sm),
        ],
        
        // Main FAB
        _buildMainFAB(),
      ],
    );
  }

  Widget _buildOptionButton({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return ScaleTransition(
      scale: _expandAnimation,
      child: FadeTransition(
        opacity: _expandAnimation,
        child: GestureDetector(
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
              boxShadow: [
                BoxShadow(
                  color: color.withOpacity(0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  icon,
                  color: Colors.white,
                  size: 20,
                ),
                const SizedBox(width: AppSpacing.sm),
                Text(
                  label,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMainFAB() {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final fabColor = AppColors.getPrimaryColor(isDark);
    
    return FloatingActionButton(
      onPressed: _toggleExpanded,
      backgroundColor: fabColor,
      child: AnimatedRotation(
        turns: _isExpanded ? 0.125 : 0,
        duration: const Duration(milliseconds: 300),
        child: Icon(
          _isExpanded ? Icons.close : Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }

  void _toggleExpanded() {
    setState(() {
      _isExpanded = !_isExpanded;
      if (_isExpanded) {
        _animationController.forward();
      } else {
        _animationController.reverse();
      }
    });
  }
}
