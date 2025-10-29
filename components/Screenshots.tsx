"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const screenshots = [
  {
    title: "AI Chat",
    description: "Intelligent expense tracking through natural conversation",
    image: "/screenshots/IMG_4729.PNG",
    alt: "AI Chat Screen",
  },
  {
    title: "History & Transactions",
    description: "View and manage all your transactions in one place",
    image: "/screenshots/IMG_4730.PNG",
    alt: "History Screen",
  },
  {
    title: "Analytics Dashboard",
    description: "Beautiful charts and spending insights",
    image: "/screenshots/IMG_4731.PNG",
    alt: "Analytics Screen",
  },
  {
    title: "Add Expense",
    description: "Quickly add expenses with category selection",
    image: "/screenshots/IMG_4732.PNG",
    alt: "Add Expense Screen",
  },
  {
    title: "Category Management",
    description: "Organize and customize your expense categories",
    image: "/screenshots/IMG_4733.PNG",
    alt: "Category Management Screen",
  },
  {
    title: "Settings",
    description: "Customize your experience and preferences",
    image: "/screenshots/IMG_4734.PNG",
    alt: "Settings Screen",
  },
  {
    title: "Detailed View",
    description: "Comprehensive transaction details and insights",
    image: "/screenshots/IMG_4735.PNG",
    alt: "Transaction Detail Screen",
  },
];

export default function Screenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const mqTablet = window.matchMedia(
      "(min-width: 641px) and (max-width: 1024px)"
    );
    const compute = () =>
      setItemsPerPage(mqMobile.matches ? 1 : mqTablet.matches ? 2 : 3);
    compute();
    [mqMobile, mqTablet].forEach((mq) =>
      mq.addEventListener("change", compute)
    );
    return () =>
      [mqMobile, mqTablet].forEach((mq) =>
        mq.removeEventListener("change", compute)
      );
  }, []);

  const getVisibleScreens = () => {
    return Array.from({ length: itemsPerPage }, (_, i) => {
      const index = (currentIndex + i) % screenshots.length;
      return screenshots[index];
    });
  };

  const totalPages = Math.ceil(screenshots.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - itemsPerPage + screenshots.length) % screenshots.length
    );
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * itemsPerPage);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex(
          (prev) =>
            (prev - itemsPerPage + screenshots.length) % screenshots.length
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + itemsPerPage) % screenshots.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itemsPerPage]);

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
            Take a look at the beautiful interface and powerful features that
            make Expenvisor the best expense tracker.
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
          {/* Screenshots Grid */}
          <div className="relative max-w-7xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              aria-label="Previous screenshots"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next screenshots"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleScreens().map((screenshot, idx) => {
                const actualIndex = (currentIndex + idx) % screenshots.length;
                return (
                  <motion.div
                    key={`${actualIndex}-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Phone Frame */}
                    <div className="relative w-full h-[600px] bg-surface-dark rounded-3xl p-2 shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-b from-primary to-secondary rounded-2xl overflow-hidden relative">
                        <Image
                          src={screenshot.image}
                          alt={screenshot.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    </div>

                    {/* Screenshot Info */}
                    <div className="text-center mt-4">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {screenshot.title}
                      </h3>
                      <p className="text-sm text-text-secondary-light">
                        {screenshot.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center mt-12 space-x-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage
                    ? "bg-accent scale-125"
                    : "bg-white/30 hover:bg-white/50"
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
  );
}
