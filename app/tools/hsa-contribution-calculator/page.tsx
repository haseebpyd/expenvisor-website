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

export default function HSAContributionCalculatorPage() {
  const [annualContribution, setAnnualContribution] = useState(3850);
  const [currentBalance, setCurrentBalance] = useState(5000);
  const [years, setYears] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [taxBracket, setTaxBracket] = useState(22);

  const calc = useMemo(() => {
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    
    let futureValue = currentBalance;
    for (let m = 0; m < months; m++) {
      futureValue = futureValue * (1 + monthlyRate) + (annualContribution / 12);
    }
    
    const totalContributions = currentBalance + (annualContribution * years);
    const totalInterest = futureValue - totalContributions;
    const annualTaxSavings = annualContribution * (taxBracket / 100);
    const totalTaxSavings = annualTaxSavings * years;
    
    return {
      futureValue,
      totalContributions,
      totalInterest,
      annualTaxSavings,
      totalTaxSavings,
    };
  }, [annualContribution, currentBalance, years, annualReturn, taxBracket]);

  const faqItems = [
    {
      question: "What is an HSA (Health Savings Account)?",
      answer:
        "HSA is a tax-advantaged savings account for medical expenses. Contributions are pre-tax (reduce taxable income), investments grow tax-free, and withdrawals for qualified medical expenses are tax-free. It's the only triple tax-advantaged account.",
    },
    {
      question: "Who can contribute to an HSA?",
      answer:
        "You must have a High Deductible Health Plan (HDHP) to contribute to an HSA. HDHP requirements: 2024 minimum deductible $1,600 (individual) or $3,200 (family), maximum out-of-pocket $8,050 (individual) or $16,100 (family).",
    },
    {
      question: "What are HSA contribution limits?",
      answer:
        "2024 limits: $4,150 for individual coverage, $8,300 for family coverage. If 55+, you can contribute an additional $1,000 catch-up. These limits increase annually with inflation. Contributions can be made by you or your employer.",
    },
    {
      question: "What are the tax benefits of HSA?",
      answer:
        "HSA offers triple tax advantage: (1) Contributions are pre-tax (reduce current taxable income), (2) Investments grow tax-free, (3) Withdrawals for qualified medical expenses are tax-free. No other account offers all three benefits.",
    },
    {
      question: "Can I invest HSA funds?",
      answer:
        "Yes! Many HSA providers allow you to invest HSA funds in stocks, bonds, mutual funds, etc. This allows your HSA to grow like a retirement account. Investments grow tax-free and can be withdrawn tax-free for medical expenses.",
    },
    {
      question: "What happens to HSA funds if I don't use them?",
      answer:
        "HSA funds never expire and roll over year to year. Unlike Flexible Spending Accounts (FSAs), you keep all HSA money forever. You can use it for medical expenses at any time, even in retirement. It's like a retirement account for healthcare.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Current HSA Balance",
      description:
        "Input how much you currently have in your HSA. This is your starting point for future growth calculations.",
    },
    {
      number: 2,
      title: "Set Annual Contribution",
      description:
        "Enter your planned annual HSA contribution. 2024 limits: $4,150 (individual) or $8,300 (family). Include catch-up contributions if 55+.",
    },
    {
      number: 3,
      title: "Set Time Horizon",
      description:
        "Enter how many years you plan to contribute. This could be until retirement, a specific goal, or long-term healthcare planning.",
    },
    {
      number: 4,
      title: "Set Expected Return",
      description:
        "Enter expected annual return if investing HSA funds (typically 7% for long-term stock market average). If not investing, use 0% or current HSA interest rate.",
    },
    {
      number: 5,
      title: "Set Tax Bracket",
      description:
        "Enter your tax bracket to calculate tax savings. HSA contributions reduce your taxable income, saving taxes at your marginal rate.",
    },
    {
      number: 6,
      title: "Review HSA Projection",
      description:
        "See your projected HSA balance, total contributions, interest earned, and tax savings. Use this to plan your HSA contribution strategy.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "HSA Contribution Calculator", url: "/tools/hsa-contribution-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "HSA Contribution Calculator",
    "Free calculator to calculate Health Savings Account contributions, tax savings, and optimize HSA contributions for maximum benefits.",
    "/tools/hsa-contribution-calculator",
    "Health Savings Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the HSA Contribution Calculator",
    "Step-by-step guide to planning your HSA contributions and maximizing benefits."
  );

  const relatedTools = [
    { name: "401(k) Contribution Calculator", slug: "401k-contribution-calculator" },
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
    { name: "Compound Interest Calculator", slug: "compound-interest" },
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
              <h1 className="text-4xl font-bold text-white mb-3">HSA Contribution Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate HSA contributions, tax savings, and optimize for maximum benefits. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Current HSA Balance"
                  value={currentBalance}
                  onChange={setCurrentBalance}
                  min={0}
                  step={500}
                  suffix="$"
                />
                <NumberInput
                  label="Annual Contribution"
                  value={annualContribution}
                  onChange={setAnnualContribution}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <NumberInput
                  label="Years"
                  value={years}
                  onChange={setYears}
                  min={1}
                  max={50}
                  step={1}
                />
                <NumberInput
                  label="Expected Annual Return"
                  value={annualReturn}
                  onChange={setAnnualReturn}
                  min={0}
                  step={0.5}
                  suffix="%"
                />
                <NumberInput
                  label="Tax Bracket"
                  value={taxBracket}
                  onChange={setTaxBracket}
                  min={0}
                  max={50}
                  step={1}
                  suffix="%"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="HSA Projection">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Future HSA Balance</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.futureValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Contributions</span>
                      <span className="text-white">{toCurrency(calc.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Interest/Growth Earned</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between mb-2">
                        <span className="text-text-secondary-light">Annual Tax Savings</span>
                        <span className="text-accent font-semibold">{toCurrency(calc.annualTaxSavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Total Tax Savings</span>
                        <span className="text-accent font-semibold">{toCurrency(calc.totalTaxSavings)}</span>
                      </div>
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Health Savings Accounts (HSAs) are one of the most powerful tax-advantaged accounts available. They
                  offer triple tax benefits: pre-tax contributions, tax-free growth, and tax-free withdrawals for
                  qualified medical expenses. No other account offers all three benefits.
                </p>
                <p>
                  This free HSA contribution calculator helps you project your HSA balance, calculate tax savings, and
                  optimize your contribution strategy. It shows you how HSA contributions reduce your taxes and how
                  investments can grow your HSA over time.
                </p>
                <p>
                  Use this tool to plan your HSA contributions, understand tax benefits, and maximize this powerful
                  savings tool for both current and future healthcare expenses.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the HSA Contribution Calculator"
                description="Follow these steps to plan your HSA contributions:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding HSA Benefits">
                <p>
                  <strong>Triple Tax Advantage:</strong> HSA is the only account offering all three tax benefits: (1)
                  Pre-tax contributions reduce current taxable income, (2) Investments grow tax-free, (3) Withdrawals
                  for qualified medical expenses are tax-free. This makes HSA extremely powerful for healthcare savings.
                </p>
                <p>
                  <strong>Contribution Limits:</strong> 2024 limits: $4,150 (individual) or $8,300 (family). If 55+,
                  add $1,000 catch-up. These limits increase annually. You can contribute until the tax filing deadline
                  (typically April 15) for the previous year.
                </p>
                <p>
                  <strong>Qualified Medical Expenses:</strong> HSA funds can be used tax-free for qualified medical
                  expenses: doctor visits, prescriptions, dental, vision, mental health, medical equipment, and more.
                  Keep receipts for all medical expenses—you can reimburse yourself from HSA at any time.
                </p>
                <p>
                  <strong>Investment Growth:</strong> Many HSA providers allow investing funds in stocks, bonds, mutual
                  funds. This allows HSA to grow like a retirement account. Investments grow tax-free and can be
                  withdrawn tax-free for medical expenses.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for HSA Contributions">
                <h3 className="font-semibold text-white mb-2">1. Maximize Contributions</h3>
                <p>
                  Contribute the maximum allowed each year ($4,150 individual or $8,300 family in 2024). HSA offers
                  triple tax benefits—maximizing contributions maximizes tax savings and healthcare savings.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Invest HSA Funds</h3>
                <p>
                  Don't let HSA funds sit in cash earning minimal interest. Invest in stocks, bonds, or mutual funds to
                  grow your HSA over time. Many HSA providers offer investment options. Treat HSA like a retirement
                  account for healthcare.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Pay Medical Expenses Out of Pocket</h3>
                <p>
                  If possible, pay medical expenses out of pocket and let HSA funds grow. Keep receipts—you can
                  reimburse yourself from HSA at any time, even years later. This maximizes tax-free growth.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Use HSA for Retirement Healthcare</h3>
                <p>
                  HSA can be used for healthcare expenses in retirement, including Medicare premiums. After age 65, HSA
                  can be used for non-medical expenses (subject to income tax, no penalty). This makes HSA a powerful
                  retirement healthcare savings tool.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Keep Detailed Records</h3>
                <p>
                  Keep receipts for all medical expenses. You can reimburse yourself from HSA at any time, even years
                  later. Detailed records ensure you can maximize HSA benefits and prove qualified expenses if audited.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Don't Lose HSA Funds</h3>
                <p>
                  Unlike FSAs, HSA funds never expire and roll over year to year. You keep all HSA money forever, even
                  if you change jobs or health plans (as long as you maintain HDHP eligibility). HSA is yours to keep.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="HSA Contribution Calculator - Free 2025 | Expenvisor"
                  url="/tools/hsa-contribution-calculator"
                  description="Calculate HSA contributions, tax savings, and optimize for maximum benefits."
                />
              </div>

              <div className="mt-8 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Related Financial Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 bg-surface-dark rounded-xl hover:bg-surface-dark/80 transition-colors border border-accent/20 hover:border-accent/40"
                    >
                      <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                      <p className="text-sm text-text-secondary-light">Calculate related financial metrics</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Healthcare Expenses with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Planning your HSA? Track all your expenses, including medical expenses, with Expenvisor's
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

