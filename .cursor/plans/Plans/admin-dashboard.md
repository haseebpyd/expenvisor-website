<!-- 28a97801-2372-45b0-80ef-edde27123c2f 9c399a4b-e467-4b6c-bae9-ee67568b45bd -->
# Expenvisor - Admin Dashboard Plan

## 🎯 Goal

Build a comprehensive web-based admin panel to manage users, monitor subscriptions, control AI costs, configure app settings, and handle support - all matching the Midnight Aurora brand.

## 🎨 Brand Identity

- **Dashboard**: admin.Expenvisor.com
- **Theme**: Midnight Aurora (matching app and website)
- **Colors**: Midnight Blue (#191970) + Electric Mint (#00FFA3) + Soft Purple (#A78BFA)
- **Purpose**: Internal management tool

## 🌐 Tech Stack

- **Framework**: Next.js 14 (React) with App Router + TypeScript
- **UI**: TailwindCSS + shadcn/ui components (matching theme)
- **Backend**: Firebase Admin SDK + Next.js API routes
- **Auth**: Firebase Authentication (admin whitelist)
- **Deployment**: Vercel (separate from main website)
- **Charts**: Recharts for analytics visualization
- **Database**: Same Firebase Firestore (elevated permissions)

## 📁 Project Structure

```
admin-dashboard/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx                    (Dashboard home)
│   │   ├── users/
│   │   │   ├── page.tsx               (User list)
│   │   │   └── [id]/page.tsx          (User details)
│   │   ├── subscriptions/
│   │   │   └── page.tsx               (Revenue analytics)
│   │   ├── ai-management/
│   │   │   └── page.tsx               (API keys, costs)
│   │   ├── configuration/
│   │   │   └── page.tsx               (App settings)
│   │   ├── analytics/
│   │   │   └── page.tsx               (User analytics)
│   │   ├── support/
│   │   │   └── page.tsx               (Support tickets)
│   │   └── layout.tsx                 (Dashboard layout)
│   └── api/
│       ├── users/
│       │   └── route.ts
│       ├── subscriptions/
│       │   └── route.ts
│       ├── ai-config/
│       │   └── route.ts
│       └── analytics/
│           └── route.ts
├── components/
│   ├── ui/                            (shadcn components)
│   ├── charts/
│   │   ├── RevenueChart.tsx
│   │   ├── UserGrowthChart.tsx
│   │   └── AIUsageChart.tsx
│   ├── tables/
│   │   ├── UsersTable.tsx
│   │   └── SubscriptionsTable.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── StatCard.tsx
├── lib/
│   ├── firebase-admin.ts              (Firebase Admin SDK)
│   ├── auth.ts                        (Admin auth logic)
│   └── utils.ts
├── middleware.ts                       (Auth middleware)
└── .env.local                          (API keys, secrets)
```

## 📅 Development Timeline (2-3 Weeks)

### Week 1: Core Setup & User Management

#### Day 1-2: Project Setup

**Initialization**:

- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Install dependencies (shadcn/ui, Recharts, etc.)
- [ ] Configure Midnight Aurora theme in Tailwind
- [ ] Set up Firebase Admin SDK
- [ ] Create environment variables structure
- [ ] Set up folder structure

**Firebase Admin Setup**:

```typescript
// lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
```

**Environment Variables**:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-admin-sdk@...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
NEXTAUTH_SECRET=your-secret-key
ADMIN_EMAILS=admin@Expenvisor.com,admin2@Expenvisor.com
```

---

#### Day 3-4: Authentication System

**Admin Login**:

- [ ] Create admin login page
- [ ] Email/password authentication
- [ ] Admin whitelist check (Firestore collection)
- [ ] Session management with NextAuth or custom
- [ ] 2FA setup (optional but recommended)
- [ ] Role-based access control (Super Admin, Support, Finance)

**Firestore Collections**:

```
admins/
  {adminId}/
    email: string
    role: "super_admin" | "support" | "finance"
    name: string
    createdAt: timestamp
    lastLogin: timestamp
```

**Auth Middleware**:

```typescript
// middleware.ts
- Protect all /dashboard routes
- Redirect to /login if not authenticated
- Check if user email is in admin whitelist
```

---

#### Day 5-7: User Management Dashboard

**User List Page** (`/dashboard/users`):

**Features**:

- [ ] Table with all users (paginated, 100 per page)
- [ ] Search by email, name, or user ID
- [ ] Filter by subscription tier (Free, Standard, Premium)
- [ ] Filter by join date
- [ ] Sort by various fields
- [ ] Export to CSV
- [ ] User count stats

**Table Columns**:

- User ID
- Name
- Email
- Subscription Tier
- Join Date
- Last Active
- Total Expenses
- AI Usage (voice, OCR, chat)
- Actions (View, Suspend, Delete)

**User Details Page** (`/dashboard/users/[id]`):

**Tabs**:

1. **Profile**:

   - Basic info (name, email, phone)
   - Account status (active, suspended)
   - Join date, last login
   - Device info

2. **Subscription**:

   - Current tier
   - Billing cycle
   - Next renewal date
   - Payment history
   - Manual override option

3. **Usage Stats**:

   - Total expenses count
   - Total income count
   - Voice inputs used
   - OCR scans used
   - AI chat messages
   - Storage used

4. **Activity**:

   - Recent expenses (last 10)
   - Recent income (last 10)
   - Login history
   - Device history

5. **Actions**:

   - Suspend account
   - Delete account (with confirmation)
   - Reset password
   - Manual subscription change
   - Send email notification
   - Export user data (GDPR)

**API Routes**:

```typescript
// app/api/users/route.ts
GET /api/users - List users with filters
GET /api/users/[id] - Get user details
PUT /api/users/[id] - Update user
DELETE /api/users/[id] - Delete user
POST /api/users/[id]/suspend - Suspend user
POST /api/users/[id]/export - Export user data
```

---

### Week 2: Subscriptions, AI Management & Configuration

#### Day 8-9: Subscription & Revenue Analytics

**Subscriptions Dashboard** (`/dashboard/subscriptions`):

**Key Metrics Cards**:

- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- Total Active Subscriptions
- Churn Rate
- Average Revenue Per User (ARPU)
- Conversion Rate (Free → Paid)

**Charts**:

1. **Revenue Over Time** (line chart)

   - Daily/Weekly/Monthly view
   - Compare periods

2. **Subscription Breakdown** (pie chart)

   - Free users: X%
   - Standard: Y%
   - Premium: Z%

3. **Cohort Analysis** (table)

   - Retention by signup month

4. **Failed Payments** (table)

   - User ID, Amount, Reason, Date
   - Retry action button

**RevenueCat Integration**:

- [ ] RevenueCat webhook endpoint
- [ ] Store subscription events in Firestore
- [ ] Sync subscription status
- [ ] Handle failed payments

**Promotional Codes**:

- [ ] Create discount codes
- [ ] Set expiry dates
- [ ] Usage limits
- [ ] Track redemptions

**Refunds**:

- [ ] View refund requests
- [ ] Process refunds (manual with App Store/Play Store)
- [ ] Track refund rate

---

#### Day 10-11: AI & API Management (CRITICAL)

**AI Management Dashboard** (`/dashboard/ai-management`):

**OpenAI API Keys**:

- [ ] Add new API keys (encrypted storage)
- [ ] Rotate keys
- [ ] Delete keys
- [ ] Test key validity
- [ ] Set fallback keys

**Usage Tracking**:

- [ ] Real-time API request count
- [ ] Token usage (input + output)
- [ ] Cost calculation ($per 1K tokens)
- [ ] Daily/Weekly/Monthly costs
- [ ] Cost per user breakdown
- [ ] Cost vs Revenue analysis

**Charts**:

1. **API Usage Over Time** (line chart)
2. **Cost by Feature** (pie chart)

   - AI Chat: X%
   - AI Advisor: Y%

3. **Top 10 Users by AI Usage** (table)

**Cost Optimization**:

- [ ] Set daily/monthly spending caps
- [ ] Alert when approaching limit
- [ ] Pause AI features if cap exceeded
- [ ] Response caching metrics
- [ ] Cache hit rate

**Model Configuration**:

- [ ] Select active model (GPT-4, GPT-3.5-turbo, GPT-4-turbo)
- [ ] Set temperature, max_tokens
- [ ] A/B test different models
- [ ] Fallback model if primary fails

**Rate Limiting**:

- [ ] Set requests per user per day
- [ ] Different limits by subscription tier
- [ ] Temporary limit override

**Firestore Collections**:

```
app_config/
  ai_settings/
    openai_api_keys: [encrypted array]
    active_model: "gpt-4-turbo"
    fallback_model: "gpt-3.5-turbo"
    temperature: 0.7
    max_tokens: 500
    daily_cost_cap: 100
    
ai_usage_logs/
  {logId}/
    user_id: string
    feature: "chat" | "advisor"
    tokens_used: number
    cost: number
    timestamp: timestamp
```

---

#### Day 12-13: App Configuration

**Configuration Dashboard** (`/dashboard/configuration`):

**Pricing Settings**:

- [ ] Update subscription prices
  - Free tier features
  - Standard price ($4.99 default)
  - Premium price ($9.99 default)
- [ ] Feature limits per tier:
  - Voice input limits (Free: 10/month)
  - OCR limits (Free: 5/month)
  - AI chat limits (Standard: 50/month)

**Feature Flags**:

- [ ] Enable/disable features globally:
  - Voice input
  - OCR scanning
  - AI chat
  - AI advisor
  - Export functionality
- [ ] Beta features toggle
- [ ] Maintenance mode

**Expense Categories**:

- [ ] Add new categories
- [ ] Edit existing categories
- [ ] Set category icons
- [ ] Reorder categories
- [ ] Delete unused categories

**Notification Templates**:

- [ ] Budget warning messages (80%, 90%, 100%)
- [ ] Welcome email template
- [ ] Subscription renewal reminder
- [ ] Feature announcement template

**App Metadata**:

- [ ] Minimum supported app version
- [ ] Force update flag
- [ ] App store links
- [ ] Support email
- [ ] Social media links

**Currency Settings**:

- [ ] Default currency (USD)
- [ ] Supported currencies list
- [ ] Exchange rate updates (if multi-currency)

**API**:

```typescript
// app/api/configuration/route.ts
GET /api/configuration - Get all settings
PUT /api/configuration/pricing - Update pricing
PUT /api/configuration/features - Toggle features
PUT /api/configuration/categories - Update categories
```

---

### Week 3: Analytics, Support & Launch

#### Day 14-15: Analytics Dashboard

**Analytics Overview** (`/dashboard/analytics`):

**User Metrics**:

- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- WAU (Weekly Active Users)
- New signups (today, this week, this month)
- Retention rates (D1, D7, D30)
- User growth chart (line chart)

**Engagement Metrics**:

- Average expenses per user
- Average session duration
- Feature adoption rates:
  - % using voice input
  - % using OCR
  - % using AI chat
  - % using AI advisor
- Most used expense categories

**Conversion Funnel**:

1. App installs
2. Account created
3. First expense added
4. Voice/OCR used
5. Subscription upgrade

**Geographic Distribution**:

- Users by country (map or table)
- Revenue by country

**Device Analytics**:

- iOS vs Android split
- Device models
- OS versions
- App version distribution

**Charts**:

1. User Growth (line chart)
2. Feature Adoption (bar chart)
3. Conversion Funnel (funnel chart)
4. Revenue by Tier (pie chart)

**Export Options**:

- Export to CSV
- Export to PDF report
- Schedule weekly/monthly reports (email)

---

#### Day 16-17: Support & Moderation

**Support Dashboard** (`/dashboard/support`):

**Ticket System**:

- [ ] View all support tickets
- [ ] Filter by status (Open, In Progress, Closed)
- [ ] Filter by priority (Low, Medium, High, Urgent)
- [ ] Assign tickets to admins
- [ ] Reply to tickets
- [ ] Internal notes
- [ ] Mark as resolved

**User Reports**:

- [ ] View reported issues
- [ ] Bug reports
- [ ] Feature requests
- [ ] Inappropriate content flags

**Activity Logs**:

- [ ] View all admin actions (audit trail)
- [ ] Filter by admin user
- [ ] Filter by action type
- [ ] Export logs

**Error Monitoring**:

- [ ] Firebase Crashlytics integration
- [ ] View crash reports
- [ ] Filter by app version
- [ ] User-reported errors

**Broadcast Notifications**:

- [ ] Send push notification to all users
- [ ] Send to specific segment:
  - By subscription tier
  - By location
  - By app version
  - By active/inactive status
- [ ] Schedule notifications
- [ ] Preview notification

**Email Management**:

- [ ] Send email to user
- [ ] Send bulk email (newsletter)
- [ ] Email templates
- [ ] Track open rates

---

#### Day 18-19: Dashboard Home & Polish

**Dashboard Home** (`/dashboard`):

**Quick Stats Cards**:

- Total Users
- Active Subscriptions
- Today's Revenue
- AI Cost Today
- New Users (24h)
- Support Tickets (Open)

**Charts**:

1. **Revenue Chart** (last 30 days)
2. **User Growth** (last 30 days)
3. **AI Usage** (last 7 days)

**Recent Activity Feed**:

- New user signups (last 10)
- New subscriptions (last 10)
- Recent support tickets
- Recent errors/crashes

**Quick Actions**:

- View all users
- Check AI costs
- Respond to support
- Update app config

**Sidebar Navigation**:

- Dashboard (home)
- Users
- Subscriptions
- AI Management
- Configuration
- Analytics
- Support
- Settings (admin profile)
- Logout

---

#### Day 20-21: Testing & Deployment

**Testing Checklist**:

- [ ] Test all CRUD operations
- [ ] Test with different admin roles
- [ ] Test API endpoints
- [ ] Test Firebase Admin SDK queries
- [ ] Test data exports
- [ ] Test on mobile (responsive)
- [ ] Test notification sending
- [ ] Test error handling
- [ ] Security audit (API routes)
- [ ] Performance testing (large datasets)

**Security Measures**:

- [ ] API routes protected (admin auth required)
- [ ] Firebase Admin SDK properly secured
- [ ] Environment variables not exposed
- [ ] CORS configured correctly
- [ ] Rate limiting on API routes
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Firestore)
- [ ] XSS prevention

**Deployment**:

- [ ] Create separate Vercel project (admin.Expenvisor.com)
- [ ] Set environment variables in Vercel
- [ ] Deploy to production
- [ ] Test in production environment
- [ ] Set up subdomain (admin.Expenvisor.com)
- [ ] Add admin emails to whitelist in Firestore

---

## 🔐 Security & Access Control

### Admin Roles

**Super Admin**:

- Full access to everything
- Can add/remove admins
- Can delete users
- Can modify pricing
- Can access financial data

**Support**:

- View users
- Respond to tickets
- View activity logs
- Cannot modify pricing
- Cannot delete users
- Cannot access financial reports

**Finance**:

- View subscriptions
- View revenue reports
- Process refunds
- View AI costs
- Cannot modify app config
- Cannot access user details beyond subscription

### Implementation:

```typescript
// lib/auth.ts
export async function checkAdminRole(email: string, requiredRole: Role) {
  const adminDoc = await adminDb.collection('admins').doc(email).get();
  if (!adminDoc.exists) return false;
  
  const adminData = adminDoc.data();
  const roleHierarchy = {
    super_admin: 3,
    finance: 2,
    support: 1,
  };
  
  return roleHierarchy[adminData.role] >= roleHierarchy[requiredRole];
}
```

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase-admin": "^12.0.0",
    "next-auth": "^4.24.0",
    "@radix-ui/react-*": "^1.0.0",
    "recharts": "^2.10.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.309.0",
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "date-fns": "^3.0.0",
    "papaparse": "^5.4.1"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.10.0"
  }
}
```

---

## 💰 Costs

- **Hosting**: $0 (Vercel free tier)
- **Firebase**: Included in app costs
- **Domain**: $0 (use subdomain of main site)
- **Total**: $0/month

---

## 🎯 Success Metrics

- <2 second page load time
- Zero data leaks/security issues
- Easy for non-technical admins to use
- Real-time data updates
- Mobile responsive (for quick checks)

---

## ⚠️ Critical Security Notes

1. **NEVER commit .env.local** - contains Firebase private key
2. **Admin whitelist in Firestore** - not in code
3. **All API routes must check admin auth**
4. **Log all admin actions** - audit trail
5. **2FA highly recommended** for super admins
6. **Encrypt OpenAI API keys** at rest
7. **Separate subdomain** (admin.Expenvisor.com) - not /admin route
8. **Rate limit API routes** - prevent abuse

---

## 🚀 Launch Checklist

### Before Going Live:

- [ ] Firebase Admin SDK configured
- [ ] Environment variables set in Vercel
- [ ] Admin emails added to Firestore whitelist
- [ ] All API routes protected
- [ ] Audit logs working
- [ ] OpenAI API keys encrypted
- [ ] 2FA enabled for super admins
- [ ] Mobile responsive tested
- [ ] Error handling tested
- [ ] Backup admin access method

### After Launch:

- [ ] Monitor for suspicious activity
- [ ] Check API usage/costs daily
- [ ] Review audit logs weekly
- [ ] Rotate Firebase Admin SDK keys quarterly
- [ ] Update dependencies monthly
- [ ] Train team on admin panel usage

---

## 📱 Key Admin URLs

- Login: `admin.Expenvisor.com/login`
- Dashboard: `admin.Expenvisor.com/dashboard`
- Users: `admin.Expenvisor.com/dashboard/users`
- Subscriptions: `admin.Expenvisor.com/dashboard/subscriptions`
- AI Management: `admin.Expenvisor.com/dashboard/ai-management`
- Configuration: `admin.Expenvisor.com/dashboard/configuration`
- Analytics: `admin.Expenvisor.com/dashboard/analytics`
- Support: `admin.Expenvisor.com/dashboard/support`

---

## 🚀 Ready to Build?

Start with Day 1: Project setup and Firebase Admin SDK configuration!

**Estimated Time**: 2-3 weeks (build after app is launched)

**Priority**: High (needed to manage users and control costs)

**Note**: This can be built in parallel with website, or after app launch when you actually need to manage users.

### To-dos

- [ ] Initialize Next.js project with Firebase Admin SDK and environment configuration
- [ ] Build admin authentication with email whitelist and role-based access control
- [ ] Create user list page, user details page, and user management actions
- [ ] Build subscription analytics dashboard with MRR, churn rate, and RevenueCat integration
- [ ] Create AI API management panel for OpenAI keys, cost tracking, and usage monitoring
- [ ] Build configuration dashboard for pricing, feature flags, and app settings
- [ ] Create analytics dashboard with user metrics, engagement stats, and charts
- [ ] Build support ticket system, notification broadcaster, and activity logs
- [ ] Create admin dashboard home with stats cards and recent activity
- [ ] Test all features, secure API routes, and deploy to admin.Expenvisor.com