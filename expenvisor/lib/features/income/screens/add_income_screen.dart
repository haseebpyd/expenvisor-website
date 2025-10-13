import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';
import '../../../shared/widgets/custom_card.dart';

class AddIncomeScreen extends StatefulWidget {
  const AddIncomeScreen({super.key});

  @override
  State<AddIncomeScreen> createState() => _AddIncomeScreenState();
}

class _AddIncomeScreenState extends State<AddIncomeScreen> {
  final _formKey = GlobalKey<FormState>();
  final _amountController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _noteController = TextEditingController();
  
  String _selectedCategory = 'Salary';
  DateTime _selectedDate = DateTime.now();
  String _selectedPaymentMethod = 'Bank Transfer';
  bool _isRecurring = false;
  bool _isLoading = false;

  final List<Map<String, dynamic>> _categories = [
    {'name': 'Salary', 'icon': Icons.work, 'color': AppColors.income},
    {'name': 'Freelance', 'icon': Icons.computer, 'color': AppColors.accent},
    {'name': 'Investment', 'icon': Icons.trending_up, 'color': AppColors.success},
    {'name': 'Business', 'icon': Icons.business, 'color': AppColors.primary},
    {'name': 'Rental', 'icon': Icons.home, 'color': AppColors.secondary},
    {'name': 'Gift', 'icon': Icons.card_giftcard, 'color': AppColors.warning},
    {'name': 'Refund', 'icon': Icons.reply, 'color': AppColors.info},
    {'name': 'Bonus', 'icon': Icons.star, 'color': AppColors.aiFeatures},
    {'name': 'Other', 'icon': Icons.more_horiz, 'color': AppColors.textTertiaryLight},
  ];

  final List<String> _paymentMethods = [
    'Bank Transfer',
    'Cash',
    'Check',
    'Digital Wallet',
    'Credit Card',
    'Other',
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
          'Add Income',
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
            tooltip: 'Scan Document',
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
                  color: AppColors.income.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
                ),
                child: Icon(
                  Icons.trending_up,
                  color: AppColors.income,
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
            hint: 'What is this income from?',
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
              'Recurring Income',
              style: AppTypography.bodyLarge(),
            ),
            subtitle: Text(
              'This income repeats monthly',
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
            text: 'Add Income',
            onPressed: _isLoading ? null : _saveIncome,
            isLoading: _isLoading,
            variant: ButtonVariant.gradient,
            customColor: AppColors.income,
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
        content: Text('Document scan feature coming soon!'),
        backgroundColor: AppColors.secondary,
      ),
    );
  }

  void _saveIncome() async {
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
          content: Text('Income of \$${_amountController.text} added successfully!'),
          backgroundColor: AppColors.success,
        ),
      );
      Navigator.of(context).pop();
    }
  }
}
