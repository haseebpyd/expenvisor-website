"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";

export const metadata = {
  title: "Savings Goal Planner | Expenvisor Free Tools",
  description:
    "Calculate how much to save monthly to reach your goal, or how long it will take with your current savings rate.",
  alternates: { canonical: "/tools/savings-goal-planner" },
  keywords: ["savings goal calculator", "monthly savings", "financial goal planner", "savings planner"],
};

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

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Savings Goal Planner</h1>
            <p className="text-text-secondary-light">
              Calculate monthly savings needed or time to reach your financial goal.
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

              <p className="text-xs text-text-secondary-light">
                Disclaimer: Results are estimates. Actual savings growth depends on interest rates, fees, and market
                conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

