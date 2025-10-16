/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#191970',  // Midnight Blue
          light: '#2E2E8B',
          dark: '#0A0A30',
        },
        accent: {
          DEFAULT: '#00FFA3',  // Electric Mint
          light: '#33FFBA',
          dark: '#00CC82',
        },
        secondary: {
          DEFAULT: '#A78BFA',  // Soft Purple
          light: '#C4B5FD',
          dark: '#8B5CF6',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#0F0F23',
          elevated: {
            light: '#F8F9FA',
            dark: '#1A1A2E',
          }
        },
        text: {
          primary: {
            light: '#1A1A1A',
            dark: '#FFFFFF',
          },
          secondary: {
            light: '#6B7280',
            dark: '#9CA3AF',
          },
          tertiary: {
            light: '#9CA3AF',
            dark: '#6B7280',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'midnight-aurora': 'linear-gradient(135deg, #191970 0%, #A78BFA 50%, #00FFA3 100%)',
      },
    },
  },
  plugins: [],
}