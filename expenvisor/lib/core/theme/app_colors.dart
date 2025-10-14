import 'package:flutter/material.dart';

/// Emerald Color Scheme for Expenvisor
///
/// Primary: Emerald (#10B981) - Trust, growth, financial stability
/// Accent: Emerald variants - Modern, fresh, prosperous
/// Secondary: Violet (#8B5CF6) - AI features, premium feel
class AppColors {
  // Private constructor to prevent instantiation
  AppColors._();

  // Primary Brand Colors - Emerald
  static const Color primary = Color(0xFF10B981); // Emerald 500
  static const Color primaryLight = Color(0xFF34D399); // Emerald 400
  static const Color primaryDark = Color(0xFF059669); // Emerald 600

  // Accent Colors - Emerald variants
  static const Color accent = Color(0xFF10B981); // Emerald 500
  static const Color accentLight = Color(0xFF34D399); // Emerald 400
  static const Color accentDark = Color(0xFF059669); // Emerald 600

  // Secondary Colors - Violet for AI features
  static const Color secondary = Color(0xFF8B5CF6); // Violet 500
  static const Color secondaryLight = Color(0xFFA78BFA); // Violet 400
  static const Color secondaryDark = Color(0xFF7C3AED); // Violet 600

  // Dark mode optimized secondary colors for better contrast
  static const Color secondaryDarkMode =
      Color(0xFFA78BFA); // Violet 400 for dark mode
  static const Color secondaryLightDarkMode =
      Color(0xFFC4B5FD); // Violet 300 for dark mode
  static const Color secondaryContainerDarkMode =
      Color(0xFF8B5CF6); // Violet 500 for containers

  // Light Mode Colors
  static const Color backgroundLight = Color(0xFFFFFFFF); // Pure White
  static const Color surfaceLight = Color(0xFFF9FAFB); // Gray 50
  static const Color surfaceElevatedLight = Color(0xFFFFFFFF);
  static const Color borderLight = Color(0xFFE5E7EB); // Gray 200
  static const Color dividerLight = Color(0xFFE5E7EB); // Gray 200

  // Dark Mode Colors (OLED Optimized)
  static const Color backgroundDark =
      Color(0xFF030712); // Gray 950 (True Black for OLED)
  static const Color surfaceDark = Color(0xFF111827); // Gray 900
  static const Color surfaceElevatedDark = Color(0xFF1F2937); // Gray 800
  static const Color borderDark = Color(0xFF374151); // Gray 700
  static const Color dividerDark = Color(0xFF374151); // Gray 700

  // Text Colors
  static const Color textPrimaryLight = Color(0xFF374151); // Gray 700
  static const Color textSecondaryLight = Color(0xFF4B5563); // Gray 600
  static const Color textTertiaryLight = Color(0xFF6B7280); // Gray 500
  static const Color textDisabledLight = Color(0xFF9CA3AF); // Gray 400

  static const Color textPrimaryDark = Color(0xFFD1D5DB); // Gray 300
  static const Color textSecondaryDark = Color(0xFF9CA3AF); // Gray 400
  static const Color textTertiaryDark = Color(0xFF6B7280); // Gray 500
  static const Color textDisabledDark = Color(0xFF4B5563); // Gray 600

  // Semantic Colors
  static const Color income =
      Color(0xFF10B981); // Emerald 500 (matches primary!)
  static const Color incomeBackgroundLight = Color(0xFFECFDF5); // Emerald 50
  static const Color incomeBackgroundDark = Color(0xFF022C22); // Emerald 950

  static const Color expense = Color(0xFFEF4444); // Red 500
  static const Color expenseBackgroundLight = Color(0xFFFEF2F2); // Red 50
  static const Color expenseBackgroundDark = Color(0xFF7F1D1D); // Red 900

  static const Color aiFeatures = Color(0xFF8B5CF6); // Violet 500
  static const Color aiFeaturesLight = Color(0xFFA78BFA); // Violet 400
  static const Color aiBackgroundLight = Color(0xFFF5F3FF); // Violet 50
  static const Color aiBackgroundDark = Color(0xFF2E1065); // Violet 950

  // Dark mode optimized AI colors for better contrast
  static const Color aiFeaturesDarkMode =
      Color(0xFFA78BFA); // Violet 400 for dark mode
  static const Color aiFeaturesLightDarkMode =
      Color(0xFFC4B5FD); // Violet 300 for dark mode
  static const Color aiFeaturesContainerDarkMode =
      Color(0xFF8B5CF6); // Violet 500 for containers

  static const Color warning = Color(0xFFF59E0B); // Amber 500
  static const Color warningLight = Color(0xFFFBBF24); // Amber 400
  static const Color warningBackgroundLight = Color(0xFFFFFBEB); // Amber 50
  static const Color warningBackgroundDark = Color(0xFF78350F); // Amber 900

  static const Color success = Color(0xFF10B981); // Emerald 500
  static const Color error = Color(0xFFEF4444); // Red 500
  static const Color errorLight = Color(0xFFF87171); // Red 400
  static const Color errorBackgroundLight = Color(0xFFFEF2F2); // Red 50
  static const Color errorBackgroundDark = Color(0xFF7F1D1D); // Red 900

  static const Color info = Color(0xFF3B82F6); // Blue 500
  static const Color infoLight = Color(0xFF60A5FA); // Blue 400

  // Chart/Data Visualization Colors
  static const List<Color> chartColors = [
    Color(0xFF10B981), // Emerald 500 - Primary data (Income)
    Color(0xFFEF4444), // Red 500 - Secondary data (Expense)
    Color(0xFF8B5CF6), // Violet 500 - Tertiary data (AI predictions)
    Color(0xFF3B82F6), // Blue 500 - Quaternary data
    Color(0xFFF59E0B), // Amber 500 - Quinary data
    Color(0xFFEC4899), // Pink 500 - Additional data
  ];

  // Gradient Definitions
  static const LinearGradient heroGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF10B981), // Emerald 500
      Color(0xFF8B5CF6), // Violet 500
      Color(0xFF34D399), // Emerald 400
    ],
  );

  static const LinearGradient successGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF10B981), // Emerald 500
      Color(0xFF34D399), // Emerald 400
    ],
  );

  static const LinearGradient premiumGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF8B5CF6), // Violet 500
      Color(0xFF10B981), // Emerald 500
    ],
  );

  static const LinearGradient aiGlowGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [
      Color(0xFF8B5CF6), // Violet 500
      Color(0xFFA78BFA), // Violet 400
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
      Color(0xFF34D399); // Emerald 400 for dark mode
  static const Color secondaryHighContrastDark =
      Color(0xFFA78BFA); // Violet 400 for dark mode
  static const Color aiFeaturesHighContrastDark =
      Color(0xFFA78BFA); // Violet 400 for dark mode
  static const Color accentHighContrastDark =
      Color(0xFF34D399); // Emerald 400 for dark mode

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
