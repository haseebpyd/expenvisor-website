import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import 'login_screen.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingPage> _pages = [
    OnboardingPage(
      title: 'Welcome to Expenvisor',
      subtitle: 'Your AI-powered expense tracking companion',
      description:
          'Take control of your finances with intelligent insights and effortless expense management.',
      icon: Icons.account_balance_wallet_outlined,
      color: AppColors.primary,
    ),
    OnboardingPage(
      title: 'Smart Expense Tracking',
      subtitle: 'Voice & Image Input',
      description:
          'Add expenses quickly using voice commands or scan receipts with OCR technology.',
      icon: Icons.mic_outlined,
      color: AppColors.accent,
    ),
    OnboardingPage(
      title: 'AI Financial Insights',
      subtitle: 'Intelligent Analysis',
      description:
          'Get personalized financial advice and spending patterns analysis powered by AI.',
      icon: Icons.psychology_outlined,
      color: AppColors.aiFeatures,
    ),
    OnboardingPage(
      title: 'Beautiful Visualizations',
      subtitle: 'Clear Financial Picture',
      description:
          'Understand your spending with beautiful charts and comprehensive financial reports.',
      icon: Icons.analytics_outlined,
      color: AppColors.aiFeatures,
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: SafeArea(
        child: Column(
          children: [
            // Skip button
            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  if (_currentPage < _pages.length - 1)
                    TextButton(
                      onPressed: _skipToEnd,
                      child: Text(
                        'Skip',
                        style: AppTypography.labelLarge(
                          color: AppColors.textSecondaryLight,
                        ),
                      ),
                    ),
                ],
              ),
            ),

            // Page view
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() {
                    _currentPage = index;
                  });
                },
                itemCount: _pages.length,
                itemBuilder: (context, index) {
                  return _buildPage(_pages[index], isDark);
                },
              ),
            ),

            // Page indicators
            Padding(
              padding: const EdgeInsets.symmetric(vertical: AppSpacing.lg),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  _pages.length,
                  (index) => _buildPageIndicator(index, isDark),
                ),
              ),
            ),

            // Action buttons
            Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                children: [
                  // Get Started button
                  CustomButton(
                    text: _currentPage == _pages.length - 1
                        ? 'Get Started'
                        : 'Next',
                    onPressed: _nextPage,
                    variant: ButtonVariant.gradient,
                    size: ButtonSize.large,
                    isFullWidth: true,
                  ),

                  const SizedBox(height: AppSpacing.md),

                  // Sign in button
                  if (_currentPage == _pages.length - 1)
                    CustomButton(
                      text: 'Already have an account? Sign In',
                      onPressed: _signIn,
                      variant: ButtonVariant.text,
                      size: ButtonSize.medium,
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPage(OnboardingPage page, bool isDark) {
    // Use high contrast colors for better visibility in dark mode
    Color pageColor = page.color;
    if (isDark && page.color == AppColors.aiFeatures) {
      pageColor = AppColors.getAiFeaturesColor(isDark);
    } else if (isDark && page.color == AppColors.secondary) {
      pageColor = AppColors.getSecondaryColor(isDark);
    }
    
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.xl),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Icon
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  pageColor,
                  pageColor.withOpacity(0.7),
                ],
              ),
              borderRadius: BorderRadius.circular(AppSpacing.radiusXLarge),
              boxShadow: [
                BoxShadow(
                  color: pageColor.withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Icon(
              page.icon,
              size: 60,
              color: Colors.white,
            ),
          ).animate().scale(
            duration: 600.ms,
            curve: Curves.elasticOut,
          ),

          const SizedBox(height: AppSpacing.xxxl),

          // Title
          Text(
            page.title,
            style: AppTypography.headlineLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
            textAlign: TextAlign.center,
          )
              .animate()
              .fadeIn(
                duration: 800.ms,
                delay: 200.ms,
              )
              .slideY(
                begin: 0.3,
                end: 0,
                duration: 800.ms,
                delay: 200.ms,
              ),

          const SizedBox(height: AppSpacing.md),

          // Subtitle
          Text(
            page.subtitle,
            style: AppTypography.titleLarge(
              color: pageColor,
            ),
            textAlign: TextAlign.center,
          )
              .animate()
              .fadeIn(
                duration: 800.ms,
                delay: 400.ms,
              )
              .slideY(
                begin: 0.3,
                end: 0,
                duration: 800.ms,
                delay: 400.ms,
              ),

          const SizedBox(height: AppSpacing.lg),

          // Description
          Text(
            page.description,
            style: AppTypography.bodyLarge(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
            textAlign: TextAlign.center,
          )
              .animate()
              .fadeIn(
                duration: 800.ms,
                delay: 600.ms,
              )
              .slideY(
                begin: 0.3,
                end: 0,
                duration: 800.ms,
                delay: 600.ms,
              ),
        ],
      ),
    );
  }

  Widget _buildPageIndicator(int index, bool isDark) {
    final isActive = index == _currentPage;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.symmetric(horizontal: AppSpacing.xs),
      width: isActive ? 24 : 8,
      height: 8,
      decoration: BoxDecoration(
        color: isActive
            ? AppColors.primary
            : (isDark ? AppColors.borderDark : AppColors.borderLight),
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
      ),
    );
  }

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _getStarted();
    }
  }

  void _skipToEnd() {
    _pageController.animateToPage(
      _pages.length - 1,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
    );
  }

  void _getStarted() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) => const LoginScreen(),
      ),
    );
  }

  void _signIn() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) => const LoginScreen(),
      ),
    );
  }
}

class OnboardingPage {
  final String title;
  final String subtitle;
  final String description;
  final IconData icon;
  final Color color;

  OnboardingPage({
    required this.title,
    required this.subtitle,
    required this.description,
    required this.icon,
    required this.color,
  });
}
