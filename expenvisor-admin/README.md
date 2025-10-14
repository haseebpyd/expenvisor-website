# Expenvisor Admin Dashboard

A comprehensive web-based admin panel for managing the Expenvisor AI expense tracker platform.

## 🎯 Features

- **User Management**: View and manage all users, subscriptions, and accounts
- **Revenue Analytics**: Track MRR, ARR, churn rate, and subscription metrics
- **AI Management**: Monitor OpenAI usage, costs, and API key management
- **Configuration**: App settings, pricing, and feature flags management
- **Analytics**: User metrics, engagement stats, and growth charts
- **Support**: Ticket system and notification broadcaster

## 🎨 Design

- **Theme**: Midnight Aurora (matching mobile app and website)
- **Framework**: Next.js 15 with TypeScript
- **UI**: TailwindCSS v4 with custom components
- **Icons**: Lucide React
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project with Admin SDK

### Installation

1. Clone the repository:

```bash
git clone https://github.com/haseebpyd/expenvisor-ai-expense-tracker.git
cd expenvisor-ai-expense-tracker/expenvisor-admin
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Configure your Firebase Admin SDK credentials in `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-admin-sdk@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
NEXTAUTH_SECRET=your-secret-key-here
ADMIN_EMAILS=admin@expenvisor.com,admin2@expenvisor.com
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
expenvisor-admin/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   └── api/               # API routes
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── charts/           # Chart components
│   │   └── tables/           # Table components
│   └── lib/                  # Utilities and configurations
│       ├── firebase-admin.ts # Firebase Admin SDK
│       ├── auth.ts           # Authentication logic
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
└── package.json
```

## 🔐 Security

- Admin email whitelist in Firestore
- Role-based access control (Super Admin, Support, Finance)
- All API routes protected with authentication
- Environment variables for sensitive data
- Audit logging for all admin actions

## 🚀 Deployment

The admin panel is designed to be deployed on Vercel at `admin.expenvisor.com`.

### Environment Variables for Production

Set these in your Vercel dashboard:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `NEXTAUTH_SECRET`
- `ADMIN_EMAILS`
- `NEXT_PUBLIC_APP_URL`

## 📊 Admin Roles

### Super Admin

- Full access to everything
- Can add/remove admins
- Can delete users
- Can modify pricing
- Can access financial data

### Support

- View users
- Respond to tickets
- View activity logs
- Cannot modify pricing or delete users

### Finance

- View subscriptions and revenue reports
- Process refunds
- View AI costs
- Cannot modify app config

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Create API routes in `src/app/api/`
4. Update navigation and routing as needed

## 📝 License

This project is part of the Expenvisor AI expense tracker platform.

## 🤝 Contributing

This is a private admin panel. Contact the development team for access.

---

**Note**: This admin panel is designed to work with the Expenvisor mobile app and requires proper Firebase configuration to function correctly.
