import { ArrowDownRight, Download } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { profileData } from '../data/profile'
import { EASE, DURATION } from '../lib/motion'

export default function Home() {
  const shouldReduceMotion = useReducedMotion()
  const isAvailable = profileData.availability?.open

  const itemProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DURATION.base, delay, ease: EASE },
        }

  return (
    <section
      id="home"
      className="relative scroll-mt-14 lg:scroll-mt-0 min-h-[calc(100svh-3.5rem)] lg:min-h-[100svh] flex flex-col justify-between border-b border-line bg-dot-grid"
    >
      <div className="max-w-5xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28 my-auto">
        {/* Eyebrow & Availability */}
        <motion.div
          {...itemProps(0)}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8"
        >
          <span className="font-mono text-xs tracking-wider text-muted">
            // 01 — home
          </span>

          {profileData.availability?.label && (
            <span className="inline-flex items-center gap-2 border border-line bg-canvas px-3 py-1 font-mono text-[11px] text-ink">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                {isAvailable && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-50" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    isAvailable ? 'bg-ink' : 'border border-muted bg-transparent'
                  }`}
                />
              </span>
              <span>
                {isAvailable
                  ? profileData.availability.label
                  : profileData.availability.closedLabel}
              </span>
            </span>
          )}
        </motion.div>

        {/* Primary Name & Front-End Developer Headline */}
        <motion.div {...itemProps(0.06)}>
          <h1 className="font-display tracking-tighter text-ink leading-[0.96]">
            <span className="block uppercase text-[clamp(2.75rem,8vw,6.25rem)] font-bold">
              {profileData.firstName}{' '}
              <span className="font-medium text-muted">{profileData.lastName}</span>
            </span>
            <span className="block mt-4 sm:mt-5 font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-ink">
              {profileData.title}
            </span>
          </h1>
        </motion.div>

        {/* Serif Italic Tagline */}
        <motion.p
          {...itemProps(0.12)}
          className="mt-6 max-w-2xl font-serif-accent italic text-2xl sm:text-3xl md:text-4xl text-muted leading-snug"
        >
          {profileData.taglinePrefix}{' '}
          <span className="text-ink">{profileData.taglineAccent}</span>{' '}
          {profileData.taglineSuffix}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          {...itemProps(0.18)}
          className="mt-10 flex flex-wrap items-center gap-3.5"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-invert-bg text-invert-fg font-mono text-xs tracking-wide uppercase hover:opacity-85 transition-opacity duration-150"
          >
            <span>View work</span>
            <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
          </a>

          {profileData.cvPath && (
            <a
              href={profileData.cvPath}
              download
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-line-strong bg-canvas text-ink font-mono text-xs tracking-wide uppercase hover:bg-invert-bg hover:text-invert-fg transition-colors duration-150"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          )}
        </motion.div>

        {/* Currently Line */}
        {profileData.currently && (
          <motion.div
            {...itemProps(0.24)}
            className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-subtle shrink-0">
              Currently —
            </span>
            <p className="font-sans text-sm text-muted">
              {profileData.currently}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
