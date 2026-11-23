import AxeBuilder from '@axe-core/playwright'
import { expect } from '@playwright/test'

/**
 * Generates deterministic 364-day (52-week) mock contribution data
 * matching the github-contributions-api.jogruber.de/v4/<user>?y=last format.
 */
export function buildMockContributions(days = 364) {
  const contributions = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let total = 0
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const date = `${yyyy}-${mm}-${dd}`

    // Deterministic pattern with an active 5-day streak ending today
    let count = 0
    if (i < 5) {
      count = 2 + (i % 4)
    } else if (i % 3 === 0) {
      count = (i % 9) + 1
    }

    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 7 ? 3 : 4
    total += count
    contributions.push({ date, count, level })
  }

  return {
    total: { lastYear: total },
    contributions,
  }
}

export function buildMockPushEvents() {
  const now = Date.now()
  return [
    {
      id: 'evt-1',
      type: 'PushEvent',
      repo: { name: 'prinnsipeeeee/my-personal-portfolio' },
      created_at: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      payload: {
        commits: [{ sha: 'abc1234', message: 'feat: polish responsive hero layout and typography' }],
      },
    },
    {
      id: 'evt-2',
      type: 'PushEvent',
      repo: { name: 'prinnsipeeeee/react-landing-starter' },
      created_at: new Date(now - 26 * 60 * 60 * 1000).toISOString(),
      payload: {
        commits: [{ sha: 'def5678', message: 'perf: lazy load below-the-fold preview images' }],
      },
    },
    {
      id: 'evt-3',
      type: 'PushEvent',
      repo: { name: 'prinnsipeeeee/saas-landing-demo' },
      created_at: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      payload: {
        commits: [{ sha: 'ghi9012', message: 'a11y: add focus-visible outlines and landmark roles' }],
      },
    },
    {
      id: 'evt-4',
      type: 'PushEvent',
      repo: { name: 'prinnsipeeeee/ui-components-kit' },
      created_at: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      payload: {
        commits: [{ sha: 'jkl3456', message: 'style: refine monochrome hairline dividers' }],
      },
    },
    {
      id: 'evt-5',
      type: 'PushEvent',
      repo: { name: 'prinnsipeeeee/client-booking-system' },
      created_at: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString(),
      payload: {
        commits: [{ sha: 'mno7890', message: 'fix: handle mobile drawer scroll locking cleanly' }],
      },
    },
    {
      id: 'evt-6',
      type: 'WatchEvent',
      repo: { name: 'facebook/react' },
      created_at: new Date(now - 9 * 24 * 60 * 60 * 1000).toISOString(),
      payload: {},
    },
  ]
}

/**
 * Intercepts all outbound GitHub API & contributions API calls so E2E tests
 * run deterministically offline without hitting live rate limits.
 *
 * @param {import('@playwright/test').Page} page
 * @param {{ mode?: 'success' | 'error' | 'rateLimit' | 'empty' }} [options]
 */
export async function mockGitHubAPIs(page, { mode = 'success' } = {}) {
  await page.route('**/*github-contributions-api.jogruber.de/**', async (route) => {
    if (mode === 'error') {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Upstream unavailable' }),
      })
      return
    }
    if (mode === 'rateLimit') {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'API rate limit exceeded' }),
      })
      return
    }
    if (mode === 'empty') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ total: { lastYear: 0 }, contributions: [] }),
      })
      return
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildMockContributions()),
    })
  })

  await page.route('**/*api.github.com/**', async (route) => {
    if (mode === 'error') {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      })
      return
    }
    if (mode === 'rateLimit') {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'API rate limit exceeded' }),
      })
      return
    }
    if (mode === 'empty') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
      return
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildMockPushEvents()),
    })
  })
}

/**
 * Runs an axe-core accessibility scan and asserts zero serious or critical violations.
 *
 * @param {import('@playwright/test').Page} page
 * @param {{ include?: string, exclude?: string[] }} [options]
 */
export async function runAxeScan(page, options = {}) {
  // Wait for finite entrance animations (fade-ins) to settle so contrast checks measure final opacity
  await page.evaluate(async () => {
    const animations = document
      .getAnimations()
      .filter((a) => a.effect?.getComputedTiming?.().iterations !== Infinity)
    await Promise.race([
      Promise.allSettled(animations.map((a) => a.finished)),
      new Promise((r) => setTimeout(r, 800)),
    ])
  })

  let builder = new AxeBuilder({ page })
  if (options.include) builder = builder.include(options.include)
  if (options.exclude) {
    for (const selector of options.exclude) {
      builder = builder.exclude(selector)
    }
  }

  const results = await builder.analyze()
  const seriousOrCritical = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  )

  expect(
    seriousOrCritical,
    `Axe serious/critical violations:\n${JSON.stringify(
      seriousOrCritical.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
      })),
      null,
      2
    )}`
  ).toEqual([])

  return results
}
