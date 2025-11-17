import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Business Expense Deduction Calculator",
  description:
    "Free business expense deduction calculator to calculate home office deduction, vehicle expense deduction, and total tax deductions for self-employed individuals.",
  keywords: [
    "business expense calculator",
    "tax deduction calculator",
    "self-employed deductions",
    "home office deduction calculator",
    "vehicle expense deduction",
    "business tax deductions",
    "self-employment deductions",
    "business deductions 2025",
    "tax write offs",
    "business expense deduction",
  ],
  slug: "business-expense-deduction-calculator",
});

export default function BusinessExpenseDeductionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

