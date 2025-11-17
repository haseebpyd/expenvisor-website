"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitIntentCTA() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-8 max-w-md mx-4 shadow-2xl relative"
        >
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 text-text-secondary-light hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-2xl font-bold text-white mb-3">Before you go...</h3>
          <p className="text-text-secondary-light mb-6">
            Download Expenvisor for free and track your expenses effortlessly with AI-powered insights.
          </p>
          <a
            href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download Expenvisor
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

