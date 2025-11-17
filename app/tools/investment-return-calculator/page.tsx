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

export default function InvestmentReturnCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [years, setYears] = useState(5);
  const [additionalContributions, setAdditionalContributions] = useState(0);

  const calc = useMemo(() => {
    const totalContributions = initialInvestment + additionalContributions * years;
    const gain = finalValue - totalContributions;
    const roi = totalContributions > 0 ? (gain / totalContributions) * 100 : 0;
    const annualizedReturn = years > 0 ? (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100 : 0;
    
    return {
      totalContributions,
      gain,
      roi,
      annualizedReturn,
    };
  }, [initialInvestment, finalValue, years, additionalContributions]);

  const faqItems = [
    {
      question: "What is ROI (Return on Investment)?",
      answer:
        "ROI measures the profitability of an investment as a percentage. It's calculated as (Gain / Cost) × 100. A positive ROI means profit, negative means loss. Higher ROI indicates better investment performance.",
    },
    {
      question: "What's the difference between ROI and annualized return?",
      answer:
        "ROI shows total return over the entire investment period. Annualized return shows the average yearly return rate, making it easier to compare investments of different time periods. Annualized return accounts for compounding.",
    },
    {
      question: "What's a good investment return?",
      answer:
        "Historical stock market returns average 7-10% annually over long periods. Bonds average 4-6%. Real estate varies. Aim for returns that beat inflation (typically 2-3%) to preserve purchasing power. Higher returns usually come with higher risk.",
    },
    {
      question: "How do I calculate investment returns?",
      answer:
        "ROI = ((Final Value - Total Cost) / Total Cost) × 100. Annualized Return = ((Final Value / Initial Value)^(1/Years) - 1) × 100. This calculator does both calculations automatically.",
    },
    {
      question: "Should I include dividends in returns?",
      answer:
        "Yes, for accurate returns, include all gains: price appreciation, dividends, interest, and distributions. Total return includes everything you earned from the investment.",
    },
    {
      question: "How does time affect investment returns?",
      answer:
        "Time is crucial for investment returns due to compound interest. Longer time horizons allow for more compounding and can turn modest returns into substantial wealth. Starting early dramatically increases final value.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Initial Investment",
      description:
        "Input the amount you initially invested. This is your starting principal or purchase price.",
    },
    {
      number: 2,
      title: "Enter Final Value",
      description:
        "Enter the current or final value of your investment. Include all gains: price appreciation, dividends, interest earned.",
    },
    {
      number: 3,
      title: "Enter Investment Period",
      description:
        "Specify how many years you held the investment. This is used to calculate annualized return for comparison purposes.",
    },
    {
      number: 4,
      title: "Enter Additional Contributions (Optional)",
      description:
        "If you made additional contributions during the investment period, enter the annual amount. This adjusts the ROI calculation.",
    },
    {
      number: 5,
      title: "Review Your Returns",
      description:
        "See your total ROI, annualized return, total gain, and total contributions. Compare these metrics to evaluate investment performance.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Investment Return Calculator", url: "/tools/investment-return-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Investment Return Calculator",
    "Free calculator to calculate ROI, stock market returns, and portfolio growth projections.",
    "/tools/investment-return-calculator",
    "Investment Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Investment Return Calculator",
    "Step-by-step guide to calculating investment returns and ROI."
  );

  const relatedTools = [
    { name: "Compound Interest Calculator", slug: "compound-interest" },
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
    { name: "Net Worth Calculator", slug: "net-worth-calculator" },
    { name: "Savings Goal Planner", slug: "savings-goal-planner" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Investment Return Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate ROI, annualized returns, and investment performance. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Initial Investment"
                  value={initialInvestment}
                  onChange={setInitialInvestment}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Final/Current Value"
                  value={finalValue}
                  onChange={setFinalValue}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Investment Period (years)"
                  value={years}
                  onChange={setYears}
                  min={0.1}
                  step={0.5}
                />
                <NumberInput
                  label="Annual Additional Contributions"
                  value={additionalContributions}
                  onChange={setAdditionalContributions}
                  min={0}
                  step={500}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Investment Returns">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Total ROI</span>
                      <span className="text-2xl font-bold text-white">{calc.roi.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Annualized Return</span>
                      <span className="text-white">{calc.annualizedReturn.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Gain</span>
                      <span className={`font-semibold ${calc.gain >= 0 ? "text-accent" : "text-red-400"}`}>
                        {toCurrency(calc.gain)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Contributions</span>
                      <span className="text-white">{toCurrency(calc.totalContributions)}</span>
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Understanding your investment returns is essential for evaluating performance, comparing investment
                  options, and making informed financial decisions. Whether you're investing in stocks, bonds, real
                  estate, or other assets, knowing your ROI and annualized return helps you assess if your investments
                  are meeting your goals.
                </p>
                <p>
                  This free investment return calculator helps you calculate ROI (Return on Investment) and annualized
                  returns from your investment data. It shows you total gains, return percentages, and helps you compare
                  different investments on an equal basis.
                </p>
                <p>
                  Use this tool to evaluate past investments, compare different investment options, and understand how
                  your portfolio is performing relative to your goals and benchmarks.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Investment Return Calculator"
                description="Follow these steps to calculate your investment returns:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Investment Returns">
                <p>
                  <strong>ROI (Return on Investment):</strong> Measures total return as a percentage of your investment
                  cost. Formula: ((Final Value - Total Cost) / Total Cost) × 100. A 50% ROI means you earned 50% on
                  your investment.
                </p>
                <p>
                  <strong>Annualized Return:</strong> Shows the average yearly return rate, making it easier to compare
                  investments of different time periods. Formula: ((Final Value / Initial Value)^(1/Years) - 1) × 100.
                  This accounts for compounding.
                </p>
                <p>
                  <strong>Example:</strong> $10,000 investment that grows to $15,000 over 5 years has a 50% ROI and
                  approximately 8.45% annualized return. The annualized return is more useful for comparison because it
                  standardizes returns to a yearly basis.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Investment Returns">
                <h3 className="font-semibold text-white mb-2">1. Compare to Benchmarks</h3>
                <p>
                  Compare your returns to relevant benchmarks (S&P 500 for stocks, bond indices for bonds). This helps
                  you assess if your investments are performing well relative to the market.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Consider Risk-Adjusted Returns</h3>
                <p>
                  Higher returns often come with higher risk. A 15% return with high volatility may be worse than a 10%
                  return with stability. Consider risk when evaluating returns.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Use Annualized Returns for Comparison</h3>
                <p>
                  When comparing investments of different time periods, use annualized returns rather than total ROI.
                  This gives you an apples-to-apples comparison.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Include All Costs</h3>
                <p>
                  For accurate returns, include all costs: fees, commissions, taxes, and expenses. These reduce your
                  actual returns and should be factored into calculations.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Focus on Long-Term Returns</h3>
                <p>
                  Short-term returns can be volatile and misleading. Focus on long-term performance (5+ years) to get a
                  true picture of investment quality. Avoid making decisions based on short-term fluctuations.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Investment Return Calculator - Free 2025 | Expenvisor"
                  url="/tools/investment-return-calculator"
                  description="Calculate ROI, annualized returns, and investment performance."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Investments with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Tracking investment returns? Track all your expenses, income, and financial progress with Expenvisor's
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

