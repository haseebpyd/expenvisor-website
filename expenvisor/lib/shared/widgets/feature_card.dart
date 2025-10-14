import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_spacing.dart';
import '../../core/theme/app_typography.dart';
import 'glass_container.dart';

/// Modern feature card with emerald theme and glassmorphism
///
/// Used for displaying features, stats, and important information
/// Supports both light and dark modes with smooth animations
class FeatureCard extends StatefulWidget {
  final String title;
  final String? subtitle;
  final String? description;
  final IconData? icon;
  final Widget? child;
  final VoidCallback? onTap;
  final Color? backgroundColor;
  final Color? iconColor;
  final bool useGlassmorphism;
  final EdgeInsets? padding;
  final EdgeInsets? margin;
  final double? width;
  final double? height;
  final bool showGradient;
  final List<Color>? gradientColors;

  const FeatureCard({
    super.key,
    required this.title,
    this.subtitle,
    this.description,
    this.icon,
    this.child,
    this.onTap,
    this.backgroundColor,
    this.iconColor,
    this.useGlassmorphism = false,
    this.padding,
    this.margin,
    this.width,
    this.height,
    this.showGradient = false,
    this.gradientColors,
  });

  @override
  State<FeatureCard> createState() => _FeatureCardState();
}

class _FeatureCardState extends State<FeatureCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    Widget card = AnimatedBuilder(
      animation: _animationController,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: _buildCard(isDark),
        );
      },
    );

    if (widget.onTap != null) {
      return GestureDetector(
        onTapDown: (_) => _animationController.forward(),
        onTapUp: (_) {
          _animationController.reverse();
          widget.onTap!();
        },
        onTapCancel: () => _animationController.reverse(),
        child: card,
      );
    }

    return card;
  }

  Widget _buildCard(bool isDark) {
    if (widget.useGlassmorphism) {
      return GlassCard(
        padding: widget.padding ?? const EdgeInsets.all(AppSpacing.lg),
        margin: widget.margin,
        width: widget.width,
        height: widget.height,
        child: _buildCardContent(isDark),
      );
    }

    return Container(
      width: widget.width,
      height: widget.height,
      margin: widget.margin,
      decoration: BoxDecoration(
        color: widget.backgroundColor ?? _getCardColor(isDark),
        gradient: widget.showGradient ? _getGradient(isDark) : null,
        borderRadius: BorderRadius.circular(AppSpacing.radiusXLarge),
        border: _getBorder(isDark),
        boxShadow: _getShadow(isDark),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: widget.onTap,
          borderRadius: BorderRadius.circular(AppSpacing.radiusXLarge),
          child: Padding(
            padding: widget.padding ?? const EdgeInsets.all(AppSpacing.lg),
            child: _buildCardContent(isDark),
          ),
        ),
      ),
    );
  }

  Widget _buildCardContent(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.icon != null) ...[
          _buildIcon(isDark),
          const SizedBox(height: AppSpacing.md),
        ],
        _buildTitle(isDark),
        if (widget.subtitle != null) ...[
          const SizedBox(height: AppSpacing.xs),
          _buildSubtitle(isDark),
        ],
        if (widget.description != null) ...[
          const SizedBox(height: AppSpacing.sm),
          _buildDescription(isDark),
        ],
        if (widget.child != null) ...[
          const SizedBox(height: AppSpacing.md),
          widget.child!,
        ],
      ],
    );
  }

  Widget _buildIcon(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: widget.iconColor ??
            AppColors.getPrimaryColor(isDark).withOpacity(0.1),
        borderRadius: BorderRadius.circular(AppSpacing.radiusLarge),
      ),
      child: Icon(
        widget.icon,
        size: AppSpacing.iconXLarge,
        color: widget.iconColor ?? AppColors.getPrimaryColor(isDark),
      ),
    );
  }

  Widget _buildTitle(bool isDark) {
    return Text(
      widget.title,
      style: AppTypography.titleLarge(
        color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
        fontWeight: FontWeight.w600,
      ),
    );
  }

  Widget _buildSubtitle(bool isDark) {
    return Text(
      widget.subtitle!,
      style: AppTypography.bodyLarge(
        color:
            isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
        fontWeight: FontWeight.w500,
      ),
    );
  }

  Widget _buildDescription(bool isDark) {
    return Text(
      widget.description!,
      style: AppTypography.bodyMedium(
        color:
            isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
      ),
    );
  }

  Color _getCardColor(bool isDark) {
    if (widget.backgroundColor != null) return widget.backgroundColor!;

    if (isDark) {
      return AppColors.surfaceElevatedDark; // Gray 800
    } else {
      return Colors.white;
    }
  }

  LinearGradient? _getGradient(bool isDark) {
    if (widget.gradientColors != null) {
      return LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: widget.gradientColors!,
      );
    }

    if (isDark) {
      return LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          AppColors.primaryHighContrastDark.withOpacity(0.1),
          AppColors.secondaryHighContrastDark.withOpacity(0.05),
        ],
      );
    } else {
      return LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [
          AppColors.primary.withOpacity(0.05),
          AppColors.secondary.withOpacity(0.02),
        ],
      );
    }
  }

  Border? _getBorder(bool isDark) {
    if (isDark) {
      return Border.all(
        color: AppColors.borderDark.withOpacity(0.5),
        width: 1,
      );
    } else {
      return Border.all(
        color: AppColors.borderLight,
        width: 1,
      );
    }
  }

  List<BoxShadow> _getShadow(bool isDark) {
    if (isDark) {
      return [
        BoxShadow(
          color: Colors.black.withOpacity(0.3),
          blurRadius: 16,
          offset: const Offset(0, 4),
        ),
        BoxShadow(
          color: AppColors.primaryHighContrastDark.withOpacity(0.1),
          blurRadius: 32,
          offset: const Offset(0, 8),
        ),
      ];
    } else {
      return [
        BoxShadow(
          color: Colors.black.withOpacity(0.05),
          blurRadius: 8,
          offset: const Offset(0, 2),
        ),
        BoxShadow(
          color: AppColors.primary.withOpacity(0.1),
          blurRadius: 16,
          offset: const Offset(0, 4),
        ),
      ];
    }
  }
}

/// Specialized balance card with emerald gradient
class BalanceCard extends StatelessWidget {
  final String amount;
  final String? label;
  final String? subtitle;
  final IconData? icon;
  final VoidCallback? onTap;
  final bool isPositive;

  const BalanceCard({
    super.key,
    required this.amount,
    this.label,
    this.subtitle,
    this.icon,
    this.onTap,
    this.isPositive = true,
  });

  @override
  Widget build(BuildContext context) {
    return FeatureCard(
      title: amount,
      subtitle: label,
      description: subtitle,
      icon: icon,
      onTap: onTap,
      useGlassmorphism: true,
      showGradient: true,
      gradientColors: isPositive
          ? [
              AppColors.primary.withOpacity(0.1),
              AppColors.primaryLight.withOpacity(0.05),
            ]
          : [
              AppColors.error.withOpacity(0.1),
              AppColors.errorLight.withOpacity(0.05),
            ],
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: (isPositive ? AppColors.primary : AppColors.error)
              .withOpacity(0.1),
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        ),
        child: Text(
          isPositive ? 'Income' : 'Expense',
          style: AppTypography.labelMedium(
            color: isPositive ? AppColors.primary : AppColors.error,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}

/// AI feature card with violet accent
class AIFeatureCard extends StatelessWidget {
  final String title;
  final String? description;
  final IconData icon;
  final VoidCallback? onTap;
  final Widget? child;

  const AIFeatureCard({
    super.key,
    required this.title,
    this.description,
    required this.icon,
    this.onTap,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return FeatureCard(
      title: title,
      description: description,
      icon: icon,
      onTap: onTap,
      useGlassmorphism: true,
      iconColor: AppColors.getAiFeaturesColor(isDark),
      gradientColors: [
        AppColors.getAiFeaturesColor(isDark).withOpacity(0.1),
        AppColors.getAiFeaturesColor(isDark).withOpacity(0.05),
      ],
      child: child,
    );
  }
}
