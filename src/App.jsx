import { MotionConfig } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Stack from './components/Stack'
import Work from './components/Work'
import Experience from './components/Experience'
import GitHubActivity from './components/GitHubActivity'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Layout footer={<Footer />}>
          <Home />
          <About />
          <Stack />
          <Work />
          <Experience />
          <GitHubActivity />
          <Contact />
        </Layout>
      </ThemeProvider>
    </MotionConfig>
  )
}
