import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../../shared/widgets/custom_input.dart';

class HelpCenterScreen extends StatefulWidget {
  const HelpCenterScreen({super.key});

  @override
  State<HelpCenterScreen> createState() => _HelpCenterScreenState();
}

class _HelpCenterScreenState extends State<HelpCenterScreen> {
  final _searchController = TextEditingController();
  final _messageController = TextEditingController();
  final _subjectController = TextEditingController();

  String _selectedCategory = 'General';
  bool _isSearching = false;
  String _searchQuery = '';

  // Mock FAQ data
  final List<Map<String, dynamic>> _faqCategories = [
    {
      'name': 'Getting Started',
      'icon': Icons.play_circle_outline,
      'faqs': [
        {
          'question': 'How do I add my first expense?',
          'answer':
              'Tap the + button on the dashboard, select "Add Expense", enter the amount, choose a category, and save. You can also use voice input or scan receipts.',
        },
        {
          'question': 'How do I set up my budget?',
          'answer':
              'Go to Settings > Budget, enter your monthly budget amount, and set up budget alerts. The app will track your spending against this limit.',
        },
        {
          'question': 'Can I use the app without creating an account?',
          'answer':
              'Yes! You can use the app in guest mode, but your data will only be stored locally on your device and won\'t sync across devices.',
        },
      ],
    },
    {
      'name': 'AI Features',
      'icon': Icons.psychology_outlined,
      'faqs': [
        {
          'question': 'How does voice input work?',
          'answer':
              'Tap the microphone icon and speak naturally. For example, say "Spent \$25 on lunch at McDonald\'s" and the app will extract the amount, category, and description.',
        },
        {
          'question': 'Can I scan receipts with the camera?',
          'answer':
              'Yes! Use the camera icon to scan receipts. The app will use OCR to extract the amount, merchant, and date automatically.',
        },
        {
          'question': 'What can I ask the AI chat?',
          'answer':
              'You can ask about your spending patterns, get budget advice, request expense summaries, or ask general financial questions.',
        },
      ],
    },
    {
      'name': 'Account & Security',
      'icon': Icons.security_outlined,
      'faqs': [
        {
          'question': 'How do I change my password?',
          'answer':
              'Go to Profile > Security > Change Password. Enter your current password and create a new one.',
        },
        {
          'question': 'Is my data secure?',
          'answer':
              'Yes! All data is encrypted and stored securely. We use industry-standard security practices to protect your information.',
        },
        {
          'question': 'Can I export my data?',
          'answer':
              'Yes! Go to Settings > Data & Privacy > Export Data to download your expenses and income as CSV or PDF.',
        },
      ],
    },
    {
      'name': 'Subscription & Billing',
      'icon': Icons.payment_outlined,
      'faqs': [
        {
          'question': 'What\'s the difference between Free and paid plans?',
          'answer':
              'Free plan includes basic expense tracking with limits. Paid plans offer unlimited transactions, AI features, advanced analytics, and more.',
        },
        {
          'question': 'How do I cancel my subscription?',
          'answer':
              'Go to Profile > Subscription Management > Cancel Subscription. You can also pause your subscription instead of cancelling.',
        },
        {
          'question': 'Can I get a refund?',
          'answer':
              'We offer refunds within 7 days of purchase. Contact support for assistance with refund requests.',
        },
      ],
    },
  ];

  // Mock support topics
  final List<Map<String, dynamic>> _supportTopics = [
    {
      'title': 'Technical Issues',
      'description': 'App crashes, sync problems, or performance issues',
      'icon': Icons.bug_report_outlined,
    },
    {
      'title': 'Account Problems',
      'description': 'Login issues, password reset, or account access',
      'icon': Icons.account_circle_outlined,
    },
    {
      'title': 'Billing Questions',
      'description': 'Subscription, payment, or refund inquiries',
      'icon': Icons.receipt_outlined,
    },
    {
      'title': 'Feature Requests',
      'description': 'Suggest new features or improvements',
      'icon': Icons.lightbulb_outline,
    },
    {
      'title': 'General Support',
      'description': 'Other questions or concerns',
      'icon': Icons.help_outline,
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    _messageController.dispose();
    _subjectController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Help Center',
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
      ),
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSearchSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildQuickActionsSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildFAQSection(isDark),
            const SizedBox(height: AppSpacing.xl),
            _buildContactSupportSection(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'How can we help you?',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        CustomInput(
          controller: _searchController,
          hint: 'Search for help articles, FAQs, or topics...',
          prefixIcon: Icons.search,
          onChanged: (value) {
            setState(() {
              _searchQuery = value;
              _isSearching = value.isNotEmpty;
            });
          },
          suffix: _isSearching
              ? GestureDetector(
                  onTap: () {
                    _searchController.clear();
                    setState(() {
                      _searchQuery = '';
                      _isSearching = false;
                    });
                  },
                  child: const Icon(Icons.clear),
                )
              : null,
        ),
        if (_isSearching) ...[
          const SizedBox(height: AppSpacing.md),
          _buildSearchResults(isDark),
        ],
      ],
    );
  }

  Widget _buildSearchResults(bool isDark) {
    // Mock search results
    final searchResults = [
      'How to add expenses',
      'Setting up budget alerts',
      'Using voice input',
      'Scanning receipts',
      'AI chat features',
    ]
        .where((result) =>
            result.toLowerCase().contains(_searchQuery.toLowerCase()))
        .toList();

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Search Results',
            style: AppTypography.labelLarge(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          ...searchResults
              .map((result) => ListTile(
                    title: Text(
                      result,
                      style: AppTypography.bodyMedium(
                        color: isDark
                            ? AppColors.textPrimaryDark
                            : AppColors.textPrimaryLight,
                      ),
                    ),
                    leading: Icon(
                      Icons.search,
                      size: 16,
                      color: isDark
                          ? AppColors.textSecondaryDark
                          : AppColors.textSecondaryLight,
                    ),
                    onTap: () {
                      // TODO: Navigate to specific help article
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Opening: $result'),
                          backgroundColor: AppColors.info,
                        ),
                      );
                    },
                  ))
              .toList(),
        ],
      ),
    );
  }

  Widget _buildQuickActionsSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Actions',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: _buildQuickActionCard(
                icon: Icons.video_library_outlined,
                title: 'Video Tutorials',
                subtitle: 'Watch how-to videos',
                onTap: () => _openVideoTutorials(isDark),
                isDark: isDark,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: _buildQuickActionCard(
                icon: Icons.chat_bubble_outline,
                title: 'Live Chat',
                subtitle: 'Chat with support',
                onTap: () => _openLiveChat(isDark),
                isDark: isDark,
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: _buildQuickActionCard(
                icon: Icons.email_outlined,
                title: 'Email Support',
                subtitle: 'Send us an email',
                onTap: () => _openEmailSupport(isDark),
                isDark: isDark,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: _buildQuickActionCard(
                icon: Icons.phone_outlined,
                title: 'Phone Support',
                subtitle: 'Call us directly',
                onTap: () => _openPhoneSupport(isDark),
                isDark: isDark,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildQuickActionCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
          borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
          border: Border.all(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
          ),
        ),
        child: Column(
          children: [
            Icon(
              icon,
              size: 32,
              color: AppColors.getPrimaryColor(isDark),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              title,
              style: AppTypography.labelMedium(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              style: AppTypography.bodySmall(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFAQSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Frequently Asked Questions',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        ..._faqCategories
            .map((category) => _buildFAQCategory(category, isDark))
            .toList(),
      ],
    );
  }

  Widget _buildFAQCategory(Map<String, dynamic> category, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Column(
        children: [
          ListTile(
            leading: Icon(
              category['icon'],
              color: AppColors.getPrimaryColor(isDark),
            ),
            title: Text(
              category['name'],
              style: AppTypography.labelLarge(
                color: isDark
                    ? AppColors.textPrimaryDark
                    : AppColors.textPrimaryLight,
              ),
            ),
            trailing: Icon(
              Icons.expand_more,
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
            onTap: () => _toggleFAQCategory(category['name']),
          ),
          if (_expandedCategories.contains(category['name']))
            ...category['faqs']
                .map<Widget>((faq) => _buildFAQItem(faq, isDark))
                .toList(),
        ],
      ),
    );
  }

  final Set<String> _expandedCategories = {};

  void _toggleFAQCategory(String categoryName) {
    setState(() {
      if (_expandedCategories.contains(categoryName)) {
        _expandedCategories.remove(categoryName);
      } else {
        _expandedCategories.add(categoryName);
      }
    });
  }

  Widget _buildFAQItem(Map<String, dynamic> faq, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
            width: 0.5,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            faq['question'],
            style: AppTypography.labelMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            faq['answer'],
            style: AppTypography.bodyMedium(
              color: isDark
                  ? AppColors.textSecondaryDark
                  : AppColors.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactSupportSection(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Contact Support',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Text(
          'Can\'t find what you\'re looking for? Contact our support team.',
          style: AppTypography.bodyMedium(
            color: isDark
                ? AppColors.textSecondaryDark
                : AppColors.textSecondaryLight,
          ),
        ),
        const SizedBox(height: AppSpacing.lg),
        ..._supportTopics
            .map((topic) => _buildSupportTopic(topic, isDark))
            .toList(),
        const SizedBox(height: AppSpacing.lg),
        _buildSendMessageSection(isDark),
      ],
    );
  }

  Widget _buildSupportTopic(Map<String, dynamic> topic, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: ListTile(
        leading: Icon(
          topic['icon'],
          color: AppColors.getPrimaryColor(isDark),
        ),
        title: Text(
          topic['title'],
          style: AppTypography.labelLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        subtitle: Text(
          topic['description'],
          style: AppTypography.bodySmall(
            color: isDark
                ? AppColors.textSecondaryDark
                : AppColors.textSecondaryLight,
          ),
        ),
        trailing: Icon(
          Icons.arrow_forward_ios,
          size: 16,
          color: isDark
              ? AppColors.textSecondaryDark
              : AppColors.textSecondaryLight,
        ),
        onTap: () => _openSupportTopic(topic['title'], isDark),
      ),
    );
  }

  Widget _buildSendMessageSection(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Send us a message',
            style: AppTypography.titleMedium(
              color: isDark
                  ? AppColors.textPrimaryDark
                  : AppColors.textPrimaryLight,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          CustomInput(
            controller: _subjectController,
            label: 'Subject',
            hint: 'Brief description of your issue',
          ),
          const SizedBox(height: AppSpacing.md),
          _buildCategoryDropdown(isDark),
          const SizedBox(height: AppSpacing.md),
          CustomInput(
            controller: _messageController,
            label: 'Message',
            hint: 'Describe your issue in detail...',
            maxLines: 4,
          ),
          const SizedBox(height: AppSpacing.lg),
          SizedBox(
            width: double.infinity,
            child: CustomButton(
              text: 'Send Message',
              onPressed: () => _sendMessage(isDark),
              variant: ButtonVariant.primary,
              size: ButtonSize.large,
              icon: Icons.send,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryDropdown(bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Category',
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
              value: _selectedCategory,
              isExpanded: true,
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              items: [
                'General',
                'Technical',
                'Billing',
                'Feature Request',
                'Bug Report'
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
              onChanged: (value) => setState(() => _selectedCategory = value!),
            ),
          ),
        ),
      ],
    );
  }

  void _openVideoTutorials(bool isDark) {
    // TODO: Implement video tutorials
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Video tutorials coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openLiveChat(bool isDark) {
    // TODO: Implement live chat
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Live chat coming soon!'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openEmailSupport(bool isDark) {
    // TODO: Implement email support
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Email support: support@expenvisor.com'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openPhoneSupport(bool isDark) {
    // TODO: Implement phone support
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Phone support: +1 (555) 123-4567'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _openSupportTopic(String topic, bool isDark) {
    // TODO: Implement support topic navigation
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening: $topic'),
        backgroundColor: AppColors.info,
      ),
    );
  }

  void _sendMessage(bool isDark) {
    if (_subjectController.text.isEmpty || _messageController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please fill in all fields'),
          backgroundColor: AppColors.warning,
        ),
      );
      return;
    }

    // TODO: Implement message sending
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content:
            Text('Message sent successfully! We\'ll get back to you soon.'),
        backgroundColor: AppColors.success,
      ),
    );

    _subjectController.clear();
    _messageController.clear();
  }
}
