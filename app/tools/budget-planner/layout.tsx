import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Budget Planner",
  description:
    "Free budget planner to create a monthly budget using the 50/30/20 rule or custom categories. Plan your spending, savings, and track financial goals.",
  keywords: [
    "budget planner",
    "50 30 20 rule",
    "budget calculator",
    "financial planning",
    "monthly budget planner",
    "budget calculator",
    "expense budget planner",
    "personal budget planner",
    "monthly budget calculator",
    "budget planning tool",
  ],
  slug: "budget-planner",
});

export default function BudgetPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

