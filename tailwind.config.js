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
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'cursor-blink': 'blink 1.1s infinite',
      },
    },
  },
  plugins: [],
}