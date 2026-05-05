'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is my data secure?',
    answer: 'Your data is stored locally on your device by default — it never leaves your phone unless you turn on cloud sync. When cloud sync is enabled, data is encrypted in transit and at rest via Firebase. We never sell your data, period.',
  },
  {
    question: 'How does the AI actually work?',
    answer: 'The AI chat is powered by Groq (llama-3.3-70b). Voice input uses Whisper for transcription. When you ask a question like "how much did I spend on food last month?", it reads your local transaction data and answers based on your real numbers — not generic advice.',
  },
  {
    question: 'Which devices are supported?',
    answer: 'Expenvisor is an iOS app for iPhone. It requires iOS 15 or later. There is no Android version currently.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer: 'Yes — Pro comes with a 14-day free trial. No payment until the trial ends, and you can cancel any time from your iPhone\'s subscription settings.',
  },
  {
    question: 'What\'s the difference between Free and Pro?',
    answer: 'Free gives you unlimited manual transactions, basic charts, and a monthly allowance of AI features (voice entries, receipt scans, AI chat messages). Pro removes all limits: unlimited AI usage, cloud sync and backup, data export (CSV/PDF), and advanced analytics.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Subscriptions are managed through your Apple ID. Cancel anytime in Settings → Apple ID → Subscriptions. You\'ll keep Pro access until the current billing period ends.',
  },
  {
    question: 'Do you have an Android or web version?',
    answer: 'No — Expenvisor is currently iOS only. An Android version is on the roadmap but no release date yet.',
  },
  {
    question: 'How do refunds work?',
    answer: 'Refunds go through Apple. Open the App Store, tap your profile, go to Purchases, find Expenvisor, and request a refund. Apple typically processes these within a few days.',
  },
  {
    question: 'Who built this?',
    answer: 'Expenvisor is an indie app built by one developer — Muhammad Haseeb. If you email support, you\'re emailing him directly.',
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
            <span className="text-white">Honest Answers to</span>
            <br />
            <span className="gradient-text">Common Questions</span>
          </h2>
          <p className="text-xl text-text-secondary-dark max-w-3xl mx-auto">
            Straight answers — no marketing fluff.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
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
              Email directly — you'll get a reply from the developer, not a bot.
            </p>
            <motion.a
              href="mailto:haseeb@alrighttech.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              haseeb@alrighttech.com
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
