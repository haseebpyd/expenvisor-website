import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "APR Calculator",
  description:
    "Free APR calculator to calculate the true cost of borrowing, compare APR vs. interest rate, and understand loan costs. Make informed borrowing decisions.",
  keywords: [
    "APR calculator",
    "APR vs interest rate",
    "loan APR calculator",
    "true cost of borrowing",
    "APR comparison",
    "annual percentage rate calculator",
    "APR calculator 2025",
    "credit card APR calculator",
    "loan cost calculator",
    "APR meaning",
  ],
  slug: "apr-calculator",
});

export default function APRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

