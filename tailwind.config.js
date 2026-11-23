/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        'serif-accent': ['"Instrument Serif"', 'serif'],
      },
      colors: {
        canvas: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--fg)',
        muted: 'var(--muted)',
        subtle: 'var(--subtle)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
        'invert-bg': 'var(--invert-bg)',
        'invert-fg': 'var(--invert-fg)',
      },
    },
  },
  plugins: [],
}
