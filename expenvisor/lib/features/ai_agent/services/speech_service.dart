import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:permission_handler/permission_handler.dart';
import 'dart:async';

class SpeechService {
  late stt.SpeechToText _speech;
  bool _isListening = false;
  bool _isAvailable = false;
  double _soundLevel = 0.0;
  Timer? _timeoutTimer;
  StreamController<double>? _soundLevelController;

  bool get isListening => _isListening;
  bool get isAvailable => _isAvailable;
  double get soundLevel => _soundLevel;
  Stream<double>? get soundLevelStream => _soundLevelController?.stream;

  Future<void> initialize() async {
    _speech = stt.SpeechToText();
    _soundLevelController = StreamController<double>.broadcast();
    
    _isAvailable = await _speech.initialize(
      onStatus: (status) {
        _isListening = status == 'listening';
        if (status == 'done' || status == 'notListening') {
          _isListening = false;
          _timeoutTimer?.cancel();
        }
      },
      onError: (error) {
        _isListening = false;
        _timeoutTimer?.cancel();
        print('Speech recognition error: $error');
      },
    );
  }

  Future<bool> requestPermission() async {
    final status = await Permission.microphone.request();
    return status == PermissionStatus.granted;
  }

  Future<void> startListening({
    required Function(String) onResult,
    required Function(String) onError,
    Function(String)? onPartialResult,
    Duration? timeout,
  }) async {
    if (!_isAvailable) {
      onError('Speech recognition not available');
      return;
    }

    if (_isListening) {
      await stopListening();
    }

    // Set up timeout
    _timeoutTimer?.cancel();
    _timeoutTimer = Timer(timeout ?? const Duration(seconds: 30), () {
      if (_isListening) {
        stopListening();
        onError('Speech recognition timeout');
      }
    });

    await _speech.listen(
      onResult: (result) {
        if (result.finalResult) {
          onResult(result.recognizedWords);
          _timeoutTimer?.cancel();
        } else if (onPartialResult != null) {
          onPartialResult(result.recognizedWords);
        }
      },
      listenFor: timeout ?? const Duration(seconds: 30),
      pauseFor: const Duration(seconds: 3),
      partialResults: true,
      localeId: 'en_US',
      onSoundLevelChange: (level) {
        _soundLevel = level;
        _soundLevelController?.add(level);
      },
    );
  }

  Future<void> stopListening() async {
    if (_isListening) {
      await _speech.stop();
      _isListening = false;
      _timeoutTimer?.cancel();
    }
  }

  Future<void> cancelListening() async {
    if (_isListening) {
      await _speech.cancel();
      _isListening = false;
      _timeoutTimer?.cancel();
    }
  }

  void dispose() {
    _timeoutTimer?.cancel();
    _soundLevelController?.close();
  }
}
