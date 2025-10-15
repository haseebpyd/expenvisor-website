'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Star } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark animate-gradient" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-accent/15 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-white">Smart AI-Powered</span>
              <br />
              <span className="gradient-text">Expense Tracking</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-text-secondary-light max-w-2xl"
            >
              Track expenses with voice, scan receipts with AI, get personalized financial insights. 
              Your finances, flowing seamlessly.
            </motion.p>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <button className="relative flex items-center px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300">
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <button className="relative flex items-center px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300">
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </button>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-6"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-text-secondary-light">4.9/5 rating</span>
              </div>
              <div className="text-text-secondary-light">•</div>
              <div className="text-text-secondary-light">10,000+ downloads</div>
            </motion.div>
          </motion.div>

          {/* Right Column - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-surface-dark rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-primary to-secondary rounded-[2.5rem] flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">E</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Expenvisor</h3>
                    <p className="text-sm opacity-80">AI Expense Tracker</p>
                    <div className="mt-6 space-y-2">
                      <div className="w-full h-2 bg-white/20 rounded-full" />
                      <div className="w-3/4 h-2 bg-white/20 rounded-full mx-auto" />
                      <div className="w-1/2 h-2 bg-white/20 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements around phone */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-accent/80 rounded-full flex items-center justify-center text-white text-xl"
              >
                🎤
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center text-white text-xl"
              >
                📷
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-text-secondary-light"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}