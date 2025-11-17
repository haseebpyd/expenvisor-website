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

export default function BudgetPlannerPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [budgetMethod, setBudgetMethod] = useState<"502030" | "custom">("502030");

  const [needs, setNeeds] = useState(2500);
  const [wants, setWants] = useState(1500);
  const [savings, setSavings] = useState(1000);

  const calc502030 = useMemo(() => {
    return {
      needs: monthlyIncome * 0.5,
      wants: monthlyIncome * 0.3,
      savings: monthlyIncome * 0.2,
    };
  }, [monthlyIncome]);

  const customTotal = needs + wants + savings;
  const customRemaining = monthlyIncome - customTotal;
  const customPercentages = {
    needs: (needs / monthlyIncome) * 100,
    wants: (wants / monthlyIncome) * 100,
    savings: (savings / monthlyIncome) * 100,
  };

  const faqItems = [
    {
      question: "What is the 50/30/20 budget rule?",
      answer:
        "The 50/30/20 rule is a simple budgeting framework: 50% of income goes to needs (essential expenses like housing, food, utilities), 30% to wants (discretionary spending like entertainment, dining out), and 20% to savings and debt payoff. It's a flexible guideline that helps balance spending and saving.",
    },
    {
      question: "How do I determine what's a need vs. a want?",
      answer:
        "Needs are essential expenses you can't live without: housing, utilities, groceries, transportation to work, insurance, minimum debt payments. Wants are discretionary: dining out, entertainment, hobbies, shopping, subscriptions, travel. If you can eliminate it without major impact, it's likely a want.",
    },
    {
      question: "What if my needs exceed 50% of income?",
      answer:
        "If needs exceed 50%, you may need to reduce wants or savings temporarily, or find ways to lower needs (downsize housing, reduce utilities, find cheaper transportation). In high-cost areas, needs might be 60-70%, requiring adjustment of the other categories.",
    },
    {
      question: "Can I customize the budget percentages?",
      answer:
        "Yes! Use the 'Custom Budget' option to set your own percentages. Some people prefer 60/20/20 (higher needs), 40/30/30 (higher savings), or other allocations based on their situation. The key is ensuring your total doesn't exceed income.",
    },
    {
      question: "What should I include in the savings category?",
      answer:
        "The 20% savings category includes: emergency fund contributions, retirement savings (401(k), IRA), investments, extra debt payments beyond minimums, and savings for specific goals (vacation, down payment, etc.).",
    },
    {
      question: "How often should I review my budget?",
      answer:
        "Review monthly to track actual spending vs. budget. Adjust categories as needed based on real expenses. Life changes (raises, new expenses, goals) require budget updates. Regular reviews help you stay on track and make informed adjustments.",
    },
    {
      question: "What if I have irregular income?",
      answer:
        "For irregular income, base your budget on your average monthly income or your lowest expected month. During high-income months, allocate extra to savings. During low months, you may need to dip into savings or reduce wants.",
    },
    {
      question: "Should I include pre-tax deductions in my budget?",
      answer:
        "Budget using your take-home pay (after taxes and pre-tax deductions). This gives you a realistic view of available money. Pre-tax deductions (401(k), health insurance) are already accounted for in your net pay.",
    },
    {
      question: "How do I stick to my budget?",
      answer:
        "Track expenses regularly, use budgeting apps, set up separate accounts for different categories, automate savings, review spending weekly, set realistic limits, and allow some flexibility. The goal is awareness and control, not perfection.",
    },
    {
      question: "What if my expenses exceed my income?",
      answer:
        "If expenses exceed income, you need to either increase income or reduce expenses. Prioritize needs, eliminate or reduce wants, find ways to lower fixed costs, consider a side hustle, or look for higher-paying opportunities. This is a critical situation requiring immediate action.",
    },
    {
      question: "Can I use this for annual budgeting?",
      answer:
        "While this calculator uses monthly income, you can multiply results by 12 for annual planning. However, monthly budgeting is more practical for day-to-day management. Annual budgets help with long-term planning and goal setting.",
    },
    {
      question: "How does this compare to zero-based budgeting?",
      answer:
        "The 50/30/20 rule is simpler and allocates percentages. Zero-based budgeting assigns every dollar to a specific category. Both work—choose based on your preference. Zero-based gives more control but requires more time and detail.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Your Monthly Income",
      description:
        "Input your monthly take-home pay (after taxes and deductions). This is the amount you actually receive and can spend. If income varies, use an average or conservative estimate.",
    },
    {
      number: 2,
      title: "Choose Budget Method",
      description:
        "Select '50/30/20 Rule' for automatic allocation based on the popular budgeting framework, or 'Custom Budget' to set your own percentages for needs, wants, and savings.",
    },
    {
      number: 3,
      title: "Set Custom Allocations (If Custom)",
      description:
        "If using custom budget, enter dollar amounts for needs (essential expenses), wants (discretionary spending), and savings/debt payoff. The calculator shows percentages and remaining balance.",
    },
    {
      number: 4,
      title: "Review Your Budget Allocation",
      description:
        "See how your income is allocated across needs, wants, and savings. For custom budgets, check that total doesn't exceed income and adjust as needed to balance your priorities.",
    },
    {
      number: 5,
      title: "Track and Adjust",
      description:
        "Use this budget as a starting point. Track actual spending monthly and adjust categories as needed. Budgets should be flexible and adapt to your changing needs and goals.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Budget Planner", url: "/tools/budget-planner" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Budget Planner",
    "Free budget planner to create monthly budgets using the 50/30/20 rule or custom allocations.",
    "/tools/budget-planner",
    "Budget Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Budget Planner",
    "Step-by-step guide to creating and managing your monthly budget."
  );

  const relatedTools = [
    { name: "Savings Goal Planner", slug: "savings-goal-planner" },
    { name: "Expense Ratio Calculator", slug: "expense-ratio-calculator" },
    { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator" },
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
              <h1 className="text-4xl font-bold text-white mb-3">Budget Planner</h1>
              <p className="text-text-secondary-light">
                Plan your budget using the 50/30/20 rule or create custom allocations. Free and instant.
              </p>
            </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput
                label="Monthly Income"
                value={monthlyIncome}
                onChange={setMonthlyIncome}
                min={0}
                step={100}
                suffix="$"
              />

              <label className="block">
                <span className="block text-sm text-text-secondary-light mb-2">Budget Method</span>
                <select
                  value={budgetMethod}
                  onChange={(e) => {
                    const method = e.target.value as "502030" | "custom";
                    setBudgetMethod(method);
                    if (method === "502030") {
                      setNeeds(calc502030.needs);
                      setWants(calc502030.wants);
                      setSavings(calc502030.savings);
                    }
                  }}
                  className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="502030">50/30/20 Rule</option>
                  <option value="custom">Custom Budget</option>
                </select>
              </label>

              {budgetMethod === "custom" && (
                <>
                  <NumberInput
                    label="Needs (Essential Expenses)"
                    value={needs}
                    onChange={setNeeds}
                    min={0}
                    step={50}
                    suffix="$"
                  />
                  <NumberInput
                    label="Wants (Discretionary)"
                    value={wants}
                    onChange={setWants}
                    min={0}
                    step={50}
                    suffix="$"
                  />
                  <NumberInput
                    label="Savings & Debt Payoff"
                    value={savings}
                    onChange={setSavings}
                    min={0}
                    step={50}
                    suffix="$"
                  />
                </>
              )}
            </div>

            <div className="space-y-4">
              {budgetMethod === "502030" ? (
                <ResultCard title="50/30/20 Budget Allocation">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Needs (50%)</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc502030.needs)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Wants (30%)</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc502030.wants)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Savings (20%)</span>
                      <span className="text-xl font-bold text-white">{toCurrency(calc502030.savings)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20 flex justify-between">
                      <span className="text-text-secondary-light">Total Allocated</span>
                      <span className="text-white font-semibold">{toCurrency(monthlyIncome)}</span>
                    </div>
                  </div>
                </ResultCard>
              ) : (
                <ResultCard title="Custom Budget Summary">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Needs ({customPercentages.needs.toFixed(1)}%)</span>
                      <span className="text-xl font-bold text-white">{toCurrency(needs)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Wants ({customPercentages.wants.toFixed(1)}%)</span>
                      <span className="text-xl font-bold text-white">{toCurrency(wants)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Savings ({customPercentages.savings.toFixed(1)}%)</span>
                      <span className="text-xl font-bold text-white">{toCurrency(savings)}</span>
                    </div>
                    <div className="pt-3 border-t border-secondary/20">
                      <div className="flex justify-between mb-2">
                        <span className="text-text-secondary-light">Total Allocated</span>
                        <span className="text-white">{toCurrency(customTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary-light">Remaining</span>
                        <span className={`font-semibold ${customRemaining >= 0 ? "text-accent" : "text-red-400"}`}>
                          {toCurrency(customRemaining)}
                        </span>
                      </div>
                    </div>
                  </div>
                </ResultCard>
              )}

            <FAQ items={faqItems} />
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <ContentSection title="Introduction">
            <p>
              Creating and sticking to a budget is one of the most important financial habits you can develop. A budget
              gives you control over your money, helps you achieve financial goals, reduces stress, and prevents
              overspending. Whether you're trying to pay off debt, save for a major purchase, or build wealth, a budget
              is your roadmap to financial success.
            </p>
            <p>
              This free budget planner uses the popular 50/30/20 rule—a simple framework that allocates 50% of income to
              needs, 30% to wants, and 20% to savings. You can also create a custom budget with your own allocations
              based on your unique financial situation and goals.
            </p>
            <p>
              Use this tool to create a realistic monthly budget, understand where your money goes, and make informed
              decisions about spending and saving. Remember, a budget is a living document—review and adjust it
              regularly as your income and expenses change.
            </p>
          </ContentSection>

          <HowToSection
            title="How to Use the Budget Planner"
            description="Follow these steps to create your monthly budget:"
            steps={howToSteps}
          />

          <ContentSection title="Understanding the 50/30/20 Budget Rule">
            <p>
              The 50/30/20 rule is a simple, flexible budgeting framework popularized by Senator Elizabeth Warren:
            </p>
            <div className="bg-surface-dark rounded-lg p-4 my-4">
              <div className="text-text-secondary-light space-y-2 text-sm">
                <p>
                  <strong className="text-white">50% - Needs:</strong> Essential expenses you can't live without:
                  housing (rent/mortgage), utilities, groceries, transportation to work, insurance, minimum debt
                  payments, healthcare.
                </p>
                <p>
                  <strong className="text-white">30% - Wants:</strong> Discretionary spending that enhances your life:
                  dining out, entertainment, hobbies, shopping, subscriptions, travel, gym memberships, non-essential
                  purchases.
                </p>
                <p>
                  <strong className="text-white">20% - Savings:</strong> Financial security and future goals: emergency
                  fund, retirement savings (401(k), IRA), investments, extra debt payments, savings for specific goals
                  (vacation, down payment, etc.).
                </p>
              </div>
            </div>
            <p>
              This rule provides a balanced approach to budgeting—covering essentials, allowing for enjoyment, and
              prioritizing financial security. Adjust percentages based on your situation, but aim to save at least 20%
              if possible.
            </p>
          </ContentSection>

          <ContentSection title="Tips & Best Practices for Successful Budgeting">
            <h3 className="font-semibold text-white mb-2">1. Start with Your Actual Spending</h3>
            <p>
              Track your expenses for a month before creating a budget. This shows where your money actually goes and
              helps you set realistic category limits. Use bank statements, receipts, or expense tracking apps.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">2. Use the Envelope System (Digitally)</h3>
            <p>
              Allocate money to different categories and track spending in each. When a category is spent, stop spending
              in that area until next month. Many budgeting apps help you do this digitally.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">3. Automate Savings</h3>
            <p>
              Set up automatic transfers to savings accounts on payday. This ensures savings happen first and prevents
              the temptation to spend money intended for savings.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">4. Review and Adjust Monthly</h3>
            <p>
              Compare actual spending to your budget each month. Adjust categories that are consistently over or under.
              Budgets should evolve with your life circumstances and financial goals.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">5. Build in Flexibility</h3>
            <p>
              Include a small "miscellaneous" or "buffer" category for unexpected expenses. Perfect budgets don't exist,
              so allow some flexibility while maintaining overall structure.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">6. Prioritize High-Interest Debt</h3>
            <p>
              If you have high-interest debt, consider allocating more than 20% to debt payoff temporarily. Paying off
              credit card debt at 20% interest is effectively a 20% return on investment.
            </p>

            <h3 className="font-semibold text-white mb-2 mt-4">7. Use Budgeting Apps</h3>
            <p>
              Consider using budgeting apps like Expenvisor to track expenses automatically, categorize spending, and
              monitor progress toward budget goals. Automation makes budgeting easier and more accurate.
            </p>
          </ContentSection>

          <div className="mt-8">
            <ShareButton
              title="Budget Planner - Free 2025 | Expenvisor"
              url="/tools/budget-planner"
              description="Create a monthly budget using the 50/30/20 rule or custom allocations."
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
            <h3 className="text-2xl font-bold text-white mb-3">Track Your Budget with Expenvisor</h3>
            <p className="text-text-secondary-light mb-4">
              Created your budget? Track all your expenses automatically and stay on budget with Expenvisor's AI-powered
              expense tracker.
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

