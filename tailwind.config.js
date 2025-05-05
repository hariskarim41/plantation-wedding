/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        cream: {
          50: '#FFFBF7',
          100: '#FFF7ED',
          200: '#FFEBD1',
        },
        olive: {
          50: '#F4F5F0',
          100: '#E9EAE1',
          200: '#D3D6C3',
          300: '#BDC1A6',
          400: '#A8AD88',
          500: '#92986B',
          600: '#5F653C', // Brand primary color
          700: '#4A4E2E',
          800: '#35371F',
          900: '#20211A',
        },
        dark: {
          50: '#EAEAEA',
          100: '#D6D6D6',
          200: '#ADADAD',
          300: '#848484',
          400: '#5B5B5B',
          500: '#363636',
          600: '#2A2A2A',
          700: '#1F1F1F',
          800: '#141719', // Brand secondary color
          900: '#0A0A0A',
        },
        // Secondary colors
        gold: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans: ['"Gill Sans Nova"', 'Gill Sans', 'Gill Sans MT', 'sans-serif'],
        serif: ['"Gill Sans Nova"', 'Gill Sans', 'Gill Sans MT', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
        'fade-in-delay': 'fadeIn 0.8s ease-in-out 0.2s forwards',
        'fade-in-delay-2': 'fadeIn 0.8s ease-in-out 0.4s forwards',
        'subtle-zoom': 'subtleZoom 20s ease-in-out infinite alternate',
        'subtle-zoom-slow': 'subtleZoom 30s ease-in-out infinite alternate',
        'slide-in-right': 'slideInRight 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        subtleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '10000': '10000ms',
        '20000': '20000ms',
      },
      opacity: {
        '3': '.03',
        '5': '.05',
      }
    },
  },
  plugins: [],
};