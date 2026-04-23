export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  tags: string[];
  keywords: string[];
  featuredImage: string;
  ogImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "expenvisor-version-1-2-release-notes",
    title:
      "Expenvisor 1.2 Release: Import/Export, Smarter Analytics & Lightning Performance",
    description:
      "Discover everything packed into Expenvisor 1.2—from data import/export and redesigned analytics to faster performance and customizable reminders.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-08",
    updatedAt: "2025-11-08",
    readingTime: 9,
    tags: ["Product Updates", "Release Notes", "Expenvisor", "AI", "Expense Tracking"],
    keywords: [
      "expenvisor 1.2 update",
      "expenvisor release notes",
      "expense tracker import export",
      "expense analytics update",
      "ai expense tracker app"
    ],
    featuredImage: "/blog/expenvisor-1-2-release.png",
    ogImage: "/blog/expenvisor-1-2-release.png",
  },
  {
    slug: "ai-revolutionizing-personal-finance-2025",
    title: "How AI is Revolutionizing Personal Finance Management in 2025",
    description:
      "Discover how artificial intelligence is transforming personal finance management with voice tracking, OCR scanning, and predictive analytics.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-16",
    updatedAt: "2025-01-16",
    readingTime: 8,
    tags: ["AI", "Personal Finance", "Technology", "Expense Tracking"],
    keywords: [
      "AI expense tracking",
      "AI finance management",
      "personal finance AI",
      "smart budgeting",
    ],
    featuredImage: "/blog/ai-finance-2025.png",
    ogImage: "/blog/ai-finance-2025.png",
  },
  {
    slug: "best-ai-expense-tracker-iphone-2025",
    title: "Best AI Expense Tracker Apps for iPhone (2025 Guide)",
    description:
      "Top AI expense tracker apps for iPhone compared. See why Expenvisor wins on value with unlimited chat, 30 free voice entries, and $4.99 Pro.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-03",
    updatedAt: "2025-11-03",
    readingTime: 10,
    tags: ["iPhone", "AI", "Expense Tracking", "Comparison"],
    keywords: [
      "best ai expense tracker app for iphone",
      "ai finance app for iphone",
      "iphone expense tracker ai",
      "expenvisor vs monarch",
    ],
    featuredImage:
      "/blog/Best%20AI%20Expense%20Tracker%20Apps%20for%20iPhone%202025.png",
    ogImage:
      "/blog/Best%20AI%20Expense%20Tracker%20Apps%20for%20iPhone%202025.png",
  },
  {
    slug: "voice-expense-tracking-guide",
    title:
      "Voice-First Expense Tracking: Why Speaking Your Expenses is Faster Than Typing",
    description:
      "Learn how voice-activated expense tracking can save you time and improve accuracy in your financial management.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-16",
    updatedAt: "2025-01-16",
    readingTime: 7,
    tags: [
      "Voice Technology",
      "Expense Tracking",
      "Productivity",
      "Mobile Apps",
    ],
    keywords: [
      "voice expense tracking",
      "hands-free budgeting",
      "voice-activated finance app",
    ],
    featuredImage: "/blog/voice-tracking-guide.png",
    ogImage: "/blog/voice-tracking-guide.png",
  },
  {
    slug: "ocr-receipt-scanning-guide",
    title: "OCR Receipt Scanning: Complete Guide to Automated Expense Tracking",
    description:
      "Master automated receipt scanning with OCR technology for effortless expense tracking and better financial organization.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-16",
    updatedAt: "2025-01-16",
    readingTime: 7,
    tags: ["OCR", "Receipt Scanning", "Automation", "Expense Management"],
    keywords: [
      "receipt scanner app",
      "OCR expense tracking",
      "automated expense management",
      "receipt organization",
    ],
    featuredImage: "/blog/ocr-receipt-guide.png",
    ogImage: "/blog/ocr-receipt-guide.png",
  },
  {
    slug: "budgeting-mistakes-ai-solutions",
    title: "15 Budgeting Mistakes Everyone Makes (And How AI Can Fix Them)",
    description:
      "Avoid common budgeting pitfalls and learn how AI-powered tools can help you create and maintain a successful budget.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-16",
    updatedAt: "2025-01-16",
    readingTime: 9,
    tags: ["Budgeting", "Personal Finance", "AI Solutions", "Financial Tips"],
    keywords: [
      "budgeting mistakes",
      "personal finance tips",
      "smart budgeting",
      "AI budgeting assistant",
    ],
    featuredImage: "/blog/budgeting-mistakes.png",
    ogImage: "/blog/budgeting-mistakes.png",
  },
  {
    slug: "expense-tracker-comparison-2025",
    title:
      "Comparing Expense Tracker Apps: Features That Actually Matter in 2025",
    description:
      "Find the best expense tracker app for your needs with our comprehensive comparison of features, security, and value.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-16",
    updatedAt: "2025-01-16",
    readingTime: 8,
    tags: ["App Comparison", "Expense Tracking", "Reviews", "Features"],
    keywords: [
      "best expense tracker app",
      "expense app comparison",
      "finance app features",
      "budgeting app review",
    ],
    featuredImage: "/blog/app-comparison-2025.png",
    ogImage: "/blog/app-comparison-2025.png",
  },
  {
    slug: "expenvisor-vs-monarch-ynab-comparison-2025",
    title: "Expenvisor vs Monarch Money vs YNAB: Complete Comparison 2025",
    description:
      "Head-to-head comparison of Expenvisor, Monarch Money, and YNAB. See why Expenvisor wins with unlimited free AI chat, $4.99 pricing, and voice features.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-03",
    updatedAt: "2025-11-03",
    readingTime: 12,
    tags: ["Comparison", "AI", "Expense Tracking", "Pricing"],
    keywords: [
      "ai expense tracker comparison",
      "expenvisor vs monarch money",
      "expenvisor vs ynab",
      "best ai expense tracker",
      "expenvisor review",
    ],
    featuredImage:
      "/blog/Expenvisor%20vs%20Monarch%20vs%20YNAB%20Comparison.png",
    ogImage: "/blog/Expenvisor%20vs%20Monarch%20vs%20YNAB%20Comparison.png",
  },
  {
    slug: "how-expenvisor-voice-saves-time-2025",
    title: "How Expenvisor Voice Feature Saves You 10+ Hours Monthly",
    description:
      "Learn how Expenvisor's voice expense tracking saves 10+ hours monthly. Multi-language support, accessibility features, and 30 free entries included.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-03",
    updatedAt: "2025-11-03",
    readingTime: 9,
    tags: ["Voice Technology", "Productivity", "Time Saving", "Expenvisor"],
    keywords: [
      "voice expense tracking",
      "hands-free expense tracker",
      "expenvisor voice feature",
      "voice-activated finance app",
      "how to save time expense tracking",
    ],
    featuredImage:
      "/blog/How%20Expenvisor%20Voice%20Feature%20Saves%20Time.png",
    ogImage: "/blog/How%20Expenvisor%20Voice%20Feature%20Saves%20Time.png",
  },
  {
    slug: "unlimited-vs-limited-expense-trackers-2025",
    title: "Unlimited vs Limited Expense Trackers: Why Free Tier Matters",
    description:
      "Compare unlimited free tiers vs limited expense trackers. See why Expenvisor's unlimited chat, entries, and history beat artificial restrictions.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-03",
    updatedAt: "2025-11-03",
    readingTime: 11,
    tags: ["Pricing", "Value", "Free Tier", "Comparison"],
    keywords: [
      "unlimited expense tracker",
      "free expense tracker limitations",
      "best value expense app",
      "unlimited ai chat expense tracker",
      "expenvisor free tier",
    ],
    featuredImage: "/blog/Unlimited%20vs%20Limited%20Expense%20Trackers.png",
    ogImage: "/blog/Unlimited%20vs%20Limited%20Expense%20Trackers.png",
  },
  {
    slug: "ai-expense-tracker-freelancers-business-2025",
    title: "AI Expense Tracking for Freelancers & Small Business (2025 Guide)",
    description:
      "Complete guide to AI expense tracking for freelancers and small businesses. Tax deductions, receipt management, voice entry, and privacy benefits.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-03",
    updatedAt: "2025-11-03",
    readingTime: 12,
    tags: ["Business", "Freelancers", "Tax", "Small Business"],
    keywords: [
      "ai expense tracker for business",
      "freelancer expense app",
      "small business finance app",
      "business expense tracking",
      "freelancer tax deductions",
    ],
    featuredImage:
      "/blog/AI%20Expense%20Tracking%20for%20Freelancers%20%26%20Small%20Business.png",
    ogImage:
      "/blog/AI%20Expense%20Tracking%20for%20Freelancers%20%26%20Small%20Business.png",
  },
  {
    slug: "expenvisor-team-culture-2025",
    title: "Building a Culture of Collaboration, Growth, and Impact at Expenvisor",
    description:
      "Discover how Expenvisor's team culture fosters innovation, supports growth, and creates an inclusive environment where everyone can thrive.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-17",
    updatedAt: "2025-11-17",
    readingTime: 10,
    tags: ["Company Culture", "Team", "Workplace", "Expenvisor", "Diversity"],
    keywords: [
      "expenvisor team culture",
      "company culture",
      "workplace culture",
      "team collaboration",
      "diverse team",
      "inclusive workplace",
      "tech company culture",
    ],
    featuredImage: "/team_photos/Large_professional_team_202511171147.jpeg",
    ogImage: "/team_photos/Large_professional_team_202511171147.jpeg",
  },
  {
    slug: "expenvisor-innovation-2025",
    title: "How Expenvisor Drives Innovation in Expense Tracking",
    description:
      "Explore how Expenvisor uses cutting-edge AI technology, user-driven design, and continuous experimentation to revolutionize expense tracking.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-17",
    updatedAt: "2025-11-17",
    readingTime: 9,
    tags: ["Innovation", "AI", "Technology", "Expenvisor", "Product Development"],
    keywords: [
      "expenvisor innovation",
      "AI expense tracker",
      "expense tracking innovation",
      "fintech innovation",
      "AI technology",
      "product innovation",
      "tech innovation",
    ],
    featuredImage: "/team_photos/Group_of_810_202511171149.jpeg",
    ogImage: "/team_photos/Group_of_810_202511171149.jpeg",
  },
  {
    slug: "expenvisor-equality-impact-2025",
    title: "Expenvisor's Commitment to Equality and Positive Global Impact",
    description:
      "Learn how Expenvisor is making financial management accessible to everyone, building an inclusive team, and creating positive change in the world.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-11-17",
    updatedAt: "2025-11-17",
    readingTime: 11,
    tags: ["Equality", "Social Impact", "Diversity", "Inclusion", "Expenvisor"],
    keywords: [
      "expenvisor equality",
      "financial equality",
      "diverse team",
      "inclusive technology",
      "social impact",
      "financial accessibility",
      "equality in tech",
    ],
    featuredImage: "/team_photos/Large_professional_team_202511171146.jpeg",
    ogImage: "/team_photos/Large_professional_team_202511171146.jpeg",
  },
  {
    slug: "how-to-use-loan-calculator-complete-guide-2025",
    title: "How to Use a Loan Calculator: Complete Guide 2025",
    description:
      "Learn how to use a loan calculator step-by-step. Calculate monthly payments, understand amortization schedules, and make informed borrowing decisions.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    readingTime: 10,
    tags: ["Financial Tools", "Loan Calculator", "Personal Finance", "Guides"],
    keywords: [
      "how to use loan calculator",
      "loan calculator guide",
      "calculate loan payment",
      "amortization schedule",
      "loan calculator tutorial",
    ],
    featuredImage: "/blog/expenvisor-1-2-release.png",
    ogImage: "/blog/expenvisor-1-2-release.png",
  },
  {
    slug: "debt-payoff-strategies-snowball-vs-avalanche-method",
    title: "Debt Payoff Strategies: Snowball vs. Avalanche Method",
    description:
      "Compare the Snowball and Avalanche debt payoff methods. Learn which strategy saves more money and which provides better motivation for getting debt-free.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    readingTime: 12,
    tags: ["Debt Management", "Personal Finance", "Financial Strategies"],
    keywords: [
      "debt snowball method",
      "debt avalanche method",
      "debt payoff strategies",
      "snowball vs avalanche",
      "debt free strategies",
    ],
    featuredImage: "/blog/expenvisor-1-2-release.png",
    ogImage: "/blog/expenvisor-1-2-release.png",
  },
  {
    slug: "emergency-fund-how-much-should-you-save",
    title: "Emergency Fund: How Much Should You Save?",
    description:
      "Learn how much to save for your emergency fund based on your expenses, income, and situation. Get expert recommendations and build your safety net.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    readingTime: 9,
    tags: ["Emergency Fund", "Savings", "Personal Finance", "Financial Planning"],
    keywords: [
      "emergency fund calculator",
      "how much emergency fund",
      "emergency savings",
      "safety net savings",
      "emergency fund recommendations",
    ],
    featuredImage: "/blog/expenvisor-1-2-release.png",
    ogImage: "/blog/expenvisor-1-2-release.png",
  },
  {
    slug: "freelance-tax-guide-calculate-quarterly-taxes",
    title: "Freelance Tax Guide: Calculate Your Quarterly Taxes",
    description:
      "Complete guide to calculating quarterly taxes for freelancers and self-employed individuals. Learn about self-employment tax, deductions, and payment deadlines.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    readingTime: 11,
    tags: ["Freelance", "Taxes", "Self-Employed", "Business Finance"],
    keywords: [
      "freelance tax calculator",
      "quarterly taxes",
      "self-employed taxes",
      "1099 taxes",
      "freelance tax guide",
    ],
    featuredImage: "/blog/expenvisor-1-2-release.png",
    ogImage: "/blog/expenvisor-1-2-release.png",
  },
  {
    slug: "retirement-planning-are-you-saving-enough",
    title: "Retirement Planning: Are You Saving Enough?",
    description:
      "Discover retirement savings benchmarks by age, learn how to calculate if you're on track, and get strategies to boost your retirement savings.",
    content: "",
    author: "MrHaseeb",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    readingTime: 13,
    tags: ["Retirement Planning", "401k", "Savings", "Financial Planning"],
    keywords: [
      "retirement calculator",
      "retirement savings",
      "401k calculator",
      "retirement planning",
      "are you saving enough for retirement",
    ],
    featuredImage: "/blog/expenvisor-1-2-release.png",
    ogImage: "/blog/expenvisor-1-2-release.png",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit);
}
