<!-- 28a97801-2372-45b0-80ef-edde27123c2f 80bc9042-867b-4dca-8a49-5cd86235a7f0 -->

# Expenvisor - Mobile App MVP Plan

## 🎯 Goal

Build a production-ready AI expense tracker app for iOS & Android in 11 weeks using Flutter, Firebase, and OpenAI.

## 🎨 Brand Identity

- **App Name**: Expenvisor (or your chosen name)
- **Theme**: Midnight Aurora
- **Colors**: Midnight Blue (#191970) + Electric Mint (#00FFA3) + Soft Purple (#A78BFA)
- **Tagline**: "Your finances, flowing seamlessly"

## 📱 Tech Stack

- Flutter (Dart) with Material 3
- Firebase (Auth, Firestore, Storage, Analytics, Crashlytics)
- OpenAI API (GPT-4)
- Google ML Kit (OCR)
- RevenueCat (Subscriptions)
- Riverpod (State Management)

## 🗂️ Project Structure

```
lib/
├── core/
│   ├── theme/ (Midnight Aurora colors)
│   ├── constants/
│   └── utils/
├── features/
│   ├── auth/
│   ├── expense/
│   ├── income/
│   ├── history/
│   ├── ai_chat/
│   ├── ai_advisor/
│   └── subscription/
├── shared/
│   ├── models/
│   ├── widgets/
│   └── services/
└── main.dart
```

## 📅 Development Timeline (11 Weeks)

### 🎨 PART 1: UI FIRST (Week 1-3) ✅ COMPLETED

> Build all screens with mock data first - see your app immediately!

#### Week 1: Setup + Auth UI ✅ COMPLETED

**Days 1-2: Project Setup** ✅

- ✅ Initialize Flutter project
- ✅ Configure Midnight Aurora theme
- ✅ Create reusable widgets (buttons, cards, inputs)
- ✅ Set up app icons and splash screen

**Days 3-5: Authentication Screens (UI Only)** ✅

- ✅ Splash screen with animated logo
- ✅ Onboarding flow (4 screens)
- ✅ Login screen
- ✅ Signup screen
- ✅ Guest welcome screen
- ✅ Mock navigation (no backend yet)

**Days 6-7: Main Dashboard UI** ✅

- ✅ Bottom navigation (Dashboard, History, Analytics, AI Chat, Profile)
- ✅ Dashboard with mock expense cards
- ✅ Budget progress rings
- ✅ FAB for adding expense/income
- ✅ Dark/Light theme toggle working

#### Week 2: Core Feature UIs ✅ COMPLETED

**Days 8-10: Expense & Income Screens** ✅

- ✅ Add expense screen (form with mock data)
- ✅ Add income screen
- ✅ Expense list with cards
- ✅ Income list with cards
- ✅ Category selection UI
- ✅ Date picker
- ✅ Amount input with formatting

**Days 11-14: History & Analytics UI** ✅

- ✅ History screen with month selector
- ✅ Mock expense vs income charts (fl_chart)
- ✅ Category breakdown pie chart
- ✅ Filter UI (by category, date range)
- ✅ Search bar
- ✅ Empty states with illustrations

#### Week 3: Advanced Feature UIs ✅ COMPLETED

**Days 15-17: AI Feature UIs** ✅

- ✅ Voice input button with animation
- ✅ OCR camera interface
- ✅ AI chat screen (chat bubbles)
- ✅ AI advisor screen (advice cards)
- ✅ All with mock data/responses

**Days 18-21: Settings & Polish** ✅

- ✅ Settings screen
- ✅ Profile screen
- ✅ Subscription paywall UI
- ✅ Notification settings
- ✅ All screens polished and animated

**✅ Deliverable**: Complete app navigable on device with beautiful UI! ✅ COMPLETED

---

### 🔧 PART 1.5: MISSING FUNCTIONALITY (Current Priority)

> Fix non-functional buttons and add missing screens

#### Immediate Fixes Needed:

**Dashboard Functionality** 🚨

- ❌ "View All" button in Recent Transactions (line 223)
- ❌ Quick Actions buttons (Voice Input, Scan Receipt, AI Chat) - lines 255, 256
- ❌ Settings button in AppBar (line 38)
- ❌ Notifications button in AppBar (line 42)

**Profile Screen Functionality** 🚨

- ❌ All list tiles are placeholder (Personal Info, Security, Payment Methods, etc.)
- ❌ Settings button in AppBar
- ❌ Edit Profile button
- ❌ All preference toggles (notifications, dark mode, biometric)

**Missing Screens** 🚨

- ❌ Settings Screen (separate from Profile)
- ❌ Notifications Screen
- ❌ Personal Information Screen
- ❌ Security Screen
- ❌ Payment Methods Screen
- ❌ Subscription Management Screen
- ❌ Help Center Screen
- ❌ About Screen

**AI Chat Functionality** 🚨

- ❌ Send message functionality
- ❌ Mock AI responses
- ❌ Message persistence

**Quick Actions Implementation** 🚨

- ❌ Voice Input functionality
- ❌ Scan Receipt functionality
- ❌ AI Chat quick access

#### Implementation Plan for Missing Functionality:

**Phase 1: Dashboard Fixes (2-3 hours)**

1. **"View All" Button**: Navigate to History screen
2. **Quick Actions**:
   - Voice Input → Show voice recording modal
   - Scan Receipt → Navigate to camera/OCR screen
   - AI Chat → Navigate to AI Chat screen
3. **AppBar Buttons**:
   - Settings → Navigate to Settings screen
   - Notifications → Navigate to Notifications screen

**Phase 2: Missing Screens (4-5 hours)**

1. **Settings Screen**: App preferences, theme, language, currency
2. **Notifications Screen**: Notification history and settings
3. **Personal Information Screen**: Edit profile details
4. **Security Screen**: Password, 2FA, biometric settings
5. **Payment Methods Screen**: Manage payment methods
6. **Subscription Management Screen**: View/change subscription plans
7. **Help Center Screen**: FAQ, support, contact
8. **About Screen**: App info, version, legal

**Phase 3: AI Chat Functionality (2-3 hours)**

1. **Send Messages**: Implement message sending
2. **Mock AI Responses**: Add realistic AI responses
3. **Message Persistence**: Store chat history locally
4. **Typing Indicators**: Show AI typing animation

**Phase 4: Quick Actions Implementation (3-4 hours)**

1. **Voice Input**: Speech-to-text integration
2. **Scan Receipt**: Camera integration with OCR
3. **AI Chat Quick Access**: Direct chat functionality

**Total Estimated Time**: 11-15 hours

---

### ⚙️ PART 2: CORE FEATURES (Week 4-6)

> Connect backend - make it functional!

#### Week 4: Firebase Integration

**Days 22-24: Authentication Logic**

- Firebase project setup
- Real email/password authentication
- Guest mode with local storage
- Session management
- Biometric authentication

**Days 25-28: Expense & Income Backend**

- Firestore data models
- CRUD operations for expenses
- CRUD operations for income
- Real-time sync
- Budget limit logic
- Data persistence

#### Week 5: History & Analytics

**Days 29-31: History Implementation**

- Query past months data
- Real charts with user data
- Filter logic (category, date)
- Search implementation
- Export to CSV

**Days 32-35: Notifications**

- Budget warning system (80%, 90%, 100%)
- Daily reminders
- Monthly summaries
- Notification settings

#### Week 6: Data Refinement

**Days 36-42: Polish Core Features**

- Offline support
- Data validation
- Error handling
- Loading states
- Swipe to delete/edit
- Undo functionality

**✅ Deliverable**: Fully functional expense tracker!

---

### 🤖 PART 3: AI FEATURES (Week 7-8)

> Add the magic!

#### Week 7: Voice & OCR

**Days 43-45: Voice Input**

- speech_to_text integration
- NLP parsing ("spent $50 on groceries")
- Extract amount, category, description
- Visual feedback during recording
- Error handling

**Days 46-49: OCR Receipt Scanning**

- Google ML Kit integration
- Camera + gallery picker
- Text extraction from receipts
- Parse amount, merchant, date
- Save receipt images to Firebase Storage
- Manual correction interface

#### Week 8: AI Chat & Advisor

**Days 50-52: AI Chat**

- OpenAI API integration
- Build context from user's expenses
- Chat interface functionality
- Message persistence
- Cost optimization (caching)

**Days 53-56: AI Financial Advisor**

- Analyze spending patterns
- Generate personalized advice
- Weekly/monthly reports
- Actionable recommendations

**✅ Deliverable**: AI-powered smart features working!

---

### 💳 PART 4: SUBSCRIPTIONS (Week 9)

> Monetization time!

#### Week 9: RevenueCat Integration

**Days 57-59: Subscription Setup**

- RevenueCat configuration
- In-app purchases (iOS & Android)
- Three tiers: Free, Standard ($4.99), Premium ($9.99)
- Feature gating logic
- Restore purchases

**Days 60-63: Paywall & Management**

- Paywall screen design
- Subscription management screen
- Upgrade/downgrade flows
- Usage quota tracking (voice, OCR, AI)
- Subscription status UI

**✅ Deliverable**: Revenue-ready app!

---

### 🧪 PART 5: TESTING & LAUNCH (Week 10-11)

#### Week 10: Testing

**Days 64-66: Automated Testing**

- Unit tests (services, models)
- Widget tests (key components)
- Integration tests (critical flows)

**Days 67-70: Manual Testing**

- Test on multiple iOS devices
- Test on multiple Android devices
- Test all subscription tiers
- Test offline scenarios
- Performance testing
- Accessibility testing

#### Week 11: App Store Prep & Launch

**Days 71-73: Store Assets**

- App screenshots (5-7 per platform)
- App descriptions
- Keywords research
- Privacy policy
- Terms of service

**Days 74-77: Submission**

- Build release versions
- Submit to Play Store
- Submit to App Store
- Monitor review status
- Fix any issues

**✅ Deliverable**: Live on both stores!

---

## 📦 Key Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter

  # Firebase
  firebase_core: ^2.24.0
  firebase_auth: ^4.15.0
  cloud_firestore: ^4.13.0
  firebase_storage: ^11.5.0
  firebase_analytics: ^10.7.0
  firebase_crashlytics: ^3.4.0

  # State Management
  flutter_riverpod: ^2.4.9

  # UI
  google_fonts: ^6.1.0
  flutter_animate: ^4.5.0
  shimmer: ^3.0.0
  fl_chart: ^0.65.0

  # AI & ML
  google_mlkit_text_recognition: ^0.11.0
  speech_to_text: ^6.5.1
  http: ^1.1.0

  # Features
  flutter_local_notifications: ^16.3.0
  purchases_flutter: ^6.15.0
  image_picker: ^1.0.7

  # Utilities
  shared_preferences: ^2.2.2
  intl: ^0.18.1
  uuid: ^4.3.3
```

## 💰 Costs

- **One-time**: $124 (Apple $99 + Google $25)
- **Monthly**: $50-200 (Firebase + OpenAI, scales with users)
- **Total for MVP**: ~$200-400

## 🎯 Success Metrics

- 1,000+ downloads in 3 months
- 200+ MAU
- 20+ paying users (2% conversion)
- 4.0+ app store rating

## ⚠️ Critical Notes

1. **Start with UI first** - see progress immediately
2. **Test on real devices early** - not just simulators
3. **Implement Firebase security rules** - protect user data
4. **Monitor OpenAI costs** - implement usage caps
5. **Follow store guidelines** - avoid rejection

## 🚀 Ready to Start?

Begin with Phase 1, Day 1: Project Setup!

### To-dos

- [ ] Initialize Flutter project with Midnight Aurora theme and folder structure
- [ ] Build all authentication screens (splash, onboarding, login, signup) with mock data
- [ ] Create dashboard UI with navigation, budget progress, and expense cards
- [ ] Build add expense/income screens and list views
- [ ] Create history screen with charts and filters (mock data)
- [ ] Build AI chat, advisor, voice, and OCR interfaces
- [ ] Create settings and profile screens
- [ ] Implement real Firebase authentication and session management
- [ ] Connect expense/income features to Firestore with CRUD operations
- [ ] Implement real history queries, charts with user data, and notifications
- [ ] Integrate voice input and OCR receipt scanning
- [ ] Implement OpenAI integration for chat and financial advisor
- [ ] Set up RevenueCat with three subscription tiers and feature gating
- [ ] Write tests and perform manual testing on multiple devices
- [ ] Prepare store assets, submit to App Store and Play Store
