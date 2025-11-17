import type { Metadata } from "next";
import ToolLayout from "../ToolLayout";
import ToolCard from "../ToolCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Debt Management Tools - Free Calculators | Expenvisor",
  description:
    "Free debt management calculators: debt payoff, credit card payoff, debt-to-income ratio, and more. Compare strategies and get out of debt faster.",
  keywords: [
    "debt management tools",
    "debt payoff calculator",
    "credit card payoff",
    "debt to income ratio",
    "debt consolidation",
    "snowball method",
    "avalanche method",
    "debt free",
  ],
};

const debtTools = [
  {
    title: "Debt Payoff Calculator",
    slug: "debt-payoff-calculator",
    desc: "Compare Snowball vs. Avalanche methods and calculate time to debt-free.",
  },
  {
    title: "Credit Card Payoff Calculator",
    slug: "credit-card-payoff-calculator",
    desc: "Calculate time to pay off credit card debt and see total interest paid.",
  },
  {
    title: "Debt-to-Income Ratio Calculator",
    slug: "debt-to-income-calculator",
    desc: "Calculate DTI ratio to assess financial health and loan eligibility.",
  },
];

export default function DebtManagementPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Debt Management Tools</span>
            </h1>
            <p className="text-text-secondary-light max-w-3xl mx-auto text-lg">
              Free calculators to help you manage debt, compare payoff strategies, and achieve financial freedom. No sign-up required.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {debtTools.map((tool) => (
              <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About Debt Management</h2>
            <div className="text-text-secondary-light text-base leading-relaxed space-y-4">
              <p>
                Effective debt management is crucial for financial health. Our free debt management tools help you understand
                your debt situation, compare payoff strategies, and create a plan to become debt-free.
              </p>
              <p>
                Whether you're dealing with credit card debt, personal loans, or multiple debts, these calculators help you
                see the true cost of your debt and find the fastest, most cost-effective way to pay it off.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Popular Debt Payoff Strategies</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Snowball Method:</strong> Pay off smallest debts first for psychological wins and motivation.</li>
                <li><strong>Avalanche Method:</strong> Pay off highest interest rate debts first to save the most money.</li>
                <li><strong>Debt Consolidation:</strong> Combine multiple debts into one loan with a lower interest rate.</li>
                <li><strong>Balance Transfers:</strong> Move high-interest credit card debt to a 0% APR card.</li>
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

