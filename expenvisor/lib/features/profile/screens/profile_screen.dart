import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../auth/screens/login_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _notificationsEnabled = true;
  bool _darkModeEnabled = false;
  bool _biometricEnabled = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Profile',
          style: AppTypography.titleLarge(
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Settings pressed!'),
                  backgroundColor: AppColors.primary,
                ),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          children: [
            // Profile Header
            _buildProfileHeader(isDark),
            
            const SizedBox(height: AppSpacing.xl),
            
            // Account Section
            _buildAccountSection(isDark),
            
            const SizedBox(height: AppSpacing.lg),
            
            // Preferences Section
            _buildPreferencesSection(isDark),
            
            const SizedBox(height: AppSpacing.lg),
            
            // Support Section
            _buildSupportSection(isDark),
            
            const SizedBox(height: AppSpacing.lg),
            
            // Sign Out Button
            _buildSignOutButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileHeader(bool isDark) {
    return CustomCard(
      child: Column(
        children: [
          // Avatar
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              gradient: AppColors.heroGradient,
              borderRadius: BorderRadius.circular(AppSpacing.radiusXLarge),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: const Icon(
              Icons.person,
              size: 50,
              color: Colors.white,
            ),
          ).animate().scale(
            duration: 600.ms,
            curve: Curves.elasticOut,
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          // Name and Email
          Text(
            'John Doe',
            style: AppTypography.headlineSmall(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ).animate().fadeIn(
            duration: 800.ms,
            delay: 200.ms,
          ),
          
          const SizedBox(height: AppSpacing.xs),
          
          Text(
            'john.doe@example.com',
            style: AppTypography.bodyMedium(
              color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
            ),
          ).animate().fadeIn(
            duration: 800.ms,
            delay: 400.ms,
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          // Edit Profile Button
          CustomButton(
            text: 'Edit Profile',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Edit Profile pressed!'),
                  backgroundColor: AppColors.primary,
                ),
              );
            },
            variant: ButtonVariant.outline,
            size: ButtonSize.medium,
          ).animate().fadeIn(
            duration: 800.ms,
            delay: 600.ms,
          ),
        ],
      ),
    );
  }

  Widget _buildAccountSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Account',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          _buildListTile(
            icon: Icons.person_outline,
            title: 'Personal Information',
            subtitle: 'Update your personal details',
            onTap: () {},
            isDark: isDark,
          ),
          
          _buildListTile(
            icon: Icons.security_outlined,
            title: 'Security',
            subtitle: 'Password, 2FA, and security settings',
            onTap: () {},
            isDark: isDark,
          ),
          
          _buildListTile(
            icon: Icons.credit_card_outlined,
            title: 'Payment Methods',
            subtitle: 'Manage your payment methods',
            onTap: () {},
            isDark: isDark,
          ),
          
          _buildListTile(
            icon: Icons.subscriptions_outlined,
            title: 'Subscription',
            subtitle: 'Manage your subscription plan',
            onTap: () {},
            isDark: isDark,
            trailing: Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.sm,
                vertical: AppSpacing.xs,
              ),
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
              ),
              child: Text(
                'Premium',
                style: AppTypography.captionSmall(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPreferencesSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Preferences',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          _buildSwitchTile(
            icon: Icons.notifications_outlined,
            title: 'Notifications',
            subtitle: 'Receive push notifications',
            value: _notificationsEnabled,
            onChanged: (value) {
              setState(() {
                _notificationsEnabled = value;
              });
            },
            isDark: isDark,
          ),
          
          _buildSwitchTile(
            icon: Icons.dark_mode_outlined,
            title: 'Dark Mode',
            subtitle: 'Use dark theme',
            value: _darkModeEnabled,
            onChanged: (value) {
              setState(() {
                _darkModeEnabled = value;
              });
            },
            isDark: isDark,
          ),
          
          _buildSwitchTile(
            icon: Icons.fingerprint,
            title: 'Biometric Login',
            subtitle: 'Use fingerprint or face ID',
            value: _biometricEnabled,
            onChanged: (value) {
              setState(() {
                _biometricEnabled = value;
              });
            },
            isDark: isDark,
          ),
          
          _buildListTile(
            icon: Icons.language_outlined,
            title: 'Language',
            subtitle: 'English (US)',
            onTap: () {},
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
          
          _buildListTile(
            icon: Icons.currency_exchange_outlined,
            title: 'Currency',
            subtitle: 'USD (\$)',
            onTap: () {},
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildSupportSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Support',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          _buildListTile(
            icon: Icons.help_outline,
            title: 'Help Center',
            subtitle: 'Get help and support',
            onTap: () {},
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
          
          _buildListTile(
            icon: Icons.feedback_outlined,
            title: 'Send Feedback',
            subtitle: 'Share your thoughts with us',
            onTap: () {},
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
          
          _buildListTile(
            icon: Icons.star_outline,
            title: 'Rate App',
            subtitle: 'Rate us on the App Store',
            onTap: () {},
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
          
          _buildListTile(
            icon: Icons.info_outline,
            title: 'About',
            subtitle: 'Version 1.0.0',
            onTap: () {},
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildSignOutButton() {
    return CustomButton(
      text: 'Sign Out',
      onPressed: () {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Sign Out'),
            content: const Text('Are you sure you want to sign out?'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(
                      builder: (context) => const LoginScreen(),
                    ),
                    (route) => false,
                  );
                },
                child: const Text('Sign Out'),
              ),
            ],
          ),
        );
      },
      variant: ButtonVariant.outline,
      customColor: AppColors.error,
      size: ButtonSize.large,
      isFullWidth: true,
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 800.ms,
    );
  }

  Widget _buildListTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required bool isDark,
    Widget? trailing,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: AppColors.primary,
      ),
      title: Text(
        title,
        style: AppTypography.bodyLarge(
          color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: AppTypography.bodySmall(
          color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
        ),
      ),
      trailing: trailing,
      onTap: onTap,
      contentPadding: EdgeInsets.zero,
    );
  }

  Widget _buildSwitchTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required bool isDark,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: AppColors.primary,
      ),
      title: Text(
        title,
        style: AppTypography.bodyLarge(
          color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: AppTypography.bodySmall(
          color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
        ),
      ),
      trailing: Switch(
        value: value,
        onChanged: onChanged,
        activeColor: AppColors.primary,
      ),
      contentPadding: EdgeInsets.zero,
    );
  }
}
