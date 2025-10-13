import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';
import 'signup_screen.dart';
import '../../navigation/main_navigation.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: AppSpacing.xxxl),
                
                // Logo and Welcome
                _buildHeader(isDark),
                
                const SizedBox(height: AppSpacing.xxxl),
                
                // Login Form
                _buildLoginForm(isDark),
                
                const SizedBox(height: AppSpacing.xl),
                
                // Login Button
                _buildLoginButton(),
                
                const SizedBox(height: AppSpacing.lg),
                
                // Forgot Password
                _buildForgotPassword(),
                
                const SizedBox(height: AppSpacing.xxxl),
                
                // Divider
                _buildDivider(isDark),
                
                const SizedBox(height: AppSpacing.xl),
                
                // Social Login
                _buildSocialLogin(),
                
                const SizedBox(height: AppSpacing.xl),
                
                // Sign Up Link
                _buildSignUpLink(),
                
                const SizedBox(height: AppSpacing.lg),
                
                // Guest Mode
                _buildGuestMode(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(bool isDark) {
    return Column(
      children: [
        // Logo
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            gradient: AppColors.heroGradient,
            borderRadius: BorderRadius.circular(AppSpacing.radiusXLarge),
            boxShadow: [
              BoxShadow(
                color: AppColors.primary.withOpacity(0.3),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: const Icon(
            Icons.account_balance_wallet,
            size: 40,
            color: Colors.white,
          ),
        ).animate().scale(
          duration: 600.ms,
          curve: Curves.elasticOut,
        ),
        
        const SizedBox(height: AppSpacing.lg),
        
        // Welcome Text
        Text(
          'Welcome Back!',
          style: AppTypography.headlineLarge(
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ).animate().fadeIn(
          duration: 800.ms,
          delay: 200.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 200.ms,
        ),
        
        const SizedBox(height: AppSpacing.sm),
        
        Text(
          'Sign in to continue tracking your expenses',
          style: AppTypography.bodyLarge(
            color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          ),
          textAlign: TextAlign.center,
        ).animate().fadeIn(
          duration: 800.ms,
          delay: 400.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 800.ms,
          delay: 400.ms,
        ),
      ],
    );
  }

  Widget _buildLoginForm(bool isDark) {
    return Column(
      children: [
        // Email Input
        CustomInput(
          label: 'Email',
          hint: 'Enter your email',
          controller: _emailController,
          keyboardType: TextInputType.emailAddress,
          textInputAction: TextInputAction.next,
          prefixIcon: Icons.email_outlined,
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter your email';
            }
            if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
              return 'Please enter a valid email';
            }
            return null;
          },
        ).animate().fadeIn(
          duration: 600.ms,
          delay: 600.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: 600.ms,
        ),
        
        const SizedBox(height: AppSpacing.lg),
        
        // Password Input
        CustomInput(
          label: 'Password',
          hint: 'Enter your password',
          controller: _passwordController,
          obscureText: _obscurePassword,
          textInputAction: TextInputAction.done,
          prefixIcon: Icons.lock_outline,
          suffixIcon: _obscurePassword ? Icons.visibility_off : Icons.visibility,
          onSuffixTap: () {
            setState(() {
              _obscurePassword = !_obscurePassword;
            });
          },
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter your password';
            }
            if (value.length < 6) {
              return 'Password must be at least 6 characters';
            }
            return null;
          },
        ).animate().fadeIn(
          duration: 600.ms,
          delay: 800.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: 800.ms,
        ),
      ],
    );
  }

  Widget _buildLoginButton() {
    return CustomButton(
      text: 'Sign In',
      onPressed: _isLoading ? null : _handleLogin,
      isLoading: _isLoading,
      variant: ButtonVariant.gradient,
      size: ButtonSize.large,
      isFullWidth: true,
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1000.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 1000.ms,
    );
  }

  Widget _buildForgotPassword() {
    return Align(
      alignment: Alignment.centerRight,
      child: TextButton(
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Forgot Password pressed!'),
              backgroundColor: AppColors.primary,
            ),
          );
        },
        child: Text(
          'Forgot Password?',
          style: AppTypography.labelMedium(
            color: AppColors.primary,
          ),
        ),
      ),
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1200.ms,
    );
  }

  Widget _buildDivider(bool isDark) {
    return Row(
      children: [
        Expanded(
          child: Divider(
            color: isDark ? AppColors.dividerDark : AppColors.dividerLight,
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          child: Text(
            'or',
            style: AppTypography.bodyMedium(
              color: isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight,
            ),
          ),
        ),
        Expanded(
          child: Divider(
            color: isDark ? AppColors.dividerDark : AppColors.dividerLight,
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1400.ms,
    );
  }

  Widget _buildSocialLogin() {
    return Column(
      children: [
        // Google Sign In
        CustomButton(
          text: 'Continue with Google',
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Google Sign In pressed!'),
                backgroundColor: AppColors.secondary,
              ),
            );
          },
          variant: ButtonVariant.outline,
          size: ButtonSize.large,
          isFullWidth: true,
          icon: Icons.g_mobiledata,
        ),
        
        const SizedBox(height: AppSpacing.md),
        
        // Apple Sign In
        CustomButton(
          text: 'Continue with Apple',
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Apple Sign In pressed!'),
                backgroundColor: AppColors.primary,
              ),
            );
          },
          variant: ButtonVariant.outline,
          size: ButtonSize.large,
          isFullWidth: true,
          icon: Icons.apple,
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1600.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 1600.ms,
    );
  }

  Widget _buildSignUpLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Don't have an account? ",
          style: AppTypography.bodyMedium(
            color: Theme.of(context).textTheme.bodyMedium?.color?.withOpacity(0.7),
          ),
        ),
        TextButton(
          onPressed: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => const SignupScreen(),
              ),
            );
          },
          child: Text(
            'Sign Up',
            style: AppTypography.labelLarge(
              color: AppColors.primary,
            ),
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1800.ms,
    );
  }

  Widget _buildGuestMode() {
    return CustomButton(
      text: 'Continue as Guest',
      onPressed: () {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (context) => const MainNavigation(),
          ),
        );
      },
      variant: ButtonVariant.text,
      size: ButtonSize.medium,
      isFullWidth: true,
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 2000.ms,
    );
  }

  void _handleLogin() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isLoading = false;
    });

    // Navigate to main navigation
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => const MainNavigation(),
        ),
      );
    }
  }
}
