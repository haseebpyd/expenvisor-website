import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../widgets/drawer_header.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Drawer(
      backgroundColor: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
      child: Column(
        children: [
          const DrawerHeaderWidget(),
          
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                // Quick Add Section
                _buildSectionHeader('Quick Add', isDark),
                _buildDrawerItem(
                  icon: Icons.add_circle_outline,
                  title: 'Add Expense',
                  onTap: () => _navigateToAddExpense(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.trending_up,
                  title: 'Add Income',
                  onTap: () => _navigateToAddIncome(context),
                  isDark: isDark,
                ),
                
                const Divider(),
                
                // View & Analyze Section
                _buildSectionHeader('View & Analyze', isDark),
                _buildDrawerItem(
                  icon: Icons.history,
                  title: 'Transactions',
                  onTap: () => _navigateToTransactions(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.analytics_outlined,
                  title: 'Analytics & Charts',
                  onTap: () => _navigateToAnalytics(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.account_balance_wallet_outlined,
                  title: 'Budgets & Goals',
                  onTap: () => _navigateToBudgets(context),
                  isDark: isDark,
                ),
                
                const Divider(),
                
                // Account Section
                _buildSectionHeader('Account', isDark),
                _buildDrawerItem(
                  icon: Icons.person_outline,
                  title: 'Profile',
                  onTap: () => _navigateToProfile(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.settings_outlined,
                  title: 'Settings',
                  onTap: () => _navigateToSettings(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.star_outline,
                  title: 'Subscription',
                  onTap: () => _navigateToSubscription(context),
                  isDark: isDark,
                ),
                
                const Divider(),
                
                // Help & Info Section
                _buildSectionHeader('Help & Info', isDark),
                _buildDrawerItem(
                  icon: Icons.help_outline,
                  title: 'Help Center',
                  onTap: () => _navigateToHelp(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.privacy_tip_outlined,
                  title: 'Privacy Policy',
                  onTap: () => _navigateToPrivacy(context),
                  isDark: isDark,
                ),
                _buildDrawerItem(
                  icon: Icons.info_outline,
                  title: 'About',
                  onTap: () => _navigateToAbout(context),
                  isDark: isDark,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, bool isDark) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.lg,
        AppSpacing.lg,
        AppSpacing.lg,
        AppSpacing.sm,
      ),
      child: Text(
        title,
        style: AppTypography.labelMedium(
          color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
        ),
      ),
    );
  }

  Widget _buildDrawerItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return Builder(
      builder: (context) => ListTile(
        leading: Icon(
          icon,
          color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
        ),
        title: Text(
          title,
          style: AppTypography.bodyMedium(
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        onTap: () {
          Navigator.pop(context); // Close drawer
          onTap();
        },
      ),
    );
  }

  void _navigateToAddExpense(BuildContext context) {
    // TODO: Navigate to add expense screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Add Expense - Coming Soon')),
    );
  }

  void _navigateToAddIncome(BuildContext context) {
    // TODO: Navigate to add income screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Add Income - Coming Soon')),
    );
  }

  void _navigateToTransactions(BuildContext context) {
    Navigator.pushNamed(context, '/transactions');
  }

  void _navigateToAnalytics(BuildContext context) {
    Navigator.pushNamed(context, '/analytics');
  }

  void _navigateToBudgets(BuildContext context) {
    // TODO: Navigate to budgets screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Budgets - Coming Soon')),
    );
  }

  void _navigateToProfile(BuildContext context) {
    Navigator.pushNamed(context, '/profile');
  }

  void _navigateToSettings(BuildContext context) {
    Navigator.pushNamed(context, '/settings');
  }

  void _navigateToSubscription(BuildContext context) {
    // TODO: Navigate to subscription screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Subscription - Coming Soon')),
    );
  }

  void _navigateToHelp(BuildContext context) {
    // TODO: Navigate to help screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Help Center - Coming Soon')),
    );
  }

  void _navigateToPrivacy(BuildContext context) {
    // TODO: Navigate to privacy policy
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Privacy Policy - Coming Soon')),
    );
  }

  void _navigateToAbout(BuildContext context) {
    // TODO: Navigate to about screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('About - Coming Soon')),
    );
  }
}
