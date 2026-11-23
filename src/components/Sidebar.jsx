import { motion } from 'motion/react'
import { profileData } from '../data/profile'
import { useManilaTime } from '../hooks/useManilaTime'
import { SPRING } from '../lib/motion'
import NavIcon from './NavIcon'
import ThemeToggle from './ThemeToggle'

export default function Sidebar({ activeSection, onSelect }) {
  const manilaTime = useManilaTime(profileData.timezone)
  const isAvailable = profileData.availability?.open

  return (
    <aside
      aria-label="Sidebar"
      data-testid="desktop-sidebar"
      className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-60 flex-col justify-between border-r border-line bg-canvas px-5 py-7 select-none"
    >
      {/* Top: Identity & Availability */}
      <div className="space-y-6">
        <a
          href="#home"
          onClick={() => onSelect?.('home')}
          className="group flex items-center gap-3 focus-visible:outline-2"
        >
          <span className="w-9 h-9 shrink-0 border border-line-strong flex items-center justify-center font-display text-xs font-bold tracking-tight text-ink group-hover:bg-invert-bg group-hover:text-invert-fg transition-colors duration-150">
            {profileData.initials}
          </span>
          <span className="min-w-0">
            <span className="block font-display text-sm font-semibold tracking-tight text-ink truncate">
              {profileData.name}
            </span>
            <span className="block font-mono text-[11px] text-muted truncate">
              {profileData.title}
            </span>
          </span>
        </a>

        {/* Monochrome Availability Status */}
        {profileData.availability?.label && (
          <div className="flex items-center gap-2.5 border-y border-line py-2.5 font-mono text-[11px] text-muted">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              {isAvailable && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-50" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isAvailable ? 'bg-ink' : 'border border-muted bg-transparent'
                }`}
              />
            </span>
            <span className="truncate">
              {isAvailable
                ? profileData.availability.label
                : profileData.availability.closedLabel}
            </span>
          </div>
        )}

        {/* Primary Section Navigation */}
        <nav aria-label="Primary">
          <ul className="space-y-1">
            {profileData.navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => onSelect?.(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? 'text-ink font-medium'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active-indicator"
                        transition={SPRING}
                        aria-hidden="true"
                        className="absolute inset-0 bg-surface border-l-2 border-ink -z-10"
                      />
                    )}
                    <span className="font-mono text-[11px] text-subtle w-5">
                      {link.num}
                    </span>
                    <NavIcon name={link.icon} className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom: Theme Toggle, Live Manila Clock, Socials */}
      <div className="border-t border-line pt-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-subtle">
              Manila
            </span>
            <span
              aria-live="off"
              data-testid="sidebar-clock"
              className="block font-mono text-xs text-ink tabular-nums"
            >
              {manilaTime}
            </span>
          </div>
          <ThemeToggle />
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
                className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] border border-line text-muted hover:text-ink hover:border-line-strong transition-colors duration-150"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={social.svg} />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
