"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";

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

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Budget Planner</h1>
            <p className="text-text-secondary-light">Plan your budget using 50/30/20 rule or create custom allocations.</p>
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

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-3">Budget Categories</h3>
                <ul className="space-y-2 text-sm text-text-secondary-light">
                  <li>
                    <strong>Needs (50%):</strong> Housing, utilities, groceries, transportation, insurance, minimum debt
                    payments
                  </li>
                  <li>
                    <strong>Wants (30%):</strong> Dining out, entertainment, hobbies, shopping, subscriptions, travel
                  </li>
                  <li>
                    <strong>Savings (20%):</strong> Emergency fund, retirement, investments, extra debt payoff, goals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

