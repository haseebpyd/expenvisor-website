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

export default function SavingsGoalPlannerPage() {
  const [goalAmount, setGoalAmount] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(4);

  const calc = useMemo(() => {
    const remaining = Math.max(0, goalAmount - currentSavings);
    const monthlyRate = annualRate / 100 / 12;

    if (monthlyContribution <= 0 || remaining <= 0) {
      return { monthsToGoal: Infinity, totalContribution: 0, totalInterest: 0 };
    }

    if (monthlyRate === 0) {
      const monthsToGoal = Math.ceil(remaining / monthlyContribution);
      const totalContribution = monthlyContribution * monthsToGoal;
      return { monthsToGoal, totalContribution, totalInterest: 0 };
    }

    const monthsToGoal = Math.ceil(
      Math.log(1 + (remaining * monthlyRate) / monthlyContribution) / Math.log(1 + monthlyRate)
    );

    let balance = currentSavings;
    let totalContribution = 0;
    for (let m = 0; m < monthsToGoal && balance < goalAmount; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalContribution += monthlyContribution;
    }

    const totalInterest = balance - currentSavings - totalContribution;

    return { monthsToGoal, totalContribution, totalInterest };
  }, [goalAmount, currentSavings, monthlyContribution, annualRate]);

  const yearsToGoal = calc.monthsToGoal === Infinity ? Infinity : calc.monthsToGoal / 12;
  const monthlyNeeded =
    goalAmount > currentSavings && calc.monthsToGoal !== Infinity
      ? (goalAmount - currentSavings) / calc.monthsToGoal
      : 0;

  const faqItems = [
    {
      question: "How does the savings goal planner work?",
      answer:
        "The calculator determines how long it will take to reach your savings goal based on your current savings, monthly contributions, and expected interest rate. It accounts for compound interest, showing both the time needed and total interest earned along the way.",
    },
    {
      question: "What if my monthly contribution is too low?",
      answer:
        "If your monthly contribution is too low to reach your goal in a reasonable timeframe, the calculator will indicate this. You can either increase your monthly contribution, lower your goal amount, or extend your timeline to make the goal achievable.",
    },
    {
      question: "How does interest rate affect my savings goal?",
      answer:
        "A higher interest rate accelerates your progress by earning more on your savings. Even a 1-2% difference in interest rate can significantly reduce the time needed to reach your goal or increase the final amount you'll have.",
    },
    {
      question: "Can I use this for different types of savings goals?",
      answer:
        "Yes! This calculator works for any savings goal: emergency fund, down payment, vacation, car purchase, home renovation, education, or any other financial objective. Simply enter your target amount and current situation.",
    },
    {
      question: "What's a realistic interest rate for savings?",
      answer:
        "Interest rates vary: High-yield savings accounts (4-5%), CDs (3-5%), money market accounts (4-5%), investment accounts (7-10% long-term average). Use conservative rates for guaranteed savings, higher rates for investment-based goals.",
    },
    {
      question: "Should I include my current savings?",
      answer:
        "Yes, include all money you've already saved toward this goal. This gives you an accurate starting point and shows how much more you need to save. The calculator will show how your existing savings grow with interest.",
    },
    {
      question: "How often should I review my savings progress?",
      answer:
        "Review monthly to track progress and adjust contributions if needed. Life circumstances change, so regularly updating your goal amount, contributions, or timeline helps keep your plan realistic and achievable.",
    },
    {
      question: "What if I want to reach my goal faster?",
      answer:
        "To reach your goal faster: (1) Increase monthly contributions, (2) Find a higher interest rate account, (3) Reduce the goal amount if possible, (4) Look for ways to earn extra income, or (5) Cut expenses to free up more money for savings.",
    },
    {
      question: "Can I have multiple savings goals?",
      answer:
        "Yes! You can use this calculator for each separate goal. Many people save for multiple goals simultaneously by allocating different amounts to each. Prioritize goals by urgency and importance.",
    },
    {
      question: "What's the difference between savings and investments?",
      answer:
        "Savings are typically in low-risk accounts (savings accounts, CDs) with guaranteed returns but lower interest. Investments (stocks, bonds) have higher potential returns but more risk. Use savings for short-term goals, investments for long-term goals.",
    },
    {
      question: "How do I stay motivated to reach my savings goal?",
      answer:
        "Set specific, measurable goals with deadlines. Track progress regularly, celebrate milestones, visualize the end result, automate contributions, and remind yourself why the goal matters. Breaking large goals into smaller milestones helps maintain motivation.",
    },
    {
      question: "Should I adjust for inflation?",
      answer:
        "For long-term goals (5+ years), consider that inflation will reduce purchasing power. You may need to increase your goal amount over time. For short-term goals, inflation impact is minimal and can be ignored.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Set Your Savings Goal",
      description:
        "Enter the total amount you want to save. This could be for an emergency fund, down payment, vacation, or any other financial goal.",
    },
    {
      number: 2,
      title: "Enter Current Savings",
      description:
        "Input how much you've already saved toward this goal. If starting from zero, enter 0. Include all money specifically allocated to this goal.",
    },
    {
      number: 3,
      title: "Set Monthly Contribution",
      description:
        "Enter how much you can contribute each month. Be realistic about what you can afford consistently. You can adjust this to see how different contribution amounts affect your timeline.",
    },
    {
      number: 4,
      title: "Choose Interest Rate",
      description:
        "Enter the expected annual interest rate. Use conservative rates (4-5%) for savings accounts, or higher rates (7-10%) if investing for long-term goals.",
    },
    {
      number: 5,
      title: "Review Your Results",
      description:
        "See how long it will take to reach your goal, total contributions needed, and interest earned. Adjust inputs to find a plan that works for your timeline.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Savings Goal Planner", url: "/tools/savings-goal-planner" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Savings Goal Planner",
    "Free calculator to determine monthly savings needed or time to reach your financial goals.",
    "/tools/savings-goal-planner",
    "Savings Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Savings Goal Planner",
    "Step-by-step guide to planning and achieving your savings goals."
  );

  const relatedTools = [
    { name: "Compound Interest Calculator", slug: "compound-interest" },
    { name: "Emergency Fund Calculator", slug: "emergency-fund-calculator" },
    { name: "Retirement Savings Calculator", slug: "retirement-savings-calculator" },
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
            <h1 className="text-4xl font-bold text-white mb-3">Savings Goal Planner</h1>
            <p className="text-text-secondary-light">
                Calculate monthly savings needed or time to reach your financial goal. Free and instant.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput
                label="Goal Amount"
                value={goalAmount}
                onChange={setGoalAmount}
                min={0}
                step={100}
                suffix="$"
              />
              <NumberInput
                label="Current Savings"
                value={currentSavings}
                onChange={setCurrentSavings}
                min={0}
                step={100}
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
                label="Annual Interest Rate"
                value={annualRate}
                onChange={setAnnualRate}
                min={0}
                step={0.1}
                suffix="%"
              />
            </div>

            <div className="space-y-4">
              <ResultCard title="Time to Goal">
                <div className="space-y-3">
                  {calc.monthsToGoal === Infinity ? (
                    <div className="text-text-secondary-light text-center py-4">
                      Monthly contribution is too low or goal already reached.
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary-light">Time to Reach Goal</span>
                        <span className="text-2xl font-bold text-white">
                          {yearsToGoal >= 1
                            ? `${yearsToGoal.toFixed(1)} years`
                            : `${calc.monthsToGoal} months`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Total Monthly Contributions</span>
                        <span className="text-white">{toCurrency(calc.totalContribution)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Interest Earned</span>
                        <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                      </div>
                      {monthlyNeeded > monthlyContribution && (
                        <div className="flex justify-between pt-2 border-t border-secondary/20">
                          <span className="text-text-secondary-light">Monthly Needed (no interest)</span>
                          <span className="text-white">{toCurrency(monthlyNeeded)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ResultCard>

            <FAQ items={faqItems} />

            <p className="text-xs text-text-secondary-light mt-4">
                Disclaimer: Results are estimates. Actual savings growth depends on interest rates, fees, and market
                conditions.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <ContentSection title="Introduction">
            <p>
              Setting and achieving savings goals is fundamental to financial success. Whether you're saving for an
              emergency fund, down payment, vacation, or major purchase, having a clear plan with specific targets and
              timelines dramatically increases your chances of success.
            </p>
            <p>
              This free savings goal planner helps you determine exactly how long it will take to reach your financial
              goal based on your current savings, monthly contributions, and expected interest rate. It accounts for
              compound interest, showing you both the time needed and how much interest you'll earn along the way.
            </p>
            <p>
              Use this tool to create realistic savings plans, adjust your contributions to meet deadlines, and stay
              motivated by seeing your progress toward your financial goals.
            </p>
          </ContentSection>

          <HowToSection
            title="How to Use the Savings Goal Planner"
            description="Follow these steps to plan your savings goal:"
            steps={howToSteps}
          />

          <ContentSection title="Savings Goal Formula Explained">
            <p>
              The calculator uses compound interest formulas to determine how long it takes to reach your goal:
            </p>
            <div className="bg-surface-dark rounded-lg p-4 my-4 font-mono text-sm">
              <p className="text-white mb-2">
                n = log(1 + (FV × r) / PMT) / log(1 + r)
              </p>
              <div className="text-text-secondary-light space-y-1 text-xs">
                <p>Where:</p>
                <p>n = Number of months to reach goal</p>
                <p>FV = Future Value (goal amount - current savings)</p>
                <p>r = Monthly interest rate (annual rate ÷ 12)</p>
                <p>PMT = Monthly contribution</p>
              </div>
            </div>
            <p>
              This formula accounts for compound interest, meaning your savings grow faster over time as you earn
              interest on both your principal and previously earned interest.
            </p>
            <p>
              <strong>Example:</strong> To save $50,000 starting with $5,000, contributing $500/month at 4% annual
              interest, it takes approximately 6.8 years. You'll contribute $40,800 total and earn $4,200 in interest.
            </p>
          </ContentSection>

          <ContentSection title="Tips & Best Practices for Achieving Savings Goals">
            <h3 className="font-semibold text-white mb-2">1. Set Specific, Measurable Goals</h3>
            <p>
              Instead of "save money," set specific goals like "save $20,000 for a down payment by December 2026."
              Specific goals with deadlines are more motivating and achievable.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">2. Automate Your Savings</h3>
            <p>
              Set up automatic transfers from your checking to savings account. Automation removes the temptation to
              skip contributions and ensures consistent progress toward your goal.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">3. Use High-Yield Savings Accounts</h3>
            <p>
              Maximize your interest earnings by using high-yield savings accounts (currently 4-5% APY). This can
              significantly reduce the time needed to reach your goal or increase your final amount.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">4. Review and Adjust Regularly</h3>
            <p>
              Life circumstances change. Review your savings plan monthly and adjust contributions, goals, or timelines
              as needed. Regular reviews keep your plan realistic and achievable.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">5. Prioritize Multiple Goals</h3>
            <p>
              If you have multiple savings goals, prioritize by urgency and importance. You might save for an emergency
              fund first, then shift to other goals. Use this calculator separately for each goal.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">6. Celebrate Milestones</h3>
            <p>
              Break large goals into smaller milestones (e.g., 25%, 50%, 75% complete) and celebrate when you reach
              them. This maintains motivation and makes long-term goals feel more achievable.
            </p>
          </ContentSection>

          <div className="mt-8">
            <ShareButton
              title="Savings Goal Planner - Free 2025 | Expenvisor"
              url="/tools/savings-goal-planner"
              description="Calculate monthly savings needed or time to reach your financial goals."
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
            <h3 className="text-2xl font-bold text-white mb-3">Track Your Savings Goals with Expenvisor</h3>
            <p className="text-text-secondary-light mb-4">
              Planning your savings? Track all your expenses, income, and progress toward your goals with Expenvisor's
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

