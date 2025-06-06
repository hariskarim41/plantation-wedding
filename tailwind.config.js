/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f7f8f4',
          100: '#eef0e8',
          200: '#dde2d2',
          300: '#c4cdb1',
          400: '#a8b58a',
          500: '#8fa06b',
          600: '#5F653C',
          700: '#5a5f38',
          800: '#4a4f2f',
          900: '#3f4329',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
        },
        cream: {
          50: '#f7f4f1',
          100: '#f0ebe6',
          200: '#e1d7cc',
          300: '#d0c0a8',
          400: '#bfa584',
          500: '#b3956a',
          600: '#a6875e',
          700: '#8a6f4f',
          800: '#715c44',
          900: '#5c4b38',
        },
      },
      fontFamily: {
        'palatino': ['"palatino-linotype"', '"Palatino Linotype"', '"Palatino"', 'serif'],
        'gill-sans': ['"gill-sans-nova"', '"Gill Sans Nova"', '"Gill Sans"', '"Gill Sans MT"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 