import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';
import '../../auth/screens/login_screen.dart';
import '../../profile/screens/security_screen.dart';
import '../../profile/screens/payment_methods_screen.dart';
import '../../profile/screens/subscription_management_screen.dart';
import '../../profile/screens/help_center_screen.dart';
import '../../profile/screens/about_screen.dart';
import '../../demo/screens/theme_demo_screen.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  // Profile editing
  final _nameController = TextEditingController(text: 'John Doe');
  final _emailController = TextEditingController(text: 'john.doe@example.com');
  final _currencySearchController = TextEditingController();

  // App preferences
  bool _notificationsEnabled = true;
  bool _darkModeEnabled = false;
  bool _biometricEnabled = false;
  bool _analyticsEnabled = true;
  String _selectedLanguage = 'English';
  String _selectedCurrency = 'USD';
  String _currencySearchQuery = '';
  bool _isEditingProfile = false;

  // Comprehensive list of currencies
  final List<Map<String, String>> _currencies = [
    {'code': 'USD', 'name': 'United States Dollar', 'symbol': '\$'},
    {'code': 'EUR', 'name': 'Euro', 'symbol': '€'},
    {'code': 'GBP', 'name': 'British Pound Sterling', 'symbol': '£'},
    {'code': 'JPY', 'name': 'Japanese Yen', 'symbol': '¥'},
    {'code': 'CAD', 'name': 'Canadian Dollar', 'symbol': 'C\$'},
    {'code': 'AUD', 'name': 'Australian Dollar', 'symbol': 'A\$'},
    {'code': 'CHF', 'name': 'Swiss Franc', 'symbol': 'CHF'},
    {'code': 'CNY', 'name': 'Chinese Yuan', 'symbol': '¥'},
    {'code': 'INR', 'name': 'Indian Rupee', 'symbol': '₹'},
    {'code': 'BRL', 'name': 'Brazilian Real', 'symbol': 'R\$'},
    {'code': 'RUB', 'name': 'Russian Ruble', 'symbol': '₽'},
    {'code': 'KRW', 'name': 'South Korean Won', 'symbol': '₩'},
    {'code': 'MXN', 'name': 'Mexican Peso', 'symbol': '\$'},
    {'code': 'SGD', 'name': 'Singapore Dollar', 'symbol': 'S\$'},
    {'code': 'HKD', 'name': 'Hong Kong Dollar', 'symbol': 'HK\$'},
    {'code': 'NZD', 'name': 'New Zealand Dollar', 'symbol': 'NZ\$'},
    {'code': 'SEK', 'name': 'Swedish Krona', 'symbol': 'kr'},
    {'code': 'NOK', 'name': 'Norwegian Krone', 'symbol': 'kr'},
    {'code': 'DKK', 'name': 'Danish Krone', 'symbol': 'kr'},
    {'code': 'PLN', 'name': 'Polish Złoty', 'symbol': 'zł'},
    {'code': 'CZK', 'name': 'Czech Koruna', 'symbol': 'Kč'},
    {'code': 'HUF', 'name': 'Hungarian Forint', 'symbol': 'Ft'},
    {'code': 'TRY', 'name': 'Turkish Lira', 'symbol': '₺'},
    {'code': 'ZAR', 'name': 'South African Rand', 'symbol': 'R'},
    {'code': 'AED', 'name': 'UAE Dirham', 'symbol': 'د.إ'},
    {'code': 'SAR', 'name': 'Saudi Riyal', 'symbol': 'ر.س'},
    {'code': 'THB', 'name': 'Thai Baht', 'symbol': '฿'},
    {'code': 'MYR', 'name': 'Malaysian Ringgit', 'symbol': 'RM'},
    {'code': 'IDR', 'name': 'Indonesian Rupiah', 'symbol': 'Rp'},
    {'code': 'PHP', 'name': 'Philippine Peso', 'symbol': '₱'},
    {'code': 'VND', 'name': 'Vietnamese Dong', 'symbol': '₫'},
    {'code': 'ILS', 'name': 'Israeli Shekel', 'symbol': '₪'},
    {'code': 'EGP', 'name': 'Egyptian Pound', 'symbol': '£'},
    {'code': 'NGN', 'name': 'Nigerian Naira', 'symbol': '₦'},
    {'code': 'KES', 'name': 'Kenyan Shilling', 'symbol': 'KSh'},
    {'code': 'GHS', 'name': 'Ghanaian Cedi', 'symbol': '₵'},
    {'code': 'MAD', 'name': 'Moroccan Dirham', 'symbol': 'د.م.'},
    {'code': 'TND', 'name': 'Tunisian Dinar', 'symbol': 'د.ت'},
    {'code': 'DZD', 'name': 'Algerian Dinar', 'symbol': 'د.ج'},
    {'code': 'LBP', 'name': 'Lebanese Pound', 'symbol': 'ل.ل'},
    {'code': 'JOD', 'name': 'Jordanian Dinar', 'symbol': 'د.ا'},
    {'code': 'KWD', 'name': 'Kuwaiti Dinar', 'symbol': 'د.ك'},
    {'code': 'QAR', 'name': 'Qatari Riyal', 'symbol': 'ر.ق'},
    {'code': 'BHD', 'name': 'Bahraini Dinar', 'symbol': 'د.ب'},
    {'code': 'OMR', 'name': 'Omani Rial', 'symbol': 'ر.ع.'},
    {'code': 'PKR', 'name': 'Pakistani Rupee', 'symbol': '₨'},
    {'code': 'BDT', 'name': 'Bangladeshi Taka', 'symbol': '৳'},
    {'code': 'LKR', 'name': 'Sri Lankan Rupee', 'symbol': '₨'},
    {'code': 'NPR', 'name': 'Nepalese Rupee', 'symbol': '₨'},
    {'code': 'AFN', 'name': 'Afghan Afghani', 'symbol': '؋'},
    {'code': 'AMD', 'name': 'Armenian Dram', 'symbol': '֏'},
    {'code': 'AZN', 'name': 'Azerbaijani Manat', 'symbol': '₼'},
    {'code': 'GEL', 'name': 'Georgian Lari', 'symbol': '₾'},
    {'code': 'KZT', 'name': 'Kazakhstani Tenge', 'symbol': '₸'},
    {'code': 'KGS', 'name': 'Kyrgyzstani Som', 'symbol': 'с'},
    {'code': 'TJS', 'name': 'Tajikistani Somoni', 'symbol': 'SM'},
    {'code': 'TMT', 'name': 'Turkmenistani Manat', 'symbol': 'T'},
    {'code': 'UZS', 'name': 'Uzbekistani Som', 'symbol': 'лв'},
    {'code': 'MNT', 'name': 'Mongolian Tugrik', 'symbol': '₮'},
    {'code': 'LAK', 'name': 'Lao Kip', 'symbol': '₭'},
    {'code': 'KHR', 'name': 'Cambodian Riel', 'symbol': '៛'},
    {'code': 'MMK', 'name': 'Myanmar Kyat', 'symbol': 'K'},
    {'code': 'BND', 'name': 'Brunei Dollar', 'symbol': 'B\$'},
    {'code': 'FJD', 'name': 'Fijian Dollar', 'symbol': 'FJ\$'},
    {'code': 'PGK', 'name': 'Papua New Guinean Kina', 'symbol': 'K'},
    {'code': 'SBD', 'name': 'Solomon Islands Dollar', 'symbol': 'SI\$'},
    {'code': 'TOP', 'name': 'Tongan Paʻanga', 'symbol': 'T\$'},
    {'code': 'VUV', 'name': 'Vanuatu Vatu', 'symbol': 'Vt'},
    {'code': 'WST', 'name': 'Samoan Tala', 'symbol': 'WS\$'},
    {'code': 'XPF', 'name': 'CFP Franc', 'symbol': '₣'},
    {'code': 'ARS', 'name': 'Argentine Peso', 'symbol': '\$'},
    {'code': 'BOB', 'name': 'Bolivian Boliviano', 'symbol': 'Bs'},
    {'code': 'CLP', 'name': 'Chilean Peso', 'symbol': '\$'},
    {'code': 'COP', 'name': 'Colombian Peso', 'symbol': '\$'},
    {'code': 'PEN', 'name': 'Peruvian Sol', 'symbol': 'S/'},
    {'code': 'UYU', 'name': 'Uruguayan Peso', 'symbol': '\$U'},
    {'code': 'VES', 'name': 'Venezuelan Bolívar', 'symbol': 'Bs.S'},
    {'code': 'GYD', 'name': 'Guyanese Dollar', 'symbol': 'G\$'},
    {'code': 'SRD', 'name': 'Surinamese Dollar', 'symbol': 'Sr\$'},
    {'code': 'TTD', 'name': 'Trinidad and Tobago Dollar', 'symbol': 'TT\$'},
    {'code': 'BBD', 'name': 'Barbadian Dollar', 'symbol': 'Bds\$'},
    {'code': 'JMD', 'name': 'Jamaican Dollar', 'symbol': 'J\$'},
    {'code': 'BZD', 'name': 'Belize Dollar', 'symbol': 'BZ\$'},
    {'code': 'BMD', 'name': 'Bermudian Dollar', 'symbol': 'BD\$'},
    {'code': 'KYD', 'name': 'Cayman Islands Dollar', 'symbol': 'CI\$'},
    {'code': 'XCD', 'name': 'East Caribbean Dollar', 'symbol': 'EC\$'},
    {'code': 'AWG', 'name': 'Aruban Florin', 'symbol': 'ƒ'},
    {'code': 'ANG', 'name': 'Netherlands Antillean Guilder', 'symbol': 'ƒ'},
    {'code': 'DOP', 'name': 'Dominican Peso', 'symbol': 'RD\$'},
    {'code': 'HTG', 'name': 'Haitian Gourde', 'symbol': 'G'},
    {'code': 'CUP', 'name': 'Cuban Peso', 'symbol': '\$'},
    {'code': 'CRC', 'name': 'Costa Rican Colón', 'symbol': '₡'},
    {'code': 'GTQ', 'name': 'Guatemalan Quetzal', 'symbol': 'Q'},
    {'code': 'HNL', 'name': 'Honduran Lempira', 'symbol': 'L'},
    {'code': 'NIO', 'name': 'Nicaraguan Córdoba', 'symbol': 'C\$'},
    {'code': 'PAB', 'name': 'Panamanian Balboa', 'symbol': 'B/.'},
    {'code': 'PYG', 'name': 'Paraguayan Guarani', 'symbol': '₲'},
    {'code': 'SVC', 'name': 'Salvadoran Colón', 'symbol': '₡'},
    {'code': 'BWP', 'name': 'Botswana Pula', 'symbol': 'P'},
    {'code': 'ETB', 'name': 'Ethiopian Birr', 'symbol': 'Br'},
    {'code': 'MWK', 'name': 'Malawian Kwacha', 'symbol': 'MK'},
    {'code': 'MUR', 'name': 'Mauritian Rupee', 'symbol': '₨'},
    {'code': 'MZN', 'name': 'Mozambican Metical', 'symbol': 'MT'},
    {'code': 'NAD', 'name': 'Namibian Dollar', 'symbol': 'N\$'},
    {'code': 'RWF', 'name': 'Rwandan Franc', 'symbol': 'RF'},
    {'code': 'SZL', 'name': 'Swazi Lilangeni', 'symbol': 'E'},
    {'code': 'TZS', 'name': 'Tanzanian Shilling', 'symbol': 'TSh'},
    {'code': 'UGX', 'name': 'Ugandan Shilling', 'symbol': 'USh'},
    {'code': 'ZMW', 'name': 'Zambian Kwacha', 'symbol': 'ZK'},
    {'code': 'ZWL', 'name': 'Zimbabwean Dollar', 'symbol': 'Z\$'},
    {'code': 'AOA', 'name': 'Angolan Kwanza', 'symbol': 'Kz'},
    {'code': 'CDF', 'name': 'Congolese Franc', 'symbol': 'FC'},
    {'code': 'XAF', 'name': 'Central African CFA Franc', 'symbol': 'FCFA'},
    {'code': 'XOF', 'name': 'West African CFA Franc', 'symbol': 'CFA'},
    {'code': 'KMF', 'name': 'Comorian Franc', 'symbol': 'CF'},
    {'code': 'DJF', 'name': 'Djiboutian Franc', 'symbol': 'Fdj'},
    {'code': 'ERN', 'name': 'Eritrean Nakfa', 'symbol': 'Nfk'},
    {'code': 'SLL', 'name': 'Sierra Leonean Leone', 'symbol': 'Le'},
    {'code': 'SOS', 'name': 'Somali Shilling', 'symbol': 'S'},
    {'code': 'SSP', 'name': 'South Sudanese Pound', 'symbol': '£'},
    {'code': 'STN', 'name': 'São Tomé and Príncipe Dobra', 'symbol': 'Db'},
    {'code': 'SYP', 'name': 'Syrian Pound', 'symbol': '£'},
    {'code': 'TND', 'name': 'Tunisian Dinar', 'symbol': 'د.ت'},
    {'code': 'UAH', 'name': 'Ukrainian Hryvnia', 'symbol': '₴'},
    {'code': 'UZS', 'name': 'Uzbekistani Som', 'symbol': 'лв'},
    {'code': 'YER', 'name': 'Yemeni Rial', 'symbol': '﷼'},
    {'code': 'ZAR', 'name': 'South African Rand', 'symbol': 'R'},
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _currencySearchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Settings',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        backgroundColor:
            isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          children: [
            // Profile Section
            _buildProfileSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // App Preferences
            _buildAppPreferencesSection(isDark),

            const SizedBox(height: AppSpacing.lg),

            // Account Security
            _buildAccountSecuritySection(isDark),

            const SizedBox(height: AppSpacing.lg),

            // Subscription & Billing
            _buildSubscriptionBillingSection(isDark),

            const SizedBox(height: AppSpacing.lg),

            // Support & Info
            _buildSupportInfoSection(isDark),

            const SizedBox(height: AppSpacing.xl),

            // Sign Out Button
            _buildSignOutButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileSection(bool isDark) {
    return CustomCard(
      child: Column(
        children: [
          // Avatar
          Container(
            width: 100,
            height: 100,
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
              Icons.person,
              size: 50,
              color: Colors.white,
            ),
          ).animate().scale(
                duration: 600.ms,
                curve: Curves.elasticOut,
              ),

          const SizedBox(height: AppSpacing.lg),

          // Name and Email
          if (!_isEditingProfile) ...[
            Text(
              _nameController.text,
              style: AppTypography.headlineSmall(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ).animate().fadeIn(
                  duration: 800.ms,
                  delay: 200.ms,
                ),

            const SizedBox(height: AppSpacing.xs),

            Text(
              _emailController.text,
              style: AppTypography.bodyMedium(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
            ).animate().fadeIn(
                  duration: 800.ms,
                  delay: 400.ms,
                ),

            const SizedBox(height: AppSpacing.lg),

            // Edit Profile Button
            CustomButton(
              text: 'Edit Profile',
              onPressed: () {
                setState(() {
                  _isEditingProfile = true;
                });
              },
              variant: ButtonVariant.outline,
              size: ButtonSize.medium,
            ).animate().fadeIn(
                  duration: 800.ms,
                  delay: 600.ms,
                ),
          ] else ...[
            // Edit Profile Form
            CustomInput(
              controller: _nameController,
              label: 'Full Name',
              hint: 'Enter your full name',
              prefixIcon: Icons.person_outline,
            ),

            const SizedBox(height: AppSpacing.md),

            CustomInput(
              controller: _emailController,
              label: 'Email Address',
              hint: 'Enter your email',
              prefixIcon: Icons.email_outlined,
              keyboardType: TextInputType.emailAddress,
            ),

            const SizedBox(height: AppSpacing.lg),

            Row(
              children: [
                Expanded(
                  child: CustomButton(
                    text: 'Cancel',
                    onPressed: () {
                      setState(() {
                        _isEditingProfile = false;
                      });
                    },
                    variant: ButtonVariant.outline,
                    size: ButtonSize.medium,
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: CustomButton(
                    text: 'Save',
                    onPressed: () {
                      setState(() {
                        _isEditingProfile = false;
                      });
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Profile updated successfully!'),
                          backgroundColor: AppColors.success,
                        ),
                      );
                    },
                    variant: ButtonVariant.primary,
                    size: ButtonSize.medium,
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildAppPreferencesSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'App Preferences',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildSwitchTile(
            icon: Icons.notifications_outlined,
            title: 'Push Notifications',
            subtitle: 'Receive notifications about your spending',
            value: _notificationsEnabled,
            onChanged: (value) {
              setState(() {
                _notificationsEnabled = value;
              });
            },
            isDark: isDark,
          ),
          _buildSwitchTile(
            icon: Icons.dark_mode_outlined,
            title: 'Dark Mode',
            subtitle: 'Use dark theme throughout the app',
            value: _darkModeEnabled,
            onChanged: (value) {
              setState(() {
                _darkModeEnabled = value;
              });
            },
            isDark: isDark,
          ),
          _buildSwitchTile(
            icon: Icons.fingerprint,
            title: 'Biometric Login',
            subtitle: 'Use fingerprint or face ID to unlock',
            value: _biometricEnabled,
            onChanged: (value) {
              setState(() {
                _biometricEnabled = value;
              });
            },
            isDark: isDark,
          ),
          _buildSwitchTile(
            icon: Icons.analytics_outlined,
            title: 'Analytics',
            subtitle: 'Help improve the app with usage data',
            value: _analyticsEnabled,
            onChanged: (value) {
              setState(() {
                _analyticsEnabled = value;
              });
            },
            isDark: isDark,
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildDemoButton(isDark),
          const SizedBox(height: AppSpacing.lg),
          _buildCurrencySelector(isDark),
          const SizedBox(height: AppSpacing.md),
          _buildLanguageSelector(isDark),
        ],
      ),
    );
  }

  Widget _buildCurrencySelector(bool isDark) {
    final filteredCurrencies = _currencies.where((currency) {
      final query = _currencySearchQuery.toLowerCase();
      return currency['code']!.toLowerCase().contains(query) ||
          currency['name']!.toLowerCase().contains(query);
    }).toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Currency',
          style: AppTypography.labelMedium(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.sm),
        CustomInput(
          controller: _currencySearchController,
          hint: 'Search currencies...',
          prefixIcon: Icons.search,
          onChanged: (value) {
            setState(() {
              _currencySearchQuery = value;
            });
          },
        ),
        const SizedBox(height: AppSpacing.sm),
        Container(
          height: 150,
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
            border: Border.all(
              color: isDark ? AppColors.borderDark : AppColors.borderLight,
            ),
          ),
          child: ListView.builder(
            padding: const EdgeInsets.all(AppSpacing.sm),
            itemCount: filteredCurrencies.length,
            itemBuilder: (context, index) {
              final currency = filteredCurrencies[index];
              final isSelected = _selectedCurrency == currency['code'];

              return ListTile(
                title: Text(
                  '${currency['code']} - ${currency['name']}',
                  style: AppTypography.bodyMedium(
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                subtitle: Text(
                  currency['symbol']!,
                  style: AppTypography.bodySmall(
                    color: isDark
                        ? AppColors.textSecondaryDark
                        : AppColors.textSecondaryLight,
                  ),
                ),
                trailing: isSelected
                    ? Icon(
                        Icons.check_circle,
                        color: AppColors.getPrimaryColor(isDark),
                      )
                    : null,
                onTap: () {
                  setState(() {
                    _selectedCurrency = currency['code']!;
                  });
                },
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildLanguageSelector(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Language',
          style: AppTypography.labelMedium(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.sm),
        Container(
          decoration: BoxDecoration(
            color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
            border: Border.all(
              color: isDark ? AppColors.borderDark : AppColors.borderLight,
            ),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: _selectedLanguage,
              isExpanded: true,
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              items: [
                'English',
                'Spanish',
                'French',
                'German',
                'Italian',
                'Portuguese',
                'Chinese',
                'Japanese',
                'Korean',
                'Arabic'
              ].map((String item) {
                return DropdownMenuItem<String>(
                  value: item,
                  child: Text(
                    item,
                    style: AppTypography.bodyMedium(
                      color: isDark
                          ? AppColors.textPrimaryDark
                          : AppColors.textPrimaryLight,
                    ),
                  ),
                );
              }).toList(),
              onChanged: (value) => setState(() => _selectedLanguage = value!),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAccountSecuritySection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Account Security',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildListTile(
            icon: Icons.security_outlined,
            title: 'Security Settings',
            subtitle: 'Password, 2FA, and security settings',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const SecurityScreen(),
                ),
              );
            },
            isDark: isDark,
          ),
        ],
      ),
    );
  }

  Widget _buildSubscriptionBillingSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Subscription & Billing',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildListTile(
            icon: Icons.subscriptions_outlined,
            title: 'Subscription',
            subtitle: 'Manage your subscription plan',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const SubscriptionManagementScreen(),
                ),
              );
            },
            isDark: isDark,
            trailing: Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.sm,
                vertical: AppSpacing.xs,
              ),
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
              ),
              child: Text(
                'Premium',
                style: AppTypography.captionSmall(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          _buildListTile(
            icon: Icons.credit_card_outlined,
            title: 'Payment Methods',
            subtitle: 'Manage your payment methods',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const PaymentMethodsScreen(),
                ),
              );
            },
            isDark: isDark,
          ),
        ],
      ),
    );
  }

  Widget _buildSupportInfoSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Support & Info',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.lg),
          _buildListTile(
            icon: Icons.help_outline,
            title: 'Help Center',
            subtitle: 'Get help and support',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const HelpCenterScreen(),
                ),
              );
            },
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
          _buildListTile(
            icon: Icons.info_outline,
            title: 'About',
            subtitle: 'Version 1.0.0',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const AboutScreen(),
                ),
              );
            },
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
          _buildListTile(
            icon: Icons.feedback_outlined,
            title: 'Send Feedback',
            subtitle: 'Share your thoughts with us',
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Feedback functionality coming soon!'),
                  backgroundColor: AppColors.info,
                ),
              );
            },
            isDark: isDark,
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildSignOutButton() {
    return CustomButton(
      text: 'Sign Out',
      onPressed: () {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Sign Out'),
            content: const Text('Are you sure you want to sign out?'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel'),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(
                      builder: (context) => const LoginScreen(),
                    ),
                    (route) => false,
                  );
                },
                child: const Text('Sign Out'),
              ),
            ],
          ),
        );
      },
      variant: ButtonVariant.outline,
      customColor: AppColors.error,
      size: ButtonSize.large,
      isFullWidth: true,
    ).animate().fadeIn(
          duration: 600.ms,
          delay: 800.ms,
        );
  }

  Widget _buildListTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required bool isDark,
    Widget? trailing,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: AppColors.primary,
      ),
      title: Text(
        title,
        style: AppTypography.bodyLarge(
          color:
              isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: AppTypography.bodySmall(
          color: isDark
              ? AppColors.textSecondaryDark
              : AppColors.textSecondaryLight,
        ),
      ),
      trailing: trailing,
      onTap: onTap,
      contentPadding: EdgeInsets.zero,
    );
  }

  Widget _buildSwitchTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required bool isDark,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: AppColors.primary,
      ),
      title: Text(
        title,
        style: AppTypography.bodyLarge(
          color:
              isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: AppTypography.bodySmall(
          color: isDark
              ? AppColors.textSecondaryDark
              : AppColors.textSecondaryLight,
        ),
      ),
      trailing: Switch(
        value: value,
        onChanged: onChanged,
        activeColor: AppColors.primary,
      ),
      contentPadding: EdgeInsets.zero,
    );
  }

  Widget _buildDemoButton(bool isDark) {
    return CustomButton(
      text: 'View Theme Demo',
      onPressed: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => const ThemeDemoScreen(),
          ),
        );
      },
      variant: ButtonVariant.outline,
      size: ButtonSize.medium,
    );
  }
}
