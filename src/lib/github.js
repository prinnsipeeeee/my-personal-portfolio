/**
 * Pure GitHub Activity Helpers & Public API Fetchers (No Token Required)
 */

const CACHE_PREFIX = 'portfolio_github_v1_'

/**
 * Maps daily contribution count to a 0–4 intensity level.
 */
export function mapCountToLevel(count) {
  const n = Number(count)
  if (!Number.isFinite(n) || n <= 0) return 0
  if (n <= 2) return 1
  if (n <= 5) return 2
  if (n <= 9) return 3
  return 4
}

/**
 * Computes total contributions from a flat array of daily items.
 */
export function calculateTotalContributions(contributions = []) {
  if (!Array.isArray(contributions)) return 0
  return contributions.reduce((sum, day) => sum + Math.max(0, Number(day?.count) || 0), 0)
}

/**
 * Computes current streak (consecutive active days ending today, or ending yesterday if today is 0).
 */
export function calculateCurrentStreak(contributions = []) {
  if (!Array.isArray(contributions) || contributions.length === 0) return 0

  let idx = contributions.length - 1
  // If today has 0 commits so far, check if yesterday still had an active streak
  if ((Number(contributions[idx]?.count) || 0) === 0) {
    idx -= 1
  }

  let streak = 0
  while (idx >= 0 && (Number(contributions[idx]?.count) || 0) > 0) {
    streak += 1
    idx -= 1
  }
  return streak
}

/**
 * Groups flat daily contribution records into 52 columns (weeks) x 7 rows (Sun-Sat)
 * and extracts non-overlapping month label positions.
 */
export function groupContributionsByWeeks(contributions = [], maxWeeks = 52) {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return { weeks: [], monthLabels: [] }
  }

  const maxDays = maxWeeks * 7
  const recent = contributions.slice(-maxDays).map((item) => ({
    date: item.date,
    count: Math.max(0, Number(item.count) || 0),
    level:
      typeof item.level === 'number' && item.level >= 0 && item.level <= 4
        ? item.level
        : mapCountToLevel(item.count),
  }))

  const weeks = []
  for (let i = 0; i < recent.length; i += 7) {
    weeks.push(recent.slice(i, i + 7))
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthLabels = []
  let lastMonth = -1
  let lastLabelWeek = -4

  weeks.forEach((week, weekIdx) => {
    const firstDay = week[0]
    if (!firstDay?.date) return
    const parts = String(firstDay.date).split('-')
    const monthIdx = parseInt(parts[1], 10) - 1
    if (monthIdx >= 0 && monthIdx < 12 && monthIdx !== lastMonth) {
      if (weekIdx - lastLabelWeek >= 3) {
        monthLabels.push({ weekIndex: weekIdx, label: monthNames[monthIdx] })
        lastLabelWeek = weekIdx
      }
      lastMonth = monthIdx
    }
  })

  return { weeks, monthLabels }
}

/**
 * Formats an ISO YYYY-MM-DD date into readable text for tooltips.
 */
export function formatContributionDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = String(dateStr).split('-').map(Number)
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return dateStr
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Formats an ISO timestamp into a short relative time string.
 */
export function formatRelativeTime(isoString, nowMs = Date.now()) {
  const ts = Date.parse(isoString)
  if (Number.isNaN(ts)) return ''
  const diffSec = Math.max(0, Math.floor((nowMs - ts) / 1000))
  if (diffSec < 60) return 'Just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 30) return `${diffDay}d ago`
  const diffMo = Math.floor(diffDay / 30)
  return `${diffMo}mo ago`
}

/**
 * Filters public GitHub events to the latest PushEvents with single-line commit summaries.
 */
export function extractRecentPushes(events = [], limit = 6) {
  if (!Array.isArray(events)) return []
  return events
    .filter((ev) => ev && ev.type === 'PushEvent' && ev.repo?.name)
    .slice(0, limit)
    .map((ev) => {
      const commits = ev.payload?.commits || []
      const latest = commits[commits.length - 1]
      const rawMsg = latest?.message || `Pushed to ${ev.payload?.ref?.replace('refs/heads/', '') || 'main'}`
      const singleLine = String(rawMsg).split(/\r?\n/)[0].trim()
      const fullRepo = ev.repo.name
      const shortRepo = fullRepo.includes('/') ? fullRepo.split('/')[1] : fullRepo

      return {
        id: ev.id || `${fullRepo}-${ev.created_at}`,
        repo: shortRepo,
        fullRepo,
        message: singleLine,
        createdAt: ev.created_at,
        url: `https://github.com/${fullRepo}`,
      }
    })
}

export function readGitHubCache(username, ttlMs) {
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${username}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.timestamp !== 'number') return null
    if (Date.now() - parsed.timestamp > ttlMs) return null
    return parsed.data
  } catch {
    return null
  }
}

export function writeGitHubCache(username, data) {
  try {
    localStorage.setItem(
      `${CACHE_PREFIX}${username}`,
      JSON.stringify({ timestamp: Date.now(), data })
    )
  } catch {
    // Ignore storage quota or privacy-mode errors
  }
}

export async function fetchContributions(username, signal) {
  const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
  const res = await fetch(url, { signal })
  if (res.status === 403 || res.status === 429) {
    const err = new Error('rate-limited')
    err.status = res.status
    throw err
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`)
    err.status = res.status
    throw err
  }
  const json = await res.json()
  return Array.isArray(json?.contributions) ? json.contributions : []
}

export async function fetchRecentPushes(username, limit = 6, signal) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (res.status === 403 || res.status === 429) {
    const err = new Error('rate-limited')
    err.status = res.status
    throw err
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`)
    err.status = res.status
    throw err
  }
  const json = await res.json()
  return extractRecentPushes(json, limit)
}
