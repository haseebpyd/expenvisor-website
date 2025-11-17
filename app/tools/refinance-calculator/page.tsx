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

function calculatePayment(principal: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export default function RefinanceCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState(200000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentYears, setCurrentYears] = useState(30);
  const [newRate, setNewRate] = useState(5.5);
  const [newYears, setNewYears] = useState(30);
  const [closingCosts, setClosingCosts] = useState(5000);

  const calc = useMemo(() => {
    const currentPayment = calculatePayment(currentBalance, currentRate, currentYears);
    const remainingMonths = (currentYears * 12) - Math.floor((currentYears * 12) / 3); // Approximate remaining
    const currentTotalInterest = currentPayment * remainingMonths - currentBalance;

    const newPayment = calculatePayment(currentBalance, newRate, newYears);
    const newTotalInterest = newPayment * (newYears * 12) - currentBalance;
    const monthlySavings = currentPayment - newPayment;
    const breakEvenMonths = closingCosts > 0 && monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;
    const totalSavings = currentTotalInterest - newTotalInterest - closingCosts;

    return {
      currentPayment,
      newPayment,
      monthlySavings,
      breakEvenMonths,
      totalSavings,
      currentTotalInterest,
      newTotalInterest,
    };
  }, [currentBalance, currentRate, currentYears, newRate, newYears, closingCosts]);

  const faqItems = [
    {
      question: "Should I refinance my mortgage?",
      answer:
        "Refinancing makes sense if: (1) You can lower your interest rate by 0.5-1% or more, (2) You plan to stay in the home long enough to recoup closing costs (break-even point), (3) You can reduce your loan term, or (4) You need to change loan terms. Use this calculator to compare costs and savings.",
    },
    {
      question: "What is the break-even point?",
      answer:
        "The break-even point is how many months it takes for your monthly savings to equal the closing costs. If you plan to stay in the home longer than the break-even period, refinancing typically makes financial sense.",
    },
    {
      question: "What are typical refinance closing costs?",
      answer:
        "Closing costs typically range from 2-5% of the loan amount ($4,000-$10,000 for a $200,000 loan). They include: origination fees, appraisal, title insurance, recording fees, and prepaid items. Some lenders offer no-closing-cost refinances with higher rates.",
    },
    {
      question: "Can I refinance with bad credit?",
      answer:
        "It's possible but more difficult and expensive. You'll likely get higher interest rates and may need a larger down payment. Work on improving your credit score first to get better rates. FHA and VA loans may have more lenient requirements.",
    },
    {
      question: "Should I refinance to a shorter term?",
      answer:
        "Refinancing to a shorter term (e.g., 30 to 15 years) increases monthly payments but saves significant interest and builds equity faster. Only do this if you can comfortably afford the higher payment. This calculator shows the impact of different terms.",
    },
    {
      question: "What's a cash-out refinance?",
      answer:
        "A cash-out refinance replaces your current mortgage with a larger loan, giving you cash from the difference. This increases your loan balance and monthly payment. Use cash-out only for investments that will provide returns greater than the mortgage rate.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Current Loan Details",
      description:
        "Input your current mortgage balance, interest rate, and remaining loan term. These are your baseline for comparison.",
    },
    {
      number: 2,
      title: "Enter New Loan Terms",
      description:
        "Enter the new interest rate and loan term you're considering. Compare different scenarios to find the best option.",
    },
    {
      number: 3,
      title: "Enter Closing Costs",
      description:
        "Input estimated closing costs for the refinance. Typical costs are 2-5% of loan amount. Your lender will provide exact figures.",
    },
    {
      number: 4,
      title: "Review Refinance Analysis",
      description:
        "See your new monthly payment, monthly savings, break-even point, and total savings. Compare to decide if refinancing makes sense.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Refinance Calculator", url: "/tools/refinance-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Refinance Calculator",
    "Free calculator to calculate mortgage refinance savings, break-even point, and compare refinancing vs. staying with current loan.",
    "/tools/refinance-calculator",
    "Mortgage Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Refinance Calculator",
    "Step-by-step guide to evaluating mortgage refinancing options."
  );

  const relatedTools = [
    { name: "Mortgage Affordability Calculator", slug: "mortgage-affordability" },
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "APR Calculator", slug: "apr-calculator" },
    { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Refinance Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate refinance savings, break-even point, and compare refinancing vs. staying. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Current Loan</h3>
                <NumberInput
                  label="Current Balance"
                  value={currentBalance}
                  onChange={setCurrentBalance}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Current Interest Rate"
                  value={currentRate}
                  onChange={setCurrentRate}
                  min={0}
                  step={0.1}
                  suffix="%"
                />
                <NumberInput
                  label="Remaining Term (years)"
                  value={currentYears}
                  onChange={setCurrentYears}
                  min={1}
                  step={1}
                />

                <h3 className="text-lg font-semibold text-white mt-6">New Loan</h3>
                <NumberInput
                  label="New Interest Rate"
                  value={newRate}
                  onChange={setNewRate}
                  min={0}
                  step={0.1}
                  suffix="%"
                />
                <NumberInput
                  label="New Loan Term (years)"
                  value={newYears}
                  onChange={setNewYears}
                  min={1}
                  step={1}
                />
                <NumberInput
                  label="Closing Costs"
                  value={closingCosts}
                  onChange={setClosingCosts}
                  min={0}
                  step={500}
                  suffix="$"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Refinance Analysis">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Current Payment</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc.currentPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">New Payment</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc.newPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Monthly Savings</span>
                      <span className="text-accent font-semibold">{toCurrency(calc.monthlySavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Break-Even Point</span>
                      <span className="text-white">
                        {calc.breakEvenMonths > 0
                          ? `${Math.floor(calc.breakEvenMonths / 12)} years ${calc.breakEvenMonths % 12} months`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Savings</span>
                      <span className={`font-semibold ${calc.totalSavings > 0 ? "text-accent" : "text-red-400"}`}>
                        {toCurrency(calc.totalSavings)}
                      </span>
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
                  Refinancing your mortgage can save thousands of dollars in interest, lower your monthly payment, or
                  help you pay off your loan faster. However, refinancing isn't always the right choice—it depends on
                  your situation, goals, and how long you plan to stay in your home.
                </p>
                <p>
                  This free refinance calculator helps you evaluate whether refinancing makes financial sense. It
                  calculates your potential monthly savings, break-even point (when savings equal closing costs), and
                  total savings over the life of the loan.
                </p>
                <p>
                  Use this tool to compare different refinance scenarios, understand the true cost of refinancing, and
                  make an informed decision about whether to refinance your mortgage.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Refinance Calculator"
                description="Follow these steps to evaluate refinancing options:"
                steps={howToSteps}
              />

              <ContentSection title="When Refinancing Makes Sense">
                <p>
                  <strong>Lower Interest Rate:</strong> If you can reduce your rate by 0.5-1% or more, refinancing
                  typically saves money, especially if you plan to stay in the home long enough to recoup closing costs.
                </p>
                <p>
                  <strong>Shorter Loan Term:</strong> Refinancing to a shorter term (e.g., 30 to 15 years) increases
                  monthly payments but saves significant interest and builds equity faster.
                </p>
                <p>
                  <strong>Change Loan Type:</strong> Switching from adjustable-rate to fixed-rate provides payment
                  stability, or vice versa if rates are favorable.
                </p>
                <p>
                  <strong>Remove PMI:</strong> If your home value has increased, refinancing can eliminate private
                  mortgage insurance (PMI) if your loan-to-value ratio drops below 80%.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Refinancing">
                <h3 className="font-semibold text-white mb-2">1. Calculate the Break-Even Point</h3>
                <p>
                  Only refinance if you plan to stay in the home longer than the break-even period. If you're moving
                  soon, closing costs may outweigh savings.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Shop Multiple Lenders</h3>
                <p>
                  Compare rates and closing costs from multiple lenders. Even small rate differences can save thousands
                  over the life of the loan.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Consider No-Closing-Cost Refinances</h3>
                <p>
                  Some lenders offer no-closing-cost refinances with slightly higher rates. This can make sense if you
                  don't plan to stay long-term, as you avoid upfront costs.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Don't Extend Your Term Unnecessarily</h3>
                <p>
                  While extending your term lowers monthly payments, it increases total interest paid. Only extend if
                  you need lower payments and understand the long-term cost.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Factor in All Costs</h3>
                <p>
                  Include all closing costs: origination fees, appraisal, title insurance, prepaid items. These can add
                  up to 2-5% of your loan amount.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Refinance Calculator - Free 2025 | Expenvisor"
                  url="/tools/refinance-calculator"
                  description="Calculate mortgage refinance savings, break-even point, and compare refinancing options."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Mortgage with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Refinancing? Track all your expenses, mortgage payments, and financial progress with Expenvisor's
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

