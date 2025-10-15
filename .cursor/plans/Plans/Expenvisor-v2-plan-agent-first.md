<!-- 0a77b491-f51e-492f-8725-2e5b6e3e164d b63b6d0a-03aa-4040-aa40-937c0abc3c3d -->
# Agent-First Expenvisor Transformation

## Overview

Transform Expenvisor from traditional tab navigation to an agent-first AI chat interface where users primarily interact via natural conversation, voice, and receipt scanning. Maintain hybrid approach with manual input options and essential view screens accessible via hamburger menu.

## Architecture Decisions

### Navigation

- Home screen = Enhanced AI Chat (primary interface)
- Hamburger drawer for secondary features
- Remove bottom navigation completely
- FAB for quick voice input

### Monetization Tiers

**FREE:**

- Manual transactions: Unlimited
- AI Chat: 50 messages/month
- Voice input: 30 transactions/month
- Receipt OCR: 5 scans/month
- Basic analytics

**PREMIUM ($4.99/month):**

- Everything unlimited
- Advanced AI Financial Advisor
- Advanced insights & forecasting
- Multi-account support
- Export & automations
- Custom categories & tags

### State Management

- Local-first: Drift SQLite (instant operations)
- State: Riverpod 2.0 with optimistic updates
- Cloud sync: Firebase Firestore (background)
- AI: Hybrid local parsing + OpenAI API

## Implementation Phases

### PHASE 1: Core Agent Interface (Week 1-2)

#### 1.1 Data Layer Setup

- Install dependencies: `drift`, `drift_flutter`, `build_runner`, `firebase_core`, `cloud_firestore`
- Create database schema (transactions, categories, budgets, user_preferences)
- Set up Drift database with auto-increment IDs, timestamps, sync status
- Create repository pattern for data access
- Implement local CRUD operations

**Files to create:**

- `lib/core/database/app_database.dart` - Drift database definition
- `lib/core/database/tables/*.dart` - Table definitions (transactions, categories, etc.)
- `lib/core/repositories/transaction_repository.dart` - Business logic layer
- `lib/core/repositories/category_repository.dart`

#### 1.2 Transaction Parsing Engine

- Create local NLP parser for common patterns
- Regex patterns: "coffee 4.50", "$12 lunch", "paid 50 for groceries yesterday"
- Extract: amount, merchant, category (guess), date/time
- Category inference from merchant keywords (coffee→Food&Dining, uber→Transportation)
- OpenAI fallback for ambiguous inputs

**Files to create:**

- `lib/features/ai_agent/services/transaction_parser.dart`
- `lib/features/ai_agent/services/openai_service.dart`
- `lib/features/ai_agent/models/parsed_transaction.dart`

#### 1.3 Enhanced Chat Interface

Transform existing `AiChatScreen` into full agent interface:

**Message Types:**

- User text message
- AI text response
- Transaction preview card (inline confirmation)
- Chart/insight card
- Quick action chips
- Error/info messages

**Input Composer:**

- Text input field
- Voice button (mic icon)
- Camera button (receipt scan)
- Send button
- Quick action chips row

**Files to modify:**

- `lib/features/ai_chat/screens/ai_chat_screen.dart` - Complete rebuild
- Create: `lib/features/ai_chat/widgets/message_types/` - Separate widgets for each message type
- Create: `lib/features/ai_chat/widgets/transaction_preview_card.dart` - Inline confirmation
- Create: `lib/features/ai_chat/widgets/input_composer.dart` - Multimodal input bar

#### 1.4 Transaction Confirmation Flow

When user sends expense message:

1. Parse locally (instant)
2. Show transaction preview card in chat
3. Card shows: merchant, amount, category, date, account
4. Buttons: "Confirm" (green), "Edit" (opens inline editor), "Cancel"
5. On confirm: Save to local DB, sync to cloud in background
6. Show success message with receipt-style summary

**UI Components:**

```dart
TransactionPreviewCard(
  merchant: "Starbucks",
  amount: 4.50,
  category: "Food & Dining",
  date: DateTime.now(),
  onConfirm: () => _saveTransaction(),
  onEdit: () => _showInlineEditor(),
  onCancel: () => _cancelTransaction(),
)
```

### PHASE 2: Multimodal Input (Week 2-3)

#### 2.1 Voice Input

- Native speech recognition: `speech_to_text` package
- Fallback to OpenAI Whisper API (premium or if native fails)
- Show live transcription in chat
- Parse transcript same as text input
- Visual feedback: pulsing mic animation

**Files to create:**

- `lib/features/ai_agent/services/speech_service.dart`
- `lib/features/ai_agent/widgets/voice_input_widget.dart`

#### 2.2 Receipt OCR

- Camera/gallery picker: `image_picker` package
- On-device OCR: `google_ml_kit` (free, fast)
- OpenAI Vision API for better accuracy (fallback)
- Extract: merchant, total, items, date
- Show parsed data in transaction preview card

**Files to create:**

- `lib/features/ai_agent/services/ocr_service.dart`
- `lib/features/ai_agent/screens/receipt_scanner_screen.dart`
- `lib/features/ai_agent/widgets/receipt_preview.dart`

#### 2.3 Contextual Quick Actions

Generate chips based on:

- Time of day (morning: "Add breakfast", evening: "Add dinner")
- Location patterns (if near usual coffee shop)
- Recent activity ("Similar to last week?")
- Common queries ("This month summary", "Budget status")

**Logic:**

```dart
List<QuickAction> getContextualActions() {
  final hour = DateTime.now().hour;
  final recent = _getRecentTransactions();
  
  if (hour < 10) return ["Add breakfast", "Coffee expense"];
  if (hour > 17) return ["Add dinner", "Today's summary"];
  return ["Add expense", "Spending this week", "Budget check"];
}
```

### PHASE 3: Navigation Restructure (Week 3)

#### 3.1 New Main Navigation

Replace `MainNavigation` with agent-first structure:

- Home screen = `EnhancedAiChatScreen`
- Scaffold with hamburger drawer
- FAB for quick voice input
- No bottom navigation

**Files to modify:**

- `lib/features/navigation/main_navigation.dart` - Complete rewrite
- `lib/main.dart` - Update initial route

#### 3.2 Drawer Menu

**Structure:**

```
Header: User profile, balance summary

Sections:
- Quick Add
  - Add Expense (manual)
  - Add Income (manual)
  
- View & Analyze
  - Transactions (simplified History)
  - Analytics & Charts
  - Budgets & Goals
  
- Account
  - Profile
  - Settings
  - Subscription
  
- Help & Info
  - Help Center
  - Privacy Policy
  - About
```

**Files to create:**

- `lib/features/navigation/widgets/app_drawer.dart`
- `lib/features/navigation/widgets/drawer_header.dart`

#### 3.3 Simplified View Screens

Keep these screens but simplify:

- **Transactions**: View-only list, filters, search (no FAB for adding)
- **Analytics**: Charts and insights (read-only)
- **Budgets**: View budget progress, click to adjust in chat

Remove or merge:

- Dashboard → Remove (redundant with chat home)
- Profile → Simplify to basic info only
- Settings → Keep for app preferences

### PHASE 4: AI Intelligence (Week 4)

#### 4.1 Intent Recognition

Classify user messages:

- `ADD_EXPENSE` - "coffee $4.50"
- `ADD_INCOME` - "got paid $2000"
- `QUERY_SPENDING` - "how much did I spend this week?"
- `BUDGET_CHECK` - "am I under budget?"
- `INSIGHT_REQUEST` - "where can I save money?"
- `GENERAL_CHAT` - Financial advice, questions

**Implementation:**

```dart
enum UserIntent { addExpense, addIncome, query, budgetCheck, insight, chat }

class IntentClassifier {
  UserIntent classify(String message) {
    // Local keyword matching first
    if (containsAmount(message)) return UserIntent.addExpense;
    if (containsQuery(message)) return UserIntent.query;
    
    // OpenAI for ambiguous cases
    return await _classifyWithAI(message);
  }
}
```

#### 4.2 Smart Responses

Generate rich responses based on intent:

- Spending queries → Show chart + text summary
- Budget check → Progress bar + remaining amount
- Insights → Categorized breakdown + recommendations

**Files to create:**

- `lib/features/ai_agent/services/intent_classifier.dart`
- `lib/features/ai_agent/services/response_generator.dart`
- `lib/features/ai_agent/widgets/response_types/` - Chart, budget, insight cards

#### 4.3 Category Learning

- Track user corrections (changed category from Food to Entertainment)
- Build merchant→category mapping per user
- Use for future auto-categorization
- Store in local DB and sync to cloud

### PHASE 5: Cloud Sync & Offline (Week 4-5)

#### 5.1 Firebase Setup

- Initialize Firebase in app
- Firestore collections: users, transactions, categories, budgets
- Security rules: user can only access their own data

#### 5.2 Background Sync

- Sync queue: Track pending operations
- Upload local changes when online
- Download cloud changes periodically
- Conflict resolution: Last-write-wins for now
- Sync status indicator in UI

**Files to create:**

- `lib/core/services/sync_service.dart`
- `lib/core/services/firebase_service.dart`
- `lib/core/models/sync_queue_item.dart`

#### 5.3 Offline Support

- All operations work offline
- Queue syncs for when online
- Show sync status in drawer header
- Retry failed syncs with exponential backoff

### PHASE 6: Monetization & Limits (Week 5)

#### 6.1 Usage Tracking

Track monthly limits:

- AI chat messages sent
- Voice transactions created
- OCR scans performed
- Reset on billing cycle

**Files to create:**

- `lib/core/services/usage_tracker.dart`
- `lib/core/models/user_limits.dart`

#### 6.2 Subscription UI

- Show current plan in Settings
- Upgrade prompts when hitting limits
- Feature comparison screen
- RevenueCat integration (future)

**Files to create:**

- `lib/features/subscription/screens/subscription_screen.dart`
- `lib/features/subscription/widgets/plan_card.dart`
- `lib/features/subscription/widgets/feature_comparison.dart`

#### 6.3 Limit Enforcement

When user hits limit:

- Show friendly in-chat message
- Offer upgrade with benefits
- Allow manual unlimited (always free)
- Track in Firebase for cross-device sync

### PHASE 7: Onboarding Redesign (Week 6)

#### 7.1 New Onboarding Flow

**Screens:**

1. Welcome - "Meet your AI finance assistant"
2. Chat Demo - "Just talk to add expenses" (interactive demo)
3. Voice Demo - "Or speak naturally" (mic animation)
4. OCR Demo - "Snap receipts instantly" (camera preview)
5. Insights - "Get smart financial advice"
6. Get Started - Skip/Login/Sign up

**Files to modify:**

- `lib/features/auth/screens/onboarding_screen.dart` - Complete redesign

#### 7.2 Interactive Tutorial

First-time user experience:

- Opens to chat with tutorial overlay
- Step 1: "Try adding an expense by typing"
- Step 2: "Tap confirm to save it"
- Step 3: "Ask me anything about your finances"
- Can skip anytime

### PHASE 8: Polish & Optimization (Week 6-7)

#### 8.1 Performance

- Optimize message list with `ListView.builder`
- Lazy load old messages
- Cache parsed transactions
- Debounce API calls

#### 8.2 UX Refinements

- Smooth animations for message bubbles
- Haptic feedback on confirmations
- Error handling with friendly messages
- Loading states for all async operations

#### 8.3 Accessibility

- Screen reader support for all components
- Voice input as accessibility feature
- High contrast mode compatibility
- Larger touch targets (min 48x48)

## Key Files Summary

### New Files (30+)

**Database:**

- `lib/core/database/app_database.dart`
- `lib/core/database/tables/*.dart` (5 files)
- `lib/core/repositories/*.dart` (4 files)

**AI Agent:**

- `lib/features/ai_agent/services/transaction_parser.dart`
- `lib/features/ai_agent/services/openai_service.dart`
- `lib/features/ai_agent/services/speech_service.dart`
- `lib/features/ai_agent/services/ocr_service.dart`
- `lib/features/ai_agent/services/intent_classifier.dart`
- `lib/features/ai_agent/models/*.dart` (5+ models)

**Chat UI:**

- `lib/features/ai_chat/widgets/message_types/*.dart` (6 widgets)
- `lib/features/ai_chat/widgets/transaction_preview_card.dart`
- `lib/features/ai_chat/widgets/input_composer.dart`
- `lib/features/ai_chat/widgets/voice_input_widget.dart`

**Subscription:**

- `lib/features/subscription/screens/subscription_screen.dart`
- `lib/features/subscription/widgets/*.dart` (3 widgets)

### Modified Files (10+)

- `lib/features/ai_chat/screens/ai_chat_screen.dart` - Complete rebuild
- `lib/features/navigation/main_navigation.dart` - Agent-first structure
- `lib/features/auth/screens/onboarding_screen.dart` - New messaging
- `lib/features/history/screens/history_screen.dart` - Simplified
- `lib/features/analytics/screens/analytics_screen.dart` - View-only
- `lib/features/settings/screens/settings_screen.dart` - Add subscription
- `pubspec.yaml` - New dependencies

### Dependencies to Add

```yaml
# Database
drift: ^2.14.0
drift_flutter: ^0.1.0
sqlite3_flutter_libs: ^0.5.0

# Firebase
firebase_core: ^2.24.0
cloud_firestore: ^4.13.0

# ML/AI
speech_to_text: ^6.5.1
google_ml_kit: ^0.16.0
image_picker: ^1.0.5

# State Management (already have Riverpod)
# Continue using flutter_riverpod
```

## Success Metrics

### User Experience

- Time to first expense: < 30 seconds
- Confirmation rate: > 85%
- Voice recognition accuracy: > 90%
- OCR extraction success: > 80%

### Technical

- Local operation speed: < 100ms
- API response time: < 2s
- Offline capability: 100%
- Sync success rate: > 95%

### Business

- Free→Premium conversion: Target 5-8%
- D7 retention: > 40%
- Monthly active users: Track engagement
- Cost per active user: < $0.50/month

## Risk Mitigation

### Cost Control

- Local parsing catches 70% of inputs (no API cost)
- OpenAI calls only for ambiguity (30% of inputs)
- Cache frequent queries
- User-specific category rules (no re-categorization)

### Data Safety

- Local-first: Data never lost even if cloud fails
- Periodic backups to Firebase
- Export functionality for user data portability

### Privacy

- On-device speech recognition by default
- Clear opt-in for cloud AI processing
- No PII in logs or analytics
- GDPR/CCPA compliant data handling

## Next Steps After Plan Approval

1. Set up Drift database and repository pattern
2. Build transaction parser with local rules
3. Rebuild chat interface with new message types
4. Implement transaction confirmation flow
5. Add voice and OCR input
6. Restructure navigation to agent-first
7. Set up Firebase sync
8. Add subscription limits
9. Redesign onboarding
10. Polish and test

### To-dos

- [ ] Set up Drift SQLite database with tables for transactions, categories, budgets, and user preferences
- [ ] Create repository pattern for data access layer with CRUD operations
- [ ] Build local transaction parser with regex patterns and OpenAI fallback
- [ ] Rebuild AI chat interface with new message types and multimodal input composer
- [ ] Implement inline transaction preview card with confirm/edit/cancel flow
- [ ] Add voice input with native speech recognition and Whisper API fallback
- [ ] Implement receipt scanning with google_ml_kit and Vision API fallback
- [ ] Create contextual quick action chips based on time, location, and patterns
- [ ] Replace bottom navigation with agent-first home and hamburger drawer
- [ ] Simplify History and Analytics to view-only, remove Dashboard screen
- [ ] Build intent classification for user messages (add, query, insight, chat)
- [ ] Create rich response generators with charts, budgets, and insights
- [ ] Implement category learning from user corrections and merchant mapping
- [ ] Initialize Firebase and create Firestore collections with security rules
- [ ] Build background sync service with queue, conflict resolution, and retry logic
- [ ] Ensure all operations work offline with sync queue and status indicators
- [ ] Implement usage tracking for AI chat, voice, and OCR monthly limits
- [ ] Create subscription screen with plan comparison and upgrade prompts
- [ ] Add limit enforcement with friendly in-chat upgrade suggestions
- [ ] Redesign onboarding to emphasize agent-first chat interface
- [ ] Create first-time user tutorial overlay for chat interface
- [ ] Optimize message list, lazy loading, caching, and API call debouncing
- [ ] Add animations, haptic feedback, error handling, and loading states
- [ ] Ensure screen reader support, high contrast mode, and proper touch targets