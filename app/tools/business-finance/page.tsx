import type { Metadata } from "next";
import ToolLayout from "../ToolLayout";
import ToolCard from "../ToolCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Finance Tools - Free Calculators | Expenvisor",
  description:
    "Free business finance calculators: freelance income, tax deductions, hourly to salary, business expenses, and more. Tools for self-employed and business owners.",
  keywords: [
    "business finance tools",
    "freelance calculator",
    "self-employed calculator",
    "business tax calculator",
    "freelance tax",
    "business deductions",
    "hourly to salary",
  ],
};

const businessTools = [
  {
    title: "Freelance Income Calculator",
    slug: "freelance-income-calculator",
    desc: "Calculate taxes, quarterly payments, and after-tax income for self-employed.",
  },
  {
    title: "Business Expense Deduction Calculator",
    slug: "business-expense-deduction-calculator",
    desc: "Calculate home office, vehicle, and business expense deductions.",
  },
  {
    title: "Hourly to Salary Converter",
    slug: "hourly-to-salary-converter",
    desc: "Convert hourly wage to annual salary and calculate total compensation.",
  },
  {
    title: "Income Tax Calculator",
    slug: "income-tax-calculator",
    desc: "Estimate taxes with simple assumptions.",
  },
];

export default function BusinessFinancePage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Business Finance Tools</span>
            </h1>
            <p className="text-text-secondary-light max-w-3xl mx-auto text-lg">
              Free calculators for freelancers, self-employed individuals, and business owners. Calculate taxes, deductions, and plan your business finances.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {businessTools.map((tool) => (
              <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About Business Finance</h2>
            <div className="text-text-secondary-light text-base leading-relaxed space-y-4">
              <p>
                Managing business finances as a freelancer or self-employed individual comes with unique challenges. You're
                responsible for your own taxes, tracking business expenses, and understanding deductions that can save you
                thousands of dollars.
              </p>
              <p>
                Our business finance tools help you calculate taxes, estimate quarterly payments, maximize deductions, and
                understand the true cost of being self-employed.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Key Business Finance Topics</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Self-Employment Tax:</strong> 15.3% total (Social Security + Medicare) - you pay both employee and employer portions.</li>
                <li><strong>Quarterly Taxes:</strong> Pay estimated taxes quarterly if you expect to owe $1,000+ for the year.</li>
                <li><strong>Business Deductions:</strong> Home office, vehicle expenses, equipment, software, travel, and more.</li>
                <li><strong>Record Keeping:</strong> Track all business expenses throughout the year for tax time.</li>
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

