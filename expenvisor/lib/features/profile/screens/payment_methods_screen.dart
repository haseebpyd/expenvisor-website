import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';

class PaymentMethodsScreen extends StatefulWidget {
  const PaymentMethodsScreen({super.key});

  @override
  State<PaymentMethodsScreen> createState() => _PaymentMethodsScreenState();
}

class _PaymentMethodsScreenState extends State<PaymentMethodsScreen> {
  final _cardNumberController = TextEditingController();
  final _expiryController = TextEditingController();
  final _cvvController = TextEditingController();
  final _cardholderNameController = TextEditingController();
  final _bankAccountController = TextEditingController();
  final _routingNumberController = TextEditingController();

  String _selectedPaymentMethod = 'Credit Card';
  String _selectedCardType = 'Visa';
  bool _isDefaultPayment = false;

  // Mock payment methods data
  final List<Map<String, dynamic>> _paymentMethods = [
    {
      'id': '1',
      'type': 'Credit Card',
      'cardType': 'Visa',
      'lastFour': '4242',
      'expiry': '12/25',
      'isDefault': true,
      'isActive': true,
    },
    {
      'id': '2',
      'type': 'Credit Card',
      'cardType': 'Mastercard',
      'lastFour': '5555',
      'expiry': '08/26',
      'isDefault': false,
      'isActive': true,
    },
    {
      'id': '3',
      'type': 'Bank Account',
      'bankName': 'Chase Bank',
      'lastFour': '1234',
      'isDefault': false,
      'isActive': true,
    },
    {
      'id': '4',
      'type': 'PayPal',
      'email': 'user@example.com',
      'isDefault': false,
      'isActive': true,
    },
  ];

  @override
  void dispose() {
    _cardNumberController.dispose();
    _expiryController.dispose();
    _cvvController.dispose();
    _cardholderNameController.dispose();
    _bankAccountController.dispose();
    _routingNumberController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Payment Methods',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        backgroundColor:
            isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        elevation: 0,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          IconButton(
            icon: Icon(
              Icons.add,
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
            onPressed: () => _showAddPaymentMethodDialog(isDark),
          ),
        ],
      ),
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(AppSpacing.lg),
              itemCount: _paymentMethods.length,
              itemBuilder: (context, index) {
                final method = _paymentMethods[index];
                return _buildPaymentMethodCard(method, isDark, index);
              },
            ),
          ),
          _buildAddPaymentButton(isDark),
        ],
      ),
    );
  }

  Widget _buildPaymentMethodCard(
      Map<String, dynamic> method, bool isDark, int index) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: method['isDefault']
              ? AppColors.getPrimaryColor(isDark)
              : (isDark ? AppColors.borderDark : AppColors.borderLight),
          width: method['isDefault'] ? 2 : 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              _buildPaymentMethodIcon(
                  method['type'], method['cardType'], isDark),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          _getPaymentMethodTitle(method),
                          style: AppTypography.labelLarge(
                            color: isDark
                                ? AppColors.textPrimaryDark
                                : AppColors.textPrimaryLight,
                          ),
                        ),
                        if (method['isDefault']) ...[
                          const SizedBox(width: AppSpacing.sm),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppSpacing.sm,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.getPrimaryColor(isDark),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              'DEFAULT',
                              style: AppTypography.labelSmall(
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      _getPaymentMethodSubtitle(method),
                      style: AppTypography.bodySmall(
                        color: isDark
                            ? AppColors.textSecondaryDark
                            : AppColors.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),
              PopupMenuButton<String>(
                onSelected: (value) =>
                    _handlePaymentMethodAction(value, method, index),
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    value: 'set_default',
                    child: Text('Set as Default'),
                  ),
                  const PopupMenuItem(
                    value: 'edit',
                    child: Text('Edit'),
                  ),
                  const PopupMenuItem(
                    value: 'remove',
                    child: Text('Remove'),
                  ),
                ],
                child: Icon(
                  Icons.more_vert,
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
            ],
          ),
          if (method['isActive'] == false) ...[
            const SizedBox(height: AppSpacing.sm),
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.sm,
                vertical: 4,
              ),
              decoration: BoxDecoration(
                color: AppColors.warning.withOpacity(0.1),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                'Inactive',
                style: AppTypography.labelSmall(
                  color: AppColors.warning,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildPaymentMethodIcon(String type, String? cardType, bool isDark) {
    IconData icon;
    Color color;

    switch (type) {
      case 'Credit Card':
        switch (cardType) {
          case 'Visa':
            icon = Icons.credit_card;
            color = const Color(0xFF1A1F71); // Visa blue
            break;
          case 'Mastercard':
            icon = Icons.credit_card;
            color = const Color(0xFFEB001B); // Mastercard red
            break;
          case 'American Express':
            icon = Icons.credit_card;
            color = const Color(0xFF006FCF); // Amex blue
            break;
          default:
            icon = Icons.credit_card;
            color = AppColors.getPrimaryColor(isDark);
        }
        break;
      case 'Bank Account':
        icon = Icons.account_balance;
        color = AppColors.getSecondaryColor(isDark);
        break;
      case 'PayPal':
        icon = Icons.payment;
        color = const Color(0xFF0070BA); // PayPal blue
        break;
      default:
        icon = Icons.payment;
        color = AppColors.getPrimaryColor(isDark);
    }

    return Container(
      padding: const EdgeInsets.all(AppSpacing.sm),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
      ),
      child: Icon(
        icon,
        color: color,
        size: 24,
      ),
    );
  }

  String _getPaymentMethodTitle(Map<String, dynamic> method) {
    switch (method['type']) {
      case 'Credit Card':
        return '${method['cardType']} •••• ${method['lastFour']}';
      case 'Bank Account':
        return '${method['bankName']} •••• ${method['lastFour']}';
      case 'PayPal':
        return 'PayPal (${method['email']})';
      default:
        return method['type'];
    }
  }

  String _getPaymentMethodSubtitle(Map<String, dynamic> method) {
    switch (method['type']) {
      case 'Credit Card':
        return 'Expires ${method['expiry']}';
      case 'Bank Account':
        return 'Checking Account';
      case 'PayPal':
        return 'Digital Wallet';
      default:
        return '';
    }
  }

  Widget _buildAddPaymentButton(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        border: Border(
          top: BorderSide(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
          ),
        ),
      ),
      child: CustomButton(
        text: 'Add Payment Method',
        onPressed: () => _showAddPaymentMethodDialog(isDark),
        variant: ButtonVariant.primary,
        size: ButtonSize.large,
        icon: Icons.add,
      ),
    );
  }

  void _showAddPaymentMethodDialog(bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Payment Method'),
        content: SizedBox(
          width: double.maxFinite,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _buildPaymentMethodSelector(isDark),
              const SizedBox(height: AppSpacing.lg),
              if (_selectedPaymentMethod == 'Credit Card') ...[
                _buildCreditCardForm(isDark),
              ] else if (_selectedPaymentMethod == 'Bank Account') ...[
                _buildBankAccountForm(isDark),
              ] else if (_selectedPaymentMethod == 'PayPal') ...[
                _buildPayPalForm(isDark),
              ],
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Add',
            onPressed: () => _addPaymentMethod(isDark),
            variant: ButtonVariant.primary,
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentMethodSelector(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Payment Method Type',
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
              value: _selectedPaymentMethod,
              isExpanded: true,
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              items:
                  ['Credit Card', 'Bank Account', 'PayPal'].map((String item) {
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
              onChanged: (value) =>
                  setState(() => _selectedPaymentMethod = value!),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCreditCardForm(bool isDark) {
    return Column(
      children: [
        CustomInput(
          controller: _cardNumberController,
          label: 'Card Number',
          hint: '1234 5678 9012 3456',
          keyboardType: TextInputType.number,
          prefixIcon: Icons.credit_card,
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: CustomInput(
                controller: _expiryController,
                label: 'Expiry Date',
                hint: 'MM/YY',
                keyboardType: TextInputType.number,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: CustomInput(
                controller: _cvvController,
                label: 'CVV',
                hint: '123',
                keyboardType: TextInputType.number,
                obscureText: true,
                maxLength: 3,
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        CustomInput(
          controller: _cardholderNameController,
          label: 'Cardholder Name',
          hint: 'John Doe',
        ),
        const SizedBox(height: AppSpacing.md),
        _buildCardTypeSelector(isDark),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Checkbox(
              value: _isDefaultPayment,
              onChanged: (value) =>
                  setState(() => _isDefaultPayment = value ?? false),
              activeColor: AppColors.getPrimaryColor(isDark),
            ),
            Expanded(
              child: Text(
                'Set as default payment method',
                style: AppTypography.bodyMedium(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCardTypeSelector(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Card Type',
          style: AppTypography.labelMedium(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.sm),
        Row(
          children: [
            Expanded(
              child: _buildCardTypeOption('Visa', isDark),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: _buildCardTypeOption('Mastercard', isDark),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: _buildCardTypeOption('American Express', isDark),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCardTypeOption(String cardType, bool isDark) {
    final isSelected = _selectedCardType == cardType;

    return GestureDetector(
      onTap: () => setState(() => _selectedCardType = cardType),
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.sm,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.getPrimaryColor(isDark).withOpacity(0.1)
              : (isDark ? AppColors.surfaceDark : AppColors.surfaceLight),
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isSelected
                ? AppColors.getPrimaryColor(isDark)
                : (isDark ? AppColors.borderDark : AppColors.borderLight),
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          cardType,
          textAlign: TextAlign.center,
          style: AppTypography.labelSmall(
            color: isSelected
                ? AppColors.getPrimaryColor(isDark)
                : (isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight),
          ),
        ),
      ),
    );
  }

  Widget _buildBankAccountForm(bool isDark) {
    return Column(
      children: [
        CustomInput(
          controller: _bankAccountController,
          label: 'Account Number',
          hint: 'Enter account number',
          keyboardType: TextInputType.number,
          prefixIcon: Icons.account_balance,
        ),
        const SizedBox(height: AppSpacing.md),
        CustomInput(
          controller: _routingNumberController,
          label: 'Routing Number',
          hint: 'Enter routing number',
          keyboardType: TextInputType.number,
          prefixIcon: Icons.account_balance,
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Checkbox(
              value: _isDefaultPayment,
              onChanged: (value) =>
                  setState(() => _isDefaultPayment = value ?? false),
              activeColor: AppColors.getPrimaryColor(isDark),
            ),
            Expanded(
              child: Text(
                'Set as default payment method',
                style: AppTypography.bodyMedium(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPayPalForm(bool isDark) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(AppSpacing.lg),
          decoration: BoxDecoration(
            color: const Color(0xFF0070BA).withOpacity(0.1),
            borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
            border: Border.all(
              color: const Color(0xFF0070BA).withOpacity(0.3),
            ),
          ),
          child: Row(
            children: [
              Icon(
                Icons.payment,
                color: const Color(0xFF0070BA),
                size: 32,
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'PayPal Integration',
                      style: AppTypography.labelLarge(
                        color: const Color(0xFF0070BA),
                      ),
                    ),
                    Text(
                      'Connect your PayPal account securely',
                      style: AppTypography.bodySmall(
                        color: const Color(0xFF0070BA).withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Checkbox(
              value: _isDefaultPayment,
              onChanged: (value) =>
                  setState(() => _isDefaultPayment = value ?? false),
              activeColor: AppColors.getPrimaryColor(isDark),
            ),
            Expanded(
              child: Text(
                'Set as default payment method',
                style: AppTypography.bodyMedium(
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  void _handlePaymentMethodAction(
      String action, Map<String, dynamic> method, int index) {
    switch (action) {
      case 'set_default':
        _setAsDefault(index);
        break;
      case 'edit':
        _editPaymentMethod(method, index);
        break;
      case 'remove':
        _removePaymentMethod(index);
        break;
    }
  }

  void _setAsDefault(int index) {
    setState(() {
      for (int i = 0; i < _paymentMethods.length; i++) {
        _paymentMethods[i]['isDefault'] = i == index;
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Default payment method updated!'),
        backgroundColor: AppColors.success,
      ),
    );
  }

  void _editPaymentMethod(Map<String, dynamic> method, int index) {
    // TODO: Implement edit functionality
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Edit payment method coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _removePaymentMethod(int index) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Remove Payment Method'),
        content:
            const Text('Are you sure you want to remove this payment method?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          CustomButton(
            text: 'Remove',
            onPressed: () {
              setState(() {
                _paymentMethods.removeAt(index);
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Payment method removed!'),
                  backgroundColor: AppColors.success,
                ),
              );
            },
            variant: ButtonVariant.outline,
            customColor: AppColors.error,
          ),
        ],
      ),
    );
  }

  void _addPaymentMethod(bool isDark) {
    // TODO: Implement actual payment method addition
    final newMethod = {
      'id': DateTime.now().millisecondsSinceEpoch.toString(),
      'type': _selectedPaymentMethod,
      'cardType': _selectedCardType,
      'lastFour': '1234',
      'expiry': '12/25',
      'isDefault': _isDefaultPayment,
      'isActive': true,
    };

    setState(() {
      if (_isDefaultPayment) {
        for (var method in _paymentMethods) {
          method['isDefault'] = false;
        }
      }
      _paymentMethods.add(newMethod);
    });

    Navigator.pop(context);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Payment method added successfully!'),
        backgroundColor: AppColors.success,
      ),
    );
  }
}
