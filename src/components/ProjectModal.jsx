import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { X, ExternalLink, Code2, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  getProjectImages,
  normalizeExternalUrl,
  formatDisplayUrl,
} from '../data/projects'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { EASE, DURATION } from '../lib/motion'

export default function ProjectModal({ project, onClose, triggerRef }) {
  const dialogRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  useFocusTrap(dialogRef, Boolean(project), onClose, triggerRef)

  const slides = useMemo(() => getProjectImages(project), [project])
  const [activeIndex, setActiveIndex] = useState(0)

  // Always start on the first slide when switching projects
  useEffect(() => {
    setActiveIndex(0)
  }, [project?.id, project?.title])

  const hasMultipleSlides = slides.length > 1
  const safeIndex = slides.length > 0 ? activeIndex % slides.length : 0
  const currentSlide = slides[safeIndex] || null

  const handlePrev = useCallback(() => {
    if (slides.length <= 1) return
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const handleNext = useCallback(() => {
    if (slides.length <= 1) return
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Keyboard Left / Right arrow slide navigation while modal is open
  useEffect(() => {
    if (!project || slides.length <= 1) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [project, slides.length, handlePrev, handleNext])

  const typeLabel = project?.type === 'system' ? 'Web system' : 'Landing page'
  const stackList = Array.isArray(project?.stack) ? project.stack.filter(Boolean) : []
  const liveUrl = normalizeExternalUrl(project?.live)
  const repoUrl = normalizeExternalUrl(project?.repo)
  const displayLiveUrl = formatDisplayUrl(liveUrl)
  const hasLinks = Boolean(liveUrl || repoUrl)

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={onClose}
            aria-hidden="true"
            data-testid="project-modal-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-[3px]"
          />

          {/* Wide Modern Editorial Modal Surface */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            data-testid="project-modal"
            onClick={(e) => e.stopPropagation()}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: EASE }}
            className="relative z-10 w-full max-w-5xl xl:max-w-6xl max-h-[92vh] overflow-y-auto overscroll-contain border border-line-strong bg-canvas text-ink focus:outline-none"
          >
            {/* Sticky Editorial Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-canvas/95 backdrop-blur-sm px-5 sm:px-8 py-4 sm:py-5">
              <div className="min-w-0 space-y-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {typeLabel}
                  {project.year ? ` · ${project.year}` : ''}
                </p>
                <h2
                  id="project-modal-title"
                  className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-ink leading-tight break-words [overflow-wrap:anywhere]"
                >
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 bg-invert-bg text-invert-fg font-mono text-[11px] uppercase tracking-wider hover:opacity-85 transition-opacity duration-150"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  data-testid="project-modal-close"
                  className="inline-flex items-center justify-center min-w-[38px] min-h-[38px] border border-line-strong bg-canvas text-muted hover:text-ink hover:bg-surface transition-colors duration-150"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="px-5 sm:px-8 py-6 sm:py-7 space-y-7">
              {/* Wide Showcase Slideshow Gallery */}
              {currentSlide && (
                <div data-testid="project-slideshow">
                  {/* Minimal Monochrome Browser Chrome Header */}
                  <div className="flex items-center justify-between gap-3 border border-b-0 border-line bg-surface px-3.5 py-2">
                    <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                      <span className="w-2 h-2 rounded-full border border-line-strong" />
                      <span className="w-2 h-2 rounded-full border border-line-strong" />
                      <span className="w-2 h-2 rounded-full border border-line-strong" />
                    </div>

                    <div className="min-w-0 flex-1 flex justify-center">
                      {liveUrl ? (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 max-w-full border border-line bg-canvas px-3 py-0.5 font-mono text-[11px] text-muted hover:text-ink hover:border-line-strong transition-colors duration-150 truncate"
                        >
                          <Globe className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span className="truncate">{displayLiveUrl}</span>
                        </a>
                      ) : (
                        <span className="font-mono text-[11px] text-subtle truncate">
                          preview
                        </span>
                      )}
                    </div>

                    <div className="shrink-0">
                      {hasMultipleSlides ? (
                        <span
                          data-testid="project-slide-counter"
                          aria-live="polite"
                          className="font-mono text-[11px] text-ink tabular-nums"
                        >
                          {String(safeIndex + 1).padStart(2, '0')} /{' '}
                          {String(slides.length).padStart(2, '0')}
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] text-subtle tabular-nums">
                          01 / 01
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Large Main Widescreen Stage (Uncropped 16:9 Showcase) */}
                  <div className="relative border border-line bg-surface overflow-hidden">
                    <div className="relative w-full aspect-[16/9] max-h-[64vh] flex items-center justify-center bg-surface">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.img
                          key={currentSlide.src}
                          src={currentSlide.src}
                          alt={currentSlide.alt}
                          width={1600}
                          height={900}
                          data-testid="project-slide-active"
                          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.99 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : DURATION.fast,
                            ease: EASE,
                          }}
                          className="block w-full h-full object-contain"
                        />
                      </AnimatePresence>
                    </div>

                    {/* Left / Right Slideshow Toggles */}
                    {hasMultipleSlides && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous slide"
                          data-testid="project-slide-prev"
                          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-line-strong bg-canvas text-ink hover:bg-invert-bg hover:text-invert-fg transition-colors duration-150"
                        >
                          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Next slide"
                          data-testid="project-slide-next"
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-line-strong bg-canvas text-ink hover:bg-invert-bg hover:text-invert-fg transition-colors duration-150"
                        >
                          <ChevronRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Small Clickable Thumbnails Underneath */}
                  {hasMultipleSlides && (
                    <div className="mt-3 flex flex-col gap-2">
                      <div
                        role="group"
                        aria-label="Project screenshot thumbnails"
                        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"
                      >
                        {slides.map((slide, idx) => {
                          const isActive = idx === safeIndex
                          return (
                            <button
                              key={slide.src}
                              type="button"
                              onClick={() => setActiveIndex(idx)}
                              aria-label={`View slide ${idx + 1} of ${slides.length}`}
                              aria-pressed={isActive}
                              data-testid="project-slide-thumb"
                              className={`relative overflow-hidden border bg-surface transition-all duration-150 ${
                                isActive
                                  ? 'border-ink ring-1 ring-ink opacity-100'
                                  : 'border-line opacity-55 hover:opacity-100 hover:border-line-strong'
                              }`}
                            >
                              <img
                                src={slide.src}
                                alt=""
                                width={160}
                                height={90}
                                loading="lazy"
                                decoding="async"
                                className="block w-full aspect-[16/9] object-cover"
                              />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Modern 2-Column Editorial Details Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pt-2 border-t border-line">
                {/* Left: Description */}
                <div className="lg:col-span-7 min-w-0 space-y-2.5 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                    // overview
                  </p>
                  {project.description && (
                    <p className="text-sm sm:text-base text-muted leading-relaxed break-words [overflow-wrap:anywhere]">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Right: Role, Stack Pills & Action Links */}
                <div className="lg:col-span-5 min-w-0 lg:border-l lg:border-line lg:pl-8 pt-4 space-y-5">
                  {project.role && (
                    <div className="space-y-1">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                        Role
                      </p>
                      <p className="text-sm font-medium text-ink break-words [overflow-wrap:anywhere]">
                        {project.role}
                      </p>
                    </div>
                  )}

                  {stackList.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">
                        Stack
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {stackList.map((tech) => (
                          <li
                            key={tech}
                            className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-ink"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {hasLinks && (
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="project-modal-live"
                          className="inline-flex items-center gap-2 min-h-[42px] px-5 py-2.5 bg-invert-bg text-invert-fg font-mono text-xs uppercase tracking-wide hover:opacity-85 transition-opacity duration-150"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}

                      {repoUrl && (
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="project-modal-repo"
                          className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2.5 border border-line-strong text-ink font-mono text-xs uppercase tracking-wide hover:bg-invert-bg hover:text-invert-fg transition-colors duration-150"
                        >
                          <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
