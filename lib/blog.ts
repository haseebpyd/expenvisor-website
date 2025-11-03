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
    featuredImage: "/blog/iphone-ai-expense-trackers-2025.png",
    ogImage: "/blog/iphone-ai-expense-trackers-2025.png",
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
