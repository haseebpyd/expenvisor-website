"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";

export const metadata = {
  title: "Mortgage Affordability Calculator | Expenvisor Free Tools",
  description:
    "Estimate how much home you can afford based on income, expenses, and DTI. Includes down payment, monthly payment estimates.",
  alternates: { canonical: "/tools/mortgage-affordability" },
  keywords: [
    "mortgage affordability calculator",
    "how much house can I afford",
    "DTI calculator",
    "home buying calculator",
  ],
};

function toCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function MortgageAffordabilityPage() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [maxDTI, setMaxDTI] = useState(36);

  const calc = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = (monthlyIncome * maxDTI) / 100 - monthlyDebt;
    const monthlyRate = interestRate / 100 / 12;
    const months = termYears * 12;
    const downPercent = downPaymentPercent / 100;

    if (maxMonthlyPayment <= 0 || monthlyRate <= 0 || months <= 0) {
      return { affordablePrice: 0, downPayment: 0, monthlyPayment: 0, totalInterest: 0 };
    }

    const affordableLoanAmount = (maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -months))) / monthlyRate;
    const affordablePrice = affordableLoanAmount / (1 - downPercent);
    const downPayment = affordablePrice * downPercent;
    const totalInterest = maxMonthlyPayment * months - affordableLoanAmount;

    return {
      affordablePrice: Math.max(0, affordablePrice),
      downPayment: Math.max(0, downPayment),
      monthlyPayment: maxMonthlyPayment,
      totalInterest,
    };
  }, [annualIncome, monthlyDebt, downPaymentPercent, interestRate, termYears, maxDTI]);

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Mortgage Affordability Calculator</h1>
            <p className="text-text-secondary-light">Estimate how much home you can afford based on income and DTI.</p>
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
              <NumberInput
                label="Monthly Debt Payments"
                value={monthlyDebt}
                onChange={setMonthlyDebt}
                min={0}
                step={50}
                suffix="$"
              />
              <NumberInput
                label="Down Payment (%)"
                value={downPaymentPercent}
                onChange={setDownPaymentPercent}
                min={0}
                max={100}
                step={1}
                suffix="%"
              />
              <NumberInput
                label="Interest Rate (APR)"
                value={interestRate}
                onChange={setInterestRate}
                min={0}
                step={0.1}
                suffix="%"
              />
              <NumberInput label="Loan Term (years)" value={termYears} onChange={setTermYears} min={5} step={5} />
              <NumberInput
                label="Max DTI Ratio (%)"
                value={maxDTI}
                onChange={setMaxDTI}
                min={20}
                max={50}
                step={1}
                suffix="%"
              />
            </div>

            <div className="space-y-4">
              <ResultCard title="Affordability Estimate">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light">Affordable Home Price</span>
                    <span className="text-2xl font-bold text-white">{toCurrency(calc.affordablePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Down Payment</span>
                    <span className="text-white">{toCurrency(calc.downPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Loan Amount</span>
                    <span className="text-white">
                      {toCurrency(calc.affordablePrice - calc.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Estimated Monthly Payment</span>
                    <span className="text-white">{toCurrency(calc.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light">Total Interest (estimated)</span>
                    <span className="text-white">{toCurrency(calc.totalInterest)}</span>
                  </div>
                </div>
              </ResultCard>

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-3">Assumptions & Notes</h3>
                <ul className="space-y-2 text-sm text-text-secondary-light list-disc list-inside">
                  <li>DTI (Debt-to-Income) includes mortgage payment + existing monthly debt</li>
                  <li>Most lenders prefer DTI under 36% for conventional loans</li>
                  <li>Taxes, insurance, and HOA fees not included in monthly payment estimate</li>
                  <li>Your actual rate and terms depend on credit score, loan type, and lender</li>
                  <li>This is an estimate—consult a mortgage professional for accurate figures</li>
                </ul>
              </div>

              <p className="text-xs text-text-secondary-light">
                Disclaimer: Results are estimates for educational purposes only. Actual affordability may vary based on
                credit score, property taxes, insurance, and lender requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}

