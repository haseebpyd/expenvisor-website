import 'dart:ui';
import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

/// Glassmorphism container widget for modern UI effects
///
/// Provides frosted glass effect with backdrop blur and transparency
/// Optimized for both light and dark modes with emerald theme
class GlassContainer extends StatelessWidget {
  final Widget child;
  final double opacity;
  final double blur;
  final BorderRadius? borderRadius;
  final EdgeInsets? padding;
  final EdgeInsets? margin;
  final double? width;
  final double? height;
  final Color? borderColor;
  final double borderWidth;
  final List<BoxShadow>? boxShadow;

  const GlassContainer({
    super.key,
    required this.child,
    this.opacity = 0.7,
    this.blur = 20.0,
    this.borderRadius,
    this.padding,
    this.margin,
    this.width,
    this.height,
    this.borderColor,
    this.borderWidth = 1.0,
    this.boxShadow,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: width,
      height: height,
      margin: margin,
      child: ClipRRect(
        borderRadius: borderRadius ?? BorderRadius.circular(16),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
          child: Container(
            padding: padding,
            decoration: BoxDecoration(
              color: _getBackgroundColor(isDark),
              borderRadius: borderRadius ?? BorderRadius.circular(16),
              border: Border.all(
                color: _getBorderColor(isDark),
                width: borderWidth,
              ),
              boxShadow: boxShadow ?? _getDefaultShadow(isDark),
            ),
            child: child,
          ),
        ),
      ),
    );
  }

  Color _getBackgroundColor(bool isDark) {
    if (isDark) {
      return const Color(0xFF1F2937).withOpacity(opacity); // Gray 800
    } else {
      return Colors.white.withOpacity(opacity);
    }
  }

  Color _getBorderColor(bool isDark) {
    if (borderColor != null) return borderColor!;

    if (isDark) {
      return AppColors.primaryHighContrastDark.withOpacity(0.2); // Emerald 400
    } else {
      return AppColors.primary.withOpacity(0.2); // Emerald 500
    }
  }

  List<BoxShadow> _getDefaultShadow(bool isDark) {
    if (isDark) {
      return [
        BoxShadow(
          color: Colors.black.withOpacity(0.5),
          blurRadius: 32,
          offset: const Offset(0, 8),
        ),
      ];
    } else {
      return [
        BoxShadow(
          color: AppColors.primary.withOpacity(0.1),
          blurRadius: 32,
          offset: const Offset(0, 8),
        ),
      ];
    }
  }
}

/// Glassmorphism card variant with predefined styling
class GlassCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final EdgeInsets? margin;
  final double? width;
  final double? height;
  final VoidCallback? onTap;

  const GlassCard({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.width,
    this.height,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    Widget card = GlassContainer(
      padding: padding ?? const EdgeInsets.all(20),
      margin: margin,
      width: width,
      height: height,
      child: child,
    );

    if (onTap != null) {
      return GestureDetector(
        onTap: onTap,
        child: card,
      );
    }

    return card;
  }
}

/// Glassmorphism modal variant
class GlassModal extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final double? maxWidth;
  final double? maxHeight;

  const GlassModal({
    super.key,
    required this.child,
    this.padding,
    this.maxWidth,
    this.maxHeight,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: maxWidth ?? 500,
          maxHeight: maxHeight ?? MediaQuery.of(context).size.height * 0.8,
        ),
        child: GlassContainer(
          padding: padding ?? const EdgeInsets.all(24),
          borderRadius: BorderRadius.circular(20),
          child: child,
        ),
      ),
    );
  }
}

/// Glassmorphism bottom sheet variant
class GlassBottomSheet extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final double? height;

  const GlassBottomSheet({
    super.key,
    required this.child,
    this.padding,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height ?? MediaQuery.of(context).size.height * 0.6,
      child: GlassContainer(
        padding: padding ?? const EdgeInsets.all(24),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
        child: Column(
          children: [
            // Handle bar
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: Theme.of(context).brightness == Brightness.dark
                    ? Colors.grey[600]
                    : Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Expanded(child: child),
          ],
        ),
      ),
    );
  }
}
