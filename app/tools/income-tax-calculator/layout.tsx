import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Income Tax Calculator",
  description:
    "Free income tax calculator to estimate your federal income tax using 2024 tax brackets. Calculate tax liability with standard deduction for educational purposes.",
  keywords: [
    "income tax calculator",
    "tax estimator",
    "tax bracket calculator",
    "federal tax calculator",
    "2024 tax calculator",
    "tax liability calculator",
    "tax estimate calculator",
    "income tax estimator",
    "tax bracket finder",
    "tax calculator 2024",
  ],
  slug: "income-tax-calculator",
});

export default function IncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

