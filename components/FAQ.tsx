'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is my data secure?',
    answer: 'Yes, absolutely. We use bank-level encryption (AES-256) to protect your data. All data is encrypted both in transit and at rest. We never sell your personal information and follow strict privacy guidelines.',
  },
  {
    question: 'How does AI work in the app?',
    answer: 'Our AI uses advanced natural language processing to understand your voice commands and text inputs. It learns from your spending patterns to provide personalized insights and automatically categorize your expenses.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time through your account settings or the app store. You\'ll continue to have access to premium features until the end of your current billing period.',
  },
  {
    question: 'What\'s the difference between Free and Premium?',
    answer: 'Free includes unlimited manual transactions, basic charts, and limited AI features (50 chat messages, 30 voice inputs, 5 receipt scans per month). Premium includes unlimited AI features, cloud sync, export capabilities, and advanced insights.',
  },
  {
    question: 'Do you sell my data?',
    answer: 'No, we never sell your personal or financial data. We only use your data to provide the service and improve our AI. We\'re committed to protecting your privacy and being transparent about data usage.',
  },
  {
    question: 'Which devices are supported?',
    answer: 'Expenvisor is available for iOS (iPhone/iPad) and Android devices. We also have a web version for desktop access. All your data syncs seamlessly across devices.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Premium comes with a 7-day free trial. You can try all premium features without any commitment. No credit card required to start the trial.',
  },
  {
    question: 'How do refunds work?',
    answer: 'Refunds are handled through the App Store or Google Play Store according to their policies. For subscription refunds, contact Apple or Google support directly.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Frequently Asked</span>
            <br />
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Got questions? We've got answers. If you don't see your question here, feel free to contact us.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-dark/50 backdrop-blur-sm rounded-xl border border-accent/20 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-accent flex-shrink-0" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-text-secondary-dark leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-surface-dark/30 backdrop-blur-sm rounded-2xl p-8 border border-accent/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-text-secondary-dark mb-6">
              Our support team is here to help you get the most out of Expenvisor.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}