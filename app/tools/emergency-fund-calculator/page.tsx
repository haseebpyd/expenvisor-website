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

export default function EmergencyFundCalculatorPage() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [monthsCoverage, setMonthsCoverage] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlySavings, setMonthlySavings] = useState(500);
  const [interestRate, setInterestRate] = useState(4);

  const calc = useMemo(() => {
    const targetAmount = monthlyExpenses * monthsCoverage;
    const needed = Math.max(0, targetAmount - currentSavings);
    const monthlyRate = interestRate / 100 / 12;
    
    let months = 0;
    if (monthlySavings > 0 && needed > 0) {
      if (monthlyRate === 0) {
        months = Math.ceil(needed / monthlySavings);
      } else {
        months = Math.ceil(
          Math.log(1 + (needed * monthlyRate) / monthlySavings) / Math.log(1 + monthlyRate)
        );
      }
    }
    
    return {
      targetAmount,
      needed,
      months,
      years: months / 12,
    };
  }, [monthlyExpenses, monthsCoverage, currentSavings, monthlySavings, interestRate]);

  const faqItems = [
    {
      question: "How much should I have in my emergency fund?",
      answer:
        "Financial experts recommend 3-6 months of essential expenses. If you have stable income, 3 months may be sufficient. If income is irregular or you're in a high-risk industry, aim for 6-12 months. Start with a $1,000 mini emergency fund, then build to your full target.",
    },
    {
      question: "What expenses should I include?",
      answer:
        "Include only essential expenses: housing, utilities, groceries, transportation, insurance, minimum debt payments, and healthcare. Don't include discretionary spending like dining out, entertainment, or shopping.",
    },
    {
      question: "Where should I keep my emergency fund?",
      answer:
        "Keep emergency funds in a high-yield savings account that's easily accessible but separate from your checking account. Avoid investing emergency funds in stocks or bonds—they should be liquid and safe from market volatility.",
    },
    {
      question: "Should I pay off debt or build emergency fund first?",
      answer:
        "Build a small emergency fund ($1,000) first to avoid going deeper into debt when emergencies arise. Then focus on high-interest debt. Once debt is manageable, build your full emergency fund (3-6 months expenses).",
    },
    {
      question: "What counts as an emergency?",
      answer:
        "True emergencies: job loss, major medical expenses, urgent home/car repairs, unexpected tax bills. Not emergencies: vacations, shopping, planned expenses, or wants. Be disciplined about what you use emergency funds for.",
    },
    {
      question: "How do I build an emergency fund fast?",
      answer:
        "To build faster: (1) Automate monthly transfers, (2) Save windfalls (tax refunds, bonuses), (3) Cut non-essential expenses, (4) Increase income with side work, (5) Sell unused items, (6) Use high-yield savings account for better interest.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Calculate Monthly Expenses",
      description:
        "Add up your essential monthly expenses: housing, utilities, groceries, transportation, insurance, minimum debt payments. Don't include discretionary spending.",
    },
    {
      number: 2,
      title: "Choose Months of Coverage",
      description:
        "Select how many months of expenses you want to cover. Most experts recommend 3-6 months. Use 6 months for more security, 3 months if you have stable income.",
    },
    {
      number: 3,
      title: "Enter Current Savings",
      description:
        "Input how much you've already saved toward your emergency fund. If starting from zero, enter 0.",
    },
    {
      number: 4,
      title: "Set Monthly Savings Goal",
      description:
        "Enter how much you can save each month toward your emergency fund. Be realistic about what you can afford consistently.",
    },
    {
      number: 5,
      title: "Review Your Plan",
      description:
        "See your target emergency fund amount, how much more you need, and how long it will take to reach your goal based on your savings rate.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Emergency Fund Calculator", url: "/tools/emergency-fund-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Emergency Fund Calculator",
    "Free calculator to determine how much you should save for emergencies and calculate time to build your emergency fund.",
    "/tools/emergency-fund-calculator",
    "Savings Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Emergency Fund Calculator",
    "Step-by-step guide to planning and building your emergency fund."
  );

  const relatedTools = [
    { name: "Savings Goal Planner", slug: "savings-goal-planner" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Compound Interest Calculator", slug: "compound-interest" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Emergency Fund Calculator</h1>
              <p className="text-text-secondary-light">
                Calculate how much to save for emergencies and plan your financial safety net. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <NumberInput
                  label="Monthly Essential Expenses"
                  value={monthlyExpenses}
                  onChange={setMonthlyExpenses}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <NumberInput
                  label="Months of Coverage"
                  value={monthsCoverage}
                  onChange={setMonthsCoverage}
                  min={1}
                  max={12}
                  step={1}
                />
                <NumberInput
                  label="Current Emergency Savings"
                  value={currentSavings}
                  onChange={setCurrentSavings}
                  min={0}
                  step={100}
                  suffix="$"
                />
                <NumberInput
                  label="Monthly Savings Amount"
                  value={monthlySavings}
                  onChange={setMonthlySavings}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Annual Interest Rate"
                  value={interestRate}
                  onChange={setInterestRate}
                  min={0}
                  step={0.1}
                  suffix="%"
                />
              </div>

              <div className="space-y-4">
                <ResultCard title="Emergency Fund Plan">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Target Amount</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.targetAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Still Needed</span>
                      <span className="text-white">{toCurrency(calc.needed)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Time to Goal</span>
                      <span className="text-white">
                        {calc.months > 0
                          ? calc.years >= 1
                            ? `${calc.years.toFixed(1)} years`
                            : `${calc.months} months`
                          : "Goal reached!"}
                      </span>
                    </div>
                    {calc.needed === 0 && (
                      <div className="pt-2 border-t border-secondary/20 text-accent text-sm">
                        ✓ You've reached your emergency fund goal!
                      </div>
                    )}
                  </div>
                </ResultCard>

                <FAQ items={faqItems} />
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <ContentSection title="Introduction">
                <p>
                  An emergency fund is your financial safety net—money set aside to cover unexpected expenses or income
                  loss. It's one of the most important foundations of financial security, protecting you from going into
                  debt when life throws curveballs.
                </p>
                <p>
                  This free emergency fund calculator helps you determine how much you should save based on your
                  expenses and risk tolerance. It calculates your target amount, shows how much more you need, and
                  estimates how long it will take to build your emergency fund based on your savings rate.
                </p>
                <p>
                  Whether you're just starting to build your emergency fund or want to ensure you have enough coverage,
                  this tool helps you create a realistic plan to achieve financial security.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Emergency Fund Calculator"
                description="Follow these steps to plan your emergency fund:"
                steps={howToSteps}
              />

              <ContentSection title="How Much Emergency Fund Do You Need?">
                <p>
                  <strong>3 Months:</strong> Minimum for those with stable income, dual-income households, or low-risk
                  jobs. Provides basic protection against short-term emergencies.
                </p>
                <p>
                  <strong>6 Months:</strong> Recommended for most people. Provides solid protection against job loss,
                  major expenses, or income disruption. Good balance between security and practicality.
                </p>
                <p>
                  <strong>9-12 Months:</strong> For those with irregular income (freelancers, commission-based), single
                  income households, high-risk jobs, or those wanting extra security. Provides maximum protection.
                </p>
                <p>
                  <strong>Start Small:</strong> Don't let the full amount overwhelm you. Start with a $1,000 mini
                  emergency fund, then gradually build to your full target. Every dollar saved is progress.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Building Emergency Fund">
                <h3 className="font-semibold text-white mb-2">1. Automate Your Savings</h3>
                <p>
                  Set up automatic transfers from checking to savings on payday. Automation ensures consistency and
                  removes the temptation to skip contributions.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Use a High-Yield Savings Account</h3>
                <p>
                  Keep emergency funds in a high-yield savings account (currently 4-5% APY). This earns interest while
                  keeping money accessible. Avoid investing in stocks or bonds—emergency funds need to be liquid.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Save Windfalls</h3>
                <p>
                  Direct tax refunds, bonuses, gifts, and unexpected income to your emergency fund. These one-time
                  infusions can significantly accelerate your progress.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Cut Non-Essential Expenses</h3>
                <p>
                  Temporarily reduce dining out, subscriptions, entertainment, and other discretionary spending to free
                  up money for emergency fund contributions. Every dollar counts.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Keep It Separate</h3>
                <p>
                  Keep emergency funds in a separate account from your checking account. This prevents accidental
                  spending and makes it clear this money is for emergencies only.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Replenish After Use</h3>
                <p>
                  If you use emergency funds, make replenishing them a priority. Treat it like any other essential
                  expense and rebuild as quickly as possible.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Emergency Fund Calculator - Free 2025 | Expenvisor"
                  url="/tools/emergency-fund-calculator"
                  description="Calculate how much to save for emergencies and plan your financial safety net."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Emergency Fund with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Building your emergency fund? Track all your expenses, savings, and financial progress with
                  Expenvisor's AI-powered expense tracker.
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

