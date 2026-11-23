import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, GitCommitHorizontal } from 'lucide-react'
import { githubConfig, buildSampleContributions, samplePushes } from '../data/github'
import {
  calculateCurrentStreak,
  calculateTotalContributions,
  groupContributionsByWeeks,
  formatContributionDate,
  formatRelativeTime,
  fetchContributions,
  fetchRecentPushes,
  readGitHubCache,
  writeGitHubCache,
} from '../lib/github'
import Section from './Section'
import Reveal from './Reveal'

const LEVEL_OPACITY = [0.06, 0.24, 0.48, 0.74, 1]

export default function GitHubActivity() {
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'empty' | 'fallback'
  const [fallbackReason, setFallbackReason] = useState('')
  const [contributions, setContributions] = useState([])
  const [pushes, setPushes] = useState([])
  const [hoveredCell, setHoveredCell] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const { username, cacheTtlMs, maxPushes } = githubConfig

    const load = async () => {
      const cached = readGitHubCache(username, cacheTtlMs)
      if (cached) {
        setContributions(cached.contributions || [])
        setPushes(cached.pushes || [])
        setStatus(
          cached.contributions?.length || cached.pushes?.length ? 'success' : 'empty'
        )
        return
      }

      try {
        const [contribsResult, pushesResult] = await Promise.allSettled([
          fetchContributions(username, controller.signal),
          fetchRecentPushes(username, maxPushes, controller.signal),
        ])

        if (controller.signal.aborted) return

        const contribsOk = contribsResult.status === 'fulfilled'
        const pushesOk = pushesResult.status === 'fulfilled'

        if (!contribsOk && !pushesOk) {
          const isRateLimit =
            contribsResult.reason?.status === 403 ||
            contribsResult.reason?.status === 429 ||
            pushesResult.reason?.status === 403 ||
            pushesResult.reason?.status === 429

          setFallbackReason(
            isRateLimit
              ? 'GitHub API rate limit reached — displaying sample data.'
              : 'Unable to load live GitHub activity — displaying sample data.'
          )
          setContributions(buildSampleContributions())
          setPushes(samplePushes)
          setStatus('fallback')
          return
        }

        const nextContribs = contribsOk ? contribsResult.value : []
        const nextPushes = pushesOk ? pushesResult.value : []

        if (nextContribs.length === 0 && nextPushes.length === 0) {
          setContributions([])
          setPushes([])
          setStatus('empty')
          return
        }

        const payload = { contributions: nextContribs, pushes: nextPushes }
        writeGitHubCache(username, payload)
        setContributions(nextContribs)
        setPushes(nextPushes)
        setStatus('success')
      } catch {
        if (controller.signal.aborted) return
        setFallbackReason('Unable to load live GitHub activity — displaying sample data.')
        setContributions(buildSampleContributions())
        setPushes(samplePushes)
        setStatus('fallback')
      }
    }

    load()
    return () => controller.abort()
  }, [])

  const { weeks, monthLabels } = useMemo(
    () => groupContributionsByWeeks(contributions, 52),
    [contributions]
  )
  const totalCount = useMemo(
    () => calculateTotalContributions(contributions),
    [contributions]
  )
  const currentStreak = useMemo(
    () => calculateCurrentStreak(contributions),
    [contributions]
  )

  const cellSize = 11
  const cellGap = 3
  const step = cellSize + cellGap
  const topOffset = 18
  const svgWidth = Math.max(weeks.length * step, 52 * step)
  const svgHeight = topOffset + 7 * step

  const formatTooltipText = (cell) => {
    if (!cell) return 'Hover a square to inspect daily contributions'
    const label = cell.count === 1 ? 'contribution' : 'contributions'
    return `${cell.count} ${label} on ${formatContributionDate(cell.date)}`
  }

  return (
    <Section
      id="github"
      label="06 — github"
      heading="Code shipped"
      headingAccent="in the open."
      description="52-week contribution activity and recent public pushes pulled directly from GitHub."
      texture="grid"
    >
      {/* Top Bar: Username, Summary Metrics, Sample Data Label */}
      <Reveal className="flex flex-wrap items-end justify-between gap-6 border-y border-line py-5 mb-8">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-subtle">
              Last 52 weeks
            </span>
            <span
              data-testid="github-total"
              className="font-display text-2xl sm:text-3xl font-semibold text-ink tabular-nums"
            >
              {status === 'loading' ? '—' : totalCount.toLocaleString()}
            </span>
            <span className="ml-1.5 font-mono text-xs text-muted">contributions</span>
          </div>

          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-subtle">
              Current streak
            </span>
            <span
              data-testid="github-streak"
              className="font-display text-2xl sm:text-3xl font-semibold text-ink tabular-nums"
            >
              {status === 'loading' ? '—' : currentStreak}
            </span>
            <span className="ml-1.5 font-mono text-xs text-muted">
              {currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === 'fallback' && (
            <span
              data-testid="github-sample-badge"
              className="border border-line-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink"
            >
              sample data
            </span>
          )}
          <a
            href={githubConfig.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors duration-150"
          >
            <span>@{githubConfig.username}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </Reveal>

      {/* Fallback Notice Banner (Error / Rate-Limit) */}
      {status === 'fallback' && fallbackReason && (
        <p
          role="status"
          data-testid="github-fallback-notice"
          className="mb-6 border-l-2 border-ink pl-3.5 py-1 font-mono text-xs text-muted"
        >
          {fallbackReason}
        </p>
      )}

      {/* Loading Skeleton */}
      {status === 'loading' && (
        <div data-testid="github-loading" className="space-y-8" aria-busy="true">
          <div className="h-36 w-full border border-line bg-surface animate-pulse" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="h-10 w-full border-b border-line bg-surface/60 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {status === 'empty' && (
        <div
          data-testid="github-empty"
          className="border border-line p-8 font-mono text-xs text-muted"
        >
          // No public GitHub contributions or pushes found for @{githubConfig.username}.
        </div>
      )}

      {/* Heatmap + Recent Pushes (Success or Fallback Sample Data) */}
      {(status === 'success' || status === 'fallback') && (
        <div className="space-y-12">
          {/* 52-Week Monochrome Contribution Heatmap */}
          {weeks.length > 0 && (
            <figure className="space-y-3">
              <div
                tabIndex={0}
                role="region"
                aria-label="GitHub 52-week contribution heatmap"
                className="overflow-x-auto pb-2 border border-line bg-canvas p-4 sm:p-5"
              >
                <svg
                  data-testid="github-heatmap"
                  role="img"
                  aria-label={`GitHub contribution heatmap: ${totalCount} contributions over the last 52 weeks`}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  width={svgWidth}
                  height={svgHeight}
                  className="block min-w-[700px] w-full h-auto"
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {/* Month Labels */}
                  {monthLabels.map((m) => (
                    <text
                      key={`${m.label}-${m.weekIndex}`}
                      x={m.weekIndex * step}
                      y={11}
                      fill="var(--subtle)"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {m.label}
                    </text>
                  ))}

                  {/* 52 Columns x 7 Rows */}
                  {weeks.map((week, wIdx) =>
                    week.map((day, dIdx) => {
                      const level = Math.min(4, Math.max(0, day.level ?? 0))
                      return (
                        <rect
                          key={day.date}
                          data-testid="heatmap-cell"
                          data-date={day.date}
                          data-count={day.count}
                          data-level={level}
                          x={wIdx * step}
                          y={topOffset + dIdx * step}
                          width={cellSize}
                          height={cellSize}
                          rx={2}
                          fill="var(--fg)"
                          fillOpacity={LEVEL_OPACITY[level]}
                          stroke={level === 0 ? 'var(--border)' : 'none'}
                          strokeWidth={level === 0 ? 0.75 : 0}
                          onMouseEnter={() => setHoveredCell(day)}
                          className="cursor-crosshair"
                        >
                          <title>{formatTooltipText(day)}</title>
                        </rect>
                      )
                    })
                  )}
                </svg>
              </div>

              {/* Tooltip Readout + Monochrome Scale Legend */}
              <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-muted">
                <span data-testid="github-tooltip">
                  {formatTooltipText(hoveredCell)}
                </span>

                <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                  <span className="text-subtle">Less</span>
                  {LEVEL_OPACITY.map((opacity, lvl) => (
                    <span
                      key={lvl}
                      className="inline-block w-2.5 h-2.5 rounded-[2px]"
                      style={{
                        backgroundColor: 'var(--fg)',
                        opacity,
                        border: lvl === 0 ? '1px solid var(--border)' : 'none',
                      }}
                    />
                  ))}
                  <span className="text-subtle">More</span>
                </span>
              </figcaption>
            </figure>
          )}

          {/* Recent Public Pushes */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-subtle mb-3">
              Recent pushes
            </h3>

            {pushes.length === 0 ? (
              <p className="border-t border-line py-6 font-mono text-xs text-muted">
                // No recent public push events available.
              </p>
            ) : (
              <ul
                data-testid="github-pushes"
                className="border-t border-line divide-y divide-line"
              >
                {pushes.map((push) => (
                  <li key={push.id}>
                    <a
                      href={push.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-6 hover:bg-surface/60 px-1 transition-colors duration-150"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <GitCommitHorizontal
                          className="w-4 h-4 mt-0.5 sm:mt-0 shrink-0 text-subtle group-hover:text-ink transition-colors"
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3">
                          <span className="font-mono text-xs font-medium text-ink shrink-0">
                            {push.repo}
                          </span>
                          <span className="text-sm text-muted truncate">
                            {push.message}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-7 sm:pl-0 shrink-0 font-mono text-[11px] text-subtle">
                        <span>{formatRelativeTime(push.createdAt)}</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 text-subtle group-hover:text-ink transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Section>
  )
}
