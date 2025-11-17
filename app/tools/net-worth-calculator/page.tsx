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

export default function NetWorthCalculatorPage() {
  const [cash, setCash] = useState(10000);
  const [investments, setInvestments] = useState(50000);
  const [realEstate, setRealEstate] = useState(300000);
  const [vehicles, setVehicles] = useState(25000);
  const [otherAssets, setOtherAssets] = useState(10000);
  const [mortgage, setMortgage] = useState(200000);
  const [creditCards, setCreditCards] = useState(5000);
  const [loans, setLoans] = useState(15000);
  const [otherLiabilities, setOtherLiabilities] = useState(0);

  const calc = useMemo(() => {
    const totalAssets = cash + investments + realEstate + vehicles + otherAssets;
    const totalLiabilities = mortgage + creditCards + loans + otherLiabilities;
    const netWorth = totalAssets - totalLiabilities;
    const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
    
    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      debtToAssetRatio,
    };
  }, [cash, investments, realEstate, vehicles, otherAssets, mortgage, creditCards, loans, otherLiabilities]);

  const faqItems = [
    {
      question: "What is net worth?",
      answer:
        "Net worth is your total assets minus total liabilities. It's a snapshot of your financial health showing what you own (assets) minus what you owe (liabilities). Positive net worth means you have more assets than debts.",
    },
    {
      question: "What should be included in assets?",
      answer:
        "Include all valuable items you own: cash, checking/savings accounts, investments (stocks, bonds, retirement accounts), real estate (home value, not mortgage), vehicles, valuable personal property, and other assets with monetary value.",
    },
    {
      question: "What should be included in liabilities?",
      answer:
        "Include all debts and obligations: mortgage balance, credit card debt, car loans, student loans, personal loans, and any other money you owe. Use current balances, not original loan amounts.",
    },
    {
      question: "What's a good net worth by age?",
      answer:
        "General benchmarks: Age 30 (1x annual income), Age 40 (3x), Age 50 (6x), Age 60 (8x), Retirement (10-12x). These are guidelines—your target depends on income, goals, and lifestyle. Focus on positive net worth and growth over time.",
    },
    {
      question: "How often should I calculate net worth?",
      answer:
        "Calculate net worth quarterly or monthly to track progress. Regular tracking helps you see trends, celebrate growth, and identify areas needing attention. Use it as a financial health checkup.",
    },
    {
      question: "What if my net worth is negative?",
      answer:
        "Negative net worth means you owe more than you own. This is common for young people with student loans or recent homebuyers. Focus on paying down high-interest debt and building assets. Net worth should improve over time.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Calculate Total Assets",
      description:
        "Add up all your assets: cash, investments, retirement accounts, real estate value, vehicles, and other valuable assets. Use current market values, not purchase prices.",
    },
    {
      number: 2,
      title: "Calculate Total Liabilities",
      description:
        "Add up all your debts: mortgage balance, credit card debt, car loans, student loans, personal loans, and any other money you owe. Use current balances.",
    },
    {
      number: 3,
      title: "Calculate Net Worth",
      description:
        "Subtract total liabilities from total assets. Positive number means you have more assets than debts. Negative means you owe more than you own.",
    },
    {
      number: 4,
      title: "Review Financial Health",
      description:
        "Assess your debt-to-asset ratio and compare your net worth to age-based benchmarks. Use this to identify areas for improvement and track progress over time.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Net Worth Calculator", url: "/tools/net-worth-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Net Worth Calculator",
    "Free calculator to calculate assets vs. liabilities, track net worth over time, and assess your financial health score.",
    "/tools/net-worth-calculator",
    "Financial Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Net Worth Calculator",
    "Step-by-step guide to calculating your net worth and assessing financial health."
  );

  const relatedTools = [
    { name: "Investment Return Calculator", slug: "investment-return-calculator" },
    { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Net Worth Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate your net worth and assess your financial health. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Assets</h3>
                <NumberInput
                  label="Cash & Savings"
                  value={cash}
                  onChange={setCash}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Investments"
                  value={investments}
                  onChange={setInvestments}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Real Estate Value"
                  value={realEstate}
                  onChange={setRealEstate}
                  min={0}
                  step={10000}
                  suffix="$"
                />
                <NumberInput
                  label="Vehicles"
                  value={vehicles}
                  onChange={setVehicles}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Other Assets"
                  value={otherAssets}
                  onChange={setOtherAssets}
                  min={0}
                  step={1000}
                  suffix="$"
                />

                <h3 className="text-lg font-semibold text-white mt-6">Liabilities</h3>
                <NumberInput
                  label="Mortgage Balance"
                  value={mortgage}
                  onChange={setMortgage}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Credit Card Debt"
                  value={creditCards}
                  onChange={setCreditCards}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <NumberInput
                  label="Loans"
                  value={loans}
                  onChange={setLoans}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Other Liabilities"
                  value={otherLiabilities}
                  onChange={setOtherLiabilities}
                  min={0}
                  step={1000}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Net Worth Summary">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Total Assets</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc.totalAssets)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Total Liabilities</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc.totalLiabilities)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text-secondary-light">Net Worth</span>
                        <span className={`text-3xl font-bold ${calc.netWorth >= 0 ? "text-accent" : "text-red-400"}`}>
                          {toCurrency(calc.netWorth)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Debt-to-Asset Ratio</span>
                        <span className="text-white">{calc.debtToAssetRatio.toFixed(1)}%</span>
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
                  Your net worth is one of the most important indicators of financial health. It's a simple but powerful
                  metric that shows the difference between what you own (assets) and what you owe (liabilities). A
                  positive and growing net worth indicates financial progress and security.
                </p>
                <p>
                  This free net worth calculator helps you calculate your current net worth, understand your financial
                  position, and track progress over time. It breaks down assets and liabilities, showing you exactly
                  where you stand financially.
                </p>
                <p>
                  Whether you're just starting your financial journey or want to assess your progress, knowing your net
                  worth is essential for making informed financial decisions and setting realistic goals.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Net Worth Calculator"
                description="Follow these steps to calculate your net worth:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Net Worth">
                <p>
                  <strong>Assets:</strong> Everything you own with monetary value: cash, investments, retirement
                  accounts, real estate (at current market value), vehicles, and other valuable property. Use current
                  market values, not purchase prices.
                </p>
                <p>
                  <strong>Liabilities:</strong> Everything you owe: mortgage balance, credit card debt, car loans,
                  student loans, personal loans, and any other debts. Use current balances, not original loan amounts.
                </p>
                <p>
                  <strong>Net Worth Formula:</strong> Net Worth = Total Assets - Total Liabilities. A positive net
                  worth means you have more assets than debts. Negative net worth means you owe more than you own.
                </p>
                <p>
                  <strong>Debt-to-Asset Ratio:</strong> Shows what percentage of your assets are financed by debt. Lower
                  is better. Aim for under 50% for good financial health, under 30% for excellent.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Building Net Worth">
                <h3 className="font-semibold text-white mb-2">1. Track Net Worth Regularly</h3>
                <p>
                  Calculate net worth monthly or quarterly to track progress. Seeing growth motivates continued good
                  financial habits. Use this calculator regularly to monitor your financial health.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Focus on Both Sides</h3>
                <p>
                  Build net worth by both increasing assets (saving, investing) and decreasing liabilities (paying off
                  debt). Paying off high-interest debt often provides better returns than investing.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Use Current Market Values</h3>
                <p>
                  For accurate net worth, use current market values for assets (especially real estate and investments),
                  not purchase prices. Assets can appreciate or depreciate over time.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Don't Include Personal Property</h3>
                <p>
                  Generally, don't include everyday personal property (furniture, clothing, electronics) unless it has
                  significant resale value. Focus on assets that can be easily converted to cash or generate income.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Be Honest with Yourself</h3>
                <p>
                  Accurate net worth calculation requires honesty. Don't inflate asset values or underestimate debts.
                  Accurate numbers help you make better financial decisions.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Focus on Growth Over Time</h3>
                <p>
                  Net worth can fluctuate, especially with market changes. Focus on long-term trends rather than
                  short-term fluctuations. Consistent growth over years indicates good financial health.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Net Worth Calculator - Free 2025 | Expenvisor"
                  url="/tools/net-worth-calculator"
                  description="Calculate your net worth and assess your financial health."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Net Worth with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Calculating net worth? Track all your expenses, income, and financial progress with Expenvisor's
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

