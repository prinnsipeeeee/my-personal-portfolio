/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark blue theme para sa primary/dark background
        'brand-dark': {
          DEFAULT: '#0B132B',
          surface: '#1C2541',
        },
        // Orange theme para sa accent
        'brand-orange': {
          DEFAULT: '#F77F00',
          hover: '#D66D00',
        },
      },
    },
  },
  plugins: [],
}