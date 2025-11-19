import type { Metadata } from "next";
import ToolLayout from "../ToolLayout";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Calculator Comparison: Expenvisor vs. Bankrate vs. NerdWallet | 2025",
  description:
    "Compare loan calculators: Expenvisor vs. Bankrate vs. NerdWallet. See feature-by-feature comparison, accuracy, user experience, and privacy.",
  keywords: [
    "loan calculator comparison",
    "expenvisor vs bankrate",
    "expenvisor vs nerdwallet",
    "best loan calculator",
    "free loan calculator",
    "loan calculator review",
  ],
};

const comparison = [
  {
    feature: "Monthly Payment Calculation",
    expenvisor: "✓ Accurate",
    bankrate: "✓ Accurate",
    nerdwallet: "✓ Accurate",
  },
  {
    feature: "Amortization Schedule",
    expenvisor: "✓ Full schedule",
    bankrate: "✓ Full schedule",
    nerdwallet: "✓ Full schedule",
  },
  {
    feature: "CSV Export",
    expenvisor: "✓ Yes",
    bankrate: "✗ No",
    nerdwallet: "✗ No",
  },
  {
    feature: "No Sign-Up Required",
    expenvisor: "✓ Yes",
    bankrate: "✗ Required for some",
    nerdwallet: "✗ Required for some",
  },
  {
    feature: "Privacy-First (No Tracking)",
    expenvisor: "✓ Yes",
    bankrate: "✗ Tracks users",
    nerdwallet: "✗ Tracks users",
  },
  {
    feature: "Educational Content",
    expenvisor: "✓ Comprehensive",
    bankrate: "⚠ Limited",
    nerdwallet: "⚠ Limited",
  },
  {
    feature: "FAQ Sections",
    expenvisor: "✓ Detailed",
    bankrate: "✗ Minimal",
    nerdwallet: "✗ Minimal",
  },
  {
    feature: "Mobile Experience",
    expenvisor: "✓ Excellent",
    bankrate: "✓ Good",
    nerdwallet: "✓ Good",
  },
  {
    feature: "No Ads",
    expenvisor: "✓ Ad-free",
    bankrate: "✗ Has ads",
    nerdwallet: "✗ Has ads",
  },
  {
    feature: "Additional Tools",
    expenvisor: "26+ tools",
    bankrate: "Multiple tools",
    nerdwallet: "Multiple tools",
  },
];

export default function LoanCalculatorComparisonPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Loan Calculator <span className="gradient-text">Comparison</span>
            </h1>
            <p className="text-text-secondary-dark max-w-3xl mx-auto text-lg">
              Compare Expenvisor's loan calculator with Bankrate and NerdWallet. See which tool offers the best features, accuracy, and user experience.
            </p>
          </header>

          <div className="max-w-6xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Feature-by-Feature Comparison</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary/20">
                  <th className="pb-4 text-white font-semibold">Feature</th>
                  <th className="pb-4 text-white font-semibold text-center">Expenvisor</th>
                  <th className="pb-4 text-text-secondary-dark text-center">Bankrate</th>
                  <th className="pb-4 text-text-secondary-dark text-center">NerdWallet</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary-dark">
                {comparison.map((item, index) => (
                  <tr key={index} className="border-b border-secondary/10">
                    <td className="py-4 text-base font-medium">{item.feature}</td>
                    <td className="py-4 text-center text-accent">{item.expenvisor}</td>
                    <td className="py-4 text-center">{item.bankrate}</td>
                    <td className="py-4 text-center">{item.nerdwallet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-4xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Expenvisor Stands Out</h2>
            <div className="text-text-secondary-dark text-base leading-relaxed space-y-4">
              <p>
                <strong>Privacy-First Approach:</strong> Unlike Bankrate and NerdWallet, Expenvisor doesn't require sign-ups
                or track your data. Your calculations remain completely private.
              </p>
              <p>
                <strong>Comprehensive Education:</strong> Our loan calculator includes detailed FAQ sections, step-by-step
                guides, and educational content to help you understand loan calculations, not just get answers.
              </p>
              <p>
                <strong>Export Functionality:</strong> Download your amortization schedule as CSV for further analysis in
                Excel or Google Sheets. This feature isn't available on most competitor sites.
              </p>
              <p>
                <strong>Ad-Free Experience:</strong> No distracting ads or pop-ups. Just clean, focused calculations.
              </p>
              <p>
                <strong>Part of a Suite:</strong> Access 26+ financial tools from one place, all with the same privacy-first,
                educational approach.
              </p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div>
              <Link
                href="/tools/loan-calculator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Try Expenvisor Loan Calculator →
              </Link>
            </div>
            <div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-xl font-semibold hover:bg-accent hover:text-white transition-all duration-300"
              >
                View All Financial Tools →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

