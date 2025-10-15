import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../core/database/app_database.dart';
import '../../../core/repositories/drift_transaction_repository.dart';
import '../../ai_agent/services/transaction_parser.dart';
import '../../ai_agent/services/intent_classifier.dart';
import '../../ai_agent/services/response_generator.dart';
import '../../ai_agent/models/parsed_transaction.dart';
import '../widgets/transaction_preview_card.dart';
import '../widgets/input_composer.dart';

class AiChatScreen extends StatefulWidget {
  const AiChatScreen({super.key});

  @override
  State<AiChatScreen> createState() => _AiChatScreenState();
}

class _AiChatScreenState extends State<AiChatScreen> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final TransactionParser _parser = TransactionParser();
  final IntentClassifier _intentClassifier = IntentClassifier();
  late final AppDatabase _database;
  late final DriftTransactionRepository _transactionRepository;
  late final ResponseGenerator _responseGenerator;
  bool _isTyping = false;

  final List<ChatMessage> _messages = [
    ChatMessage(
      text: "Hello! I'm your AI financial advisor. How can I help you with your expenses today?",
      isUser: false,
      timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
    ),
  ];

  @override
  void initState() {
    super.initState();
    _initializeDatabase();
  }

  Future<void> _initializeDatabase() async {
    _database = AppDatabase();
    _transactionRepository = DriftTransactionRepository(_database);
    _responseGenerator = ResponseGenerator(_transactionRepository);
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    _database.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      body: Column(
        children: [
          // Chat Messages
          Expanded(
            child: _buildChatMessages(isDark),
          ),
          
          // Input Composer
          InputComposer(
            controller: _messageController,
            onSend: _sendMessage,
            onVoiceResult: _handleVoiceResult,
            onReceiptScanned: _handleReceiptScanned,
            quickActions: _getContextualActions(),
          ),
        ],
      ),
    );
  }

  Widget _buildChatMessages(bool isDark) {
    return ListView.builder(
      controller: _scrollController,
      padding: const EdgeInsets.all(AppSpacing.lg),
      itemCount: _messages.length + (_isTyping ? 1 : 0),
      itemBuilder: (context, index) {
        if (index == _messages.length && _isTyping) {
          return _buildTypingIndicator(isDark);
        }
        
        final message = _messages[index];
        if (message.isPreview && message.previewTx != null) {
          return Padding(
            padding: const EdgeInsets.only(bottom: AppSpacing.md),
            child: TransactionPreviewCard(
              tx: message.previewTx!,
              onCancel: () {
                setState(() {
                  _messages.removeAt(index);
                });
              },
              onEdit: () {
                // Future: open inline editor. For now, keep as is.
              },
              onConfirm: () => _confirmTransaction(message.previewTx!, index),
            ),
          );
        }
        return _buildMessageBubble(message, isDark);
      },
    );
  }

  Widget _buildMessageBubble(ChatMessage message, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: Row(
        mainAxisAlignment: message.isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!message.isUser) ...[
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                gradient: AppColors.aiGlowGradient,
                borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
              ),
              child: const Icon(
                Icons.psychology,
                size: 20,
                color: Colors.white,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
          ],
          
          Flexible(
            child: Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: message.isUser
                    ? AppColors.primary
                    : (isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight),
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(AppSpacing.radiusMedium),
                  topRight: const Radius.circular(AppSpacing.radiusMedium),
                  bottomLeft: Radius.circular(message.isUser ? AppSpacing.radiusMedium : AppSpacing.radiusSmall),
                  bottomRight: Radius.circular(message.isUser ? AppSpacing.radiusSmall : AppSpacing.radiusMedium),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (message.richContent != null) ...[
                    message.richContent!,
                    const SizedBox(height: AppSpacing.sm),
                  ],
                  if (message.text.isNotEmpty) ...[
                    Text(
                      message.text,
                      style: AppTypography.bodyMedium(
                        color: message.isUser
                            ? Colors.white
                            : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                  ],
                  Text(
                    _formatTime(message.timestamp),
                    style: AppTypography.captionSmall(
                      color: message.isUser
                          ? Colors.white.withOpacity(0.7)
                          : (isDark ? AppColors.textTertiaryDark : AppColors.textTertiaryLight),
                    ),
                  ),
                ],
              ),
            ),
          ),
          
          if (message.isUser) ...[
            const SizedBox(width: AppSpacing.sm),
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
              ),
              child: const Icon(
                Icons.person,
                size: 20,
                color: AppColors.primary,
              ),
            ),
          ],
        ],
      ),
    ).animate().fadeIn(
      duration: 300.ms,
    ).slideY(
      begin: 0.3,
      end: 0,
      duration: 300.ms,
    );
  }

  Widget _buildTypingIndicator(bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              gradient: AppColors.aiGlowGradient,
              borderRadius: BorderRadius.circular(AppSpacing.radiusSmall),
            ),
            child: const Icon(
              Icons.psychology,
              size: 20,
              color: Colors.white,
            ),
          ),
          const SizedBox(width: AppSpacing.sm),
          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: isDark ? AppColors.surfaceElevatedDark : AppColors.surfaceElevatedLight,
              borderRadius: BorderRadius.circular(AppSpacing.radiusMedium),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildTypingDot(0),
                const SizedBox(width: 4),
                _buildTypingDot(1),
                const SizedBox(width: 4),
                _buildTypingDot(2),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTypingDot(int index) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 600 + (index * 200)),
      width: 8,
      height: 8,
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.3),
        borderRadius: BorderRadius.circular(4),
      ),
    ).animate(onPlay: (controller) => controller.repeat(reverse: true))
        .fadeIn(duration: 600.ms, delay: (index * 200).ms);
  }

  List<String> _getContextualActions() {
    final hour = DateTime.now().hour;
    
    if (hour < 10) {
      return ["Add breakfast", "Coffee expense", "This month summary"];
    } else if (hour > 17) {
      return ["Add dinner", "Today's summary", "Budget check"];
    } else {
      return ["Add expense", "Spending this week", "Budget status"];
    }
  }

  void _sendMessage(String message) {
    if (message.trim().isEmpty) return;

    setState(() {
      _messages.add(ChatMessage(
        text: message,
        isUser: true,
        timestamp: DateTime.now(),
      ));
      _messageController.clear();
      _isTyping = true;
    });

    _scrollToBottom();

    // Try local parse first
    final parsed = _parser.tryParse(message);
    if (parsed != null) {
      setState(() {
        _messages.add(ChatMessage.preview(parsed));
        _isTyping = false;
      });
      _scrollToBottom();
      return;
    }

    // Process with intent classification
    _processMessageWithIntent(message);
  }

  Future<void> _processMessageWithIntent(String message) async {
    final intent = _intentClassifier.classify(message);
    
    setState(() {
      _isTyping = false;
    });

    // Generate response based on intent
    final response = await _responseGenerator.generateResponse(intent, message, context);
    
    setState(() {
      _messages.add(ChatMessage(
        text: '',
        isUser: false,
        timestamp: DateTime.now(),
        richContent: response,
      ));
    });
    
    _scrollToBottom();
  }

  void _handleVoiceResult(String text) {
    _sendMessage(text);
  }

  void _handleReceiptScanned(Map<String, dynamic> data) {
    final merchant = data['merchant'] ?? 'Unknown';
    final amount = data['amount']?.toString() ?? '0';
    final message = '$merchant \$$amount';
    _sendMessage(message);
  }

  Future<void> _confirmTransaction(ParsedTransaction tx, int index) async {
    try {
      await _transactionRepository.create(
        amount: tx.amount,
        merchant: tx.merchant,
        category: tx.category,
        date: tx.date,
        isIncome: tx.isIncome,
      );

      setState(() {
        _messages.insert(
          index + 1,
          ChatMessage(
            text: (tx.isIncome ? 'Income' : 'Expense') +
                ' saved: ' +
                (tx.isIncome ? '+' : '-') +
                tx.amount.toStringAsFixed(2) +
                ' · ' + tx.merchant + ' · ' + tx.category,
            isUser: false,
            timestamp: DateTime.now(),
          ),
        );
        _messages.removeAt(index);
      });
      _scrollToBottom();
    } catch (e) {
      setState(() {
        _messages.insert(
          index + 1,
          ChatMessage(
            text: 'Error saving transaction: $e',
            isUser: false,
            timestamp: DateTime.now(),
          ),
        );
        _messages.removeAt(index);
      });
      _scrollToBottom();
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  String _formatTime(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);
    
    if (difference.inMinutes < 1) {
      return 'Just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes}m ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours}h ago';
    } else {
      return '${timestamp.day}/${timestamp.month}';
    }
  }
}

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime timestamp;
  final bool isPreview;
  final ParsedTransaction? previewTx;
  final Widget? richContent;

  ChatMessage({
    required this.text,
    required this.isUser,
    required this.timestamp,
    this.isPreview = false,
    this.previewTx,
    this.richContent,
  });

  factory ChatMessage.preview(ParsedTransaction tx) => ChatMessage(
        text: '',
        isUser: false,
        timestamp: DateTime.now(),
        isPreview: true,
        previewTx: tx,
      );
}