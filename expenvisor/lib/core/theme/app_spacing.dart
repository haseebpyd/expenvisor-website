import 'package:flutter/material.dart';

/// Spacing system for Expenvisor
///
/// Based on 4px base unit for consistent spacing throughout the app
/// 4, 8, 12, 16, 24, 32, 48, 64
class AppSpacing {
  // Private constructor to prevent instantiation
  AppSpacing._();

  // Base unit: 4px
  static const double baseUnit = 4.0;

  // Spacing scale
  static const double xs = baseUnit; // 4px
  static const double sm = baseUnit * 2; // 8px
  static const double md = baseUnit * 3; // 12px
  static const double lg = baseUnit * 4; // 16px
  static const double xl = baseUnit * 6; // 24px
  static const double xxl = baseUnit * 8; // 32px
  static const double xxxl = baseUnit * 12; // 48px
  static const double huge = baseUnit * 16; // 64px

  // Specific spacing for common use cases
  static const double paddingTiny = xs; // 4px
  static const double paddingSmall = sm; // 8px
  static const double paddingMedium = lg; // 16px
  static const double paddingLarge = xl; // 24px
  static const double paddingXLarge = xxl; // 32px

  static const double marginTiny = xs; // 4px
  static const double marginSmall = sm; // 8px
  static const double marginMedium = lg; // 16px
  static const double marginLarge = xl; // 24px
  static const double marginXLarge = xxl; // 32px

  // Border radius
  static const double radiusTiny = xs; // 4px
  static const double radiusSmall = sm; // 8px
  static const double radiusMedium = md; // 12px
  static const double radiusLarge = lg; // 16px
  static const double radiusXLarge = xl; // 24px
  static const double radiusRound = 999; // Fully rounded

  // Icon sizes
  static const double iconTiny = 12; // 12px
  static const double iconSmall = 16; // 16px
  static const double iconMedium = 20; // 20px
  static const double iconLarge = 24; // 24px
  static const double iconXLarge = 32; // 32px
  static const double iconHuge = 48; // 48px

  // Button heights
  static const double buttonHeightSmall = 32; // 32px
  static const double buttonHeightMedium = 40; // 40px
  static const double buttonHeightLarge = 48; // 48px
  static const double buttonHeightXLarge = 56; // 56px

  // Input field heights
  static const double inputHeightSmall = 40; // 40px
  static const double inputHeightMedium = 48; // 48px
  static const double inputHeightLarge = 56; // 56px

  // Card dimensions
  static const double cardPadding = lg; // 16px
  static const double cardRadius = radiusMedium; // 12px
  static const double cardElevation = 2; // 2dp

  // Screen padding
  static const double screenPadding = lg; // 16px
  static const double screenPaddingLarge = xl; // 24px

  // List item spacing
  static const double listItemSpacing = sm; // 8px
  static const double listItemPadding = lg; // 16px

  // Bottom navigation
  static const double bottomNavHeight = 60; // 60px
  static const double bottomNavPadding = sm; // 8px

  // App bar
  static const double appBarHeight = 56; // 56px
  static const double appBarPadding = lg; // 16px

  // FAB (Floating Action Button)
  static const double fabSize = 56; // 56px
  static const double fabMiniSize = 40; // 40px
  static const double fabMargin = xl; // 24px

  // Divider
  static const double dividerThickness = 1; // 1px
  static const double dividerPadding = lg; // 16px

  // Helper methods for responsive spacing
  static double responsiveSpacing(double baseSpacing, double screenWidth) {
    if (screenWidth < 600) {
      return baseSpacing * 0.8; // Smaller spacing on mobile
    } else if (screenWidth < 900) {
      return baseSpacing; // Normal spacing on tablet
    } else {
      return baseSpacing * 1.2; // Larger spacing on desktop
    }
  }

  // Safe area padding helpers
  static const double safeAreaTop = 44; // iOS status bar height
  static const double safeAreaBottom = 34; // iOS home indicator height
  static const double safeAreaHorizontal = lg; // 16px

  // Animation durations (in milliseconds)
  static const int animationFast = 150;
  static const int animationMedium = 300;
  static const int animationSlow = 500;
  static const int animationVerySlow = 800;

  // Animation curves
  static const Curve animationCurve = Curves.easeInOut;
  static const Curve animationCurveFast = Curves.easeOut;
  static const Curve animationCurveSlow = Curves.easeInOutCubic;
}
