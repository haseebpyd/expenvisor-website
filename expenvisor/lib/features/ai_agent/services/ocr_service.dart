import 'dart:io';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';

class OCRService {
  final ImagePicker _picker = ImagePicker();

  Future<String?> extractTextFromImage(File imageFile) async {
    try {
      final inputImage = InputImage.fromFile(imageFile);
      final textRecognizer = TextRecognizer();
      
      final recognizedText = await textRecognizer.processImage(inputImage);
      final extractedText = recognizedText.text;
      
      await textRecognizer.close();
      return extractedText;
    } catch (e) {
      print('OCR Error: $e');
      return null;
    }
  }

  Future<bool> requestCameraPermission() async {
    final status = await Permission.camera.request();
    return status == PermissionStatus.granted;
  }

  Future<bool> requestStoragePermission() async {
    final status = await Permission.storage.request();
    return status == PermissionStatus.granted;
  }

  Future<File?> pickImageFromCamera() async {
    if (!await requestCameraPermission()) {
      throw Exception('Camera permission denied');
    }

    final XFile? image = await _picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 85,
      maxWidth: 1920,
      maxHeight: 1080,
    );
    
    if (image != null) {
      return File(image.path);
    }
    return null;
  }

  Future<File?> pickImageFromGallery() async {
    if (!await requestStoragePermission()) {
      throw Exception('Storage permission denied');
    }

    final XFile? image = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 85,
      maxWidth: 1920,
      maxHeight: 1080,
    );
    
    if (image != null) {
      return File(image.path);
    }
    return null;
  }

  Map<String, dynamic>? parseReceiptText(String text) {
    try {
      // Enhanced regex patterns for better receipt parsing
      final amountRegex = RegExp(r'(?:total|amount|sum)[:\s]*\$?(\d+\.?\d{2})', caseSensitive: false);
      final dateRegex = RegExp(r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2})');
      final merchantRegex = RegExp(r'^([A-Za-z\s&\.\']+?)(?:\n|$)');
      final timeRegex = RegExp(r'(\d{1,2}:\d{2}(?:\s?[AP]M)?)', caseSensitive: false);
      
      // Clean up text
      final cleanText = text.replaceAll(RegExp(r'\s+'), ' ').trim();
      
      final amountMatch = amountRegex.firstMatch(cleanText);
      final dateMatch = dateRegex.firstMatch(cleanText);
      final merchantMatch = merchantRegex.firstMatch(cleanText);
      final timeMatch = timeRegex.firstMatch(cleanText);

      // Try to extract merchant from first few lines
      final lines = cleanText.split('\n');
      String? merchant;
      for (final line in lines.take(3)) {
        if (line.trim().isNotEmpty && 
            !line.contains(RegExp(r'\d+\.?\d*')) && 
            !line.toLowerCase().contains('total') &&
            !line.toLowerCase().contains('amount')) {
          merchant = line.trim();
          break;
        }
      }

      return {
        'merchant': merchant ?? merchantMatch?.group(1)?.trim() ?? 'Unknown',
        'amount': amountMatch != null ? double.tryParse(amountMatch.group(1)!) : null,
        'date': dateMatch?.group(1),
        'time': timeMatch?.group(1),
        'rawText': text,
        'confidence': _calculateConfidence(cleanText, amountMatch != null, merchant != null),
      };
    } catch (e) {
      print('Receipt parsing error: $e');
      return null;
    }
  }

  double _calculateConfidence(String text, bool hasAmount, bool hasMerchant) {
    double confidence = 0.0;
    
    if (hasAmount) confidence += 0.4;
    if (hasMerchant) confidence += 0.3;
    if (text.length > 50) confidence += 0.2;
    if (text.contains(RegExp(r'\d+\.?\d*'))) confidence += 0.1;
    
    return confidence.clamp(0.0, 1.0);
  }

  Future<Map<String, dynamic>?> processReceiptImage(File imageFile) async {
    try {
      final text = await extractTextFromImage(imageFile);
      if (text == null || text.isEmpty) {
        return null;
      }
      
      return parseReceiptText(text);
    } catch (e) {
      print('Receipt processing error: $e');
      return null;
    }
  }
}
