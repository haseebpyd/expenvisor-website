import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/theme/app_spacing.dart';

/// Custom button widget with Midnight Aurora styling
///
/// Supports different variants: primary, secondary, outline, text
/// Includes loading states and custom sizing
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final ButtonSize size;
  final bool isLoading;
  final bool isFullWidth;
  final IconData? icon;
  final Color? customColor;
  final Widget? child;

  const CustomButton({
    super.key,
    required this.text,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.size = ButtonSize.medium,
    this.isLoading = false,
    this.isFullWidth = false,
    this.icon,
    this.customColor,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    final isEnabled = onPressed != null && !isLoading;

    return SizedBox(
      width: isFullWidth ? double.infinity : null,
      height: _getHeight(),
      child: _buildButton(context, isEnabled),
    );
  }

  Widget _buildButton(BuildContext context, bool isEnabled) {
    switch (variant) {
      case ButtonVariant.primary:
        return ElevatedButton(
          onPressed: isEnabled ? onPressed : null,
          style: _getPrimaryStyle(context),
          child: _buildContent(),
        );
      case ButtonVariant.secondary:
        return ElevatedButton(
          onPressed: isEnabled ? onPressed : null,
          style: _getSecondaryStyle(context),
          child: _buildContent(),
        );
      case ButtonVariant.outline:
        return OutlinedButton(
          onPressed: isEnabled ? onPressed : null,
          style: _getOutlineStyle(context),
          child: _buildContent(),
        );
      case ButtonVariant.text:
        return TextButton(
          onPressed: isEnabled ? onPressed : null,
          style: _getTextButtonStyle(context),
          child: _buildContent(),
        );
      case ButtonVariant.gradient:
        return Container(
          decoration: BoxDecoration(
            gradient: customColor != null
                ? LinearGradient(
                    colors: [customColor!, customColor!.withOpacity(0.8)])
                : AppColors.heroGradient,
            borderRadius: BorderRadius.circular(_getRadius()),
          ),
          child: ElevatedButton(
            onPressed: isEnabled ? onPressed : null,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.transparent,
              shadowColor: Colors.transparent,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(_getRadius()),
              ),
            ),
            child: _buildContent(),
          ),
        );
    }
  }

  Widget _buildContent() {
    if (isLoading) {
      return SizedBox(
        width: _getIconSize(),
        height: _getIconSize(),
        child: CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(
            variant == ButtonVariant.outline || variant == ButtonVariant.text
                ? AppColors.primary
                : Colors.white,
          ),
        ),
      );
    }

    if (child != null) {
      return child!;
    }

    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: _getIconSize()),
          const SizedBox(width: AppSpacing.sm),
          Text(text, style: _getTextStyle()),
        ],
      );
    }

    return Text(text, style: _getTextStyle());
  }

  ButtonStyle _getPrimaryStyle(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final buttonColor = customColor ?? AppColors.getPrimaryColor(isDark);
    
    return ElevatedButton.styleFrom(
      backgroundColor: buttonColor,
      foregroundColor: Colors.white,
      elevation: 2,
      shadowColor: buttonColor.withOpacity(0.3),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(_getRadius()),
      ),
      padding: _getPadding(),
    );
  }

  ButtonStyle _getSecondaryStyle(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final buttonColor = AppColors.getSecondaryColor(isDark);
    
    return ElevatedButton.styleFrom(
      backgroundColor: buttonColor,
      foregroundColor: Colors.white,
      elevation: 2,
      shadowColor: buttonColor.withOpacity(0.3),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(_getRadius()),
      ),
      padding: _getPadding(),
    );
  }

  ButtonStyle _getOutlineStyle(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final buttonColor = customColor ?? AppColors.getPrimaryColor(isDark);
    
    return OutlinedButton.styleFrom(
      foregroundColor: buttonColor,
      side: BorderSide(
        color: buttonColor,
        width: 1.5,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(_getRadius()),
      ),
      padding: _getPadding(),
    );
  }

  ButtonStyle _getTextButtonStyle(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final buttonColor = customColor ?? AppColors.getPrimaryColor(isDark);
    
    return TextButton.styleFrom(
      foregroundColor: buttonColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(_getRadius()),
      ),
      padding: _getPadding(),
    );
  }

  double _getHeight() {
    switch (size) {
      case ButtonSize.small:
        return AppSpacing.buttonHeightSmall;
      case ButtonSize.medium:
        return AppSpacing.buttonHeightMedium;
      case ButtonSize.large:
        return AppSpacing.buttonHeightLarge;
      case ButtonSize.xlarge:
        return AppSpacing.buttonHeightXLarge;
    }
  }

  double _getRadius() {
    switch (size) {
      case ButtonSize.small:
        return AppSpacing.radiusSmall;
      case ButtonSize.medium:
        return AppSpacing.radiusMedium;
      case ButtonSize.large:
        return AppSpacing.radiusLarge;
      case ButtonSize.xlarge:
        return AppSpacing.radiusXLarge;
    }
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case ButtonSize.small:
        return const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        );
      case ButtonSize.medium:
        return const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.md,
        );
      case ButtonSize.large:
        return const EdgeInsets.symmetric(
          horizontal: AppSpacing.xl,
          vertical: AppSpacing.lg,
        );
      case ButtonSize.xlarge:
        return const EdgeInsets.symmetric(
          horizontal: AppSpacing.xxl,
          vertical: AppSpacing.xl,
        );
    }
  }

  double _getIconSize() {
    switch (size) {
      case ButtonSize.small:
        return AppSpacing.iconSmall;
      case ButtonSize.medium:
        return AppSpacing.iconMedium;
      case ButtonSize.large:
        return AppSpacing.iconLarge;
      case ButtonSize.xlarge:
        return AppSpacing.iconXLarge;
    }
  }

  TextStyle _getTextStyle() {
    switch (size) {
      case ButtonSize.small:
        return AppTypography.labelSmall(
          color:
              variant == ButtonVariant.outline || variant == ButtonVariant.text
                  ? (customColor ?? AppColors.primary)
                  : Colors.white,
        );
      case ButtonSize.medium:
        return AppTypography.labelMedium(
          color:
              variant == ButtonVariant.outline || variant == ButtonVariant.text
                  ? (customColor ?? AppColors.primary)
                  : Colors.white,
        );
      case ButtonSize.large:
        return AppTypography.labelLarge(
          color:
              variant == ButtonVariant.outline || variant == ButtonVariant.text
                  ? (customColor ?? AppColors.primary)
                  : Colors.white,
        );
      case ButtonSize.xlarge:
        return AppTypography.titleMedium(
          color:
              variant == ButtonVariant.outline || variant == ButtonVariant.text
                  ? (customColor ?? AppColors.primary)
                  : Colors.white,
        );
    }
  }
}

/// Button variants
enum ButtonVariant {
  primary,
  secondary,
  outline,
  text,
  gradient,
}

/// Button sizes
enum ButtonSize {
  small,
  medium,
  large,
  xlarge,
}

/// Specialized button for expense/income actions
class ActionButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final IconData icon;
  final bool isIncome;
  final bool isLoading;

  const ActionButton({
    super.key,
    required this.text,
    required this.icon,
    this.onPressed,
    this.isIncome = false,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    return CustomButton(
      text: text,
      icon: icon,
      onPressed: onPressed,
      isLoading: isLoading,
      variant: ButtonVariant.gradient,
      customColor: isIncome ? AppColors.income : AppColors.expense,
      size: ButtonSize.large,
      isFullWidth: true,
    );
  }
}

/// FAB (Floating Action Button) with custom styling
class CustomFAB extends StatelessWidget {
  final VoidCallback? onPressed;
  final IconData icon;
  final String? tooltip;
  final bool isExtended;
  final String? label;

  const CustomFAB({
    super.key,
    this.onPressed,
    required this.icon,
    this.tooltip,
    this.isExtended = false,
    this.label,
  });

  @override
  Widget build(BuildContext context) {
    if (isExtended && label != null) {
      return FloatingActionButton.extended(
        onPressed: onPressed,
        icon: Icon(icon),
        label: Text(label!),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        tooltip: tooltip,
      );
    }

    return FloatingActionButton(
      onPressed: onPressed,
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
      tooltip: tooltip,
      child: Icon(icon),
    );
  }
}
