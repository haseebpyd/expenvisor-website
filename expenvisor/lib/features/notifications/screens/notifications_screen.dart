import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_card.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  bool _budgetAlertsEnabled = true;
  bool _dailyRemindersEnabled = true;
  bool _weeklyReportsEnabled = true;
  bool _monthlyReportsEnabled = true;
  bool _aiInsightsEnabled = true;

  final List<Map<String, dynamic>> _notifications = [
    {
      'title': 'Budget Alert',
      'message': 'You\'ve spent 80% of your monthly budget',
      'time': '2 hours ago',
      'type': 'budget',
      'isRead': false,
    },
    {
      'title': 'Daily Reminder',
      'message': 'Don\'t forget to log your expenses today!',
      'time': '1 day ago',
      'type': 'reminder',
      'isRead': true,
    },
    {
      'title': 'AI Insight',
      'message': 'Your dining expenses increased by 25% this week',
      'time': '2 days ago',
      'type': 'ai',
      'isRead': true,
    },
    {
      'title': 'Weekly Report',
      'message': 'Your weekly spending summary is ready',
      'time': '3 days ago',
      'type': 'report',
      'isRead': true,
    },
    {
      'title': 'Budget Alert',
      'message': 'You\'ve exceeded your dining budget for this month',
      'time': '1 week ago',
      'type': 'budget',
      'isRead': true,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Text(
          'Notifications',
          style: AppTypography.titleLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          TextButton(
            onPressed: _markAllAsRead,
            child: Text(
              'Mark All Read',
              style: AppTypography.labelMedium(
                color: AppColors.primary,
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Notification Settings
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CustomCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Notification Settings',
                    style: AppTypography.titleMedium(
                      color: isDark
                          ? AppColors.textPrimaryDark
                          : AppColors.textPrimaryLight,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  _buildSwitchTile(
                    title: 'Budget Alerts',
                    subtitle: 'Get notified when approaching budget limits',
                    value: _budgetAlertsEnabled,
                    onChanged: (value) {
                      setState(() {
                        _budgetAlertsEnabled = value;
                      });
                    },
                    isDark: isDark,
                  ),
                  _buildSwitchTile(
                    title: 'Daily Reminders',
                    subtitle: 'Remind me to log expenses daily',
                    value: _dailyRemindersEnabled,
                    onChanged: (value) {
                      setState(() {
                        _dailyRemindersEnabled = value;
                      });
                    },
                    isDark: isDark,
                  ),
                  _buildSwitchTile(
                    title: 'Weekly Reports',
                    subtitle: 'Receive weekly spending summaries',
                    value: _weeklyReportsEnabled,
                    onChanged: (value) {
                      setState(() {
                        _weeklyReportsEnabled = value;
                      });
                    },
                    isDark: isDark,
                  ),
                  _buildSwitchTile(
                    title: 'Monthly Reports',
                    subtitle: 'Receive monthly financial reports',
                    value: _monthlyReportsEnabled,
                    onChanged: (value) {
                      setState(() {
                        _monthlyReportsEnabled = value;
                      });
                    },
                    isDark: isDark,
                  ),
                  _buildSwitchTile(
                    title: 'AI Insights',
                    subtitle: 'Get AI-powered financial insights',
                    value: _aiInsightsEnabled,
                    onChanged: (value) {
                      setState(() {
                        _aiInsightsEnabled = value;
                      });
                    },
                    isDark: isDark,
                  ),
                ],
              ),
            ),
          ),

          // Notifications List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              itemCount: _notifications.length,
              itemBuilder: (context, index) {
                final notification = _notifications[index];
                return _buildNotificationItem(notification, isDark, index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSwitchTile({
    required String title,
    required String subtitle,
    required bool value,
    required ValueChanged<bool> onChanged,
    required bool isDark,
  }) {
    return ListTile(
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

  Widget _buildNotificationItem(
      Map<String, dynamic> notification, bool isDark, int index) {
    final isRead = notification['isRead'] as bool;
    final type = notification['type'] as String;

    Color typeColor;
    IconData typeIcon;

    switch (type) {
      case 'budget':
        typeColor = AppColors.warning;
        typeIcon = Icons.warning_outlined;
        break;
      case 'reminder':
        typeColor = AppColors.info;
        typeIcon = Icons.notifications_outlined;
        break;
      case 'ai':
        typeColor = AppColors.aiFeatures;
        typeIcon = Icons.psychology_outlined;
        break;
      case 'report':
        typeColor = AppColors.primary;
        typeIcon = Icons.analytics_outlined;
        break;
      default:
        typeColor = AppColors.textSecondaryLight;
        typeIcon = Icons.notifications_outlined;
    }

    return CustomCard(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      child: ListTile(
        leading: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: typeColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
          ),
          child: Icon(
            typeIcon,
            color: typeColor,
            size: 20,
          ),
        ),
        title: Text(
          notification['title'],
          style: AppTypography.bodyLarge(
            color:
                isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            fontWeight: isRead ? FontWeight.normal : FontWeight.w600,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: AppSpacing.xs),
            Text(
              notification['message'],
              style: AppTypography.bodySmall(
                color: isDark
                    ? AppColors.textSecondaryDark
                    : AppColors.textSecondaryLight,
              ),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              notification['time'],
              style: AppTypography.captionSmall(
                color: isDark
                    ? AppColors.textTertiaryDark
                    : AppColors.textTertiaryLight,
              ),
            ),
          ],
        ),
        trailing: isRead
            ? null
            : Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                ),
              ),
        onTap: () {
          setState(() {
            notification['isRead'] = true;
          });
        },
      ),
    )
        .animate()
        .fadeIn(
          duration: 600.ms,
          delay: (index * 100).ms,
        )
        .slideY(
          begin: 0.3,
          end: 0,
          duration: 600.ms,
          delay: (index * 100).ms,
        );
  }

  void _markAllAsRead() {
    setState(() {
      for (var notification in _notifications) {
        notification['isRead'] = true;
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('All notifications marked as read'),
        backgroundColor: AppColors.success,
      ),
    );
  }
}
