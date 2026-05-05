"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "The basics, always free",
    features: [
      "Unlimited manual transactions",
      "Income & expense tracking",
      "Basic charts & history",
      "50 AI chat messages / month",
      "30 voice entries / month",
      "5 receipt scans / month",
      "Works offline, local storage",
    ],
    limitations: [
      "No cloud sync or backup",
      "No data export",
    ],
    popular: false,
    cta: "Download Free",
    ctaHref: "https://apps.apple.com/us/app/expenvisor-ai-expense-tracker/id6754627757",
  },
  {
    name: "Pro",
    price: "$6.99",
    period: "per month",
    yearlyPrice: "$49.99",
    yearlyPeriod: "per year (save 40%)",
    description: "Unlimited everything. 14-day free trial.",
    features: [
      "Everything in Free",
      "Unlimited AI chat",
      "Unlimited voice entry",
      "Unlimited receipt scanning",
      "Cloud sync & encrypted backup",
      "Export data (CSV & PDF)",
      "Advanced analytics",
      "Ledger / debt tracking",
      "Recurring payment automation",
      "All currencies & languages",
      "Priority email support",
    ],
    limitations: [],
    popular: true,
    cta: "Start Free Trial",
    ctaHref: "https://apps.apple.com/us/app/expenvisor-ai-expense-tracker/id6754627757",
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-surface-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-text-primary-dark">Simple, Transparent</span>
            <br />
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-text-secondary-dark max-w-2xl mx-auto">
            Free gets you a lot. Pro removes every limit. No hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? "md:-mt-6" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-full text-sm font-semibold">
                    14-day free trial
                  </div>
                </div>
              )}

              <div
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl h-full flex flex-col ${
                  plan.popular
                    ? "border-accent bg-gradient-to-b from-accent/5 to-secondary/5"
                    : "border-border-dark bg-surface-elevated-dark"
                }`}
              >
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary-dark mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary-dark mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span
                      className={`text-5xl font-bold ${
                        plan.popular ? "gradient-text" : "text-text-primary-dark"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-text-secondary-dark">
                      {plan.period}
                    </span>
                  </div>
                  {plan.yearlyPrice && (
                    <p className="mt-2 text-sm text-text-secondary-dark">
                      or{" "}
                      <span className="text-accent font-semibold">
                        {plan.yearlyPrice}
                      </span>{" "}
                      {plan.yearlyPeriod}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? "text-accent" : "text-green-500"
                        }`}
                      />
                      <span className="text-text-secondary-dark text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-start gap-3">
                      <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-text-tertiary-dark" />
                      <span className="text-sm text-text-tertiary-dark">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg text-center cursor-pointer transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-accent to-secondary text-white hover:shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/15"
                    }`}
                  >
                    {plan.cta}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-text-secondary-dark space-y-1"
        >
          <p>Subscriptions managed through your Apple ID. Cancel anytime.</p>
          <p>Prices in USD. App Store pricing may vary by region.</p>
        </motion.div>
      </div>
    </section>
  );
}
