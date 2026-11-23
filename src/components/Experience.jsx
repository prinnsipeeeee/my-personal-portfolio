import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  experienceData,
  formatPeriodDate,
  calculateDuration,
  sortEntriesNewestFirst,
} from '../data/experience'
import { SPRING, EASE, DURATION } from '../lib/motion'
import Section from './Section'

function TimelineEntry({ item, tabId, defaultOpen }) {
  const [expanded, setExpanded] = useState(defaultOpen)
  const shouldReduceMotion = useReducedMotion()

  const isCurrent = tabId !== 'certifications' && item.end === null
  const highlights = Array.isArray(item.highlights) ? item.highlights.filter(Boolean).slice(0, 3) : []
  const tech = Array.isArray(item.tech) ? item.tech.filter(Boolean).slice(0, 6) : []
  const hasExpandable = highlights.length > 0 || tech.length > 0
  const detailsId = `exp-details-${item.id || item.role || item.degree || item.name}`

  const title = item.role || item.degree || item.name
  const org = item.company || item.school || item.issuer
  const duration = item.start ? calculateDuration(item.start, item.end) : ''

  const metaParts = [org, item.location, item.type, duration].filter(Boolean)

  return (
    <li className="relative pl-7 sm:pl-9 pb-10 last:pb-0">
      {/* Timeline Node Dot */}
      <span
        aria-hidden="true"
        className="absolute left-[-5px] top-1.5 flex h-2.5 w-2.5 items-center justify-center"
      >
        {isCurrent && !shouldReduceMotion && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-40" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isCurrent
              ? 'bg-ink'
              : 'bg-canvas border border-line-strong'
          }`}
        />
      </span>

      <div className="border-b border-line pb-8">
        {/* Date Period */}
        <p className="font-mono text-xs text-subtle tracking-wide">
          {tabId === 'certifications'
            ? item.year
            : `${formatPeriodDate(item.start)} — ${formatPeriodDate(item.end)}`}
        </p>

        {/* Entry Heading */}
        <h3 className="mt-1.5 font-display text-lg sm:text-xl font-semibold tracking-tight text-ink">
          {title}
        </h3>

        {/* Organization · Location · Type · Duration */}
        {metaParts.length > 0 && (
          <p className="mt-1 text-sm text-muted">
            {metaParts.join(' · ')}
          </p>
        )}

        {/* Education / Certification Note */}
        {item.note && (
          <p className="mt-2 text-xs sm:text-sm text-subtle leading-relaxed">
            {item.note}
          </p>
        )}

        {/* Expandable Details (Highlights + Tech) */}
        {hasExpandable && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              data-testid="timeline-details-toggle"
              className="inline-flex items-center gap-1.5 min-h-[32px] font-mono text-xs text-muted hover:text-ink transition-colors duration-150"
            >
              <span>{expanded ? 'Hide details' : 'Details'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  expanded ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={detailsId}
                  data-testid="timeline-details-panel"
                  initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-3">
                    {highlights.length > 0 && (
                      <ul className="space-y-1.5 text-sm text-muted leading-relaxed">
                        {highlights.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="font-mono text-subtle select-none" aria-hidden="true">
                              —
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {tech.length > 0 && (
                      <p className="font-mono text-xs text-subtle pt-1">
                        <span className="text-muted">Stack:</span> {tech.join(' · ')}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </li>
  )
}

export default function Experience({ data = experienceData }) {
  const source =
    (typeof window !== 'undefined' && window.__PORTFOLIO_TEST_OVERRIDES__?.experience) || data

  const tabs = useMemo(() => {
    const defs = [
      { id: 'experience', label: 'Experience', items: sortEntriesNewestFirst(source?.experience || []) },
      { id: 'education', label: 'Education', items: sortEntriesNewestFirst(source?.education || []) },
      { id: 'certifications', label: 'Certifications', items: sortEntriesNewestFirst(source?.certifications || []) },
    ]
    return defs.filter((t) => t.items.length > 0)
  }, [source])

  const [selectedTab, setSelectedTab] = useState(() => tabs[0]?.id || 'experience')
  const activeTabObj = tabs.find((t) => t.id === selectedTab) || tabs[0] || null
  const activeTabId = activeTabObj?.id || 'experience'
  const shouldReduceMotion = useReducedMotion()

  const handleTabKeyDown = (e) => {
    if (tabs.length <= 1) return
    const idx = tabs.findIndex((t) => t.id === activeTabId)
    let nextIdx = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (idx + 1) % tabs.length
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (idx - 1 + tabs.length) % tabs.length
    if (e.key === 'Home') nextIdx = 0
    if (e.key === 'End') nextIdx = tabs.length - 1
    if (nextIdx >= 0) {
      e.preventDefault()
      const next = tabs[nextIdx]
      setSelectedTab(next.id)
      document.getElementById(`exp-tab-${next.id}`)?.focus()
    }
  }

  return (
    <Section
      id="experience"
      label="05 — experience"
      heading="Where I've worked and what I've"
      headingAccent="learned."
      description="Front-end client work, academic foundations, and programming competency training."
      texture="dots"
    >
      {tabs.length === 0 ? (
        <div
          data-testid="experience-empty"
          className="border-t border-line py-10 font-mono text-xs text-muted"
        >
          Open to my first role
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Text Tabs (auto-hidden when <= 1 tab) */}
          {tabs.length > 1 && (
            <div className="lg:col-span-4 lg:sticky lg:top-16">
              <div
                role="tablist"
                aria-label="Experience and education categories"
                onKeyDown={handleTabKeyDown}
                className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 border-b lg:border-b-0 border-line"
              >
                {tabs.map((tab) => {
                  const isActive = tab.id === activeTabId
                  return (
                    <button
                      key={tab.id}
                      id={`exp-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`exp-panel-${tab.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`relative flex items-center justify-between gap-4 px-3 py-2.5 text-left text-sm whitespace-nowrap transition-colors duration-150 ${
                        isActive ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="experience-tab-indicator"
                          transition={SPRING}
                          aria-hidden="true"
                          className="absolute bottom-0 left-2 right-2 h-[2px] lg:bottom-1.5 lg:top-1.5 lg:left-0 lg:right-auto lg:h-auto lg:w-[2px] bg-ink"
                        />
                      )}
                      <span>{tab.label}</span>
                      <span className="font-mono text-[11px] text-subtle tabular-nums">
                        {String(tab.items.length).padStart(2, '0')}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Right Column: Hairline Vertical Timeline */}
          <div
            id={`exp-panel-${activeTabId}`}
            role="tabpanel"
            aria-labelledby={tabs.length > 1 ? `exp-tab-${activeTabId}` : undefined}
            className={tabs.length > 1 ? 'lg:col-span-8' : 'lg:col-span-12'}
          >
            <AnimatePresence mode="wait">
              <motion.ol
                key={activeTabId}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: DURATION.fast, ease: EASE }}
                className="relative border-l border-line ml-1.5"
              >
                {activeTabObj.items.map((item, idx) => (
                  <TimelineEntry
                    key={item.id || `${activeTabId}-${idx}`}
                    item={item}
                    tabId={activeTabId}
                    defaultOpen={idx === 0}
                  />
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>
        </div>
      )}
    </Section>
  )
}
