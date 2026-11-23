import { MotionConfig } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Section from './components/Section'
import Home from './components/Home'
import About from './components/About'
import Stack from './components/Stack'
import Work from './components/Work'
import Experience from './components/Experience'
import GitHubActivity from './components/GitHubActivity'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Layout>
          <Home />
          <About />
          <Stack />
          <Work />
          <Experience />
          <GitHubActivity />
          <Section
            id="contact"
            label="07 — contact"
            heading="Contact"
            className="min-h-[60vh]"
          >
            <p className="font-mono text-xs text-muted">
              Section placeholder: #contact
            </p>
          </Section>
        </Layout>
      </ThemeProvider>
    </MotionConfig>
  )
}
