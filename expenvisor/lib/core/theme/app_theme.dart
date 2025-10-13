import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'app_colors.dart';
import 'app_typography.dart';
import 'app_spacing.dart';

/// Expenvisor App Theme
///
/// Implements Midnight Aurora design system with Material 3
/// Supports both light and dark modes with OLED optimization
class AppTheme {
  // Private constructor to prevent instantiation
  AppTheme._();

  /// Light theme configuration
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: _lightColorScheme,
      textTheme: _lightTextTheme,
      appBarTheme: _lightAppBarTheme,
      elevatedButtonTheme: _elevatedButtonTheme,
      outlinedButtonTheme: _outlinedButtonTheme,
      textButtonTheme: _textButtonTheme,
      inputDecorationTheme: _inputDecorationTheme,
      cardTheme: _cardTheme,
      bottomNavigationBarTheme: _bottomNavigationBarTheme,
      floatingActionButtonTheme: _floatingActionButtonTheme,
      dividerTheme: _dividerTheme,
      chipTheme: _chipTheme,
      iconTheme: _iconTheme,
      scaffoldBackgroundColor: AppColors.backgroundLight,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );
  }

  /// Dark theme configuration (OLED optimized)
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: _darkColorScheme,
      textTheme: _darkTextTheme,
      appBarTheme: _darkAppBarTheme,
      elevatedButtonTheme: _elevatedButtonTheme,
      outlinedButtonTheme: _outlinedButtonTheme,
      textButtonTheme: _textButtonTheme,
      inputDecorationTheme: _inputDecorationTheme,
      cardTheme: _cardTheme,
      bottomNavigationBarTheme: _bottomNavigationBarTheme,
      floatingActionButtonTheme: _floatingActionButtonTheme,
      dividerTheme: _dividerTheme,
      chipTheme: _chipTheme,
      iconTheme: _iconTheme,
      scaffoldBackgroundColor: AppColors.backgroundDark,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );
  }

  // Light Color Scheme
  static ColorScheme get _lightColorScheme {
    return const ColorScheme.light(
      primary: AppColors.primary,
      onPrimary: Colors.white,
      primaryContainer: AppColors.primaryLight,
      onPrimaryContainer: Colors.white,
      secondary: AppColors.secondary,
      onSecondary: Colors.white,
      secondaryContainer: AppColors.secondaryLight,
      onSecondaryContainer: Colors.white,
      tertiary: AppColors.accent,
      onTertiary: AppColors.primary,
      tertiaryContainer: AppColors.accentLight,
      onTertiaryContainer: AppColors.primary,
      error: AppColors.error,
      onError: Colors.white,
      errorContainer: AppColors.errorBackgroundLight,
      onErrorContainer: AppColors.error,
      surface: AppColors.surfaceLight,
      onSurface: AppColors.textPrimaryLight,
      surfaceContainerHighest: AppColors.surfaceElevatedLight,
      onSurfaceVariant: AppColors.textSecondaryLight,
      outline: AppColors.borderLight,
      outlineVariant: AppColors.dividerLight,
      shadow: Colors.black26,
      scrim: Colors.black54,
      inverseSurface: AppColors.primary,
      onInverseSurface: Colors.white,
      inversePrimary: AppColors.accent,
      surfaceTint: AppColors.primary,
    );
  }

  // Dark Color Scheme
  static ColorScheme get _darkColorScheme {
    return const ColorScheme.dark(
      primary: AppColors.primaryHighContrastDark, // High contrast blue for dark mode
      onPrimary: AppColors.primary,
      primaryContainer: AppColors.primaryHighContrastDark,
      onPrimaryContainer: AppColors.primary,
      secondary: AppColors.secondaryHighContrastDark, // High contrast purple for dark mode
      onSecondary: AppColors.primary,
      secondaryContainer: AppColors.secondaryContainerDarkMode, // Medium purple for containers
      onSecondaryContainer: AppColors.primary,
      tertiary: AppColors.accentHighContrastDark, // High contrast mint for dark mode
      onTertiary: AppColors.primary,
      tertiaryContainer: AppColors.accentHighContrastDark,
      onTertiaryContainer: AppColors.primary,
      error: AppColors.errorLight,
      onError: AppColors.primary,
      errorContainer: AppColors.errorBackgroundDark,
      onErrorContainer: AppColors.errorLight,
      surface: AppColors.surfaceDark,
      onSurface: AppColors.textPrimaryDark,
      surfaceContainerHighest: AppColors.surfaceElevatedDark,
      onSurfaceVariant: AppColors.textSecondaryDark,
      outline: AppColors.borderDark,
      outlineVariant: AppColors.dividerDark,
      shadow: Colors.black87,
      scrim: Colors.black87,
      inverseSurface: AppColors.accentHighContrastDark,
      onInverseSurface: AppColors.primary,
      inversePrimary: AppColors.primary,
      surfaceTint: AppColors.accentHighContrastDark,
    );
  }

  // Light Text Theme
  static TextTheme get _lightTextTheme {
    return TextTheme(
      displayLarge:
          AppTypography.displayLarge(color: AppColors.textPrimaryLight),
      displayMedium:
          AppTypography.displayMedium(color: AppColors.textPrimaryLight),
      displaySmall:
          AppTypography.displaySmall(color: AppColors.textPrimaryLight),
      headlineLarge:
          AppTypography.headlineLarge(color: AppColors.textPrimaryLight),
      headlineMedium:
          AppTypography.headlineMedium(color: AppColors.textPrimaryLight),
      headlineSmall:
          AppTypography.headlineSmall(color: AppColors.textPrimaryLight),
      titleLarge: AppTypography.titleLarge(color: AppColors.textPrimaryLight),
      titleMedium: AppTypography.titleMedium(color: AppColors.textPrimaryLight),
      titleSmall: AppTypography.titleSmall(color: AppColors.textPrimaryLight),
      bodyLarge: AppTypography.bodyLarge(color: AppColors.textPrimaryLight),
      bodyMedium: AppTypography.bodyMedium(color: AppColors.textPrimaryLight),
      bodySmall: AppTypography.bodySmall(color: AppColors.textSecondaryLight),
      labelLarge: AppTypography.labelLarge(color: AppColors.textPrimaryLight),
      labelMedium:
          AppTypography.labelMedium(color: AppColors.textSecondaryLight),
      labelSmall: AppTypography.labelSmall(color: AppColors.textTertiaryLight),
    );
  }

  // Dark Text Theme
  static TextTheme get _darkTextTheme {
    return TextTheme(
      displayLarge:
          AppTypography.displayLarge(color: AppColors.textPrimaryDark),
      displayMedium:
          AppTypography.displayMedium(color: AppColors.textPrimaryDark),
      displaySmall:
          AppTypography.displaySmall(color: AppColors.textPrimaryDark),
      headlineLarge:
          AppTypography.headlineLarge(color: AppColors.textPrimaryDark),
      headlineMedium:
          AppTypography.headlineMedium(color: AppColors.textPrimaryDark),
      headlineSmall:
          AppTypography.headlineSmall(color: AppColors.textPrimaryDark),
      titleLarge: AppTypography.titleLarge(color: AppColors.textPrimaryDark),
      titleMedium: AppTypography.titleMedium(color: AppColors.textPrimaryDark),
      titleSmall: AppTypography.titleSmall(color: AppColors.textPrimaryDark),
      bodyLarge: AppTypography.bodyLarge(color: AppColors.textPrimaryDark),
      bodyMedium: AppTypography.bodyMedium(color: AppColors.textPrimaryDark),
      bodySmall: AppTypography.bodySmall(color: AppColors.textSecondaryDark),
      labelLarge: AppTypography.labelLarge(color: AppColors.textPrimaryDark),
      labelMedium:
          AppTypography.labelMedium(color: AppColors.textSecondaryDark),
      labelSmall: AppTypography.labelSmall(color: AppColors.textTertiaryDark),
    );
  }

  // App Bar Themes
  static AppBarTheme get _lightAppBarTheme {
    return AppBarTheme(
      backgroundColor: AppColors.surfaceLight,
      foregroundColor: AppColors.textPrimaryLight,
      elevation: 0,
      centerTitle: true,
      titleTextStyle:
          AppTypography.titleLarge(color: AppColors.textPrimaryLight),
      systemOverlayStyle: const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        statusBarBrightness: Brightness.light,
      ),
    );
  }

  static AppBarTheme get _darkAppBarTheme {
    return AppBarTheme(
      backgroundColor: AppColors.surfaceDark,
      foregroundColor: AppColors.textPrimaryDark,
      elevation: 0,
      centerTitle: true,
      titleTextStyle:
          AppTypography.titleLarge(color: AppColors.textPrimaryDark),
      systemOverlayStyle: const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
        statusBarBrightness: Brightness.dark,
      ),
    );
  }

  // Button Themes
  static ElevatedButtonThemeData get _elevatedButtonTheme {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 2,
        shadowColor: AppColors.primary.withOpacity(0.3),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.md,
        ),
        minimumSize: const Size(0, AppSpacing.buttonHeightMedium),
        textStyle: AppTypography.labelLarge(color: Colors.white),
      ),
    );
  }

  static OutlinedButtonThemeData get _outlinedButtonTheme {
    return OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.primary,
        side: const BorderSide(color: AppColors.primary, width: 1.5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.md,
        ),
        minimumSize: const Size(0, AppSpacing.buttonHeightMedium),
        textStyle: AppTypography.labelLarge(color: AppColors.primary),
      ),
    );
  }

  static TextButtonThemeData get _textButtonTheme {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: AppColors.primary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        textStyle: AppTypography.labelLarge(color: AppColors.primary),
      ),
    );
  }

  // Input Decoration Theme
  static InputDecorationTheme get _inputDecorationTheme {
    return InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surfaceLight,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        borderSide: const BorderSide(color: AppColors.borderLight),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        borderSide: const BorderSide(color: AppColors.borderLight),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        borderSide: const BorderSide(color: AppColors.primary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        borderSide: const BorderSide(color: AppColors.error),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
        borderSide: const BorderSide(color: AppColors.error, width: 2),
      ),
      contentPadding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      labelStyle: AppTypography.bodyMedium(color: AppColors.textSecondaryLight),
      hintStyle: AppTypography.bodyMedium(color: AppColors.textTertiaryLight),
      errorStyle: AppTypography.bodySmall(color: AppColors.error),
    );
  }

  // Card Theme
  static CardTheme get _cardTheme {
    return CardTheme(
      color: AppColors.surfaceLight,
      elevation: AppSpacing.cardElevation,
      shadowColor: Colors.black.withOpacity(0.1),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
      ),
      margin: const EdgeInsets.all(AppSpacing.sm),
    );
  }

  // Bottom Navigation Bar Theme
  static BottomNavigationBarThemeData get _bottomNavigationBarTheme {
    return BottomNavigationBarThemeData(
      backgroundColor: AppColors.surfaceLight,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textTertiaryLight,
      type: BottomNavigationBarType.fixed,
      elevation: 8,
      selectedLabelStyle: AppTypography.labelSmall(color: AppColors.primary),
      unselectedLabelStyle:
          AppTypography.labelSmall(color: AppColors.textTertiaryLight),
    );
  }

  // Floating Action Button Theme
  static FloatingActionButtonThemeData get _floatingActionButtonTheme {
    return FloatingActionButtonThemeData(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
      elevation: 6,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusLarge),
      ),
    );
  }

  // Divider Theme
  static DividerThemeData get _dividerTheme {
    return DividerThemeData(
      color: AppColors.dividerLight,
      thickness: AppSpacing.dividerThickness,
      space: AppSpacing.dividerPadding,
    );
  }

  // Chip Theme
  static ChipThemeData get _chipTheme {
    return ChipThemeData(
      backgroundColor: AppColors.surfaceLight,
      selectedColor: AppColors.primary.withOpacity(0.1),
      labelStyle: AppTypography.labelMedium(),
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
      ),
    );
  }

  // Icon Theme
  static IconThemeData get _iconTheme {
    return const IconThemeData(
      color: AppColors.textSecondaryLight,
      size: AppSpacing.iconMedium,
    );
  }
}
