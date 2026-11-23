import { MotionConfig } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Section from './components/Section'
import Home from './components/Home'
import About from './components/About'
import Stack from './components/Stack'
import { profileData } from './data/profile'

const REMAINING_SECTIONS = profileData.navLinks.filter(
  (item) => !['home', 'about', 'stack'].includes(item.id)
)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Layout>
          <Home />
          <About />
          <Stack />
          {REMAINING_SECTIONS.map((item, idx) => (
            <Section
              key={item.id}
              id={item.id}
              label={`${item.num} — ${item.label.toLowerCase()}`}
              heading={item.label}
              texture={idx % 2 === 0 ? 'none' : 'dots'}
              className="min-h-[60vh]"
            >
              <p className="font-mono text-xs text-muted">
                Section placeholder: #{item.id}
              </p>
            </Section>
          ))}
        </Layout>
      </ThemeProvider>
    </MotionConfig>
  )
}
