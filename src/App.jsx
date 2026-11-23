import { MotionConfig } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Section from './components/Section'
import { profileData } from './data/profile'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Layout>
          {profileData.navLinks.map((item, idx) => (
            <Section
              key={item.id}
              id={item.id}
              label={item.label.toLowerCase()}
              heading={item.label}
              texture={idx % 2 === 0 ? 'dots' : 'none'}
              className="min-h-[65vh]"
            >
              {idx === 0 && (
                <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
                  {profileData.name}
                </h1>
              )}
              <p className="mt-4 font-mono text-xs text-muted">
                Section placeholder: #{item.id}
              </p>
            </Section>
          ))}
        </Layout>
      </ThemeProvider>
    </MotionConfig>
  )
}
