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

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12);

  const calc = useMemo(() => {
    const periods = years * compoundingFrequency;
    const ratePerPeriod = annualRate / 100 / compoundingFrequency;
    const monthlyContrib = monthlyContribution;

    let futureValue = principal;
    const yearlyData: { year: number; value: number; contributions: number; interest: number }[] = [];

    for (let y = 1; y <= years; y++) {
      const startValue = futureValue;
      let yearContributions = 0;

      for (let p = 0; p < compoundingFrequency; p++) {
        futureValue = futureValue * (1 + ratePerPeriod) + monthlyContrib;
        yearContributions += monthlyContrib;
      }

      const yearInterest = futureValue - startValue - yearContributions;
      yearlyData.push({
        year: y,
        value: futureValue,
        contributions: startValue + yearContributions,
        interest: yearInterest,
      });
    }

    const totalContributions = principal + monthlyContribution * 12 * years;
    const totalInterest = futureValue - totalContributions;

    return { futureValue, totalContributions, totalInterest, yearlyData };
  }, [principal, annualRate, years, monthlyContribution, compoundingFrequency]);

  const faqItems = [
    {
      question: "What is compound interest?",
      answer:
        "Compound interest is interest calculated on the initial principal plus all accumulated interest from previous periods. Unlike simple interest, compound interest allows your money to grow exponentially over time because you earn interest on your interest.",
    },
    {
      question: "How does compounding frequency affect growth?",
      answer:
        "The more frequently interest compounds, the faster your money grows. Monthly compounding (12 times per year) grows faster than annual compounding. Daily compounding grows even faster. Most savings accounts compound daily, while investments may compound monthly, quarterly, or annually.",
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer:
        "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus all previously earned interest. Over time, compound interest significantly outperforms simple interest, especially with longer time horizons.",
    },
    {
      question: "How do regular contributions affect compound interest?",
      answer:
        "Regular contributions (like monthly deposits) dramatically accelerate growth. Each contribution starts earning compound interest immediately, creating a snowball effect. The combination of compound interest and regular contributions is the foundation of long-term wealth building.",
    },
    {
      question: "What's a realistic interest rate to expect?",
      answer:
        "Interest rates vary by investment type: Savings accounts (0.5-4%), CDs (3-5%), bonds (4-6%), stocks (7-10% historical average), real estate (8-12%). Use realistic rates based on your investment strategy. Remember, higher returns typically come with higher risk.",
    },
    {
      question: "How does time affect compound interest?",
      answer:
        "Time is the most powerful factor in compound interest. The longer your money compounds, the more dramatic the growth. Starting early allows compound interest to work for decades, which is why financial experts emphasize starting to invest as early as possible.",
    },
    {
      question: "Should I focus on principal or interest rate?",
      answer:
        "Both matter, but starting early with regular contributions often outweighs waiting for a higher rate. A small amount invested early can grow larger than a larger amount invested later, thanks to the power of compound interest over time.",
    },
    {
      question: "How do taxes affect compound interest?",
      answer:
        "Taxes can significantly reduce your compound interest growth. Tax-advantaged accounts (401(k), IRA, Roth IRA) allow your money to compound without annual tax drag, which can substantially increase your final balance. This calculator doesn't account for taxes.",
    },
    {
      question: "What's the rule of 72?",
      answer:
        "The rule of 72 estimates how long it takes to double your money: divide 72 by your annual interest rate. For example, at 7% interest, your money doubles in approximately 10.3 years (72 ÷ 7). This is a quick mental calculation for compound interest growth.",
    },
    {
      question: "Can I use this for retirement planning?",
      answer:
        "Yes! This calculator is excellent for retirement planning. Enter your current savings as principal, your expected monthly contributions, your expected annual return, and your years until retirement to see how much you'll have saved.",
    },
    {
      question: "What if I want to calculate without monthly contributions?",
      answer:
        "Simply set monthly contributions to $0. The calculator will show how your initial principal grows with compound interest alone. This is useful for understanding how a lump sum investment grows over time.",
    },
    {
      question: "How accurate are these projections?",
      answer:
        "These calculations are mathematically accurate based on the inputs you provide. However, actual investment returns fluctuate with market conditions. Use this as a planning tool, not a guarantee. Past performance doesn't guarantee future results.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Initial Investment",
      description:
        "Input your starting principal amount. This could be your current savings, an initial investment, or the amount you plan to invest.",
    },
    {
      number: 2,
      title: "Set Annual Interest Rate",
      description:
        "Enter your expected annual return as a percentage. Use realistic rates based on your investment type: savings (0.5-4%), stocks (7-10%), bonds (4-6%).",
    },
    {
      number: 3,
      title: "Choose Time Period",
      description:
        "Enter the number of years you plan to invest. Longer time periods show more dramatic compound interest growth.",
    },
    {
      number: 4,
      title: "Add Monthly Contributions (Optional)",
      description:
        "Enter any regular monthly contributions you plan to make. Even small monthly contributions significantly accelerate growth through compound interest.",
    },
    {
      number: 5,
      title: "Set Compounding Frequency",
      description:
        "Choose how often interest compounds: monthly (12), quarterly (4), or annually (1). More frequent compounding results in faster growth.",
    },
    {
      number: 6,
      title: "Review Your Results",
      description:
        "See your future value, total contributions, total interest earned, and a year-by-year breakdown showing how your investment grows over time.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Compound Interest Calculator", url: "/tools/compound-interest" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Compound Interest Calculator",
    "Free calculator to see how your investments grow with compound interest and regular contributions.",
    "/tools/compound-interest",
    "Investment Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Compound Interest Calculator",
    "Step-by-step guide to calculating investment growth with compound interest."
  );

  const relatedTools = [
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
    { name: "Savings Goal Planner", slug: "savings-goal-planner" },
    { name: "Investment Return Calculator", slug: "investment-return-calculator" },
    { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Compound Interest Calculator</h1>
            <p className="text-text-secondary-dark">
                See how your investments grow with compound interest and regular contributions. Free and instant.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput
                label="Initial Investment (Principal)"
                value={principal}
                onChange={setPrincipal}
                min={0}
                step={100}
                suffix="$"
              />
              <NumberInput
                label="Annual Interest Rate"
                value={annualRate}
                onChange={setAnnualRate}
                min={0}
                step={0.1}
                suffix="%"
              />
              <NumberInput label="Time Period (years)" value={years} onChange={setYears} min={1} step={1} />
              <NumberInput
                label="Monthly Contribution"
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                min={0}
                step={50}
                suffix="$"
              />
              <NumberInput
                label="Compounding Frequency (per year)"
                value={compoundingFrequency}
                onChange={setCompoundingFrequency}
                min={1}
                step={1}
              />
            </div>

            <div className="space-y-4">
              <ResultCard title="Results">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-dark">Future Value</span>
                    <span className="text-2xl font-bold text-white">{toCurrency(calc.futureValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-dark">Total Contributions</span>
                    <span className="text-white">{toCurrency(calc.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-dark">Total Interest Earned</span>
                    <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-dark">Growth Multiple</span>
                    <span className="text-white">
                      {(calc.futureValue / calc.totalContributions).toFixed(2)}x
                    </span>
                  </div>
                </div>
              </ResultCard>

              <div className="bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl overflow-auto max-h-[420px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-text-secondary-dark">
                      <th className="py-2 pr-4">Year</th>
                      <th className="py-2 pr-4">Value</th>
                      <th className="py-2 pr-4">Contributions</th>
                      <th className="py-2">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.yearlyData.map((d) => (
                      <tr key={d.year} className="border-t border-secondary/10 text-text-secondary-dark">
                        <td className="py-2 pr-4">{d.year}</td>
                        <td className="py-2 pr-4">{toCurrency(d.value)}</td>
                        <td className="py-2 pr-4">{toCurrency(d.contributions)}</td>
                        <td className="py-2">{toCurrency(d.interest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            <p className="text-xs text-text-secondary-dark mt-4">
                Disclaimer: Results are estimates. Actual returns depend on market conditions, fees, and taxes. Past
                performance does not guarantee future results.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <FAQ items={faqItems} />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <ContentSection title="Introduction">
            <p>
              Compound interest is often called the eighth wonder of the world, and for good reason. It's the
              mathematical phenomenon that allows your money to grow exponentially over time, earning interest on your
              interest. Understanding compound interest is essential for anyone serious about building wealth, planning
              for retirement, or achieving long-term financial goals.
            </p>
            <p>
              This free compound interest calculator shows you exactly how your investments grow over time with
              compounding and regular contributions. Whether you're planning for retirement, saving for a major
              purchase, or building an emergency fund, this tool helps you visualize the power of time and consistent
              investing.
            </p>
            <p>
              See how small, regular contributions combined with compound interest can grow into substantial wealth over
              decades. The results often surprise people—showing that starting early and contributing consistently is
              often more important than finding the highest interest rate.
            </p>
          </ContentSection>

          <HowToSection
            title="How to Use the Compound Interest Calculator"
            description="Follow these steps to calculate your investment growth:"
            steps={howToSteps}
          />

          <ContentSection title="Compound Interest Formula Explained">
            <p>
              Compound interest is calculated using the formula for future value with regular contributions:
            </p>
            <div className="bg-surface-dark rounded-lg p-4 my-4 font-mono text-sm">
              <p className="text-white mb-2">
                FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
              </p>
              <div className="text-text-secondary-dark space-y-1 text-xs">
                <p>Where:</p>
                <p>FV = Future Value</p>
                <p>P = Principal (initial investment)</p>
                <p>r = Annual interest rate (as decimal)</p>
                <p>n = Compounding frequency per year</p>
                <p>t = Time in years</p>
                <p>PMT = Monthly contribution</p>
              </div>
            </div>
            <p>
              The first part calculates growth of your initial principal. The second part calculates the future value of
              your regular contributions. Together, they show the total value of your investment.
            </p>
            <p>
              <strong>Example:</strong> $10,000 initial investment at 7% annual interest, compounded monthly, with $500
              monthly contributions for 20 years grows to approximately $285,000. Your total contributions are $130,000,
              meaning compound interest generated about $155,000 in growth.
            </p>
          </ContentSection>

          <ContentSection title="Tips & Best Practices for Maximizing Compound Interest">
            <h3 className="font-semibold text-white mb-2">1. Start Early</h3>
            <p>
              Time is your greatest ally. Starting to invest in your 20s instead of your 30s can mean hundreds of
              thousands of dollars more in retirement, even with the same contribution amounts. Don't wait for the
              perfect time—start now.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">2. Contribute Consistently</h3>
            <p>
              Regular contributions, even small ones, dramatically accelerate growth. Set up automatic transfers so
              you're consistently investing. The habit of regular investing is often more valuable than the amount.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">3. Use Tax-Advantaged Accounts</h3>
            <p>
              Maximize 401(k)s, IRAs, and Roth IRAs. These accounts allow your money to compound without annual tax
              drag, which can add tens or hundreds of thousands of dollars to your final balance over decades.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">4. Reinvest Dividends and Interest</h3>
            <p>
              Don't withdraw your earnings—let them compound. Reinvesting dividends and interest allows compound
              interest to work at full power, accelerating your wealth building.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">5. Be Patient and Stay Invested</h3>
            <p>
              Compound interest works best over long time horizons. Avoid the temptation to withdraw or change
              strategies during market downturns. Stay invested and let time and compounding do their work.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">6. Increase Contributions Over Time</h3>
            <p>
              As your income grows, increase your contributions. Even small increases compound significantly over time.
              Consider increasing contributions whenever you get a raise or bonus.
            </p>
          </ContentSection>

          <div className="mt-8">
            <ShareButton
              title="Compound Interest Calculator - Free 2025 | Expenvisor"
              url="/tools/compound-interest"
              description="Calculate how your investments grow with compound interest and regular contributions."
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
            <h3 className="text-2xl font-bold text-white mb-3">Track Your Investment Growth with Expenvisor</h3>
            <p className="text-text-secondary-dark mb-4">
              Planning your investments? Track all your expenses, savings, and financial progress with Expenvisor's
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

