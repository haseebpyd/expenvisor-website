import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Credit Card Payoff Calculator",
  description:
    "Free credit card payoff calculator to calculate time to pay off credit card debt, minimum payment calculator, and see total interest paid.",
  keywords: [
    "credit card payoff calculator",
    "minimum payment calculator",
    "credit card interest calculator",
    "pay off credit card",
    "credit card debt calculator",
    "credit card payoff",
    "credit card calculator",
    "debt payoff calculator",
    "credit card interest",
    "credit card calculator 2025",
  ],
  slug: "credit-card-payoff-calculator",
});

export default function CreditCardPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

