import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { contactData } from '../data/contact'
import { DURATION } from '../lib/motion'
import Section from './Section'
import Reveal from './Reveal'

export function buildMailtoHref(email, subject = '', body = '') {
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return params.length > 0 ? `mailto:${email}?${params.join('&')}` : `mailto:${email}`
}

export default function Contact({ data = contactData }) {
  const source =
    (typeof window !== 'undefined' && window.__PORTFOLIO_TEST_OVERRIDES__?.contact) || data

  const [copied, setCopied] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const email = source?.email || ''
  const isAvailable = source?.availability?.open
  const projectTypes = Array.isArray(source?.projectTypes)
    ? source.projectTypes.filter((item) => item && item.label)
    : []
  const socials = Array.isArray(source?.socials)
    ? source.socials.filter((item) => item && item.name && item.url)
    : []
  const checklist = Array.isArray(source?.checklist)
    ? source.checklist.filter(Boolean)
    : []

  const handleCopyEmail = async () => {
    if (!email) return
    let ok = false
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email)
        ok = true
      }
    } catch {
      ok = false
    }

    if (!ok) {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = email
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        ok = true
      } catch {
        ok = false
      }
    }

    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <Section
      id="contact"
      label="07 — contact"
      heading="Let's build something"
      headingAccent="together."
      className="border-b-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column: Intro, Availability, Response Time, Checklist */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-16">
          <Reveal as="p" className="text-sm sm:text-base text-muted leading-relaxed">
            Need a responsive React landing page, a UI refresh, or a front-end partner for a web system? Pick a starting point or send an email directly.
          </Reveal>

          {/* Monochrome Availability Status */}
          {source?.availability && (
            <Reveal delay={0.05} className="space-y-1.5">
              <div className="inline-flex items-center gap-2.5 font-mono text-xs text-ink">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  {isAvailable && !shouldReduceMotion && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-50" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isAvailable ? 'bg-ink' : 'border border-muted bg-transparent'
                    }`}
                  />
                </span>
                <span>
                  {isAvailable
                    ? source.availability.label
                    : source.availability.closedLabel}
                </span>
              </div>

              {source.responseTime && (
                <p className="font-mono text-xs text-subtle">
                  {source.responseTime}
                </p>
              )}
            </Reveal>
          )}

          {/* Helpful to Include Checklist */}
          {checklist.length > 0 && (
            <Reveal delay={0.1} className="pt-5 border-t border-line">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle mb-3">
                Helpful to include
              </h3>
              <ul className="space-y-2 text-sm text-muted">
                {checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-ink shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {/* Right Column: Hairline-Separated Direct Contact Actions */}
        <div className="lg:col-span-7 divide-y divide-line">
          {/* 1. Start a Project (Mailto Template Pills) */}
          {projectTypes.length > 0 && email && (
            <Reveal className="pb-9">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle mb-4">
                Start a project
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {projectTypes.map((item) => (
                  <motion.a
                    key={item.id}
                    href={buildMailtoHref(email, item.subject, item.body)}
                    data-testid="project-type-pill"
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-4 py-1.5 border border-line bg-canvas font-mono text-xs text-ink hover:border-line-strong hover:bg-invert-bg hover:text-invert-fg transition-colors duration-150"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
              <p className="mt-3 font-mono text-[11px] text-subtle">
                Opens your email app with a ready-made template.
              </p>
            </Reveal>
          )}

          {/* 2. Email Directly (Large Email + Copy / Open) */}
          {email && (
            <Reveal delay={0.05} className="py-9">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle mb-4">
                Email me directly
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`mailto:${email}`}
                  className="group relative inline-block font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink break-all"
                >
                  <span>{email}</span>
                  <span
                    aria-hidden="true"
                    className="block h-[1.5px] w-0 bg-ink group-hover:w-full transition-[width] duration-200"
                  />
                </a>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    data-testid="contact-copy-email"
                    aria-label={copied ? 'Copied email address' : 'Copy email address'}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[36px] min-w-[82px] px-3 py-1.5 border border-line font-mono text-xs text-ink hover:border-line-strong hover:bg-surface transition-colors duration-150"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={shouldReduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : DURATION.fast }}
                          className="inline-flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={shouldReduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : DURATION.fast }}
                          className="inline-flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <a
                    href={`mailto:${email}`}
                    data-testid="contact-open-email"
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 border border-line font-mono text-xs text-ink hover:border-line-strong hover:bg-surface transition-colors duration-150"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open</span>
                  </a>
                </div>
              </div>

              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </Reveal>
          )}

          {/* 3. Find Me On (Social Rows) */}
          {socials.length > 0 && (
            <Reveal delay={0.1} className="py-9">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle mb-3">
                Find me on
              </h3>
              <ul className="divide-y divide-line border-t border-line">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-social-link"
                      className="group flex items-center justify-between py-3.5 px-1 hover:bg-surface/60 transition-colors duration-150"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        {social.svg && (
                          <svg
                            className="w-4 h-4 fill-current text-muted group-hover:text-ink transition-colors shrink-0"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d={social.svg} />
                          </svg>
                        )}
                        <span className="font-sans text-sm font-medium text-ink">
                          {social.name}
                        </span>
                        {social.handle && (
                          <span className="font-mono text-xs text-subtle truncate">
                            {social.handle}
                          </span>
                        )}
                      </span>

                      <ArrowUpRight
                        className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150 shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {/* 4. Location & Timezone */}
          {(source?.location || source?.timezoneLabel) && (
            <div className="pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-subtle">
              <span>{source.location}</span>
              <span>{source.timezoneLabel}</span>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
