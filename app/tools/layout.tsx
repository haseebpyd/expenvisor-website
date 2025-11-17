import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Tools | Expenvisor",
  description:
    "Free, privacy-first calculators: loan payments, mortgage affordability, compound interest, savings goals, taxes, and budgets.",
  alternates: { canonical: "/tools" },
  keywords: [
    "financial tools",
    "loan calculator",
    "mortgage affordability",
    "compound interest",
    "savings goal",
    "income tax",
    "budget planner",
  ],
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

