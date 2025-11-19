import type { Metadata } from "next";
import ToolLayout from "../ToolLayout";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Free Financial Calculators 2025 - Comparison | Expenvisor",
  description:
    "Compare the best free financial calculators in 2025. See how Expenvisor's free tools compare to Bankrate, NerdWallet, and other financial calculator sites.",
  keywords: [
    "best free financial calculators",
    "financial calculator comparison",
    "free loan calculator",
    "best mortgage calculator",
    "free retirement calculator",
    "expenvisor vs bankrate",
    "expenvisor vs nerdwallet",
  ],
};

const features = [
  { feature: "No Sign-Up Required", expenvisor: true, competitors: false },
  { feature: "No Tracking/Privacy-First", expenvisor: true, competitors: false },
  { feature: "100% Free", expenvisor: true, competitors: true },
  { feature: "Mobile Responsive", expenvisor: true, competitors: true },
  { feature: "Comprehensive FAQ Sections", expenvisor: true, competitors: false },
  { feature: "Educational Content", expenvisor: true, competitors: false },
  { feature: "26+ Financial Tools", expenvisor: true, competitors: false },
  { feature: "Instant Calculations", expenvisor: true, competitors: true },
  { feature: "No Ads", expenvisor: true, competitors: false },
  { feature: "Export Results (CSV)", expenvisor: true, competitors: false },
];

export default function BestFreeFinancialCalculatorsPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Best Free Financial Calculators <span className="gradient-text">2025</span>
            </h1>
            <p className="text-text-secondary-dark max-w-3xl mx-auto text-lg">
              Compare the best free financial calculators. See how Expenvisor stacks up against Bankrate, NerdWallet, and other popular financial tools.
            </p>
          </header>

          <div className="max-w-4xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Why Choose Expenvisor's Financial Tools?</h2>
            <div className="text-text-secondary-dark text-base leading-relaxed space-y-4">
              <p>
                Expenvisor offers a comprehensive suite of 26+ free financial calculators with a focus on privacy, education,
                and user experience. Unlike many competitors, we don't require sign-ups, don't track your data, and provide
                extensive educational content to help you understand your finances.
              </p>
              <p>
                All our tools are 100% free, mobile-responsive, and designed to give you instant, accurate calculations without
                any strings attached. We believe financial tools should be accessible to everyone, which is why we've built
                the most comprehensive free financial calculator suite available.
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Feature Comparison</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary/20">
                  <th className="pb-4 text-white font-semibold">Feature</th>
                  <th className="pb-4 text-white font-semibold text-center">Expenvisor</th>
                  <th className="pb-4 text-text-secondary-dark text-center">Competitors</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary-dark">
                {features.map((item, index) => (
                  <tr key={index} className="border-b border-secondary/10">
                    <td className="py-4 text-base">{item.feature}</td>
                    <td className="py-4 text-center">
                      {item.expenvisor ? (
                        <Check className="w-5 h-5 text-accent mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {item.competitors ? (
                        <Check className="w-5 h-5 text-accent mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-4xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Tool Categories</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Debt Management</h3>
                <ul className="text-text-secondary-dark text-base space-y-2">
                  <li>• Debt Payoff Calculator</li>
                  <li>• Credit Card Payoff</li>
                  <li>• Debt-to-Income Ratio</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Loans & Mortgages</h3>
                <ul className="text-text-secondary-dark text-base space-y-2">
                  <li>• Loan Calculator</li>
                  <li>• Mortgage Affordability</li>
                  <li>• Refinance Calculator</li>
                  <li>• Car Loan Calculator</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Retirement Planning</h3>
                <ul className="text-text-secondary-dark text-base space-y-2">
                  <li>• Retirement Savings</li>
                  <li>• 401(k) Calculator</li>
                  <li>• Investment Returns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Budgeting & Savings</h3>
                <ul className="text-text-secondary-dark text-base space-y-2">
                  <li>• Budget Planner</li>
                  <li>• Savings Goal Planner</li>
                  <li>• Emergency Fund</li>
                  <li>• Expense Ratio</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Explore All 26+ Free Tools →
              </Link>
            </div>
            <div>
              <a
                href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all duration-300"
              >
                Download Expenvisor App →
              </a>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

