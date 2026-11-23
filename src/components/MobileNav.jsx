import { useRef, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { profileData } from '../data/profile'
import { useManilaTime } from '../hooks/useManilaTime'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { EASE, DURATION } from '../lib/motion'
import NavIcon from './NavIcon'
import ThemeToggle from './ThemeToggle'

export default function MobileNav({ activeSection, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const drawerRef = useRef(null)
  const manilaTime = useManilaTime(profileData.timezone)
  const isAvailable = profileData.availability?.open

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  useFocusTrap(drawerRef, isOpen, closeDrawer, menuButtonRef)

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    onSelect?.(id)
    document.body.style.overflow = ''
    setIsOpen(false)
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  return (
    <>
      {/* Mobile / Tablet Sticky Top Bar */}
      <header
        data-testid="mobile-topbar"
        className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 border-b border-line bg-canvas/95 backdrop-blur-sm px-4 flex items-center justify-between"
      >
        <a
          href="#home"
          onClick={() => onSelect?.('home')}
          className="flex items-center gap-2.5 min-w-0"
        >
          <span className="w-8 h-8 shrink-0 border border-line-strong flex items-center justify-center font-display text-xs font-bold text-ink">
            {profileData.initials}
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink truncate">
            {profileData.name}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            data-testid="mobile-menu-button"
            className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] px-2.5 py-1.5 border border-line text-muted hover:text-ink hover:border-line-strong transition-colors duration-150"
          >
            {isOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Full-Height Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
              onClick={closeDrawer}
              aria-hidden="true"
              data-testid="mobile-drawer-backdrop"
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
            />

            {/* Drawer Panel */}
            <motion.div
              id="mobile-nav-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              tabIndex={-1}
              data-testid="mobile-nav-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: EASE }}
              className="relative z-10 w-[82vw] max-w-xs h-full bg-canvas border-r border-line flex flex-col justify-between p-5 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {profileData.name}
                    </p>
                    <p className="font-mono text-[11px] text-muted">
                      {profileData.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    aria-label="Close navigation menu"
                    data-testid="mobile-drawer-close"
                    className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] border border-line text-muted hover:text-ink"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {profileData.availability?.label && (
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                    <span
                      className={`inline-flex rounded-full h-2 w-2 shrink-0 ${
                        isAvailable ? 'bg-ink' : 'border border-muted'
                      }`}
                      aria-hidden="true"
                    />
                    <span>
                      {isAvailable
                        ? profileData.availability.label
                        : profileData.availability.closedLabel}
                    </span>
                  </div>
                )}

                <nav aria-label="Mobile">
                  <ul className="space-y-1">
                    {profileData.navLinks.map((link) => {
                      const isActive = activeSection === link.id
                      return (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.id)}
                            aria-current={isActive ? 'location' : undefined}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm border-l-2 transition-colors ${
                              isActive
                                ? 'border-ink bg-surface text-ink font-medium'
                                : 'border-transparent text-muted hover:text-ink'
                            }`}
                          >
                            <span className="font-mono text-[11px] text-subtle w-5">
                              {link.num}
                            </span>
                            <NavIcon name={link.icon} className="w-4 h-4 shrink-0" />
                            <span>{link.label}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>

              <div className="border-t border-line pt-4 flex items-center justify-between gap-3">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-subtle">
                    Manila
                  </span>
                  <span aria-live="off" className="font-mono text-xs text-ink tabular-nums">
                    {manilaTime}
                  </span>
                </div>
                {profileData.socials?.length > 0 && (
                  <div className="flex items-center gap-2">
                    {profileData.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] border border-line text-muted hover:text-ink"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={social.svg} />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
