import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Expense Ratio Calculator",
  description:
    "Free expense ratio calculator to analyze monthly expense breakdown, expense-to-income ratio, and get budget optimization suggestions.",
  keywords: [
    "expense ratio calculator",
    "monthly expense calculator",
    "budget ratio calculator",
    "expense to income ratio",
    "expense breakdown calculator",
    "monthly expenses",
    "expense analysis",
    "budget calculator",
    "expense tracking",
    "expense ratio 2025",
  ],
  slug: "expense-ratio-calculator",
});

export default function ExpenseRatioCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

