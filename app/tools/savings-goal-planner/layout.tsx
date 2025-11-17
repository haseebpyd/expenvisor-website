import type { Metadata } from "next";
import { generateToolMetadata } from "@/lib/tools/metadata";

export const metadata: Metadata = generateToolMetadata({
  name: "Savings Goal Planner",
  description:
    "Free savings goal planner to calculate monthly savings needed or time to reach your financial goals. Plan for emergencies, purchases, or major expenses with compound interest.",
  keywords: [
    "savings goal calculator",
    "monthly savings calculator",
    "financial goal planner",
    "savings planner",
    "how long to save",
    "savings target calculator",
    "goal savings calculator",
    "monthly savings needed",
    "time to savings goal",
    "savings plan calculator",
  ],
  slug: "savings-goal-planner",
});

export default function SavingsGoalPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

