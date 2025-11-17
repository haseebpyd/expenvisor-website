import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Debt Payoff Calculator",
  description:
    "Free debt payoff calculator to compare Snowball vs. Avalanche methods, calculate time to debt-free, and see interest savings. Plan your debt elimination strategy.",
  keywords: [
    "debt payoff calculator",
    "debt snowball calculator",
    "debt avalanche calculator",
    "debt free calculator",
    "debt elimination calculator",
    "pay off debt calculator",
    "debt payoff strategy",
    "snowball vs avalanche",
    "debt payoff plan",
    "debt calculator",
  ],
  slug: "debt-payoff-calculator",
});

export default function DebtPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

