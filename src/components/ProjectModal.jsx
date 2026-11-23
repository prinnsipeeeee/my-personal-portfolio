import { useRef } from 'react'
import { X, ExternalLink, Code2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { EASE, DURATION } from '../lib/motion'

export default function ProjectModal({ project, onClose, triggerRef }) {
  const dialogRef = useRef(null)
  useFocusTrap(dialogRef, Boolean(project), onClose, triggerRef)

  const typeLabel = project?.type === 'system' ? 'Web system' : 'Landing page'
  const stackList = Array.isArray(project?.stack) ? project.stack.filter(Boolean) : []
  const hasLinks = Boolean(project?.live || project?.repo)

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={onClose}
            aria-hidden="true"
            data-testid="project-modal-backdrop"
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px]"
          />

          {/* Modal Surface */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            data-testid="project-modal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto overscroll-contain border border-line-strong bg-canvas text-ink p-6 sm:p-8 focus:outline-none"
          >
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
              <div className="min-w-0 space-y-1.5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {typeLabel}
                  {project.year ? ` · ${project.year}` : ''}
                </p>
                <h2
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-tight"
                >
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                data-testid="project-modal-close"
                className="inline-flex items-center justify-center min-w-[36px] min-h-[36px] shrink-0 border border-line text-muted hover:text-ink hover:border-line-strong transition-colors duration-150"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Preview Image (auto-hidden when blank) */}
            {project.image && (
              <div className="mt-6 border border-line bg-surface overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  width={800}
                  height={500}
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
            )}

            {/* Meta Grid: Role & Stack */}
            {(project.role || stackList.length > 0) && (
              <dl className="mt-6 border-y border-line divide-y divide-line text-sm">
                {project.role && (
                  <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                    <dt className="sm:col-span-3 font-mono text-xs text-subtle">Role</dt>
                    <dd className="sm:col-span-9 text-ink">{project.role}</dd>
                  </div>
                )}
                {stackList.length > 0 && (
                  <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                    <dt className="sm:col-span-3 font-mono text-xs text-subtle">Stack</dt>
                    <dd className="sm:col-span-9 font-mono text-xs text-ink leading-relaxed">
                      {stackList.join(' · ')}
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {/* Description */}
            {project.description && (
              <p className="mt-6 text-sm sm:text-base text-muted leading-relaxed">
                {project.description}
              </p>
            )}

            {/* External Action Links (each hidden if blank) */}
            {hasLinks && (
              <div className="mt-8 pt-5 border-t border-line flex flex-wrap items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="project-modal-live"
                    className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-invert-bg text-invert-fg font-mono text-xs uppercase tracking-wide hover:opacity-85 transition-opacity duration-150"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="project-modal-repo"
                    className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-line-strong text-ink font-mono text-xs uppercase tracking-wide hover:bg-invert-bg hover:text-invert-fg transition-colors duration-150"
                  >
                    <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
