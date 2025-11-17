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

type Debt = {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
};

export default function DebtPayoffCalculatorPage() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Credit Card", balance: 5000, rate: 18, minPayment: 150 },
    { id: "2", name: "Personal Loan", balance: 10000, rate: 12, minPayment: 200 },
  ]);
  const [extraPayment, setExtraPayment] = useState(200);
  const [method, setMethod] = useState<"snowball" | "avalanche">("avalanche");

  const calc = useMemo(() => {
    if (debts.length === 0) return { totalMonths: 0, totalInterest: 0, savings: 0, snowball: { months: 0, interest: 0 }, avalanche: { months: 0, interest: 0 } };

    const sortedDebts = [...debts].sort((a, b) =>
      method === "snowball" ? a.balance - b.balance : b.rate - a.rate
    );

    let months = 0;
    let totalInterest = 0;
    const workingDebts = sortedDebts.map((d) => ({ ...d, balance: d.balance }));

    while (workingDebts.some((d) => d.balance > 0)) {
      months++;
      const availablePayment = extraPayment + workingDebts.reduce((sum, d) => sum + (d.balance > 0 ? d.minPayment : 0), 0);
      let remaining = availablePayment;

      for (const debt of workingDebts) {
        if (debt.balance <= 0) continue;
        const monthlyRate = debt.rate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        totalInterest += interest;
        debt.balance = debt.balance + interest;

        const payment = Math.min(debt.balance, remaining);
        debt.balance = Math.max(0, debt.balance - payment);
        remaining -= payment;

        if (debt.balance <= 0.01) debt.balance = 0;
      }

      if (months > 600) break;
    }

    const snowballCalc = method === "snowball" ? { months, interest: totalInterest } : calculateMethod(debts, extraPayment, "snowball");
    const avalancheCalc = method === "avalanche" ? { months, interest: totalInterest } : calculateMethod(debts, extraPayment, "avalanche");

    const minInterest = Math.min(snowballCalc.interest, avalancheCalc.interest);
    const savings = Math.max(snowballCalc.interest, avalancheCalc.interest) - minInterest;

    return {
      totalMonths: months,
      totalInterest,
      savings,
      snowball: snowballCalc,
      avalanche: avalancheCalc,
    };
  }, [debts, extraPayment, method]);

  function calculateMethod(debtsList: Debt[], extra: number, calcMethod: "snowball" | "avalanche") {
    const sorted = [...debtsList].sort((a, b) =>
      calcMethod === "snowball" ? a.balance - b.balance : b.rate - a.rate
    );
    let m = 0;
    let interest = 0;
    const working = sorted.map((d) => ({ ...d, balance: d.balance }));

    while (working.some((d) => d.balance > 0)) {
      m++;
      const available = extra + working.reduce((sum, d) => sum + (d.balance > 0 ? d.minPayment : 0), 0);
      let remaining = available;

      for (const debt of working) {
        if (debt.balance <= 0) continue;
        const monthlyRate = debt.rate / 100 / 12;
        const int = debt.balance * monthlyRate;
        interest += int;
        debt.balance = debt.balance + int;
        const payment = Math.min(debt.balance, remaining);
        debt.balance = Math.max(0, debt.balance - payment);
        remaining -= payment;
        if (debt.balance <= 0.01) debt.balance = 0;
      }
      if (m > 600) break;
    }
    return { months: m, interest };
  }

  const addDebt = () => {
    setDebts([...debts, { id: Date.now().toString(), name: "Debt", balance: 1000, rate: 15, minPayment: 50 }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: number | string) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const faqItems = [
    {
      question: "What's the difference between Snowball and Avalanche methods?",
      answer:
        "Snowball method pays off smallest debts first for psychological wins. Avalanche method pays off highest interest rate debts first to save the most money. Avalanche typically saves more in interest, while Snowball provides faster motivation.",
    },
    {
      question: "Which method should I use?",
      answer:
        "Use Avalanche if you're disciplined and want to save the most money. Use Snowball if you need motivation and quick wins to stay committed. This calculator shows both so you can compare.",
    },
    {
      question: "How much extra should I pay toward debt?",
      answer:
        "Pay as much extra as you can afford after covering minimum payments and essential expenses. Even $50-100 extra per month can save thousands in interest and cut years off your payoff timeline.",
    },
    {
      question: "Should I pay off debt or invest?",
      answer:
        "Generally, pay off high-interest debt (over 7-8%) before investing. For lower interest rates, consider investing while making minimum payments. This calculator helps you see the true cost of carrying debt.",
    },
    {
      question: "What if I can't afford extra payments?",
      answer:
        "Focus on making all minimum payments on time. Look for ways to increase income or reduce expenses. Even small extra payments help. Consider debt consolidation or balance transfers for high-interest debt.",
    },
    {
      question: "How accurate is this calculator?",
      answer:
        "This calculator provides accurate estimates based on standard amortization formulas. Actual results may vary slightly due to payment timing, compounding frequency, and lender-specific terms. Use as a planning tool.",
    },
  ];

  const howToSteps = [
    {
      number: 1,
      title: "Enter Your Debts",
      description:
        "Add each debt with its current balance, interest rate (APR), and minimum monthly payment. Click 'Add Debt' to include multiple debts.",
    },
    {
      number: 2,
      title: "Set Extra Payment",
      description:
        "Enter how much extra you can pay toward debt each month beyond minimum payments. This accelerates payoff and saves interest.",
    },
    {
      number: 3,
      title: "Choose Payoff Method",
      description:
        "Select Snowball (smallest balance first) or Avalanche (highest interest first). The calculator shows results for both methods so you can compare.",
    },
    {
      number: 4,
      title: "Review Results",
      description:
        "See total months to debt-free, total interest paid, and interest savings. Compare Snowball vs. Avalanche to choose the best strategy for you.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Debt Payoff Calculator", url: "/tools/debt-payoff-calculator" },
  ]);

  const calculatorSchema = generateCalculatorSchema(
    "Debt Payoff Calculator",
    "Free calculator to compare Snowball vs. Avalanche debt payoff methods and calculate time to debt-free.",
    "/tools/debt-payoff-calculator",
    "Debt Calculator"
  );

  const faqSchema = generateFAQSchema(faqItems);
  const howToSchema = generateHowToSchema(
    howToSteps,
    "How to Use the Debt Payoff Calculator",
    "Step-by-step guide to planning your debt elimination strategy."
  );

  const relatedTools = [
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator" },
    { name: "Budget Planner", slug: "budget-planner" },
    { name: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator" },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, calculatorSchema, faqSchema, howToSchema]} />
      <ExitIntentCTA />
      <ToolLayout>
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-3">Debt Payoff Calculator</h1>
              <p className="text-text-secondary-light">
                Compare Snowball vs. Avalanche methods and calculate time to debt-free. Free and instant.
              </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Your Debts</h3>
                  {debts.map((debt) => (
                    <div key={debt.id} className="mb-4 p-3 bg-surface-dark rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <input
                          type="text"
                          value={debt.name}
                          onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                          className="bg-transparent text-white font-semibold flex-1 mr-2"
                        />
                        <button
                          onClick={() => removeDebt(debt.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                      <NumberInput
                        label="Balance"
                        value={debt.balance}
                        onChange={(v) => updateDebt(debt.id, "balance", v)}
                        min={0}
                        step={100}
                        suffix="$"
                      />
                      <NumberInput
                        label="Interest Rate (APR)"
                        value={debt.rate}
                        onChange={(v) => updateDebt(debt.id, "rate", v)}
                        min={0}
                        step={0.1}
                        suffix="%"
                      />
                      <NumberInput
                        label="Minimum Payment"
                        value={debt.minPayment}
                        onChange={(v) => updateDebt(debt.id, "minPayment", v)}
                        min={0}
                        step={10}
                        suffix="$"
                      />
                    </div>
                  ))}
                  <button
                    onClick={addDebt}
                    className="w-full px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-lg font-semibold btn-hover"
                  >
                    + Add Debt
                  </button>
                </div>

                <NumberInput
                  label="Extra Monthly Payment"
                  value={extraPayment}
                  onChange={setExtraPayment}
                  min={0}
                  step={50}
                  suffix="$"
                />

                <label className="block">
                  <span className="block text-sm text-text-secondary-light mb-2">Payoff Method</span>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as "snowball" | "avalanche")}
                    className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    <option value="avalanche">Avalanche (Highest Interest First)</option>
                    <option value="snowball">Snowball (Smallest Balance First)</option>
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                <ResultCard title="Payoff Results">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary-light">Time to Debt-Free</span>
                      <span className="text-2xl font-bold text-white">
                        {Math.round(calc.totalMonths / 12)} years {calc.totalMonths % 12} months
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light">Total Interest Paid</span>
                      <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Method Comparison">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-text-secondary-light">Avalanche Method</span>
                        <span className="text-white">
                          {Math.round(calc.avalanche.months / 12)}y {calc.avalanche.months % 12}m
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary-light">
                        Interest: {toCurrency(calc.avalanche.interest)}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-text-secondary-light">Snowball Method</span>
                        <span className="text-white">
                          {Math.round(calc.snowball.months / 12)}y {calc.snowball.months % 12}m
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary-light">
                        Interest: {toCurrency(calc.snowball.interest)}
                      </div>
                    </div>
                    {calc.savings > 0 && (
                      <div className="pt-2 border-t border-secondary/20">
                        <div className="flex justify-between">
                          <span className="text-text-secondary-light">Potential Savings</span>
                          <span className="text-accent font-semibold">{toCurrency(calc.savings)}</span>
                        </div>
                      </div>
                    )}
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
                  Getting out of debt is one of the most important financial goals you can achieve. The debt payoff
                  calculator helps you create a strategic plan to eliminate all your debts efficiently, comparing two
                  popular methods: the Snowball method and the Avalanche method.
                </p>
                <p>
                  The Snowball method focuses on paying off the smallest debts first, providing psychological wins and
                  motivation. The Avalanche method targets the highest interest rate debts first, saving you the most
                  money in interest payments. This calculator shows you both approaches so you can choose the strategy
                  that works best for your situation.
                </p>
                <p>
                  Whether you have credit card debt, personal loans, or multiple debts, this free tool helps you see
                  exactly how long it will take to become debt-free and how much interest you'll pay along the way.
                </p>
              </ContentSection>

              <HowToSection
                title="How to Use the Debt Payoff Calculator"
                description="Follow these steps to plan your debt elimination strategy:"
                steps={howToSteps}
              />

              <ContentSection title="Snowball vs. Avalanche: Which Method is Better?">
                <p>
                  <strong>Snowball Method:</strong> Pay off debts from smallest to largest balance. You make minimum
                  payments on all debts, then put any extra money toward the smallest debt. Once it's paid off, you move
                  to the next smallest. This method provides quick wins and psychological motivation.
                </p>
                <p>
                  <strong>Avalanche Method:</strong> Pay off debts from highest to lowest interest rate. You make
                  minimum payments on all debts, then put extra money toward the highest interest debt. This method
                  saves the most money in interest payments.
                </p>
                <p>
                  <strong>Which to Choose:</strong> If you need motivation and quick wins, choose Snowball. If you're
                  disciplined and want to save the most money, choose Avalanche. This calculator shows both so you can
                  see the difference.
                </p>
              </ContentSection>

              <ContentSection title="Tips & Best Practices for Debt Payoff">
                <h3 className="font-semibold text-white mb-2">1. Make All Minimum Payments</h3>
                <p>
                  Never miss a minimum payment. Late payments damage your credit and add fees. Always pay minimums on all
                  debts, then apply extra to your target debt.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">2. Pay as Much Extra as Possible</h3>
                <p>
                  Every extra dollar accelerates your payoff. Even $50-100 extra per month can save thousands in
                  interest and cut years off your timeline. Look for ways to increase income or reduce expenses.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">3. Consider Debt Consolidation</h3>
                <p>
                  If you have high-interest debt, consider consolidating with a lower-rate personal loan or balance
                  transfer card. This can reduce interest and simplify payments, but only if you don't accumulate new
                  debt.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">4. Stop Using Credit Cards</h3>
                <p>
                  While paying off debt, stop using credit cards for new purchases. Cut them up or freeze them if
                  necessary. You can't get out of debt while continuing to accumulate it.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">5. Build a Small Emergency Fund First</h3>
                <p>
                  Before aggressively paying off debt, build a $1,000 emergency fund. This prevents you from going
                  deeper into debt when unexpected expenses arise.
                </p>

                <h3 className="font-semibold text-white mb-2 mt-4">6. Stay Motivated</h3>
                <p>
                  Track your progress monthly. Celebrate milestones. Join debt-free communities for support. Remember
                  why you're doing this—financial freedom is worth the sacrifice.
                </p>
              </ContentSection>

              <div className="mt-8">
                <ShareButton
                  title="Debt Payoff Calculator - Free 2025 | Expenvisor"
                  url="/tools/debt-payoff-calculator"
                  description="Compare Snowball vs. Avalanche methods and calculate time to debt-free."
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
                <h3 className="text-2xl font-bold text-white mb-3">Track Your Debt Payoff Progress with Expenvisor</h3>
                <p className="text-text-secondary-light mb-4">
                  Paying off debt? Track all your expenses, payments, and financial progress with Expenvisor's
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

