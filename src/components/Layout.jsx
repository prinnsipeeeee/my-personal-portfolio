import { useMemo } from 'react'
import { profileData } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function Layout({ children, footer = null }) {
  const sectionIds = useMemo(
    () => profileData.navLinks.map((link) => link.id),
    []
  )
  const [activeSection, setActiveSection] = useActiveSection(sectionIds)

  return (
    <div className="relative min-h-screen bg-canvas text-ink">
      {/* Global Fixed Grain Texture Overlay */}
      <div className="bg-grain-overlay" aria-hidden="true" data-testid="grain-overlay" />

      {/* Keyboard Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Desktop Fixed Sidebar */}
      <Sidebar activeSection={activeSection} onSelect={setActiveSection} />

      {/* Mobile & Tablet Topbar + Drawer */}
      <MobileNav activeSection={activeSection} onSelect={setActiveSection} />

      {/* Main Content Shell offset for desktop sidebar & mobile topbar */}
      <div className="lg:pl-60 min-h-screen flex flex-col">
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 pt-14 lg:pt-0 focus:outline-none"
        >
          {children}
        </main>
        {footer}
      </div>
    </div>
  )
}
