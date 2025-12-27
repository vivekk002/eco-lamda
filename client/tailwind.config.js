/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        focus: {
          bg: '#FFFFFF',
          dark: '#121212',
          surface: '#F8F9FA',
          surfacedark: '#1E1E1E',
          accent: '#14B8A6', // Teal
          border: '#E2E8F0',
          borderdark: '#2D2D2D'
        }
      },
      boxShadow: {
        'deep': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'deep-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 4px 15px -5px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
