import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Debt-to-Income Ratio Calculator",
  description:
    "Free debt-to-income (DTI) ratio calculator to assess your financial health and loan eligibility. Calculate front-end and back-end DTI instantly.",
  keywords: [
    "debt to income ratio calculator",
    "DTI calculator",
    "debt to income ratio",
    "DTI ratio calculator",
    "debt ratio calculator",
    "loan eligibility calculator",
    "mortgage DTI calculator",
    "front end DTI",
    "back end DTI",
    "debt to income",
  ],
  slug: "debt-to-income-calculator",
});

export default function DebtToIncomeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

