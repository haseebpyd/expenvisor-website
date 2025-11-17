import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Freelance Income Calculator",
  description:
    "Free freelance income calculator to estimate tax withholding, calculate quarterly taxes, and understand business expense deductions for self-employed individuals.",
  keywords: [
    "freelance tax calculator",
    "self-employed tax calculator",
    "1099 calculator",
    "freelance income calculator",
    "quarterly tax calculator",
    "self-employment tax",
    "freelance tax estimate",
    "1099 tax calculator",
    "independent contractor calculator",
    "freelance calculator 2025",
  ],
  slug: "freelance-income-calculator",
});

export default function FreelanceIncomeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

