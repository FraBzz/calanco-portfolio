/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F5F5DC',
          dark: '#1A1A18'
        },
        text: {
          light: '#232323',
          dark: '#E3C198'
        },
        accent: '#4E342E',
        accent2: '#D7A86E',
        cta: '#0088A8',
        separator: {
          light: '#EDEDED',
          dark: '#2D2D2D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};