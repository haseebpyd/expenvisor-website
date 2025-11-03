"use client";

import ToolLayout from "../ToolLayout";
import { useMemo, useState } from "react";
import { NumberInput, ResultCard } from "@/components/tools/inputs";

type Row = { month: number; interest: number; principal: number; balance: number };

function amortize(amount: number, annualRate: number, months: number): { payment: number; rows: Row[]; totalInterest: number } {
  const r = annualRate / 100 / 12;
  const payment = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
  let balance = amount;
  const rows: Row[] = [];
  let totalInterest = 0;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principal = Math.min(payment - interest, balance);
    balance = Math.max(0, balance - principal);
    totalInterest += interest;
    rows.push({ month: m, interest, principal, balance });
  }
  return { payment, rows, totalInterest };
}

function toCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState(20000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);

  const months = Math.max(1, Math.round(termYears * 12));
  const calc = useMemo(() => amortize(amount, rate, months), [amount, rate, months]);

  const csv = useMemo(() => {
    const header = "Month,Interest,Principal,Balance\n";
    const body = calc.rows
      .map((r) => `${r.month},${r.interest.toFixed(2)},${r.principal.toFixed(2)},${r.balance.toFixed(2)}`)
      .join("\n");
    return header + body;
  }, [calc.rows]);

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amortization.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Loan Calculator</h1>
            <p className="text-text-secondary-light">Estimate monthly payment and view an amortization schedule.</p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <NumberInput label="Loan Amount" value={amount} onChange={setAmount} min={0} step={100} suffix="$" />
              <NumberInput label="Interest Rate (APR)" value={rate} onChange={setRate} min={0} step={0.1} suffix="%" />
              <NumberInput label="Term (years)" value={termYears} onChange={setTermYears} min={0.5} step={0.5} />

              <div className="flex gap-3">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold btn-hover"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <ResultCard title="Results">
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Monthly Payment</span><span>{toCurrency(calc.payment)}</span></div>
                  <div className="flex justify-between"><span>Total Interest</span><span>{toCurrency(calc.totalInterest)}</span></div>
                  <div className="flex justify-between"><span>Term</span><span>{months} months</span></div>
                </div>
              </ResultCard>

              <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-4 shadow-2xl overflow-auto max-h-[420px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-text-secondary-light">
                      <th className="py-2 pr-4">Month</th>
                      <th className="py-2 pr-4">Interest</th>
                      <th className="py-2 pr-4">Principal</th>
                      <th className="py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.rows.map((r) => (
                      <tr key={r.month} className="border-t border-secondary/10 text-text-secondary-light">
                        <td className="py-2 pr-4">{r.month}</td>
                        <td className="py-2 pr-4">{toCurrency(r.interest)}</td>
                        <td className="py-2 pr-4">{toCurrency(r.principal)}</td>
                        <td className="py-2">{toCurrency(r.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-text-secondary-light">
                Disclaimer: Results are estimates for educational purposes and may not reflect your lender's terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}


