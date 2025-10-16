'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Unlimited manual transactions',
      'Basic charts & analytics',
      '50 AI chat messages/month',
      '30 voice inputs/month',
      '5 receipt scans/month',
      'Local data storage',
    ],
    limitations: [
      'No cloud sync',
      'No export features',
      'Limited AI features',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Premium',
    price: '$4.99',
    period: 'per month',
    description: 'Everything you need for smart finance management',
    features: [
      'Everything in Free',
      'Unlimited AI chat',
      'Unlimited voice input',
      'Unlimited receipt scanning',
      'Advanced AI insights',
      'Cloud sync & backup',
      'Export data (CSV, PDF)',
      'Priority support',
      'Custom categories',
      'Multi-account support',
    ],
    limitations: [],
    popular: true,
    cta: 'Start Free Trial',
  },
]

export default function Pricing() {
  return (
    <section className="py-20 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-text-primary-light dark:text-text-primary-dark">Simple, Transparent</span>
            <br />
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
            Choose the plan that works best for you. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative ${
                plan.popular ? 'md:-mt-8' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? 'border-accent bg-gradient-to-b from-accent/5 to-secondary/5'
                  : 'border-border-light dark:border-border-dark bg-surface-elevated-light dark:bg-surface-elevated-dark'
              }`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-5xl font-bold ${
                      plan.popular ? 'gradient-text' : 'text-text-primary-light dark:text-text-primary-dark'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-accent' : 'text-primary'
                      }`} />
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-2 mb-8">
                    <h4 className="text-sm font-semibold text-text-tertiary-light dark:text-text-tertiary-dark mb-2">
                      Limitations:
                    </h4>
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start">
                        <span className="text-text-tertiary-light dark:text-text-tertiary-dark mr-3">•</span>
                        <span className="text-sm text-text-tertiary-light dark:text-text-tertiary-dark">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-accent to-secondary text-white hover:shadow-lg'
                      : 'bg-primary text-white hover:bg-primary-light'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
            Have questions? We've got answers.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Can I cancel anytime?
                </h4>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Is there a free trial?
                </h4>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Yes! Premium comes with a 7-day free trial. No credit card required to start.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  We accept all major credit cards, PayPal, and Apple Pay/Google Pay through the app stores.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                  Is my data secure?
                </h4>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Absolutely. We use bank-level encryption and never sell your data. Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}