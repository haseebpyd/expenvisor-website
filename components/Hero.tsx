"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Star } from "lucide-react";
import Image from "next/image";

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
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-accent/15 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-white">Smart AI-Powered</span>
              <br />
              <span className="gradient-text">Expense Tracking</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-text-secondary-light max-w-2xl mx-auto lg:mx-0"
            >
              Track expenses with voice, scan receipts with AI, get personalized
              financial insights. Your finances, flowing seamlessly.
            </motion.p>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px] gradient-button"
                style={{
                  background: "linear-gradient(to right, #00FFA3, #A78BFA)",
                  WebkitBackgroundClip: "padding-box",
                }}
              >
                <Download className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Download for iOS</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px] gradient-button"
                style={{
                  background: "linear-gradient(to right, #A78BFA, #00FFA3)",
                  WebkitBackgroundClip: "padding-box",
                }}
              >
                <Download className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Download for Android</span>
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-sm sm:text-base text-text-secondary-light">
                  4.9/5 rating
                </span>
              </div>
              <div className="hidden sm:block text-text-secondary-light">•</div>
              <div className="text-sm sm:text-base text-text-secondary-light">
                10,000+ downloads
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden sm:flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="w-64 sm:w-72 lg:w-80 h-[480px] sm:h-[540px] lg:h-[600px] bg-surface-dark rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-primary to-secondary rounded-[2.5rem] overflow-hidden relative">
                  <Image
                    src="/screenshots/hero.PNG"
                    alt="Expenvisor App Hero"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>

              {/* Floating Elements around phone */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-accent/80 rounded-full flex items-center justify-center text-white text-xl"
              >
                🎤
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
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
  );
}
