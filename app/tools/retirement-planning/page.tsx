import type { Metadata } from "next";
import ToolLayout from "../ToolLayout";
import ToolCard from "../ToolCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retirement Planning Tools - Free Calculators | Expenvisor",
  description:
    "Free retirement planning calculators: 401(k), IRA, retirement savings, investment returns, and more. Plan your retirement and see if you're on track.",
  keywords: [
    "retirement planning tools",
    "401k calculator",
    "retirement calculator",
    "IRA calculator",
    "retirement savings",
    "investment calculator",
    "retirement planning",
  ],
};

const retirementTools = [
  {
    title: "Retirement Savings Calculator",
    slug: "retirement-savings-calculator",
    desc: "Project 401(k), IRA, and Roth IRA growth and plan retirement age.",
  },
  {
    title: "401(k) Contribution Calculator",
    slug: "401k-contribution-calculator",
    desc: "Calculate retirement savings, employer match, and tax savings.",
  },
  {
    title: "Investment Return Calculator",
    slug: "investment-return-calculator",
    desc: "Calculate ROI, annualized returns, and investment performance.",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest",
    desc: "Growth with contributions and compounding.",
  },
];

export default function RetirementPlanningPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Retirement Planning Tools</span>
            </h1>
            <p className="text-text-secondary-dark max-w-3xl mx-auto text-lg">
              Free calculators to plan your retirement, project savings growth, and ensure you're on track for financial security. No sign-up required.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {retirementTools.map((tool) => (
              <ToolCard key={tool.slug} title={tool.title} slug={tool.slug} desc={tool.desc} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-surface-elevated-dark rounded-2xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About Retirement Planning</h2>
            <div className="text-text-secondary-dark text-base leading-relaxed space-y-4">
              <p>
                Planning for retirement is one of the most important financial goals you'll ever set. With pensions becoming
                rare and Social Security uncertain, your retirement security depends largely on how much you save and invest
                during your working years.
              </p>
              <p>
                Our retirement planning tools help you project your savings growth, understand employer match benefits,
                calculate investment returns, and see if you're on track for your retirement goals.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Retirement Savings Benchmarks</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Age 30:</strong> 1x annual salary saved</li>
                <li><strong>Age 40:</strong> 3x annual salary saved</li>
                <li><strong>Age 50:</strong> 6x annual salary saved</li>
                <li><strong>Age 60:</strong> 8x annual salary saved</li>
                <li><strong>Retirement:</strong> 10-12x annual salary saved</li>
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

