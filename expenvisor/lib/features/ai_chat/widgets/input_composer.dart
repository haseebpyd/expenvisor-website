import 'dart:io';
import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';
import '../../../shared/widgets/custom_input.dart';
import '../../../shared/widgets/custom_button.dart';
import '../../ai_agent/services/speech_service.dart';
import '../../ai_agent/services/ocr_service.dart';

class InputComposer extends StatefulWidget {
  final TextEditingController controller;
  final Function(String) onSend;
  final Function(String) onVoiceResult;
  final Function(Map<String, dynamic>) onReceiptScanned;
  final List<String> quickActions;

  const InputComposer({
    super.key,
    required this.controller,
    required this.onSend,
    required this.onVoiceResult,
    required this.onReceiptScanned,
    this.quickActions = const [],
  });

  @override
  State<InputComposer> createState() => _InputComposerState();
}

class _InputComposerState extends State<InputComposer> {
  final SpeechService _speechService = SpeechService();
  final OCRService _ocrService = OCRService();
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    _initializeServices();
  }

  Future<void> _initializeServices() async {
    await _speechService.initialize();
    setState(() {
      _isInitialized = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : AppColors.surfaceLight,
        border: Border(
          top: BorderSide(
            color: isDark ? AppColors.borderDark : AppColors.borderLight,
            width: 1,
          ),
        ),
      ),
      child: Column(
        children: [
          // Quick Actions
          if (widget.quickActions.isNotEmpty) ...[
            _buildQuickActions(isDark),
            const SizedBox(height: AppSpacing.md),
          ],
          
          // Input Row
          Row(
            children: [
              // Voice Input Button
              IconButton(
                onPressed: _isInitialized && _speechService.isAvailable 
                    ? _startVoiceInput 
                    : null,
                icon: Icon(
                  _speechService.isListening ? Icons.mic : Icons.mic_none,
                  color: _speechService.isListening 
                      ? Colors.red 
                      : (isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight),
                ),
              ),
              
              // Camera Button
              IconButton(
                onPressed: _showImagePicker,
                icon: Icon(
                  Icons.camera_alt_outlined,
                  color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
                ),
              ),
              
              // Text Input
              Expanded(
                child: CustomInput(
                  hint: 'Ask me anything about your finances...',
                  controller: widget.controller,
                  textInputAction: TextInputAction.send,
                  onSubmitted: widget.onSend,
                  maxLines: null,
                ),
              ),
              
              // Send Button
              const SizedBox(width: AppSpacing.sm),
              CustomButton(
                text: '',
                onPressed: widget.controller.text.trim().isEmpty ? null : () => widget.onSend(widget.controller.text.trim()),
                variant: ButtonVariant.gradient,
                size: ButtonSize.medium,
                child: const Icon(Icons.send, size: 20),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions(bool isDark) {
    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: widget.quickActions.length,
        itemBuilder: (context, index) {
          final action = widget.quickActions[index];
          return Padding(
            padding: const EdgeInsets.only(right: AppSpacing.sm),
            child: GestureDetector(
              onTap: () => widget.onSend(action),
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.md,
                  vertical: AppSpacing.sm,
                ),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(AppSpacing.radiusRound),
                  border: Border.all(
                    color: AppColors.primary.withOpacity(0.3),
                    width: 1,
                  ),
                ),
                child: Text(
                  action,
                  style: AppTypography.labelSmall(
                    color: AppColors.primary,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Future<void> _startVoiceInput() async {
    if (!_isInitialized) return;

    final hasPermission = await _speechService.requestPermission();
    if (!hasPermission) {
      _showSnackBar('Microphone permission required for voice input');
      return;
    }

    await _speechService.startListening(
      onResult: (text) {
        widget.onVoiceResult(text);
      },
      onError: (error) {
        _showSnackBar('Voice input error: $error');
      },
    );
  }

  void _showImagePicker() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Take Photo'),
              onTap: () {
                Navigator.pop(context);
                _pickImageFromCamera();
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Choose from Gallery'),
              onTap: () {
                Navigator.pop(context);
                _pickImageFromGallery();
              },
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _pickImageFromCamera() async {
    final imageFile = await _ocrService.pickImageFromCamera();
    if (imageFile != null) {
      await _processImage(imageFile);
    }
  }

  Future<void> _pickImageFromGallery() async {
    final imageFile = await _ocrService.pickImageFromGallery();
    if (imageFile != null) {
      await _processImage(imageFile);
    }
  }

  Future<void> _processImage(File imageFile) async {
    try {
      final extractedText = await _ocrService.extractTextFromImage(imageFile);
      if (extractedText != null) {
        final parsedData = _ocrService.parseReceiptText(extractedText);
        if (parsedData != null) {
          widget.onReceiptScanned(parsedData);
        } else {
          _showSnackBar('Could not parse receipt data');
        }
      } else {
        _showSnackBar('Could not extract text from image');
      }
    } catch (e) {
      _showSnackBar('Error processing image: $e');
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}
