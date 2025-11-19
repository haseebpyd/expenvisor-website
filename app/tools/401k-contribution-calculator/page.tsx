"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";
import FAQ, { generateFAQSchema } from "@/components/tools/FAQ";
import { ContentSection, HowToSection, generateHowToSchema } from "@/components/tools/ContentSection";
import SchemaMarkup, { generateBreadcrumbSchema, generateCalculatorSchema } from "@/components/tools/SchemaMarkup";
import ShareButton from "@/components/tools/ShareButton";
import ExitIntentCTA from "@/components/tools/ExitIntentCTA";
import Link from "next/link";

function toCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function FourZeroOneKContributionCalculatorPage() {
  const [annualSalary, setAnnualSalary] = useState(60000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [current401k, setCurrent401k] = useState(10000);
  const [contributionPercent, setContributionPercent] = useState(6);
  const [employerMatch, setEmployerMatch] = useState(50);
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6);
  const [annualReturn, setAnnualReturn] = useState(7);

  const calc = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const annualContribution = (annualSalary * contributionPercent) / 100;
    const employerMatchAmount = Math.min(
      (annualSalary * employerMatchLimit) / 100,
      annualContribution
    ) * (employerMatch / 100);
    const totalAnnualContribution = annualContribution + employerMatchAmount;
    const monthlyRate = annualReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    
    let futureValue = current401k;
    for (let m = 0; m < months; m++) {
      futureValue = futureValue * (1 + monthlyRate) + (totalAnnualContribution / 12);
    }
    
    const totalContributions = current401k + (totalAnnualContribution * yearsToRetirement);
    const totalInterest = futureValue - totalContributions;
    const taxSavings = annualContribution * 0.22; // Approximate 22% tax bracket
    
    return {
      annualContribution,
      employerMatchAmount,
      totalAnnualContribution,
      futureValue,
      totalContributions,
      totalInterest,
      taxSavings,
      yearsToRetirement,
    };
  }, [annualSalary, currentAge, retirementAge, current401k, contributionPercent, employerMatch, employerMatchLimit, annualReturn]);

  const faqItems = [
    {
      question: "How much should I contribute to my 401(k)?",
      answer:
        "Contribute at least enough to get your full employer match (free money). Then aim for 10-15% of salary total (including employer match). Maximum contribution limits are $23,000 for 2024 ($30,500 if 50+).",
    },
    {
      question: "What is employer match?",
      answer:
        "Many employers match a percentage of your 401(k) contributions up to a certain limit (e.g., 50% match up to 6% of salary). This is free money—always contribute enough to get the full match. Never leave employer match on the table.",
    },
    {
      question: "What are 401(k) contribution limits?",
      answer:
        "2024 limits: $23,000 for employee contributions ($30,500 if 50+ with catch-up). Total contributions (employee + employer) can't exceed $69,000 ($76,500 if 50+). These limits increase annually with inflation.",
    },
    {
      question: "Should I contribute to 401(k) or IRA?",
      answer:
        "Contribute enough to 401(k) to get full employer match first (free money), then max out IRA for better investment options and lower fees, then return to 401(k) to maximize contributions. Both offer tax advantages.",
    },
    {
      question: "What's the difference between traditional and Roth 401(k)?",
      answer:
        "Traditional 401(k): Contributions are pre-tax (reduce current taxes), withdrawals taxed in retirement. Roth 401(k): Contributions are after-tax (no current tax break), withdrawals tax-free in retirement. Choose based on current vs. expected future tax rates.",
    },
    {
      question: "When can I withdraw from my 401(k)?",
      answer:
        "Generally, withdrawals before age 59½ face 10% penalty plus income taxes, except for specific exceptions (hardship, disability, etc.). After 59½, withdrawals are penalty-free but still subject to income taxes (unless Roth).",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Your Information",
      description:
        "Input your annual salary, current age, and retirement age. This determines how long you have to save and grow your 401(k).",
    },
    {
      number: 2,
      title: "Enter Current 401(k) Balance",
      description:
        "Input how much you've already saved in your 401(k). This is your starting point for future growth calculations.",
    },
    {
      number: 3,
      title: "Set Contribution Rate",
      description:
        "Enter your contribution percentage of salary. Aim for at least enough to get full employer match, then 10-15% total including match.",
    },
    {
      number: 4,
      title: "Enter Employer Match Details",
      description:
        "Enter your employer's match percentage and match limit. For example, if employer matches 50% up to 6% of salary, enter 50% and 6%.",
    },
    {
      number: 5,
      title: "Set Expected Return",
      description:
        "Enter expected annual return (typically 7% for long-term stock market average). This affects growth projections.",
    },
    {
      number: 6,
      title: "Review 401(k) Projection",
      description:
        "See your projected 401(k) balance at retirement, total contributions, interest earned, and tax savings. Use this to plan your retirement savings strategy.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "401(k) Contribution Calculator", url: "/tools/401k-contribution-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "401(k) Contribution Calculator",
    "Free calculator to calculate retirement savings, employer match, tax savings, and optimize your 401(k) contributions.",
    "/tools/401k-contribution-calculator",
    "Retirement Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the 401(k) Contribution Calculator",
    "Step-by-step guide to planning your 401(k) contributions and retirement savings."
  );

  const relatedTools = [
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
    { name: "Compound Interest Calculator", slug: "compound-interest" },
    { name: "Investment Return Calculator", slug: "investment-return-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">401(k) Contribution Calculator</h1>
              <p className="text-text-secondary-dark">
                Calculate retirement savings, employer match, and tax savings. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Annual Salary"
                  value={annualSalary}
                  onChange={setAnnualSalary}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Current Age"
                  value={currentAge}
                  onChange={setCurrentAge}
                  min={18}
                  max={100}
                  step={1}
                />
                <NumberInput
                  label="Retirement Age"
                  value={retirementAge}
                  onChange={setRetirementAge}
                  min={currentAge}
                  max={100}
                  step={1}
                />
                <NumberInput
                  label="Current 401(k) Balance"
                  value={current401k}
                  onChange={setCurrent401k}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Your Contribution %"
                  value={contributionPercent}
                  onChange={setContributionPercent}
                  min={0}
                  max={100}
                  step={0.5}
                  suffix="%"
                />
                <NumberInput
                  label="Employer Match %"
                  value={employerMatch}
                  onChange={setEmployerMatch}
                  min={0}
                  max={100}
                  step={10}
                  suffix="%"
                />
                <NumberInput
                  label="Employer Match Limit %"
                  value={employerMatchLimit}
                  onChange={setEmployerMatchLimit}
                  min={0}
                  max={20}
                  step={0.5}
                  suffix="%"
                />
                <NumberInput
                  label="Expected Annual Return"
                  value={annualReturn}
                  onChange={setAnnualReturn}
                  min={0}
                  step={0.5}
                  suffix="%"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="401(k) Projection">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-dark">Retirement Balance</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.futureValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Your Annual Contribution</span>
                      <span className="text-white">{toCurrency(calc.annualContribution)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Employer Match (Annual)</span>
                      <span className="text-accent font-semibold">{toCurrency(calc.employerMatchAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Annual Contribution</span>
                      <span className="text-white">{toCurrency(calc.totalAnnualContribution)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-dark">Total Interest Earned</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between">
                        <span className="text-text-secondary-dark">Annual Tax Savings (22% bracket)</span>
                        <span className="text-accent font-semibold">{toCurrency(calc.taxSavings)}</span>
                      </div>
                    </div>
                  </div>
                </ResultCard>
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <FAQ items={faqItems} />
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Your 401(k) is one of the most powerful retirement savings tools available. With employer matching,
                  tax advantages, and compound growth, maximizing your 401(k) contributions can significantly impact your
                  retirement security.
                </p>
                <p>
                  This free 401(k) contribution calculator helps you project your retirement savings, understand
                  employer match benefits, calculate tax savings, and optimize your contribution strategy. It shows you
                  how different contribution rates affect your retirement balance.
                </p>
                <p>
                  Use this tool to plan your 401(k) contributions, see the value of employer matching, and ensure
                  you're on track for retirement.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the 401(k) Contribution Calculator"
                description="Follow these steps to plan your 401(k) contributions:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding 401(k) Contributions">
                <p>
                  <strong>Employer Match:</strong> Many employers match a percentage of your contributions (e.g., 50%
                  match up to 6% of salary). This is free money and an instant 50-100% return. Always contribute enough
                  to get the full match—never leave this on the table.
                </p>
                <p>
                  <strong>Tax Advantages:</strong> Traditional 401(k) contributions are pre-tax, reducing your current
                  taxable income. In the 22% tax bracket, every $1,000 contributed saves $220 in taxes. Plus, investments
                  grow tax-deferred until withdrawal.
                </p>
                <p>
                  <strong>Contribution Limits:</strong> 2024 limits: $23,000 employee contributions ($30,500 if 50+).
                  Total contributions (employee + employer) can't exceed $69,000 ($76,500 if 50+). These limits increase
                  annually.
                </p>
                <p>
                  <strong>Compound Growth:</strong> 401(k) investments grow tax-deferred, allowing compound interest to
                  work over decades. Starting early and contributing consistently maximizes growth potential.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for 401(k) Contributions">
                <h3 className="font-semibold text-white mb-2">1. Maximize Employer Match</h3>
                <p>
                  Always contribute enough to get your full employer match. This is free money and an instant return.
                  Not getting the full match is like leaving part of your salary on the table.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Increase Contributions Over Time</h3>
                <p>
                  As your income grows, increase your 401(k) contributions. Aim for 10-15% of salary total (including
                  employer match). Even small increases compound significantly over decades.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Start Early</h3>
                <p>
                  Time is your greatest ally. Starting to contribute in your 20s vs. 30s can mean hundreds of thousands
                  more in retirement due to compound interest. Don't wait—start contributing now.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Diversify Investments</h3>
                <p>
                  Don't put all 401(k) money in one type of investment. Diversify across stocks, bonds, and other
                  assets based on your age and risk tolerance. Younger investors can take more risk.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Don't Cash Out Early</h3>
                <p>
                  Avoid withdrawing from 401(k) before retirement. Early withdrawals face 10% penalty plus income taxes,
                  and you lose decades of compound growth. Treat 401(k) as untouchable until retirement.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Consider Roth 401(k) Option</h3>
                <p>
                  If available, consider Roth 401(k) for tax-free withdrawals in retirement. Choose based on current vs.
                  expected future tax rates. Many employers offer both traditional and Roth options.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="401(k) Contribution Calculator - Free 2025 | Expenvisor"
                  url="/tools/401k-contribution-calculator"
                  description="Calculate retirement savings, employer match, and tax savings for your 401(k)."
                />
              </div>

              <div className="mt-8 bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Related Financial Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors border border-accent/20 hover:border-accent/40"
                    >
                      <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                      <p className="text-sm text-text-secondary-dark">Calculate related financial metrics</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Retirement Savings with Expenvisor</h3>
                <p className="text-text-secondary-dark mb-4">
                  Planning your 401(k)? Track all your expenses, savings, and financial progress with Expenvisor's
                  AI-powered expense tracker.
                </p>
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Download Expenvisor →
                </a>
              </div>
            </div>
          </div>
        </section>
      </ToolLayout>
    </>
  );
}

