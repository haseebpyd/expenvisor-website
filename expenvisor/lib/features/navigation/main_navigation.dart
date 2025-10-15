import 'package:flutter/material.dart';
import '../ai_chat/screens/ai_chat_screen.dart';
import 'widgets/app_drawer.dart';

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Expenvisor'),
        centerTitle: true,
      ),
      drawer: const AppDrawer(),
      body: const AiChatScreen(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Quick voice input
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Voice input - Coming Soon')),
          );
        },
        child: const Icon(Icons.mic),
      ),
    );
  }
}