import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import 'onboarding_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _textController;
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _navigateToNextScreen();
  }

  void _initializeAnimations() {
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _textController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );

    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    // Start animations
    _logoController.forward();
    _textController.forward();
    _pulseController.repeat(reverse: true);
  }

  void _navigateToNextScreen() {
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => const OnboardingScreen(),
          ),
        );
      }
    });
  }

  @override
  void dispose() {
    _logoController.dispose();
    _textController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: isDark
                ? [
                    AppColors.backgroundDark,
                    AppColors.surfaceDark,
                    AppColors.primary.withOpacity(0.1),
                  ]
                : [
                    AppColors.backgroundLight,
                    AppColors.surfaceLight,
                    AppColors.primary.withOpacity(0.05),
                  ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Animated Logo
              _buildAnimatedLogo(),
              
              const SizedBox(height: AppSpacing.xxxl),
              
              // App Name
              _buildAppName(isDark),
              
              const SizedBox(height: AppSpacing.sm),
              
              // Tagline
              _buildTagline(isDark),
              
              const SizedBox(height: AppSpacing.xxxl),
              
              // Loading Indicator
              _buildLoadingIndicator(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAnimatedLogo() {
    return AnimatedBuilder(
      animation: _pulseController,
      builder: (context, child) {
        return Transform.scale(
          scale: 1.0 + (_pulseController.value * 0.1),
          child: Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              gradient: AppColors.heroGradient,
              borderRadius: BorderRadius.circular(AppSpacing.radiusXLarge),
              boxShadow: [
                BoxShadow(
                  color: AppColors.primary.withOpacity(0.3 + (_pulseController.value * 0.2)),
                  blurRadius: 30 + (_pulseController.value * 20),
                  offset: const Offset(0, 15),
                ),
              ],
            ),
            child: const Icon(
              Icons.account_balance_wallet,
              size: 60,
              color: Colors.white,
            ),
          ),
        );
      },
    ).animate().scale(
      duration: 1000.ms,
      curve: Curves.elasticOut,
    ).fadeIn(
      duration: 800.ms,
    );
  }

  Widget _buildAppName(bool isDark) {
    return AnimatedBuilder(
      animation: _textController,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, 20 * (1 - _textController.value)),
          child: Opacity(
            opacity: _textController.value,
            child: Text(
              'Expenvisor',
              style: AppTypography.appTitle(
                color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildTagline(bool isDark) {
    return AnimatedBuilder(
      animation: _textController,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, 20 * (1 - _textController.value)),
          child: Opacity(
            opacity: _textController.value,
            child: Text(
              'Your finances, flowing seamlessly',
              style: AppTypography.bodyLarge(
                color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildLoadingIndicator() {
    return Column(
      children: [
        // Custom loading indicator
        Container(
          width: 40,
          height: 40,
          child: CircularProgressIndicator(
            strokeWidth: 3,
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
            backgroundColor: AppColors.primary.withOpacity(0.2),
          ),
        ),
        
        const SizedBox(height: AppSpacing.lg),
        
        // Loading text
        Text(
          'Loading...',
          style: AppTypography.bodyMedium(
            color: Theme.of(context).textTheme.bodyMedium?.color?.withOpacity(0.7),
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1500.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 1500.ms,
    );
  }
}
