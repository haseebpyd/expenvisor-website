import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';
import '../../../shared/widgets/custom_card.dart';

class AddExpenseScreen extends StatefulWidget {
  const AddExpenseScreen({super.key});

  @override
  State<AddExpenseScreen> createState() => _AddExpenseScreenState();
}

class _AddExpenseScreenState extends State<AddExpenseScreen> {
  final _formKey = GlobalKey<FormState>();
  final _amountController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _noteController = TextEditingController();
  
  String _selectedCategory = 'Food & Dining';
  DateTime _selectedDate = DateTime.now();
  String _selectedPaymentMethod = 'Cash';
  bool _isRecurring = false;
  bool _isLoading = false;

  final List<Map<String, dynamic>> _categories = [
    {'name': 'Food & Dining', 'icon': Icons.restaurant, 'color': AppColors.expense},
    {'name': 'Transportation', 'icon': Icons.directions_car, 'color': AppColors.info},
    {'name': 'Shopping', 'icon': Icons.shopping_bag, 'color': AppColors.secondary},
    {'name': 'Entertainment', 'icon': Icons.movie, 'color': AppColors.warning},
    {'name': 'Healthcare', 'icon': Icons.local_hospital, 'color': AppColors.error},
    {'name': 'Education', 'icon': Icons.school, 'color': AppColors.primary},
    {'name': 'Utilities', 'icon': Icons.electrical_services, 'color': AppColors.accent},
    {'name': 'Travel', 'icon': Icons.flight, 'color': AppColors.aiFeatures},
    {'name': 'Other', 'icon': Icons.more_horiz, 'color': AppColors.textTertiaryLight},
  ];

  final List<String> _paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Bank Transfer',
    'Digital Wallet',
    'Check',
  ];

  @override
  void dispose() {
    _amountController.dispose();
    _descriptionController.dispose();
    _noteController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Add Expense',
          style: AppTypography.titleLarge(
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.mic),
            onPressed: _startVoiceInput,
            tooltip: 'Voice Input',
          ),
          IconButton(
            icon: const Icon(Icons.camera_alt),
            onPressed: _startCameraScan,
            tooltip: 'Scan Receipt',
          ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Amount Section
              _buildAmountSection(isDark),
              
              const SizedBox(height: AppSpacing.xl),
              
              // Description Section
              _buildDescriptionSection(isDark),
              
              const SizedBox(height: AppSpacing.xl),
              
              // Category Section
              _buildCategorySection(isDark),
              
              const SizedBox(height: AppSpacing.xl),
              
              // Date and Payment Method
              _buildDateAndPaymentSection(isDark),
              
              const SizedBox(height: AppSpacing.xl),
              
              // Additional Options
              _buildAdditionalOptions(isDark),
              
              const SizedBox(height: AppSpacing.xl),
              
              // Notes Section
              _buildNotesSection(isDark),
              
              const SizedBox(height: AppSpacing.xxxl),
              
              // Action Buttons
              _buildActionButtons(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAmountSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Amount',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: AppColors.expense.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
                ),
                child: Icon(
                  Icons.attach_money,
                  color: AppColors.expense,
                  size: 24,
                ),
              ),
              
              const SizedBox(width: AppSpacing.md),
              
              Expanded(
                child: AmountInput(
                  hint: '0.00',
                  controller: _amountController,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter amount';
                    }
                    if (double.tryParse(value) == null) {
                      return 'Please enter valid amount';
                    }
                    if (double.parse(value) <= 0) {
                      return 'Amount must be greater than 0';
                    }
                    return null;
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    ).animate().fadeIn(
      duration: 600.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
    );
  }

  Widget _buildDescriptionSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Description',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          CustomInput(
            hint: 'What did you spend on?',
            controller: _descriptionController,
            textInputAction: TextInputAction.next,
            prefixIcon: Icons.description_outlined,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter description';
              }
              return null;
            },
          ),
        ],
      ),
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 200.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 200.ms,
    );
  }

  Widget _buildCategorySection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Category',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          Wrap(
            spacing: AppSpacing.sm,
            runSpacing: AppSpacing.sm,
            children: _categories.map((category) {
              final isSelected = _selectedCategory == category['name'];
              return GestureDetector(
                onTap: () {
                  setState(() {
                    _selectedCategory = category['name'];
                  });
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md,
                    vertical: AppSpacing.sm,
                  ),
                  decoration: BoxDecoration(
                    color: isSelected 
                        ? (category['color'] as Color).withOpacity(0.2)
                        : (isDark ? AppColors.surfaceDark : AppColors.surfaceLight),
                    borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
                    border: Border.all(
                      color: isSelected 
                          ? category['color'] as Color
                          : (isDark ? AppColors.borderDark : AppColors.borderLight),
                      width: isSelected ? 2 : 1,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        category['icon'] as IconData,
                        size: 16,
                        color: isSelected 
                            ? category['color'] as Color
                            : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight),
                      ),
                      const SizedBox(width: AppSpacing.xs),
                      Text(
                        category['name'] as String,
                        style: AppTypography.labelMedium(
                          color: isSelected 
                              ? category['color'] as Color
                              : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 400.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 400.ms,
    );
  }

  Widget _buildDateAndPaymentSection(bool isDark) {
    return Row(
      children: [
        // Date Picker
        Expanded(
          child: CustomCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Date',
                  style: AppTypography.titleMedium(
                    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                  ),
                ),
                
                const SizedBox(height: AppSpacing.lg),
                
                GestureDetector(
                  onTap: _selectDate,
                  child: Container(
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: isDark ? AppColors.borderDark : AppColors.borderLight,
                      ),
                      borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.calendar_today,
                          color: AppColors.primary,
                          size: 20,
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Text(
                          '${_selectedDate.day}/${_selectedDate.month}/${_selectedDate.year}',
                          style: AppTypography.bodyMedium(),
                        ),
                        const Spacer(),
                        const Icon(Icons.arrow_drop_down),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        
        const SizedBox(width: AppSpacing.md),
        
        // Payment Method
        Expanded(
          child: CustomCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Payment',
                  style: AppTypography.titleMedium(
                    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                  ),
                ),
                
                const SizedBox(height: AppSpacing.lg),
                
                DropdownButtonFormField<String>(
                  value: _selectedPaymentMethod,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.md,
                      vertical: AppSpacing.sm,
                    ),
                  ),
                  items: _paymentMethods.map((method) {
                    return DropdownMenuItem(
                      value: method,
                      child: Text(method),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedPaymentMethod = value!;
                    });
                  },
                ),
              ],
            ),
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 600.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 600.ms,
    );
  }

  Widget _buildAdditionalOptions(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Additional Options',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          SwitchListTile(
            title: Text(
              'Recurring Expense',
              style: AppTypography.bodyLarge(),
            ),
            subtitle: Text(
              'This expense repeats monthly',
              style: AppTypography.bodySmall(
                color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
              ),
            ),
            value: _isRecurring,
            onChanged: (value) {
              setState(() {
                _isRecurring = value;
              });
            },
            activeColor: AppColors.primary,
            contentPadding: EdgeInsets.zero,
          ),
        ],
      ),
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 800.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 800.ms,
    );
  }

  Widget _buildNotesSection(bool isDark) {
    return CustomCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Notes (Optional)',
            style: AppTypography.titleMedium(
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          
          const SizedBox(height: AppSpacing.lg),
          
          CustomInput(
            hint: 'Add any additional notes...',
            controller: _noteController,
            maxLines: 3,
            textInputAction: TextInputAction.done,
            prefixIcon: Icons.note_outlined,
          ),
        ],
      ),
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

  Widget _buildActionButtons() {
    return Row(
      children: [
        Expanded(
          child: CustomButton(
            text: 'Cancel',
            onPressed: () => Navigator.of(context).pop(),
            variant: ButtonVariant.outline,
            size: ButtonSize.large,
          ),
        ),
        
        const SizedBox(width: AppSpacing.md),
        
        Expanded(
          child: CustomButton(
            text: 'Add Expense',
            onPressed: _isLoading ? null : _saveExpense,
            isLoading: _isLoading,
            variant: ButtonVariant.gradient,
            customColor: AppColors.expense,
            size: ButtonSize.large,
          ),
        ),
      ],
    ).animate().fadeIn(
      duration: 600.ms,
      delay: 1200.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 600.ms,
      delay: 1200.ms,
    );
  }

  Future<void> _selectDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    
    if (date != null) {
      setState(() {
        _selectedDate = date;
      });
    }
  }

  void _startVoiceInput() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Voice input feature coming soon!'),
        backgroundColor: AppColors.primary,
      ),
    );
  }

  void _startCameraScan() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Camera scan feature coming soon!'),
        backgroundColor: AppColors.secondary,
      ),
    );
  }

  void _saveExpense() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isLoading = false;
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Expense of \$${_amountController.text} added successfully!'),
          backgroundColor: AppColors.success,
        ),
      );
      Navigator.of(context).pop();
    }
  }
}
