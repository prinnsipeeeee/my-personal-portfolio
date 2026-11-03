/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        'serif-accent': ['"Instrument Serif"', 'serif'],
        script: ['"Caveat"', 'cursive'],
      },
      colors: {
        'brand-dark': {
          DEFAULT: '#0B132B',
          surface: '#1C2541',
        },
        'brand-orange': {
          DEFAULT: '#F77F00',
          hover: '#D66D00',
        },
      },
    },
  },
  plugins: [],
}