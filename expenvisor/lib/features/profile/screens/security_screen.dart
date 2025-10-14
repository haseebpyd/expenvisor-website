import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';

class SecurityScreen extends StatefulWidget {
  const SecurityScreen({super.key});

  @override
  State<SecurityScreen> createState() => _SecurityScreenState();
}

class _SecurityScreenState extends State<SecurityScreen> {
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _pinController = TextEditingController();

  bool _isTwoFactorEnabled = false;
  bool _isPinEnabled = true;
  bool _isSessionTimeoutEnabled = true;
  bool _isLoginNotificationsEnabled = true;

  String _selectedSessionTimeout = '15 minutes';
  String _selectedLoginMethod = 'Email + Password';

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    _pinController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Security',
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
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildLoginMethodSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildTwoFactorSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildPinSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildSessionSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildNotificationsSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildChangePasswordSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildDangerZoneSection(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildLoginMethodSection(bool isDark) {
    return _buildSection(
      title: 'Login Method',
      children: [
        _buildInfoCard(
          icon: Icons.email_outlined,
          title: 'Email + Password',
          subtitle: 'Current login method',
          isSelected: _selectedLoginMethod == 'Email + Password',
          onTap: () => _showLoginMethodOptions(isDark),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.md),
        _buildInfoCard(
          icon: Icons.phone_outlined,
          title: 'Phone + SMS',
          subtitle: 'Add phone number for SMS login',
          isSelected: _selectedLoginMethod == 'Phone + SMS',
          onTap: () => _showLoginMethodOptions(isDark),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildTwoFactorSection(bool isDark) {
    return _buildSection(
      title: 'Two-Factor Authentication',
      children: [
        _buildToggleCard(
          icon: Icons.security,
          title: '2FA Protection',
          subtitle: 'Add an extra layer of security to your account',
          value: _isTwoFactorEnabled,
          onChanged: (value) => _toggleTwoFactor(value, isDark),
          isDark: isDark,
        ),
        if (_isTwoFactorEnabled) ...[
          const SizedBox(height: AppSpacing.md),
          _buildInfoCard(
            icon: Icons.qr_code,
            title: 'Authenticator App',
            subtitle: 'Use Google Authenticator or similar',
            onTap: () => _setupAuthenticator(isDark),
            isDark: isDark,
          ),
        ],
      ],
    );
  }

  Widget _buildPinSection(bool isDark) {
    return _buildSection(
      title: 'PIN Protection',
      children: [
        _buildToggleCard(
          icon: Icons.pin,
          title: 'App PIN',
          subtitle: 'Require PIN to access the app',
          value: _isPinEnabled,
          onChanged: (value) => _togglePin(value, isDark),
          isDark: isDark,
        ),
        if (_isPinEnabled) ...[
          const SizedBox(height: AppSpacing.md),
          _buildInfoCard(
            icon: Icons.edit,
            title: 'Change PIN',
            subtitle: 'Update your current PIN',
            onTap: () => _changePin(isDark),
            isDark: isDark,
          ),
        ],
      ],
    );
  }

  Widget _buildSessionSection(bool isDark) {
    return _buildSection(
      title: 'Session Management',
      children: [
        _buildToggleCard(
          icon: Icons.timer_outlined,
          title: 'Auto Logout',
          subtitle: 'Automatically logout after inactivity',
          value: _isSessionTimeoutEnabled,
          onChanged: (value) =>
              setState(() => _isSessionTimeoutEnabled = value),
          isDark: isDark,
        ),
        if (_isSessionTimeoutEnabled) ...[
          const SizedBox(height: AppSpacing.md),
          _buildInfoCard(
            icon: Icons.schedule,
            title: 'Timeout Duration',
            subtitle: _selectedSessionTimeout,
            onTap: () => _selectSessionTimeout(isDark),
            isDark: isDark,
          ),
        ],
      ],
    );
  }

  Widget _buildNotificationsSection(bool isDark) {
    return _buildSection(
      title: 'Security Notifications',
      children: [
        _buildToggleCard(
          icon: Icons.notifications_outlined,
          title: 'Login Notifications',
          subtitle: 'Get notified when someone logs into your account',
          value: _isLoginNotificationsEnabled,
          onChanged: (value) =>
              setState(() => _isLoginNotificationsEnabled = value),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildChangePasswordSection(bool isDark) {
    return _buildSection(
      title: 'Change Password',
      children: [
        _buildInfoCard(
          icon: Icons.lock_outline,
          title: 'Update Password',
          subtitle: 'Change your account password',
          onTap: () => _showChangePasswordDialog(isDark),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildDangerZoneSection(bool isDark) {
    return _buildSection(
      title: 'Danger Zone',
      children: [
        _buildDangerCard(
          icon: Icons.logout,
          title: 'Sign Out All Devices',
          subtitle: 'Sign out from all devices except this one',
          onTap: () => _signOutAllDevices(isDark),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.md),
        _buildDangerCard(
          icon: Icons.delete_forever,
          title: 'Delete Account',
          subtitle: 'Permanently delete your account and all data',
          onTap: () => _showDeleteAccountDialog(isDark),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildSection({
    required String title,
    required List<Widget> children,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: AppTypography.titleMedium(
            color: Theme.of(context).brightness == Brightness.dark
                ? AppColors.textPrimaryDark
                : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        ...children,
      ],
    );
  }

  Widget _buildInfoCard({
    required IconData icon,
    required String title,
    required String subtitle,
    bool isSelected = false,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.getPrimaryColor(isDark).withOpacity(0.1)
              : (isDark ? AppColors.surfaceDark : AppColors.surfaceLight),
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isSelected
                ? AppColors.getPrimaryColor(isDark)
                : (isDark ? AppColors.borderDark : AppColors.borderLight),
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isSelected
                  ? AppColors.getPrimaryColor(isDark)
                  : (isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTypography.labelLarge(
                      color: isDark
                          ? AppColors.textPrimaryDark
                          : AppColors.textPrimaryLight,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: AppTypography.bodySmall(
                      color: isDark
                          ? AppColors.textSecondaryDark
                          : AppColors.textSecondaryLight,
                    ),
                  ),
                ],
              ),
            ),
            if (isSelected)
              Icon(
                Icons.check_circle,
                color: AppColors.getPrimaryColor(isDark),
              )
            else
              Icon(
                Icons.arrow_forward_ios,
                size: 16,
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildToggleCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Row(
        children: [
          Icon(
            icon,
            color: isDark
                ? AppColors.textSecondaryDark
                : AppColors.textSecondaryLight,
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: AppTypography.labelLarge(
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                Text(
                  subtitle,
                  style: AppTypography.bodySmall(
                    color: isDark
                        ? AppColors.textSecondaryDark
                        : AppColors.textSecondaryLight,
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: AppColors.getPrimaryColor(isDark),
          ),
        ],
      ),
    );
  }

  Widget _buildDangerCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: AppColors.error.withOpacity(0.1),
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: AppColors.error.withOpacity(0.3),
          ),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: AppColors.error,
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTypography.labelLarge(
                      color: AppColors.error,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: AppTypography.bodySmall(
                      color: AppColors.error.withOpacity(0.8),
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              size: 16,
              color: AppColors.error,
            ),
          ],
        ),
      ),
    );
  }

  void _showLoginMethodOptions(bool isDark) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Select Login Method',
              style: AppTypography.titleMedium(),
            ),
            const SizedBox(height: AppSpacing.lg),
            _buildLoginMethodOption(
                'Email + Password', Icons.email_outlined, isDark),
            _buildLoginMethodOption(
                'Phone + SMS', Icons.phone_outlined, isDark),
            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }

  Widget _buildLoginMethodOption(String method, IconData icon, bool isDark) {
    return ListTile(
      leading: Icon(icon),
      title: Text(method),
      trailing: _selectedLoginMethod == method
          ? Icon(Icons.check, color: AppColors.getPrimaryColor(isDark))
          : null,
      onTap: () {
        setState(() => _selectedLoginMethod = method);
        Navigator.pop(context);
      },
    );
  }

  void _toggleTwoFactor(bool value, bool isDark) {
    if (value) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Enable Two-Factor Authentication'),
          content: const Text(
            'This will add an extra layer of security to your account. You\'ll need to use an authenticator app to generate codes.',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            CustomButton(
              text: 'Enable',
              onPressed: () {
                setState(() => _isTwoFactorEnabled = true);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Two-factor authentication enabled!'),
                    backgroundColor: AppColors.success,
                  ),
                );
              },
              variant: ButtonVariant.primary,
            ),
          ],
        ),
      );
    } else {
      setState(() => _isTwoFactorEnabled = false);
    }
  }

  void _setupAuthenticator(bool isDark) {
    // TODO: Implement authenticator setup
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Authenticator setup coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _togglePin(bool value, bool isDark) {
    if (value) {
      _showPinSetupDialog(isDark);
    } else {
      setState(() => _isPinEnabled = false);
    }
  }

  void _showPinSetupDialog(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Set Up PIN'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CustomInput(
              controller: _pinController,
              label: 'Enter 4-digit PIN',
              hint: '0000',
              keyboardType: TextInputType.number,
              obscureText: true,
              maxLength: 4,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Set PIN',
            onPressed: () {
              if (_pinController.text.length == 4) {
                setState(() => _isPinEnabled = true);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('PIN set successfully!'),
                    backgroundColor: AppColors.success,
                  ),
                );
              }
            },
            variant: ButtonVariant.primary,
          ),
        ],
      ),
    );
  }

  void _changePin(bool isDark) {
    // TODO: Implement PIN change
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('PIN change coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _selectSessionTimeout(bool isDark) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Select Timeout Duration',
              style: AppTypography.titleMedium(),
            ),
            const SizedBox(height: AppSpacing.lg),
            ...['5 minutes', '15 minutes', '30 minutes', '1 hour', 'Never']
                .map((duration) => ListTile(
                      title: Text(duration),
                      trailing: _selectedSessionTimeout == duration
                          ? Icon(Icons.check,
                              color: AppColors.getPrimaryColor(isDark))
                          : null,
                      onTap: () {
                        setState(() => _selectedSessionTimeout = duration);
                        Navigator.pop(context);
                      },
                    ))
                .toList(),
            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }

  void _showChangePasswordDialog(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Change Password'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CustomInput(
              controller: _currentPasswordController,
              label: 'Current Password',
              hint: 'Enter current password',
              obscureText: true,
            ),
            const SizedBox(height: AppSpacing.md),
            CustomInput(
              controller: _newPasswordController,
              label: 'New Password',
              hint: 'Enter new password',
              obscureText: true,
            ),
            const SizedBox(height: AppSpacing.md),
            CustomInput(
              controller: _confirmPasswordController,
              label: 'Confirm Password',
              hint: 'Confirm new password',
              obscureText: true,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Change Password',
            onPressed: () {
              // TODO: Implement password change
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Password changed successfully!'),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            variant: ButtonVariant.primary,
          ),
        ],
      ),
    );
  }

  void _signOutAllDevices(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Sign Out All Devices'),
        content: const Text(
          'This will sign you out from all devices except this one. You\'ll need to log in again on other devices.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Sign Out All',
            onPressed: () {
              // TODO: Implement sign out all devices
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Signed out from all devices!'),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            variant: ButtonVariant.primary,
          ),
        ],
      ),
    );
  }

  void _showDeleteAccountDialog(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Account'),
        content: const Text(
          'This action cannot be undone. All your data will be permanently deleted.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Delete Account',
            onPressed: () {
              // TODO: Implement account deletion
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Account deletion coming soon!'),
                  backgroundColor: AppColors.warning,
                ),
              );
            },
            variant: ButtonVariant.outline,
            customColor: AppColors.error,
          ),
        ],
      ),
    );
  }
}
