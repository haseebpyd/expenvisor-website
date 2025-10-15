import 'dart:io';
import 'package:google_ml_kit/google_ml_kit.dart';
import 'package:image_picker/image_picker.dart';

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

  Future<File?> pickImageFromCamera() async {
    final XFile? image = await _picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 80,
    );
    
    if (image != null) {
      return File(image.path);
    }
    return null;
  }

  Future<File?> pickImageFromGallery() async {
    final XFile? image = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
    );
    
    if (image != null) {
      return File(image.path);
    }
    return null;
  }

  Map<String, dynamic>? parseReceiptText(String text) {
    try {
      // Simple regex patterns for common receipt elements
      final amountRegex = RegExp(r'total[:\s]*\$?(\d+\.?\d*)', caseSensitive: false);
      final dateRegex = RegExp(r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})');
      final merchantRegex = RegExp(r'^([A-Za-z\s&]+)', caseSensitive: false);

      final amountMatch = amountRegex.firstMatch(text);
      final dateMatch = dateRegex.firstMatch(text);
      final merchantMatch = merchantRegex.firstMatch(text);

      return {
        'merchant': merchantMatch?.group(1)?.trim() ?? 'Unknown',
        'amount': amountMatch != null ? double.tryParse(amountMatch.group(1)!) : null,
        'date': dateMatch?.group(1),
        'rawText': text,
      };
    } catch (e) {
      print('Receipt parsing error: $e');
      return null;
    }
  }
}
