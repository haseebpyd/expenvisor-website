"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

// TikTok icon component (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/expenvisor",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@ExpenvisorAI",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/expenvisor",
  },
  {
    name: "X (Twitter)",
    icon: XIcon,
    href: "https://twitter.com/expenvisor",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    href: "https://tiktok.com/@expenvisor",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/company/expenvisor",
  },
];

export default function SocialBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-sm border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-10">
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 flex items-center justify-center text-text-secondary-light hover:text-accent transition-colors duration-200"
                aria-label={social.name}
              >
                {social.name === "X (Twitter)" || social.name === "TikTok" ? (
                  <social.icon className="w-4 h-4" />
                ) : (
                  <social.icon className="w-4 h-4" />
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

