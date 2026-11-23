import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

function readStoredTheme() {
  try {
    const value = localStorage.getItem('theme')
    if (value === 'dark' || value === 'light') return value
  } catch {
    // Storage access blocked (private browsing / sandbox)
  }
  return null
}

function getSystemPrefersDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyThemeToDOM(resolvedTheme, storedOverride) {
  const isDark = resolvedTheme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) {
    meta.setAttribute('content', storedOverride ?? 'light dark')
  }
}

export function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useState(() => readStoredTheme())
  const [systemDark, setSystemDark] = useState(() => getSystemPrefersDark())

  const theme = storedTheme ?? (systemDark ? 'dark' : 'light')
  const isDark = theme === 'dark'

  useEffect(() => {
    applyThemeToDOM(theme, storedTheme)
  }, [theme, storedTheme])

  // Follow OS scheme changes when no manual override is stored
  useEffect(() => {
    if (!window.matchMedia) return undefined
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onMediaChange = (e) => setSystemDark(e.matches)
    media.addEventListener('change', onMediaChange)
    return () => media.removeEventListener('change', onMediaChange)
  }, [])

  // Keep multiple tabs synchronized
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'theme') {
        setStoredTheme(e.newValue === 'dark' || e.newValue === 'light' ? e.newValue : null)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setTheme = useCallback((nextTheme) => {
    const next = nextTheme === 'dark' ? 'dark' : 'light'
    setStoredTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Ignore write failures; theme still applies in memory & DOM
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
  }, [isDark, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
