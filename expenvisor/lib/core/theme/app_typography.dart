import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Typography system for Expenvisor
///
/// Uses Inter for body text and Poppins for display text
/// 6 text styles: Display, Headline, Title, Body, Label, Caption
class AppTypography {
  // Private constructor to prevent instantiation
  AppTypography._();

  // Font families are handled by Google Fonts package

  // Display text (largest, for hero sections)
  static TextStyle displayLarge({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.poppins(
      fontSize: 57,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? -0.25,
      height: height ?? 1.12,
      color: color,
    );
  }

  static TextStyle displayMedium({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.poppins(
      fontSize: 45,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0,
      height: height ?? 1.16,
      color: color,
    );
  }

  static TextStyle displaySmall({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.poppins(
      fontSize: 36,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0,
      height: height ?? 1.22,
      color: color,
    );
  }

  // Headline text (for section headers)
  static TextStyle headlineLarge({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.poppins(
      fontSize: 32,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0,
      height: height ?? 1.25,
      color: color,
    );
  }

  static TextStyle headlineMedium({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.poppins(
      fontSize: 28,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0,
      height: height ?? 1.29,
      color: color,
    );
  }

  static TextStyle headlineSmall({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.poppins(
      fontSize: 24,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0,
      height: height ?? 1.33,
      color: color,
    );
  }

  // Title text (for card headers, buttons)
  static TextStyle titleLarge({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 22,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: letterSpacing ?? 0,
      height: height ?? 1.27,
      color: color,
    );
  }

  static TextStyle titleMedium({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 16,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: letterSpacing ?? 0.15,
      height: height ?? 1.50,
      color: color,
    );
  }

  static TextStyle titleSmall({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 14,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: letterSpacing ?? 0.1,
      height: height ?? 1.43,
      color: color,
    );
  }

  // Body text (for main content)
  static TextStyle bodyLarge({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 16,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0.5,
      height: height ?? 1.50,
      color: color,
    );
  }

  static TextStyle bodyMedium({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 14,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0.25,
      height: height ?? 1.43,
      color: color,
    );
  }

  static TextStyle bodySmall({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 12,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0.4,
      height: height ?? 1.33,
      color: color,
    );
  }

  // Label text (for form labels, chips)
  static TextStyle labelLarge({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 14,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: letterSpacing ?? 0.1,
      height: height ?? 1.43,
      color: color,
    );
  }

  static TextStyle labelMedium({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 12,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: letterSpacing ?? 0.5,
      height: height ?? 1.33,
      color: color,
    );
  }

  static TextStyle labelSmall({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 11,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: letterSpacing ?? 0.5,
      height: height ?? 1.45,
      color: color,
    );
  }

  // Caption text (for small details, footnotes)
  static TextStyle captionLarge({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 12,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0.4,
      height: height ?? 1.33,
      color: color,
    );
  }

  static TextStyle captionMedium({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 11,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0.5,
      height: height ?? 1.45,
      color: color,
    );
  }

  static TextStyle captionSmall({
    Color? color,
    FontWeight? fontWeight,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.inter(
      fontSize: 10,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: letterSpacing ?? 0.5,
      height: height ?? 1.60,
      color: color,
    );
  }

  // Special text styles for Expenvisor
  static TextStyle appTitle({
    Color? color,
    FontWeight? fontWeight,
  }) {
    return GoogleFonts.poppins(
      fontSize: 28,
      fontWeight: fontWeight ?? FontWeight.w700,
      letterSpacing: -0.5,
      height: 1.2,
      color: color,
    );
  }

  static TextStyle amountText({
    Color? color,
    FontWeight? fontWeight,
  }) {
    return GoogleFonts.inter(
      fontSize: 24,
      fontWeight: fontWeight ?? FontWeight.w600,
      letterSpacing: -0.5,
      height: 1.2,
      color: color,
    );
  }

  static TextStyle currencyText({
    Color? color,
    FontWeight? fontWeight,
  }) {
    return GoogleFonts.inter(
      fontSize: 16,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: 0.5,
      height: 1.2,
      color: color,
    );
  }

  static TextStyle categoryText({
    Color? color,
    FontWeight? fontWeight,
  }) {
    return GoogleFonts.inter(
      fontSize: 12,
      fontWeight: fontWeight ?? FontWeight.w500,
      letterSpacing: 0.5,
      height: 1.2,
      color: color,
    );
  }

  static TextStyle dateText({
    Color? color,
    FontWeight? fontWeight,
  }) {
    return GoogleFonts.inter(
      fontSize: 11,
      fontWeight: fontWeight ?? FontWeight.w400,
      letterSpacing: 0.5,
      height: 1.2,
      color: color,
    );
  }
}
