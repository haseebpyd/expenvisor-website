"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";

export const metadata = {
  title: "Income Tax Calculator | Expenvisor Free Tools",
  description:
    "Estimate federal income tax using 2024 brackets. Simple calculation for educational purposes with standard deduction.",
  alternates: { canonical: "/tools/income-tax-calculator" },
  keywords: ["income tax calculator", "tax estimator", "tax bracket calculator", "federal tax calculator"],
};

function toCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const TAX_BRACKETS_2024 = [
  { min: 0, max: 11000, rate: 0.1 },
  { min: 11000, max: 44725, rate: 0.12 },
  { min: 44725, max: 95375, rate: 0.22 },
  { min: 95375, max: 201050, rate: 0.24 },
  { min: 201050, max: 383900, rate: 0.32 },
  { min: 383900, max: 487450, rate: 0.35 },
  { min: 487450, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION_SINGLE = 14600;
const STANDARD_DEDUCTION_MARRIED = 29200;

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");
  const [standardDeduction, setStandardDeduction] = useState(STANDARD_DEDUCTION_SINGLE);

  const calc = useMemo(() => {
    const taxableIncome = Math.max(0, annualIncome - standardDeduction);
    let tax = 0;
    const breakdown: { bracket: string; amount: number; tax: number }[] = [];

    for (const bracket of TAX_BRACKETS_2024) {
      if (taxableIncome <= bracket.min) break;

      const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
      const bracketTax = taxableInBracket * bracket.rate;
      tax += bracketTax;

      if (taxableInBracket > 0) {
        breakdown.push({
          bracket: `${bracket.rate * 100}% (${toCurrency(bracket.min)} - ${bracket.max === Infinity ? "∞" : toCurrency(bracket.max)})`,
          amount: taxableInBracket,
          tax: bracketTax,
        });
      }
    }

    const effectiveRate = annualIncome > 0 ? (tax / annualIncome) * 100 : 0;
    const marginalRate = TAX_BRACKETS_2024.find((b) => taxableIncome >= b.min && taxableIncome < b.max)?.rate ?? 0;

    return {
      taxableIncome,
      tax,
      afterTax: annualIncome - tax,
      effectiveRate,
      marginalRate: marginalRate * 100,
      breakdown,
    };
  }, [annualIncome, standardDeduction]);

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Income Tax Calculator</h1>
            <p className="text-text-secondary-light">Estimate federal income tax using 2024 tax brackets.</p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput
                label="Annual Income"
                value={annualIncome}
                onChange={setAnnualIncome}
                min={0}
                step={1000}
                suffix="$"
              />

              <label className="block">
                <span className="block text-sm text-text-secondary-light mb-2">Filing Status</span>
                <select
                  value={filingStatus}
                  onChange={(e) => {
                    const status = e.target.value as "single" | "married";
                    setFilingStatus(status);
                    setStandardDeduction(status === "married" ? STANDARD_DEDUCTION_MARRIED : STANDARD_DEDUCTION_SINGLE);
                  }}
                  className="w-full rounded-xl bg-surface-elevated-light dark:bg-surface-elevated-dark border border-secondary/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </label>

              <NumberInput
                label="Standard Deduction"
                value={standardDeduction}
                onChange={setStandardDeduction}
                min={0}
                step={100}
                suffix="$"
              />
            </div>

            <div className="space-y-4">
              <ResultCard title="Tax Estimate">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light">Taxable Income</span>
                    <span className="text-xl font-bold text-white">{toCurrency(calc.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light">Federal Tax</span>
                    <span className="text-2xl font-bold text-white">{toCurrency(calc.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">After-Tax Income</span>
                    <span className="text-white">{toCurrency(calc.afterTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Effective Tax Rate</span>
                    <span className="text-white">{calc.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Marginal Tax Rate</span>
                    <span className="text-white">{calc.marginalRate.toFixed(1)}%</span>
                  </div>
                </div>
              </ResultCard>

              {calc.breakdown.length > 0 && (
                <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Tax Breakdown by Bracket</h3>
                  <div className="space-y-2 text-sm">
                    {calc.breakdown.map((b, i) => (
                      <div key={i} className="flex justify-between border-b border-secondary/10 pb-2">
                        <span className="text-text-secondary-light">{b.bracket}</span>
                        <span className="text-white">{toCurrency(b.tax)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-3">Important Disclaimers</h3>
                <ul className="space-y-2 text-sm text-text-secondary-light list-disc list-inside">
                  <li>Uses 2024 federal tax brackets for single/married filing jointly</li>
                  <li>Standard deduction only—itemized deductions not included</li>
                  <li>Does not include state/local taxes, FICA (Social Security/Medicare), or other deductions</li>
                  <li>This is a simplified estimate for educational purposes only</li>
                  <li>Consult a tax professional for accurate calculations and planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

