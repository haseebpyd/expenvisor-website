import type { Metadata } from "next";
import ToolLayout from "../ToolLayout";
import ToolCard from "../ToolCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Budgeting Tools - Free Calculators | Expenvisor",
  description:
    "Free budgeting tools: budget planner, expense ratio calculator, savings goal planner, emergency fund calculator, and more. Take control of your finances.",
  keywords: [
    "budgeting tools",
    "budget calculator",
    "expense calculator",
    "budget planner",
    "savings calculator",
    "emergency fund",
    "expense tracking",
  ],
};

const budgetingTools = [
  {
    title: "Budget Planner",
    slug: "budget-planner",
    desc: "50/30/20 and custom category planning.",
  },
  {
    title: "Expense Ratio Calculator",
    slug: "expense-ratio-calculator",
    desc: "Analyze monthly expenses and calculate expense-to-income ratio.",
  },
  {
    title: "Savings Goal Planner",
    slug: "savings-goal-planner",
    desc: "Monthly target and time-to-goal.",
  },
  {
    title: "Emergency Fund Calculator",
    slug: "emergency-fund-calculator",
    desc: "Calculate how much to save for emergencies and plan your safety net.",
  },
];

export default function BudgetingPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Budgeting Tools</span>
            </h1>
            <p className="text-text-secondary-dark max-w-3xl mx-auto text-lg">
              Free budgeting calculators to plan your spending, track expenses, set savings goals, and build financial security. No sign-up required.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {budgetingTools.map((tool) => (
              <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About Budgeting</h2>
            <div className="text-text-secondary-dark text-base leading-relaxed space-y-4">
              <p>
                Creating and sticking to a budget is one of the most important financial habits you can develop. A budget
                gives you control over your money, helps you achieve financial goals, reduces stress, and prevents
                overspending.
              </p>
              <p>
                Our budgeting tools help you create realistic budgets, analyze your spending, set savings goals, and build
                emergency funds. Whether you're following the 50/30/20 rule or creating a custom budget, these calculators
                help you take control of your finances.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Popular Budgeting Methods</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>50/30/20 Rule:</strong> 50% needs, 30% wants, 20% savings - simple and effective.</li>
                <li><strong>Zero-Based Budgeting:</strong> Assign every dollar a job before the month begins.</li>
                <li><strong>Envelope Method:</strong> Allocate cash to different spending categories.</li>
                <li><strong>Percentage Budgeting:</strong> Allocate income by percentages to different categories.</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              View All Financial Tools →
            </Link>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

