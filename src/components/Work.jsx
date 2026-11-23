import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { projectsData } from '../data/projects'
import { SPRING, EASE, DURATION } from '../lib/motion'
import Section from './Section'
import ProjectModal from './ProjectModal'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'landing', label: 'Landing pages' },
  { id: 'system', label: 'Web systems' },
]

export default function Work({ data = projectsData }) {
  const source =
    (typeof window !== 'undefined' && window.__PORTFOLIO_TEST_OVERRIDES__?.projects) || data

  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const triggerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Cursor-following preview coordinates (desktop pointer: fine only)
  const cursorX = useMotionValue(-400)
  const cursorY = useMotionValue(-400)
  const smoothX = useSpring(cursorX, { stiffness: 320, damping: 32 })
  const smoothY = useSpring(cursorY, { stiffness: 320, damping: 32 })

  // Sort so landing pages always appear first in 'All'
  const orderedProjects = useMemo(() => {
    const valid = (Array.isArray(source) ? source : []).filter((p) => p && p.title)
    return [...valid].sort((a, b) => {
      const aRank = a.type === 'landing' ? 0 : 1
      const bRank = b.type === 'landing' ? 0 : 1
      return aRank - bRank
    })
  }, [source])

  const counts = useMemo(
    () => ({
      all: orderedProjects.length,
      landing: orderedProjects.filter((p) => p.type === 'landing').length,
      system: orderedProjects.filter((p) => p.type === 'system').length,
    }),
    [orderedProjects]
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return orderedProjects
    return orderedProjects.filter((p) => p.type === activeFilter)
  }, [orderedProjects, activeFilter])

  const handleFilterKeyDown = (e) => {
    const idx = FILTERS.findIndex((f) => f.id === activeFilter)
    let nextIdx = -1
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % FILTERS.length
    if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + FILTERS.length) % FILTERS.length
    if (e.key === 'Home') nextIdx = 0
    if (e.key === 'End') nextIdx = FILTERS.length - 1
    if (nextIdx >= 0) {
      e.preventDefault()
      const next = FILTERS[nextIdx]
      setActiveFilter(next.id)
      document.getElementById(`work-filter-${next.id}`)?.focus()
    }
  }

  const handleRowPointerMove = (e) => {
    if (shouldReduceMotion) return
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return
    const previewW = 288
    const previewH = 180
    const nextX = Math.min(e.clientX + 24, window.innerWidth - previewW - 20)
    const nextY = Math.max(20, Math.min(e.clientY - previewH / 2, window.innerHeight - previewH - 20))
    cursorX.set(nextX)
    cursorY.set(nextY)
  }

  const handleOpenProject = (project, buttonEl) => {
    triggerRef.current = buttonEl
    setHoveredProject(null)
    setSelectedProject(project)
  }

  return (
    <Section
      id="work"
      label="04 — work"
      heading="Selected"
      headingAccent="front-end work."
      description="Mostly React landing pages focused on responsive UI and speed, alongside compact web systems."
    >
      {/* Text Filter Tabs with Sliding Monochrome Indicator */}
      <div
        role="tablist"
        aria-label="Filter projects by type"
        onKeyDown={handleFilterKeyDown}
        className="flex items-center gap-6 overflow-x-auto border-b border-line mb-2 pb-px"
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id
          return (
            <button
              key={filter.id}
              id={`work-filter-${filter.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="work-project-list"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative pb-3 text-sm whitespace-nowrap transition-colors duration-150 ${
                isActive ? 'text-ink font-medium' : 'text-muted hover:text-ink'
              }`}
            >
              <span>{filter.label}</span>
              <span className="ml-1.5 font-mono text-[11px] text-subtle tabular-nums">
                {counts[filter.id]}
              </span>
              {isActive && (
                <motion.span
                  layoutId="work-filter-indicator"
                  transition={SPRING}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-ink"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Editorial Rows List */}
      <div
        id="work-project-list"
        role="tabpanel"
        aria-labelledby={`work-filter-${activeFilter}`}
        className="divide-y divide-line border-b border-line"
      >
        {filteredProjects.length === 0 ? (
          <p className="py-12 font-mono text-xs text-muted">
            // no projects in this category yet
          </p>
        ) : (
          filteredProjects.map((project, idx) => {
            const typeLabel = project.type === 'system' ? 'Web system' : 'Landing page'
            const stackList = Array.isArray(project.stack) ? project.stack.filter(Boolean) : []

            return (
              <div key={project.id || project.title}>
                <button
                  type="button"
                  data-testid="work-row"
                  data-project-type={project.type}
                  onClick={(e) => handleOpenProject(project, e.currentTarget)}
                  onMouseEnter={(e) => {
                    if (project.image) {
                      handleRowPointerMove(e)
                      setHoveredProject(project)
                    }
                  }}
                  onMouseMove={handleRowPointerMove}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group w-full text-left py-6 sm:py-7 px-1 transition-colors duration-150 hover:bg-surface/60 focus-visible:bg-surface/60"
                >
                  {/* Mobile/Tablet Inline Preview Image (hidden if blank) */}
                  {project.image && (
                    <div className="lg:hidden mb-4 border border-line bg-surface overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[16/10] object-cover"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-6 items-baseline">
                    {/* Index Number */}
                    <span className="hidden lg:block lg:col-span-1 font-mono text-xs text-subtle tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Title + Mobile Number/Meta */}
                    <div className="lg:col-span-5 min-w-0">
                      <div className="flex items-center gap-2 lg:hidden font-mono text-[11px] text-subtle mb-1">
                        <span>{String(idx + 1).padStart(2, '0')}</span>
                        <span>·</span>
                        <span>{typeLabel}</span>
                        {project.year && (
                          <>
                            <span>·</span>
                            <span>{project.year}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-ink group-hover:translate-x-1 transition-transform duration-150 truncate">
                        {project.title}
                      </h3>
                    </div>

                    {/* Desktop Type */}
                    <span className="hidden lg:block lg:col-span-2 font-mono text-xs text-muted">
                      {typeLabel}
                    </span>

                    {/* Stack */}
                    <span className="lg:col-span-3 font-mono text-xs text-muted truncate">
                      {stackList.join(' · ')}
                    </span>

                    {/* Desktop Year + Arrow */}
                    <div className="hidden lg:flex lg:col-span-1 items-center justify-end gap-2 font-mono text-xs text-subtle">
                      <span>{project.year}</span>
                      <ArrowUpRight
                        className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* Desktop Cursor-Following Preview Image */}
      <AnimatePresence>
        {hoveredProject?.image && !shouldReduceMotion && (
          <motion.div
            key={hoveredProject.id}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            style={{ x: smoothX, y: smoothY }}
            className="hidden lg:block fixed top-0 left-0 z-30 w-72 border border-line-strong bg-canvas p-1.5 pointer-events-none"
          >
            <img
              src={hoveredProject.image}
              alt=""
              width={288}
              height={180}
              className="w-full aspect-[16/10] object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        triggerRef={triggerRef}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  )
}
