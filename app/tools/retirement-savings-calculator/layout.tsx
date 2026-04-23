import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Retirement Savings Calculator",
  description:
    "Free retirement savings calculator to project 401(k), IRA, and Roth IRA growth, plan retirement age, and calculate if you're saving enough for retirement.",
  keywords: [
    "retirement calculator",
    "401k calculator",
    "retirement planning calculator",
    "retirement savings calculator",
    "IRA calculator",
    "Roth IRA calculator",
    "retirement planning",
    "retirement savings",
    "how much to save for retirement",
    "retirement calculator 2025",
  ],
  slug: "retirement-savings-calculator",
});

export default function RetirementSavingsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

