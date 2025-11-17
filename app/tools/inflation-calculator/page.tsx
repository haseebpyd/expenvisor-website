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

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState(1000);
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2024);
  const [inflationRate, setInflationRate] = useState(3);

  const calc = useMemo(() => {
    const years = endYear - startYear;
    const futureValue = amount * Math.pow(1 + inflationRate / 100, years);
    const purchasingPower = amount;
    const valueChange = futureValue - amount;
    const percentChange = ((futureValue - amount) / amount) * 100;
    
    return {
      futureValue,
      purchasingPower,
      valueChange,
      percentChange,
      years,
    };
  }, [amount, startYear, endYear, inflationRate]);

  const faqItems = [
    {
      question: "What is inflation?",
      answer:
        "Inflation is the rate at which prices increase over time, reducing purchasing power. If inflation is 3%, something that costs $100 today will cost $103 next year. Your money buys less over time.",
    },
    {
      question: "What's a typical inflation rate?",
      answer:
        "Historically, U.S. inflation averages 2-3% annually. The Federal Reserve targets 2% inflation. Recent years have seen higher inflation (4-8%). Use historical averages (3%) for long-term planning.",
    },
    {
      question: "How does inflation affect my money?",
      answer:
        "Inflation erodes purchasing power. $1,000 today won't buy as much in 10 years. If inflation is 3%, $1,000 today equals about $744 in purchasing power in 10 years. Your money loses value over time.",
    },
    {
      question: "How do I protect against inflation?",
      answer:
        "Invest in assets that outpace inflation: stocks (historically 7-10% returns), real estate, inflation-protected securities (TIPS), and other investments. Cash and low-yield savings lose value to inflation.",
    },
    {
      question: "What's the difference between nominal and real value?",
      answer:
        "Nominal value is the dollar amount. Real value accounts for inflation and shows purchasing power. $1,000 in 2020 has different real value than $1,000 in 2024 due to inflation.",
    },
    {
      question: "How do I calculate inflation-adjusted returns?",
      answer:
        "Subtract inflation rate from investment return to get real return. If investment earns 7% and inflation is 3%, real return is 4%. This shows true purchasing power growth.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Amount",
      description:
        "Input the dollar amount you want to adjust for inflation. This could be a salary, savings amount, or purchase price.",
    },
    {
      number: 2,
      title: "Set Time Period",
      description:
        "Enter the start year and end year for the inflation calculation. This shows how purchasing power changes over that period.",
    },
    {
      number: 3,
      title: "Enter Inflation Rate",
      description:
        "Input the annual inflation rate. Use 3% for historical average, or adjust based on current economic conditions. The calculator compounds inflation annually.",
    },
    {
      number: 4,
      title: "Review Results",
      description:
        "See the future value needed to maintain purchasing power, the value change, and percentage change. This shows how much more money you'd need to buy the same goods.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Inflation Calculator", url: "/tools/inflation-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Inflation Calculator",
    "Free calculator to calculate purchasing power over time, adjust future values for inflation, and understand how inflation affects your money.",
    "/tools/inflation-calculator",
    "Financial Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Inflation Calculator",
    "Step-by-step guide to calculating inflation-adjusted values and purchasing power."
  );

  const relatedTools = [
    { name: "Investment Return Calculator", slug: "investment-return-calculator" },
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
    { name: "Compound Interest Calculator", slug: "compound-interest" },
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
              <h1 className="text-4xl font-bold text-white mb-3">Inflation Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate purchasing power over time and see how inflation affects your money. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Amount"
                  value={amount}
                  onChange={setAmount}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <NumberInput
                  label="Start Year"
                  value={startYear}
                  onChange={setStartYear}
                  min={1900}
                  max={2100}
                  step={1}
                />
                <NumberInput
                  label="End Year"
                  value={endYear}
                  onChange={setEndYear}
                  min={startYear}
                  max={2100}
                  step={1}
                />
                <NumberInput
                  label="Annual Inflation Rate"
                  value={inflationRate}
                  onChange={setInflationRate}
                  min={0}
                  step={0.1}
                  suffix="%"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Inflation Impact">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Future Value Needed</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.futureValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Original Purchasing Power</span>
                      <span className="text-white">{toCurrency(calc.purchasingPower)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Value Change</span>
                      <span className="text-red-400 font-semibold">{toCurrency(calc.valueChange)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Percent Change</span>
                      <span className="text-white">{calc.percentChange.toFixed(1)}%</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20 text-sm text-text-secondary-light">
                      Over {calc.years} {calc.years === 1 ? "year" : "years"}, you'd need {toCurrency(calc.futureValue)} to maintain the same purchasing power as {toCurrency(amount)} today.
                    </div>
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  Inflation is the silent thief of purchasing power. Over time, prices rise, and your money buys less.
                  Understanding how inflation affects your money is crucial for financial planning, retirement planning,
                  and making informed investment decisions.
                </p>
                <p>
                  This free inflation calculator helps you see how inflation erodes purchasing power over time. It shows
                  you how much money you'd need in the future to maintain the same purchasing power as today, helping
                  you plan for long-term financial goals.
                </p>
                <p>
                  Use this tool to understand the real value of money over time, plan for retirement income needs, and
                  make investment decisions that outpace inflation.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Inflation Calculator"
                description="Follow these steps to calculate inflation-adjusted values:"
                steps={howToSteps}
              />

              <ContentSection title="Understanding Inflation">
                <p>
                  <strong>What is Inflation:</strong> Inflation is the rate at which the general price level of goods
                  and services increases over time. When inflation is 3%, prices increase by 3% annually, meaning your
                  money buys 3% less each year.
                </p>
                <p>
                  <strong>Historical Inflation:</strong> U.S. inflation has averaged 2-3% annually over the long term.
                  The Federal Reserve targets 2% inflation. Recent years have seen higher inflation (4-8%), but
                  long-term planning typically uses 3%.
                </p>
                <p>
                  <strong>Impact on Savings:</strong> If you keep money in a savings account earning 1% while inflation
                  is 3%, you're losing 2% purchasing power annually. This is why investing is important—you need returns
                  that outpace inflation.
                </p>
                <p>
                  <strong>Real vs. Nominal Returns:</strong> Nominal returns don't account for inflation. Real returns
                  subtract inflation. A 7% investment return with 3% inflation equals 4% real return—your true
                  purchasing power growth.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Inflation Protection">
                <h3 className="font-semibold text-white mb-2">1. Invest to Outpace Inflation</h3>
                <p>
                  Don't keep all money in cash or low-yield savings. Invest in stocks, bonds, real estate, and other
                  assets that historically outpace inflation. Stocks have averaged 7-10% returns, well above typical
                  inflation.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Consider Inflation in Retirement Planning</h3>
                <p>
                  When planning retirement, account for inflation. $50,000 annual income today won't have the same
                  purchasing power in 20 years. Plan for higher income needs in retirement due to inflation.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Use Real Returns for Planning</h3>
                <p>
                  When calculating investment returns, subtract inflation to get real returns. This shows true
                  purchasing power growth and helps set realistic expectations.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Consider Inflation-Protected Securities</h3>
                <p>
                  Treasury Inflation-Protected Securities (TIPS) adjust for inflation, protecting purchasing power.
                  Consider these for conservative portions of your portfolio, especially as you near retirement.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Review and Adjust Regularly</h3>
                <p>
                  Inflation rates change over time. Review your financial plan regularly and adjust assumptions based on
                  current economic conditions. Don't assume inflation will always be the same.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Focus on Long-Term Growth</h3>
                <p>
                  Short-term inflation fluctuations are normal. Focus on long-term trends and ensure your investments
                  outpace inflation over decades, not just individual years.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Inflation Calculator - Free 2025 | Expenvisor"
                  url="/tools/inflation-calculator"
                  description="Calculate purchasing power over time and see how inflation affects your money."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Finances with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Planning for inflation? Track all your expenses, income, and financial progress with Expenvisor's
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

