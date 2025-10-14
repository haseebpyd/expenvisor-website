import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "1": "0.25rem", // 4px
        "2": "0.5rem", // 8px
        "3": "0.75rem", // 12px
        "4": "1rem", // 16px
        "6": "1.5rem", // 24px
        "8": "2rem", // 32px
        "12": "3rem", // 48px
        "16": "4rem", // 64px
        "20": "5rem", // 80px
        "24": "6rem", // 96px
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        "bg-primary": "#0F1629",
        "bg-secondary": "#1A1F35",
        surface: "#1E2433",
        "accent-cyan": "#00D9FF",
        "accent-purple": "#A78BFA",
        "accent-mint": "#00FFA3",
        "accent-pink": "#FF6B9D",
        "accent-yellow": "#FFD93D",
        "text-primary": "#FFFFFF",
        "text-secondary": "#94A3B8",
        "text-tertiary": "#64748B",
        // Legacy colors for backward compatibility
        primary: {
          DEFAULT: "#0F1629",
          light: "#1A1F35",
          dark: "#0A0A30",
        },
        accent: {
          DEFAULT: "#00D9FF",
          light: "#33E0FF",
          dark: "#00B8E6",
        },
        secondary: {
          DEFAULT: "#A78BFA",
          light: "#C4B5FD",
          dark: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xs: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        sm: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        base: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        lg: "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        xl: "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "2xl": "clamp(1.5rem, 1.3rem + 1vw, 1.875rem)",
        "3xl": "clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)",
        "4xl": "clamp(2.25rem, 1.9rem + 1.75vw, 3rem)",
        "5xl": "clamp(3rem, 2.5rem + 2.5vw, 3.75rem)",
        "6xl": "clamp(3.75rem, 3rem + 3.75vw, 4.5rem)",
        "7xl": "clamp(4.5rem, 3.5rem + 5vw, 6rem)",
      },
      backgroundImage: {
        holographic:
          "linear-gradient(135deg, #FF6B9D 0%, #FFD93D 25%, #00FFA3 50%, #00D9FF 75%, #A78BFA 100%)",
        "holographic-alt":
          "linear-gradient(225deg, #A78BFA 0%, #00D9FF 25%, #00FFA3 50%, #FFD93D 75%, #FF6B9D 100%)",
        "holographic-vertical":
          "linear-gradient(180deg, #FF6B9D 0%, #FFD93D 25%, #00FFA3 50%, #00D9FF 75%, #A78BFA 100%)",
      },
      backdropBlur: {
        glass: "20px",
        "glass-mobile": "10px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float 4s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-cyan": "glowCyan 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 163, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 255, 163, 0.8)" },
        },
        glowCyan: {
          "0%": { boxShadow: "0 0 5px rgba(0, 217, 255, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.6)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
