"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { GlassContainer, HolographicCard, HexagonContainer } from "./ui";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic expense tracking",
        "Up to 10 transactions/month",
        "Basic charts",
        "Dark mode",
        "Email support",
      ],
      limitations: ["No voice input", "No receipt scanning", "No AI features"],
      popular: false,
      glowColor: "#64748B",
    },
    {
      name: "Standard",
      price: "$4.99",
      period: "per month",
      description: "Most popular choice",
      features: [
        "Unlimited transactions",
        "Voice input (50/month)",
        "Receipt scanning (20/month)",
        "AI chat (50 messages/month)",
        "Advanced analytics",
        "Export data (CSV)",
        "Priority support",
      ],
      limitations: [],
      popular: true,
      glowColor: "#00D9FF",
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "For power users",
      features: [
        "Everything in Standard",
        "Unlimited voice input",
        "Unlimited receipt scanning",
        "Unlimited AI chat",
        "AI financial advisor",
        "Advanced insights",
        "Export data (CSV, PDF)",
        "Priority support",
        "Custom categories",
      ],
      limitations: [],
      popular: false,
      glowColor: "#A78BFA",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 bg-bg-primary w-full overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-effect text-accent-cyan px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Simple Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-text-primary">Choose Your</span>
            <br />
            <span className="holographic-text">Perfect Plan</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. All plans include our core
            features with no hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-12 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group mx-2 ${
                plan.popular ? "md:-mt-8" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-holographic text-text-primary px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {plan.popular ? (
                <HolographicCard className="p-8 group-hover:-translate-y-2 h-full transition-all duration-300">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="mx-auto mb-4">
                      <HexagonContainer
                        size={64}
                        glowColor={plan.glowColor}
                        variant="filled"
                      >
                        <span className="text-2xl font-bold text-white">
                          {plan.name[0]}
                        </span>
                      </HexagonContainer>
                    </div>

                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {plan.name}
                    </h3>

                    <p className="text-text-secondary mb-4">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-5xl font-bold text-text-primary">
                        {plan.price}
                      </span>
                      <span className="text-text-secondary ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}

                    {plan.limitations.map((limitation, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 opacity-50"
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-text-tertiary flex-shrink-0" />
                        <span className="text-text-tertiary line-through">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="#download"
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 focus-visible min-h-[44px] ${
                      plan.popular
                        ? "bg-text-primary text-bg-primary hover:shadow-lg hover:scale-105"
                        : "glass-effect text-text-primary hover:border-accent-cyan/30"
                    }`}
                    aria-label={`${
                      plan.name === "Free" ? "Get started with" : "Choose"
                    } ${plan.name} plan`}
                  >
                    <span>
                      {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                    </span>
                    {plan.popular && <Star className="w-5 h-5" />}
                  </a>
                </HolographicCard>
              ) : (
                <GlassContainer className="p-8 group-hover:-translate-y-2 h-full transition-all duration-300">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="mx-auto mb-4">
                      <HexagonContainer
                        size={64}
                        glowColor={plan.glowColor}
                        variant="filled"
                      >
                        <span className="text-2xl font-bold text-white">
                          {plan.name[0]}
                        </span>
                      </HexagonContainer>
                    </div>

                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {plan.name}
                    </h3>

                    <p className="text-text-secondary mb-4">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-5xl font-bold text-text-primary">
                        {plan.price}
                      </span>
                      <span className="text-text-secondary ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}

                    {plan.limitations.map((limitation, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-3 opacity-50"
                      >
                        <div className="w-5 h-5 rounded-full border-2 border-text-tertiary flex-shrink-0" />
                        <span className="text-text-tertiary line-through">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href="#download"
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 focus-visible min-h-[44px] ${
                      plan.popular
                        ? "bg-text-primary text-bg-primary hover:shadow-lg hover:scale-105"
                        : "glass-effect text-text-primary hover:border-accent-cyan/30"
                    }`}
                    aria-label={`${
                      plan.name === "Free" ? "Get started with" : "Choose"
                    } ${plan.name} plan`}
                  >
                    <span>
                      {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                    </span>
                    {plan.popular && <Star className="w-5 h-5" />}
                  </a>
                </GlassContainer>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-text-primary mb-8">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-text-secondary">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>

            <div className="text-left">
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Is there a free trial?
              </h4>
              <p className="text-text-secondary">
                Yes! Start with our free plan and upgrade when you&apos;re ready
                for more features.
              </p>
            </div>

            <div className="text-left">
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-text-secondary">
                We accept all major credit cards, PayPal, and Apple/Google Pay.
              </p>
            </div>

            <div className="text-left">
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Can I cancel anytime?
              </h4>
              <p className="text-text-secondary">
                Absolutely! Cancel your subscription anytime with no
                cancellation fees.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
