'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const screenshots = [
  {
    title: 'Dashboard',
    description: 'Overview of your finances at a glance',
    image: '/screenshots/dashboard.png',
    alt: 'Expenvisor Dashboard',
  },
  {
    title: 'Voice Input',
    description: 'Add expenses by simply speaking',
    image: '/screenshots/voice.png',
    alt: 'Voice Input Screen',
  },
  {
    title: 'Receipt Scanner',
    description: 'Scan receipts with AI OCR technology',
    image: '/screenshots/scanner.png',
    alt: 'Receipt Scanner Screen',
  },
  {
    title: 'AI Chat',
    description: 'Get insights and advice from AI',
    image: '/screenshots/chat.png',
    alt: 'AI Chat Screen',
  },
  {
    title: 'Analytics',
    description: 'Beautiful charts and spending insights',
    image: '/screenshots/analytics.png',
    alt: 'Analytics Screen',
  },
  {
    title: 'Settings',
    description: 'Customize your experience',
    image: '/screenshots/settings.png',
    alt: 'Settings Screen',
  },
]

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
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
            <span className="text-white">See It In</span>
            <br />
            <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-text-secondary-light max-w-3xl mx-auto">
            Take a look at the beautiful interface and powerful features that make Expenvisor the best expense tracker.
          </p>
        </motion.div>

        {/* Screenshots Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Screenshot */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              {/* Phone Frame */}
              <div className="relative w-full h-[600px] bg-surface-dark rounded-3xl p-2">
                <div className="w-full h-full bg-gradient-to-b from-primary to-secondary rounded-2xl flex items-center justify-center">
                  {/* Placeholder for screenshot */}
                  <div className="text-center text-white p-8">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold">E</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{screenshots[currentIndex].title}</h3>
                    <p className="text-sm opacity-80 mb-6">{screenshots[currentIndex].description}</p>
                    
                    {/* Mock UI elements */}
                    <div className="space-y-3">
                      <div className="w-full h-3 bg-white/20 rounded-full" />
                      <div className="w-4/5 h-3 bg-white/20 rounded-full mx-auto" />
                      <div className="w-3/5 h-3 bg-white/20 rounded-full mx-auto" />
                      <div className="w-2/3 h-3 bg-white/20 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Screenshot Info */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {screenshots[currentIndex].title}
              </h3>
              <p className="text-text-secondary-light">
                {screenshots[currentIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-12 space-x-4">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
          >
            Download Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}