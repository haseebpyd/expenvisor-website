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

export default function RetirementSavingsCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [employerMatch, setEmployerMatch] = useState(3);
  const [employerMatchPercent, setEmployerMatchPercent] = useState(50);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [currentSalary, setCurrentSalary] = useState(60000);

  const calc = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyRate = annualReturn / 100 / 12;
    
    // Employer match calculation
    const employerMatchAmount = (currentSalary / 12) * (employerMatch / 100) * (employerMatchPercent / 100);
    const totalMonthlyContribution = monthlyContribution + employerMatchAmount;
    
    let futureValue = currentSavings;
    let totalContributions = currentSavings;
    
    for (let m = 0; m < monthsToRetirement; m++) {
      futureValue = futureValue * (1 + monthlyRate) + totalMonthlyContribution;
      totalContributions += totalMonthlyContribution;
    }
    
    const totalInterest = futureValue - totalContributions;
    const monthlyRetirementIncome = futureValue * 0.04 / 12; // 4% withdrawal rule
    
    return {
      futureValue,
      totalContributions,
      totalInterest,
      monthlyRetirementIncome,
      yearsToRetirement,
      employerMatchAmount,
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, employerMatch, employerMatchPercent, annualReturn, currentSalary]);

  const faqItems = [
    {
      question: "How much should I save for retirement?",
      answer:
        "General guidelines: Save 15% of income (including employer match) for retirement. Aim to have 1x salary by 30, 3x by 40, 6x by 50, 8x by 60. Use this calculator to see if you're on track based on your age and goals.",
    },
    {
      question: "What's the 4% withdrawal rule?",
      answer:
        "The 4% rule suggests you can safely withdraw 4% of your retirement savings annually (adjusted for inflation) without running out of money over 30 years. This calculator uses this rule to estimate monthly retirement income.",
    },
    {
      question: "Should I contribute to 401(k) or IRA?",
      answer:
        "Contribute enough to 401(k) to get full employer match (free money), then max out IRA for better investment options and lower fees, then return to 401(k) to maximize contributions. Both offer tax advantages.",
    },
    {
      question: "How does employer match work?",
      answer:
        "Many employers match a percentage of your 401(k) contributions up to a certain limit (e.g., 50% match up to 6% of salary). This is free money—always contribute enough to get the full match.",
    },
    {
      question: "What's a realistic return rate?",
      answer:
        "Historical stock market returns average 7-10% annually over long periods. Use 7% for conservative planning, 8-9% for moderate, 10% for aggressive. Remember, past performance doesn't guarantee future results.",
    },
    {
      question: "When should I start saving for retirement?",
      answer:
        "Start as early as possible! Time is your greatest ally due to compound interest. Starting at 25 vs. 35 can mean hundreds of thousands more in retirement, even with the same contribution amounts.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Your Age Information",
      description:
        "Input your current age and desired retirement age. The calculator uses this to determine how many years you have to save and grow your retirement fund.",
    },
    {
      number: 2,
      title: "Enter Current Savings",
      description:
        "Input how much you've already saved for retirement across all accounts (401(k), IRA, Roth IRA, etc.). This is your starting point.",
    },
    {
      number: 3,
      title: "Set Monthly Contribution",
      description:
        "Enter how much you contribute monthly to retirement accounts. Include your contributions only—employer match is calculated separately.",
    },
    {
      number: 4,
      title: "Enter Employer Match Details",
      description:
        "If you have a 401(k) match, enter the match percentage and match rate. For example, if employer matches 50% up to 6% of salary, enter 6% and 50%.",
    },
    {
      number: 5,
      title: "Set Expected Return",
      description:
        "Enter your expected annual return. Use 7% for conservative planning (historical average), or adjust based on your investment strategy.",
    },
    {
      number: 6,
      title: "Review Retirement Projection",
      description:
        "See your projected retirement savings, total contributions, interest earned, and estimated monthly retirement income using the 4% withdrawal rule.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Retirement Savings Calculator", url: "/tools/retirement-savings-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Retirement Savings Calculator",
    "Free calculator to project 401(k), IRA, and Roth IRA growth and calculate if you're saving enough for retirement.",
    "/tools/retirement-savings-calculator",
    "Retirement Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Retirement Savings Calculator",
    "Step-by-step guide to planning your retirement savings."
  );

  const relatedTools = [
    { name: "Compound Interest Calculator", slug: "compound-interest" },
    { name: "Savings Goal Planner", slug: "savings-goal-planner" },
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
              <h1 className="text-4xl font-bold text-white mb-3">Retirement Savings Calculator</h1>
              <p className="text-text-secondary-light">
                Project your retirement savings and see if you're on track. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
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
                  label="Current Retirement Savings"
                  value={currentSavings}
                  onChange={setCurrentSavings}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Monthly Contribution"
                  value={monthlyContribution}
                  onChange={setMonthlyContribution}
                  min={0}
                  step={50}
                  suffix="$"
                />
                <NumberInput
                  label="Annual Salary"
                  value={currentSalary}
                  onChange={setCurrentSalary}
                  min={0}
                  step={1000}
                  suffix="$"
                />
                <NumberInput
                  label="Employer Match % (of salary)"
                  value={employerMatch}
                  onChange={setEmployerMatch}
                  min={0}
                  max={20}
                  step={0.5}
                  suffix="%"
                />
                <NumberInput
                  label="Employer Match Rate"
                  value={employerMatchPercent}
                  onChange={setEmployerMatchPercent}
                  min={0}
                  max={100}
                  step={10}
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
                <ResultCard title="Retirement Projection">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Retirement Savings</span>
                      <span className="text-2xl font-bold text-white">{toCurrency(calc.futureValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Contributions</span>
                      <span className="text-white">{toCurrency(calc.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Interest Earned</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Years to Retirement</span>
                      <span className="text-white">{calc.yearsToRetirement} years</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between mb-1">
                        <span className="text-text-secondary-light">Monthly Retirement Income (4% rule)</span>
                        <span className="text-accent font-semibold">{toCurrency(calc.monthlyRetirementIncome)}</span>
                      </div>
                      {calc.employerMatchAmount > 0 && (
                        <div className="text-xs text-text-secondary-light mt-2">
                          Employer match: {toCurrency(calc.employerMatchAmount)}/month
                        </div>
                      )}
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
                  Planning for retirement is one of the most important financial goals you'll ever set. With pensions
                  becoming rare and Social Security uncertain, your retirement security depends largely on how much you
                  save and invest during your working years.
                </p>
                <p>
                  This free retirement savings calculator helps you project how much you'll have saved by retirement age
                  based on your current savings, contributions, employer match, and expected returns. It shows you if
                  you're on track and helps you adjust your savings strategy to meet your retirement goals.
                </p>
                <p>
                  Whether you're just starting to save or want to see if you're on track, this tool helps you plan for
                  a secure retirement and make informed decisions about your savings rate.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Retirement Savings Calculator"
                description="Follow these steps to project your retirement savings:"
                steps={howToSteps}
              />

              <ContentSection title="Retirement Savings Benchmarks">
                <p>
                  Financial experts recommend these savings milestones by age (as multiples of annual salary):
                </p>
                <div className="bg-surface-dark rounded-lg p-4 my-4">
                  <div className="text-text-secondary-light space-y-2 text-sm">
                    <p><strong className="text-white">Age 30:</strong> 1x annual salary saved</p>
                    <p><strong className="text-white">Age 40:</strong> 3x annual salary saved</p>
                    <p><strong className="text-white">Age 50:</strong> 6x annual salary saved</p>
                    <p><strong className="text-white">Age 60:</strong> 8x annual salary saved</p>
                    <p><strong className="text-white">Retirement:</strong> 10-12x annual salary saved</p>
                  </div>
                </div>
                <p>
                  These are general guidelines. Your target depends on your desired retirement lifestyle, expected
                  expenses, other income sources (Social Security, pensions), and retirement age. Use this calculator to
                  see if you're on track.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Retirement Savings">
                <h3 className="font-semibold text-white mb-2">1. Start Early</h3>
                <p>
                  Time is your greatest ally. Starting to save in your 20s vs. 30s can mean hundreds of thousands more
                  in retirement due to compound interest. Don't wait—start saving now, even if it's a small amount.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Maximize Employer Match</h3>
                <p>
                  Always contribute enough to get your full employer 401(k) match. This is free money and an instant
                  50-100% return on your contribution. Never leave employer match on the table.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Increase Contributions Over Time</h3>
                <p>
                  As your income grows, increase your retirement contributions. Aim to save 15% of income (including
                  employer match). Even small increases compound significantly over decades.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Use Tax-Advantaged Accounts</h3>
                <p>
                  Maximize 401(k), IRA, and Roth IRA contributions. These accounts offer tax benefits that can add tens
                  or hundreds of thousands to your retirement savings over time.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Don't Cash Out Early</h3>
                <p>
                  Avoid withdrawing from retirement accounts before retirement. Early withdrawals face penalties and
                  taxes, and you lose decades of compound growth. Treat retirement accounts as untouchable.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Diversify Your Investments</h3>
                <p>
                  Don't put all retirement savings in one type of investment. Diversify across stocks, bonds, and other
                  assets based on your age and risk tolerance. Younger investors can take more risk.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Retirement Savings Calculator - Free 2025 | Expenvisor"
                  url="/tools/retirement-savings-calculator"
                  description="Project your retirement savings and see if you're on track for retirement."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Retirement Savings with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Planning for retirement? Track all your expenses, savings, and financial progress with Expenvisor's
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

