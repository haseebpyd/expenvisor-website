# Expenvisor Website — Context

## What this is

Marketing website for **Expenvisor**, an indie iOS expense tracker app built by Muhammad Haseeb. The website's job is to explain the app, drive App Store downloads, and rank for finance-related search terms via the blog and free tools.

The app is **iOS only** (App Store ID: `id6754627757`). No Android version exists. App Store stats: 50+ downloads, 5.0 rating, 4 reviews.

App Store link: https://apps.apple.com/us/app/expenvisor-ai-expense-tracker/id6754627757

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion v11
- **Icons**: Lucide React
- **Language**: TypeScript
- **Dev server**: `npm run dev` → http://localhost:3000

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — Hero, Video, Team, Features, Screenshots, Pricing, FAQ, Footer |
| `/team` | `app/team/page.tsx` | Founder page — Muhammad Haseeb, real photo, story, tech stack, timeline |
| `/features` | `app/features/page.tsx` | Full features breakdown |
| `/pricing` | `app/pricing/page.tsx` | Pricing page |
| `/about` | `app/about/page.tsx` | About page |
| `/blog` | `app/blog/page.tsx` | Blog index |
| `/blog/[slug]` | `app/blog/*/page.tsx` | 18 blog posts (SEO-focused finance content) |
| `/tools` | `app/tools/page.tsx` | Free financial calculators index |
| `/tools/[slug]` | `app/tools/*/page.tsx` | 28 individual calculator tools |
| `/contact` | `app/contact/page.tsx` | Contact page |
| `/support` | `app/support/page.tsx` | Support page |
| `/download` | `app/download/page.tsx` | Download page |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Privacy policy |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | Terms of service |

---

## Homepage Components (`components/`)

| Component | File | What it does |
|---|---|---|
| `Navbar` | `Navbar.tsx` | Top navigation |
| `Hero` | `Hero.tsx` | Headline, App Store download button, real phone mockup screenshot, trust signals (5.0 rating, 4 reviews, iOS 15+) |
| `Video` | `Video.tsx` | Embeds YouTube promo video (`5PPoQazS5Wg`) |
| `Team` | `Team.tsx` | Founder card — Muhammad Haseeb's real photo, quote, indie builder story, 3 trust cards |
| `Features` | `Features.tsx` | 12-card feature grid: voice, receipt scan, AI chat, manual log, analytics, savings rate, ledger, recurring, multi-currency, history, export, cloud backup |
| `Screenshots` | `Screenshots.tsx` | App screenshot carousel |
| `Pricing` | `Pricing.tsx` | Free vs Pro cards — Free ($0), Pro ($6.99/mo or $49.99/yr, 14-day trial) |
| `FAQ` | `FAQ.tsx` | 9 Q&As — honest, no Android/web claims, correct trial period |
| `Footer` | `Footer.tsx` | Site footer |
| `SocialBar` | `SocialBar.tsx` | Social media links |

---

## Free Tools (28 calculators)

All under `/tools/`. Each is a standalone interactive page with no backend — pure client-side JS calculations. Used for SEO traffic.

Complete list: loan calculator, compound interest, mortgage affordability, bi-weekly mortgage, refinance, car loan, debt payoff, credit card payoff, debt-to-income, APR, net worth, investment return, retirement savings, 401k contribution, HSA contribution, savings goal planner, emergency fund, inflation, income tax, freelance income, hourly-to-salary, expense ratio, budget planner, business expense deduction, currency converter, tip calculator, and category landing pages (budgeting, business finance, debt management, retirement planning).

---

## Blog Posts (18 articles)

All under `/blog/`. SEO content targeting finance and expense tracker keywords.

- AI expense tracker for freelancers & business
- AI revolutionizing personal finance 2025
- Best AI expense tracker for iPhone 2025
- Budgeting mistakes & AI solutions
- Debt payoff strategies (snowball vs avalanche)
- Emergency fund guide
- Expense tracker comparison 2025
- Expenvisor equality impact
- Expenvisor innovation
- Expenvisor team culture (**note**: outdated — still references team/culture framing, should be updated to match indie narrative)
- Expenvisor v1.2 release notes
- Expenvisor vs Monarch vs YNAB comparison
- Freelance tax guide
- How Expenvisor voice saves time
- Loan calculator guide
- OCR receipt scanning guide
- Retirement planning guide
- Unlimited vs limited expense trackers
- Voice expense tracking guide

---

## App Features (what the iOS app actually does)

- Voice entry (Whisper AI)
- Receipt scanning (OCR)
- AI chat (Groq llama-3.3-70b)
- Manual expense & income logging
- Ledger / debt tracker (who owes what)
- Recurring payments (auto-logs on schedule)
- Analytics: weekly, monthly, bimonthly, yearly charts (line + bar)
- Savings rate tracking & year-over-year comparison
- 180+ currencies, all world languages
- Daily / weekly / monthly / all-time history
- Import & export (CSV, PDF)
- Cloud backup & sync (Firebase, encrypted)
- Works offline (local-first)
- Dark mode

---

## Pricing (must match StoreKit exactly)

- **Free**: unlimited manual transactions, basic charts, 50 AI chats/mo, 30 voice entries/mo, 5 receipt scans/mo, local storage only
- **Pro Monthly**: $6.99/month
- **Pro Yearly**: $49.99/year (save ~40%)
- **Trial**: 14 days free
- StoreKit product IDs: `com.expenvisor.pro.monthly` / `com.expenvisor.pro.yearly`

---

## Trust & Authenticity Rules

These were updated after user feedback that the site looked AI-generated and untrustworthy:

1. **No AI-generated team photos** — only use `Muhammad_Haseeb.jpeg` (real founder photo)
2. **iOS only** — never mention Android or web app
3. **Real stats only** — "5.0 rating · 4 reviews · 50+ downloads" (not inflated numbers)
4. **Indie narrative** — built by one developer, no fake team
5. **Contact email**: haseeb@alrighttech.com
6. **14-day trial** (not 7-day)

---

## Asset Locations

- Screenshots: `public/screenshots/` (8 real app screenshots: hero.PNG, IMG_4729–4735.PNG)
- Team photo: `public/team_photos/Muhammad_Haseeb.jpeg` (real — use this only)
- Blog images: `public/blog/`
- AI team photos in `public/team_photos/` are **unused** — do not reference them

---

## Known Issues / TODO

- Blog posts `expenvisor-team-culture-2025` and `expenvisor-equality-impact-2025` still reference a large "team" — should be updated to match the indie founder narrative
- Site metadata in `app/layout.tsx` still says "Free iOS & Android app" — should be updated to iOS only
