import type { Metadata } from "next";
import ToolLayout from "./ToolLayout";
import ToolCard from "./ToolCard";

export const metadata: Metadata = {
  title: "Financial Tools | Expenvisor",
  description:
    "Free, privacy-first calculators: loan payments, mortgage affordability, compound interest, savings goals, taxes, and budgets.",
  alternates: { canonical: "/tools" },
  keywords: [
    "financial tools",
    "loan calculator",
    "mortgage affordability",
    "compound interest",
    "savings goal",
    "income tax",
    "budget planner",
  ],
};

const tools = [
  // Debt Management
  { title: "Debt Payoff Calculator", slug: "debt-payoff-calculator", desc: "Compare Snowball vs. Avalanche methods and calculate time to debt-free." },
  { title: "Credit Card Payoff Calculator", slug: "credit-card-payoff-calculator", desc: "Calculate time to pay off credit card debt and see total interest paid." },
  { title: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-calculator", desc: "Calculate DTI ratio to assess financial health and loan eligibility." },
  
  // Loans & Mortgages
  { title: "Loan Calculator", slug: "loan-calculator", desc: "Monthly payment and amortization schedule." },
  { title: "Mortgage Affordability", slug: "mortgage-affordability", desc: "How much home can you afford?" },
  { title: "Refinance Calculator", slug: "refinance-calculator", desc: "Calculate refinance savings, break-even point, and compare options." },
  { title: "Car Loan Calculator", slug: "car-loan-calculator", desc: "Calculate auto loan payments, total interest, and compare loan options." },
  { title: "Bi-Weekly Mortgage Calculator", slug: "bi-weekly-mortgage-calculator", desc: "Calculate savings from bi-weekly payments and see payoff time reduction." },
  { title: "APR Calculator", slug: "apr-calculator", desc: "Calculate the true cost of borrowing and compare APR vs. interest rate." },
  
  // Retirement & Investment
  { title: "Retirement Savings Calculator", slug: "retirement-savings-calculator", desc: "Project 401(k), IRA, and Roth IRA growth and plan retirement age." },
  { title: "401(k) Contribution Calculator", slug: "401k-contribution-calculator", desc: "Calculate retirement savings, employer match, and tax savings." },
  { title: "Investment Return Calculator", slug: "investment-return-calculator", desc: "Calculate ROI, annualized returns, and investment performance." },
  
  // Savings & Budgeting
  { title: "Compound Interest", slug: "compound-interest", desc: "Growth with contributions and compounding." },
  { title: "Savings Goal Planner", slug: "savings-goal-planner", desc: "Monthly target and time-to-goal." },
  { title: "Emergency Fund Calculator", slug: "emergency-fund-calculator", desc: "Calculate how much to save for emergencies and plan your safety net." },
  { title: "Budget Planner", slug: "budget-planner", desc: "50/30/20 and custom category planning." },
  { title: "Expense Ratio Calculator", slug: "expense-ratio-calculator", desc: "Analyze monthly expenses and calculate expense-to-income ratio." },
  
  // Business & Freelance
  { title: "Freelance Income Calculator", slug: "freelance-income-calculator", desc: "Calculate taxes, quarterly payments, and after-tax income for self-employed." },
  { title: "Hourly to Salary Converter", slug: "hourly-to-salary-converter", desc: "Convert hourly wage to annual salary and calculate total compensation." },
  { title: "Business Expense Deduction Calculator", slug: "business-expense-deduction-calculator", desc: "Calculate home office, vehicle, and business expense deductions." },
  
  // Advanced Planning
  { title: "Net Worth Calculator", slug: "net-worth-calculator", desc: "Calculate assets vs. liabilities and assess your financial health." },
  { title: "Inflation Calculator", slug: "inflation-calculator", desc: "Calculate purchasing power over time and see how inflation affects your money." },
  { title: "Currency Converter", slug: "currency-converter", desc: "Convert between currencies with exchange rates and travel budget calculator." },
  { title: "Tip Calculator", slug: "tip-calculator", desc: "Calculate restaurant tips, split bills, and service charges." },
  { title: "Income Tax Calculator", slug: "income-tax-calculator", desc: "Estimate taxes with simple assumptions." },
  { title: "HSA Contribution Calculator", slug: "hsa-contribution-calculator", desc: "Calculate HSA contributions, tax savings, and optimize for maximum benefits." },
];

export default function ToolsHubPage() {
  return (
    <ToolLayout>
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Financial Tools</span>
            </h1>
            <p className="text-text-secondary-light max-w-2xl mx-auto">
              Free, privacy-first calculators. Calculate payments, plan savings, and explore scenarios. No sign-up. No tracking. Just answers.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <ToolCard key={t.slug} title={t.title} slug={t.slug} desc={t.desc} />
            ))}
          </div>

          <div className="mt-12 text-center text-text-secondary-light text-sm">
            Results are estimates for educational purposes. Consult a professional for advice.
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}


