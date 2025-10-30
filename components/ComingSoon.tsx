"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Bell,
  Smartphone,
  Sparkles,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (adjust as needed)
  const launchDate = new Date("2025-03-01T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send to your backend/email service
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const handleDownload = (platform: "ios" | "android") => {
    if (platform === "ios") {
      // Replace with actual App Store URL when available
      window.open("https://apps.apple.com/app/expenvisor", "_blank");
    } else {
      // Replace with actual Play Store URL when available
      window.open(
        "https://play.google.com/store/apps/details?id=com.expenvisor",
        "_blank"
      );
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark animate-gradient" />

      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className="absolute w-20 h-20 bg-accent/10 rounded-full blur-xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block"
          >
            <Sparkles className="w-16 h-16 text-accent mx-auto" />
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-6 mb-4">
            <span className="text-white">Expenvisor</span>
          </h1>
          <p className="text-xl sm:text-2xl text-text-secondary-light">
            AI-Powered Expense Tracker
          </p>
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30"
          >
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold text-lg">
              Coming Soon
            </span>
          </motion.div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-text-secondary-light mb-6 text-lg">
            Launching in:
          </p>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-surface-dark/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-secondary/20"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm sm:text-base text-text-secondary-light">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-lg sm:text-xl text-text-secondary-light max-w-2xl mx-auto leading-relaxed">
            Track expenses with voice commands, scan receipts with AI, and get
            personalized financial insights. Your smart finance companion is
            almost here!
          </p>
        </motion.div>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <p className="text-text-secondary-light mb-6">
            Get notified when we launch:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload("ios")}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[56px]"
            >
              <Smartphone className="w-6 h-6 mr-3" />
              <span>Download for iOS</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload("android")}
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[56px]"
            >
              <Smartphone className="w-6 h-6 mr-3" />
              <span>Download for Android</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Email Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-surface-dark/50 backdrop-blur-md border border-secondary/20 rounded-xl text-white placeholder-text-secondary-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitted}
                className="px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitted ? (
                  <>
                    <span>✓</span>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    <span>Notify Me</span>
                  </>
                )}
              </motion.button>
            </div>
            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-accent text-sm"
              >
                🎉 Thanks! We'll notify you when we launch.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            {
              icon: "🎤",
              title: "Voice Commands",
              desc: "Track expenses by speaking",
            },
            {
              icon: "📷",
              title: "AI Receipt Scan",
              desc: "Smart OCR technology",
            },
            {
              icon: "📊",
              title: "Smart Insights",
              desc: "Personalized analytics",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-surface-dark/30 backdrop-blur-md rounded-xl p-6 border border-secondary/20"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary-light text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
