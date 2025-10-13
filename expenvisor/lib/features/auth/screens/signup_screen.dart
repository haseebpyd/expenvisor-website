import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';
import '../../navigation/main_navigation.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _isLoading = false;
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  bool _agreeToTerms = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: AppSpacing.lg),
                
                // Header
                _buildHeader(isDark),
                
                const SizedBox(height: AppSpacing.xxxl),
                
                // Signup Form
                _buildSignupForm(isDark),
                
                const SizedBox(height: AppSpacing.lg),
                
                // Terms and Conditions
                _buildTermsAndConditions(),
                
                const SizedBox(height: AppSpacing.xl),
                
                // Signup Button
                _buildSignupButton(),
                
                const SizedBox(height: AppSpacing.lg),
                
                // Divider
                _buildDivider(isDark),
                
                const SizedBox(height: AppSpacing.xl),
                
                // Social Signup
                _buildSocialSignup(),
                
                const SizedBox(height: AppSpacing.xl),
                
                // Login Link
                _buildLoginLink(),
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
            Icons.person_add,
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
          'Create Account',
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
          'Join Expenvisor and take control of your finances',
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

  Widget _buildSignupForm(bool isDark) {
    return Column(
      children: [
        // Name Input
        CustomInput(
          label: 'Full Name',
          hint: 'Enter your full name',
          controller: _nameController,
          textInputAction: TextInputAction.next,
          prefixIcon: Icons.person_outline,
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter your full name';
            }
            if (value.length < 2) {
              return 'Name must be at least 2 characters';
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
          delay: 800.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: 800.ms,
        ),
        
        const SizedBox(height: AppSpacing.lg),
        
        // Password Input
        CustomInput(
          label: 'Password',
          hint: 'Create a password',
          controller: _passwordController,
          obscureText: _obscurePassword,
          textInputAction: TextInputAction.next,
          prefixIcon: Icons.lock_outline,
          suffixIcon: _obscurePassword ? Icons.visibility_off : Icons.visibility,
          onSuffixTap: () {
            setState(() {
              _obscurePassword = !_obscurePassword;
            });
          },
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please enter a password';
            }
            if (value.length < 8) {
              return 'Password must be at least 8 characters';
            }
            if (!RegExp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)').hasMatch(value)) {
              return 'Password must contain uppercase, lowercase, and number';
            }
            return null;
          },
        ).animate().fadeIn(
          duration: 600.ms,
          delay: 1000.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: 1000.ms,
        ),
        
        const SizedBox(height: AppSpacing.lg),
        
        // Confirm Password Input
        CustomInput(
          label: 'Confirm Password',
          hint: 'Confirm your password',
          controller: _confirmPasswordController,
          obscureText: _obscureConfirmPassword,
          textInputAction: TextInputAction.done,
          prefixIcon: Icons.lock_outline,
          suffixIcon: _obscureConfirmPassword ? Icons.visibility_off : Icons.visibility,
          onSuffixTap: () {
            setState(() {
              _obscureConfirmPassword = !_obscureConfirmPassword;
            });
          },
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Please confirm your password';
            }
            if (value != _passwordController.text) {
              return 'Passwords do not match';
            }
            return null;
          },
        ).animate().fadeIn(
          duration: 600.ms,
          delay: 1200.ms,
        ).slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: 1200.ms,
        ),
      ],
    );
  }

  Widget _buildTermsAndConditions() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Checkbox(
          value: _agreeToTerms,
          onChanged: (value) {
            setState(() {
              _agreeToTerms = value ?? false;
            });
          },
          activeColor: AppColors.primary,
        ),
        Expanded(
          child: GestureDetector(
            onTap: () {
              setState(() {
                _agreeToTerms = !_agreeToTerms;
              });
            },
            child: RichText(
              text: TextSpan(
                style: AppTypography.bodyMedium(
                  color: Theme.of(context).textTheme.bodyMedium?.color?.withOpacity(0.7),
                ),
                children: [
                  const TextSpan(text: 'I agree to the '),
                  TextSpan(
                    text: 'Terms of Service',
                    style: AppTypography.bodyMedium(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const TextSpan(text: ' and '),
                  TextSpan(
                    text: 'Privacy Policy',
                    style: AppTypography.bodyMedium(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1400.ms,
    );
  }

  Widget _buildSignupButton() {
    return CustomButton(
      text: 'Create Account',
      onPressed: _agreeToTerms && !_isLoading ? _handleSignup : null,
      isLoading: _isLoading,
      variant: ButtonVariant.gradient,
      size: ButtonSize.large,
      isFullWidth: true,
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
      delay: 1800.ms,
    );
  }

  Widget _buildSocialSignup() {
    return Column(
      children: [
        // Google Sign Up
        CustomButton(
          text: 'Sign up with Google',
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Google Sign Up pressed!'),
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
        
        // Apple Sign Up
        CustomButton(
          text: 'Sign up with Apple',
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Apple Sign Up pressed!'),
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
      delay: 2000.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 2000.ms,
    );
  }

  Widget _buildLoginLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Already have an account? ',
          style: AppTypography.bodyMedium(
            color: Theme.of(context).textTheme.bodyMedium?.color?.withOpacity(0.7),
          ),
        ),
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(
            'Sign In',
            style: AppTypography.labelLarge(
              color: AppColors.primary,
            ),
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 2200.ms,
    );
  }

  void _handleSignup() async {
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
