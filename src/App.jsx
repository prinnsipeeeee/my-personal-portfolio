import { MotionConfig } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Section from './components/Section'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <div className="bg-grain-overlay" aria-hidden="true" data-testid="grain-overlay" />
        <main id="main-content" className="min-h-screen bg-canvas text-ink">
          <Section
            id="home"
            label="design system"
            heading="Monochrome"
            headingAccent="editorial"
            headingEnd="foundation."
            description="Black and white palette, subtle grain texture, and restrained motion."
            texture="dots"
          >
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="font-mono text-xs text-muted">
                Toggle light / dark theme
              </span>
            </div>
          </Section>
        </main>
      </ThemeProvider>
    </MotionConfig>
  )
}
