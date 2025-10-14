import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';

class AboutScreen extends StatefulWidget {
  const AboutScreen({super.key});

  @override
  State<AboutScreen> createState() => _AboutScreenState();
}

class _AboutScreenState extends State<AboutScreen> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'About',
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
            _buildAppInfoSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildVersionInfoSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildTeamSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildLegalSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildSocialSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildAcknowledgmentsSection(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildAppInfoSection(bool isDark) {
    return Center(
      child: Column(
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppColors.getPrimaryColor(isDark),
                  AppColors.getSecondaryColor(isDark),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: AppColors.getPrimaryColor(isDark).withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: const Icon(
              Icons.account_balance_wallet,
              size: 60,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          Text(
            'Expenvisor',
            style: AppTypography.headlineLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            'Your AI-Powered Expense Tracker',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            'Version 1.0.0',
            style: AppTypography.bodyLarge(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVersionInfoSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'App Information',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        _buildInfoCard(
          icon: Icons.info_outline,
          title: 'Build Version',
          subtitle: '1.0.0 (Build 100)',
          onTap: () => _copyToClipboard('1.0.0 (Build 100)'),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildInfoCard(
          icon: Icons.calendar_today,
          title: 'Release Date',
          subtitle: 'January 15, 2024',
          onTap: () => _copyToClipboard('January 15, 2024'),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildInfoCard(
          icon: Icons.storage,
          title: 'App Size',
          subtitle: '45.2 MB',
          onTap: () => _copyToClipboard('45.2 MB'),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildInfoCard(
          icon: Icons.update,
          title: 'Last Updated',
          subtitle: 'January 15, 2024',
          onTap: () => _copyToClipboard('January 15, 2024'),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildTeamSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Development Team',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        _buildTeamMemberCard(
          name: 'Development Team',
          role: 'Flutter & AI Development',
          email: 'dev@expenvisor.com',
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildTeamMemberCard(
          name: 'Design Team',
          role: 'UI/UX Design',
          email: 'design@expenvisor.com',
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildTeamMemberCard(
          name: 'Support Team',
          role: 'Customer Support',
          email: 'support@expenvisor.com',
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildTeamMemberCard({
    required String name,
    required String role,
    required String email,
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
          CircleAvatar(
            radius: 20,
            backgroundColor: AppColors.getPrimaryColor(isDark).withOpacity(0.1),
            child: Icon(
              Icons.person,
              color: AppColors.getPrimaryColor(isDark),
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: AppTypography.labelLarge(
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                Text(
                  role,
                  style: AppTypography.bodySmall(
                    color: isDark
                        ? AppColors.textSecondaryDark
                        : AppColors.textSecondaryLight,
                  ),
                ),
                Text(
                  email,
                  style: AppTypography.bodySmall(
                    color: AppColors.getPrimaryColor(isDark),
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(
              Icons.email_outlined,
              color: AppColors.getPrimaryColor(isDark),
            ),
            onPressed: () => _sendEmail(email),
          ),
        ],
      ),
    );
  }

  Widget _buildLegalSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Legal & Privacy',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        _buildLegalItem(
          title: 'Privacy Policy',
          subtitle: 'How we collect and use your data',
          onTap: () => _openPrivacyPolicy(isDark),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildLegalItem(
          title: 'Terms of Service',
          subtitle: 'Terms and conditions for using the app',
          onTap: () => _openTermsOfService(isDark),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildLegalItem(
          title: 'AI Disclaimer',
          subtitle: 'Important information about AI features',
          onTap: () => _openAIDisclaimer(isDark),
          isDark: isDark,
        ),
        const SizedBox(height: AppSpacing.sm),
        _buildLegalItem(
          title: 'Open Source Licenses',
          subtitle: 'Third-party libraries and their licenses',
          onTap: () => _openOpenSourceLicenses(isDark),
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildLegalItem({
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
          color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
          ),
        ),
        child: Row(
          children: [
            Icon(
              Icons.description_outlined,
              color: AppColors.getPrimaryColor(isDark),
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

  Widget _buildSocialSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Connect With Us',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: _buildSocialButton(
                icon: Icons.web,
                title: 'Website',
                onTap: () => _openWebsite(isDark),
                isDark: isDark,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: _buildSocialButton(
                icon: Icons.email,
                title: 'Email',
                onTap: () => _openEmail(isDark),
                isDark: isDark,
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: _buildSocialButton(
                icon: Icons.star,
                title: 'Rate App',
                onTap: () => _rateApp(isDark),
                isDark: isDark,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: _buildSocialButton(
                icon: Icons.share,
                title: 'Share App',
                onTap: () => _shareApp(isDark),
                isDark: isDark,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSocialButton({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
          ),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              color: AppColors.getPrimaryColor(isDark),
              size: 24,
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              title,
              style: AppTypography.labelMedium(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAcknowledgmentsSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Acknowledgments',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Container(
          padding: const EdgeInsets.all(AppSpacing.lg),
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
            border: Border.all(
              color: isDark ? AppColors.borderDark : AppColors.borderLight,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Special Thanks',
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'We would like to thank the Flutter community, Firebase team, OpenAI, and all our beta testers for their invaluable contributions to making Expenvisor a reality.',
                style: AppTypography.bodyMedium(
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                'Open Source Libraries',
                style: AppTypography.labelLarge(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                '• Flutter SDK\n• Firebase\n• OpenAI API\n• Google ML Kit\n• RevenueCat\n• fl_chart\n• And many more...',
                style: AppTypography.bodyMedium(
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInfoCard({
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
              color: AppColors.getPrimaryColor(isDark),
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
            Icon(
              Icons.copy,
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

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Copied: $text'),
        backgroundColor: AppColors.success,
      ),
    );
  }

  void _sendEmail(String email) {
    // TODO: Implement email sending
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening email: $email'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openPrivacyPolicy(bool isDark) {
    // TODO: Implement privacy policy
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Privacy Policy coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openTermsOfService(bool isDark) {
    // TODO: Implement terms of service
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Terms of Service coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openAIDisclaimer(bool isDark) {
    // TODO: Implement AI disclaimer
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('AI Disclaimer coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openOpenSourceLicenses(bool isDark) {
    // TODO: Implement open source licenses
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Open Source Licenses coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openWebsite(bool isDark) {
    // TODO: Implement website opening
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Website: https://expenvisor.com'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openEmail(bool isDark) {
    // TODO: Implement email opening
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Email: support@expenvisor.com'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _rateApp(bool isDark) {
    // TODO: Implement app rating
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Rate app functionality coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _shareApp(bool isDark) {
    // TODO: Implement app sharing
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Share app functionality coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }
}
