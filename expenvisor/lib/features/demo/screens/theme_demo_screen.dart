import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../core/theme/app_typography.dart';
import '../../../shared/widgets/feature_card.dart';
import '../../../shared/widgets/glass_container.dart';
import '../../../shared/widgets/custom_button.dart';

/// Demo screen showcasing the new emerald theme and glassmorphism effects
class ThemeDemoScreen extends StatefulWidget {
  const ThemeDemoScreen({super.key});

  @override
  State<ThemeDemoScreen> createState() => _ThemeDemoScreenState();
}

class _ThemeDemoScreenState extends State<ThemeDemoScreen> {
  bool _isDarkMode = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Emerald Theme Demo',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(_isDarkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: () {
              setState(() {
                _isDarkMode = !_isDarkMode;
              });
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Color Palette Section
            _buildColorPaletteSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Glassmorphism Cards Section
            _buildGlassmorphismSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Feature Cards Section
            _buildFeatureCardsSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Button Variants Section
            _buildButtonVariantsSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Typography Section
            _buildTypographySection(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildColorPaletteSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Color Palette',
          style: AppTypography.headlineSmall(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Wrap(
          spacing: AppSpacing.sm,
          runSpacing: AppSpacing.sm,
          children: [
            _buildColorSwatch('Primary', AppColors.primary, isDark),
            _buildColorSwatch('Primary Light', AppColors.primaryLight, isDark),
            _buildColorSwatch('Primary Dark', AppColors.primaryDark, isDark),
            _buildColorSwatch('Secondary', AppColors.secondary, isDark),
            _buildColorSwatch('Success', AppColors.success, isDark),
            _buildColorSwatch('Error', AppColors.error, isDark),
            _buildColorSwatch('Warning', AppColors.warning, isDark),
            _buildColorSwatch('Info', AppColors.info, isDark),
          ],
        ),
      ],
    );
  }

  Widget _buildColorSwatch(String name, Color color, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Text(
        name,
        style: AppTypography.labelMedium(
          color: Colors.white,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildGlassmorphismSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Glassmorphism Effects',
          style: AppTypography.headlineSmall(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: GlassCard(
                child: Column(
                  children: [
                    Icon(
                      Icons.account_balance_wallet,
                      size: 48,
                      color: AppColors.getPrimaryColor(isDark),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Balance',
                      style: AppTypography.titleMedium(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.textPrimaryLight,
                      ),
                    ),
                    Text(
                      '\$2,847.50',
                      style: AppTypography.headlineSmall(
                        color: AppColors.getPrimaryColor(isDark),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: GlassCard(
                child: Column(
                  children: [
                    Icon(
                      Icons.trending_up,
                      size: 48,
                      color: AppColors.success,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Income',
                      style: AppTypography.titleMedium(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.textPrimaryLight,
                      ),
                    ),
                    Text(
                      '\$3,200.00',
                      style: AppTypography.headlineSmall(
                        color: AppColors.success,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildFeatureCardsSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Feature Cards',
          style: AppTypography.headlineSmall(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Column(
          children: [
            BalanceCard(
              amount: '\$2,847.50',
              label: 'Total Balance',
              subtitle: 'This month',
              icon: Icons.account_balance_wallet,
              isPositive: true,
            ),
            const SizedBox(height: AppSpacing.md),
            AIFeatureCard(
              title: 'AI Financial Advisor',
              description: 'Get personalized insights and recommendations',
              icon: Icons.psychology,
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('AI Feature tapped!')),
                );
              },
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildButtonVariantsSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Button Variants',
          style: AppTypography.headlineSmall(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: CustomButton(
                    text: 'Primary Button',
                    onPressed: () {},
                    variant: ButtonVariant.primary,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: CustomButton(
                    text: 'Secondary Button',
                    onPressed: () {},
                    variant: ButtonVariant.secondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            Row(
              children: [
                Expanded(
                  child: CustomButton(
                    text: 'Outline Button',
                    onPressed: () {},
                    variant: ButtonVariant.outline,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: CustomButton(
                    text: 'Text Button',
                    onPressed: () {},
                    variant: ButtonVariant.text,
                  ),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTypographySection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Typography',
          style: AppTypography.headlineSmall(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Display Large',
              style: AppTypography.displayLarge(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
            Text(
              'Headline Medium',
              style: AppTypography.headlineMedium(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
            Text(
              'Title Large',
              style: AppTypography.titleLarge(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
            Text(
              'Body Large',
              style: AppTypography.bodyLarge(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
            ),
            Text(
              'Body Medium',
              style: AppTypography.bodyMedium(
                color: isDark
                    ? AppColors.textTertiaryDark
                    : AppColors.textTertiaryLight,
              ),
            ),
            Text(
              'Label Medium',
              style: AppTypography.labelMedium(
                color: AppColors.getPrimaryColor(isDark),
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
