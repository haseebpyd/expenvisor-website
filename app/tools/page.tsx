import type { Metadata } from "next";
import Link from "next/link";
import ToolLayout from "./ToolLayout";

export const metadata: Metadata = {
  title: "Free Financial Tools | Expenvisor",
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

const tools = [
  { title: "Loan Calculator", slug: "loan-calculator", desc: "Monthly payment and amortization schedule." },
  { title: "Mortgage Affordability", slug: "mortgage-affordability", desc: "How much home can you afford?" },
  { title: "Compound Interest", slug: "compound-interest", desc: "Growth with contributions and compounding." },
  { title: "Savings Goal Planner", slug: "savings-goal-planner", desc: "Monthly target and time-to-goal." },
  { title: "Income Tax Calculator", slug: "income-tax-calculator", desc: "Estimate taxes with simple assumptions." },
  { title: "Budget Planner", slug: "budget-planner", desc: "50/30/20 and custom category planning." },
];

export default function ToolsHubPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Free <span className="gradient-text">Financial Tools</span>
            </h1>
            <p className="text-text-secondary-light max-w-2xl mx-auto">
              Calculate payments, plan savings, and explore scenarios. No sign-up. No tracking. Just answers.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="group">
                <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl card-hover h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                      {t.title}
                    </h2>
                    <p className="text-text-secondary-light text-sm">{t.desc}</p>
                  </div>
                  <div className="mt-6 text-accent text-sm">Open →</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center text-text-secondary-light text-sm">
            Results are estimates for educational purposes. Consult a professional for advice.
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}


