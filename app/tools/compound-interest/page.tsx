"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";

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

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Compound Interest Calculator</h1>
            <p className="text-text-secondary-light">
              See how your investments grow with compound interest and regular contributions.
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
                    <span className="text-text-secondary-light">Future Value</span>
                    <span className="text-2xl font-bold text-white">{toCurrency(calc.futureValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Total Contributions</span>
                    <span className="text-white">{toCurrency(calc.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Total Interest Earned</span>
                    <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Growth Multiple</span>
                    <span className="text-white">
                      {(calc.futureValue / calc.totalContributions).toFixed(2)}x
                    </span>
                  </div>
                </div>
              </ResultCard>

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl overflow-auto max-h-[420px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-text-secondary-light">
                      <th className="py-2 pr-4">Year</th>
                      <th className="py-2 pr-4">Value</th>
                      <th className="py-2 pr-4">Contributions</th>
                      <th className="py-2">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.yearlyData.map((d) => (
                      <tr key={d.year} className="border-t border-secondary/10 text-text-secondary-light">
                        <td className="py-2 pr-4">{d.year}</td>
                        <td className="py-2 pr-4">{toCurrency(d.value)}</td>
                        <td className="py-2 pr-4">{toCurrency(d.contributions)}</td>
                        <td className="py-2">{toCurrency(d.interest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-text-secondary-light">
                Disclaimer: Results are estimates. Actual returns depend on market conditions, fees, and taxes. Past
                performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

