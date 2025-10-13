import 'package:flutter/material.dart';

/// Midnight Aurora Color Scheme for Expenvisor
///
/// Primary: Midnight Blue (#191970) - Deep, trustworthy, tech-forward
/// Accent: Electric Mint (#00FFA3) - Vibrant, energetic, futuristic
/// Secondary: Soft Purple (#A78BFA) - AI features, premium feel
class AppColors {
  // Private constructor to prevent instantiation
  AppColors._();

  // Primary Brand Colors
  static const Color primary = Color(0xFF191970); // Midnight Blue
  static const Color primaryLight = Color(0xFF2E2E8B);
  static const Color primaryDark = Color(0xFF0A0A30);

  // Accent Colors
  static const Color accent = Color(0xFF00FFA3); // Electric Mint
  static const Color accentLight = Color(0xFF33FFBA);
  static const Color accentDark = Color(0xFF00CC82);

  // Secondary Colors
  static const Color secondary = Color(0xFFA78BFA); // Soft Purple
  static const Color secondaryLight = Color(0xFFC4B5FD);
  static const Color secondaryDark = Color(0xFF8B5CF6);

  // Dark mode optimized secondary colors for better contrast
  static const Color secondaryDarkMode =
      Color(0xFFC4B5FD); // Much brighter purple for dark mode
  static const Color secondaryLightDarkMode =
      Color(0xFFE0E7FF); // Very bright for dark mode
  static const Color secondaryContainerDarkMode =
      Color(0xFF8B5CF6); // Medium purple for containers

  // Light Mode Colors
  static const Color backgroundLight = Color(0xFFFFFFFF); // Pure White
  static const Color surfaceLight = Color(0xFFF8FAFC); // Slate-50
  static const Color surfaceElevatedLight = Color(0xFFFFFFFF);
  static const Color borderLight = Color(0xFFE2E8F0); // Slate-200
  static const Color dividerLight = Color(0xFFCBD5E1); // Slate-300

  // Dark Mode Colors (OLED Optimized)
  static const Color backgroundDark =
      Color(0xFF000000); // True Black (60% battery savings)
  static const Color surfaceDark =
      Color(0xFF0A0A0F); // Near Black with blue tint
  static const Color surfaceElevatedDark = Color(0xFF1A1A2E); // Dark blue-gray
  static const Color borderDark = Color(0xFF242438); // Subtle border
  static const Color dividerDark = Color(0xFF2D2D40); // Dark divider

  // Text Colors
  static const Color textPrimaryLight = Color(0xFF0F172A); // Slate-900
  static const Color textSecondaryLight = Color(0xFF64748B); // Slate-500
  static const Color textTertiaryLight = Color(0xFF94A3B8); // Slate-400
  static const Color textDisabledLight = Color(0xFFCBD5E1); // Slate-300

  static const Color textPrimaryDark = Color(0xFFFFFFFF); // Pure White
  static const Color textSecondaryDark = Color(0xFF94A3B8); // Slate-400
  static const Color textTertiaryDark = Color(0xFF64748B); // Slate-500
  static const Color textDisabledDark = Color(0xFF475569); // Slate-600

  // Semantic Colors
  static const Color income =
      Color(0xFF00FFA3); // Electric Mint (matches accent!)
  static const Color incomeBackgroundLight = Color(0xFFECFDF5); // Emerald-50
  static const Color incomeBackgroundDark = Color(0xFF064E3B); // Emerald-900

  static const Color expense =
      Color(0xFFFF6B9D); // Coral Pink (softer than red)
  static const Color expenseBackgroundLight = Color(0xFFFFF1F2); // Rose-50
  static const Color expenseBackgroundDark = Color(0xFF881337); // Rose-900

  static const Color aiFeatures = Color(0xFFA78BFA); // Soft Purple
  static const Color aiFeaturesLight = Color(0xFFC4B5FD); // Brighter for OLED
  static const Color aiBackgroundLight = Color(0xFFF5F3FF); // Violet-50
  static const Color aiBackgroundDark = Color(0xFF4C1D95); // Violet-900

  // Dark mode optimized AI colors for better contrast
  static const Color aiFeaturesDarkMode =
      Color(0xFFC4B5FD); // Much brighter purple for dark mode
  static const Color aiFeaturesLightDarkMode =
      Color(0xFFE0E7FF); // Very bright for dark mode
  static const Color aiFeaturesContainerDarkMode =
      Color(0xFF8B5CF6); // Medium purple for containers

  static const Color warning = Color(0xFFF59E0B); // Amber-500
  static const Color warningLight = Color(0xFFFBBF24); // Amber-400
  static const Color warningBackgroundLight = Color(0xFFFFFBEB); // Amber-50
  static const Color warningBackgroundDark = Color(0xFF78350F); // Amber-900

  static const Color success = Color(0xFF00FFA3); // Electric Mint
  static const Color error = Color(0xFFEF4444); // Red-500
  static const Color errorLight = Color(0xFFF87171); // Red-400
  static const Color errorBackgroundLight = Color(0xFFFEF2F2); // Red-50
  static const Color errorBackgroundDark = Color(0xFF7F1D1D); // Red-900

  static const Color info = Color(0xFF3B82F6); // Blue-500
  static const Color infoLight = Color(0xFF60A5FA); // Blue-400

  // Chart/Data Visualization Colors
  static const List<Color> chartColors = [
    Color(0xFF00FFA3), // Electric Mint - Primary data
    Color(0xFFA78BFA), // Soft Purple - Secondary data
    Color(0xFFFF6B9D), // Coral Pink - Tertiary data
    Color(0xFFFFA500), // Warm Orange - Quaternary data
    Color(0xFF00D9FF), // Cyan - Quinary data
    Color(0xFFFFD700), // Gold - Additional data
  ];

  // Gradient Definitions
  static const LinearGradient heroGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF191970), // Midnight Blue
      Color(0xFFA78BFA), // Soft Purple
      Color(0xFF00FFA3), // Electric Mint
    ],
  );

  static const LinearGradient successGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF00FFA3), // Electric Mint
      Color(0xFF00D9FF), // Cyan
    ],
  );

  static const LinearGradient premiumGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFFA78BFA), // Soft Purple
      Color(0xFF00FFA3), // Electric Mint
    ],
  );

  static const LinearGradient aiGlowGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFFA78BFA), // Soft Purple
      Color(0xFFC4B5FD), // Purple Light
    ],
  );

  // Helper methods for theme-aware colors
  static Color getBackgroundColor(bool isDark) =>
      isDark ? backgroundDark : backgroundLight;
  static Color getSurfaceColor(bool isDark) =>
      isDark ? surfaceDark : surfaceLight;
  static Color getSurfaceElevatedColor(bool isDark) =>
      isDark ? surfaceElevatedDark : surfaceElevatedLight;
  static Color getBorderColor(bool isDark) => isDark ? borderDark : borderLight;
  static Color getTextPrimaryColor(bool isDark) =>
      isDark ? textPrimaryDark : textPrimaryLight;
  static Color getTextSecondaryColor(bool isDark) =>
      isDark ? textSecondaryDark : textSecondaryLight;
  static Color getTextTertiaryColor(bool isDark) =>
      isDark ? textTertiaryDark : textTertiaryLight;
  static Color getTextDisabledColor(bool isDark) =>
      isDark ? textDisabledDark : textDisabledLight;

  // High contrast colors for dark mode
  static const Color primaryHighContrastDark =
      Color(0xFF60A5FA); // Bright blue for dark mode
  static const Color secondaryHighContrastDark =
      Color(0xFFC4B5FD); // Bright purple for dark mode
  static const Color aiFeaturesHighContrastDark =
      Color(0xFFC4B5FD); // Bright purple for dark mode
  static const Color accentHighContrastDark =
      Color(0xFF34D399); // Bright mint for dark mode

  // High contrast helpers for dark mode
  static Color getPrimaryColor(bool isDark) =>
      isDark ? primaryHighContrastDark : primary;
  static Color getSecondaryColor(bool isDark) =>
      isDark ? secondaryHighContrastDark : secondary;
  static Color getAiFeaturesColor(bool isDark) =>
      isDark ? aiFeaturesHighContrastDark : aiFeatures;
  static Color getAccentColor(bool isDark) =>
      isDark ? accentHighContrastDark : accent;
}
