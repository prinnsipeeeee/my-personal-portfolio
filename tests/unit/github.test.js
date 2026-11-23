import { describe, it, expect } from 'vitest'
import {
  mapCountToLevel,
  calculateCurrentStreak,
  calculateTotalContributions,
  groupContributionsByWeeks,
  extractRecentPushes,
} from '../../src/lib/github.js'

describe('GitHub activity helpers', () => {
  it('maps contribution counts to monochrome levels 0..4', () => {
    expect(mapCountToLevel(-2)).toBe(0)
    expect(mapCountToLevel(0)).toBe(0)
    expect(mapCountToLevel(1)).toBe(1)
    expect(mapCountToLevel(2)).toBe(1)
    expect(mapCountToLevel(3)).toBe(2)
    expect(mapCountToLevel(5)).toBe(2)
    expect(mapCountToLevel(6)).toBe(3)
    expect(mapCountToLevel(9)).toBe(3)
    expect(mapCountToLevel(10)).toBe(4)
    expect(mapCountToLevel(42)).toBe(4)
  })

  it('calculates current streak accurately (ending today, ending yesterday, broken, or empty)', () => {
    expect(calculateCurrentStreak([])).toBe(0)
    expect(
      calculateCurrentStreak([
        { date: '2026-11-20', count: 0 },
        { date: '2026-11-21', count: 2 },
        { date: '2026-11-22', count: 4 },
        { date: '2026-11-23', count: 1 },
      ])
    ).toBe(3)

    // Today is 0, yesterday had an active 2-day streak -> still counts as 2
    expect(
      calculateCurrentStreak([
        { date: '2026-11-20', count: 0 },
        { date: '2026-11-21', count: 3 },
        { date: '2026-11-22', count: 2 },
        { date: '2026-11-23', count: 0 },
      ])
    ).toBe(2)

    // Both today and yesterday are 0 -> broken streak
    expect(
      calculateCurrentStreak([
        { date: '2026-11-21', count: 5 },
        { date: '2026-11-22', count: 0 },
        { date: '2026-11-23', count: 0 },
      ])
    ).toBe(0)
  })

  it('calculates total contributions and groups into up to 52 weeks', () => {
    const days = Array.from({ length: 364 }, (_, i) => ({
      date: `2026-${String((i % 12) + 1).padStart(2, '0')}-01`,
      count: i % 2 === 0 ? 2 : 0,
    }))
    expect(calculateTotalContributions(days)).toBe(364)
    const { weeks } = groupContributionsByWeeks(days, 52)
    expect(weeks).toHaveLength(52)
    expect(weeks[0]).toHaveLength(7)
  })

  it('extracts only PushEvents with single-line commit summaries', () => {
    const pushes = extractRecentPushes(
      [
        {
          id: '1',
          type: 'WatchEvent',
          repo: { name: 'other/repo' },
          created_at: '2026-11-23T10:00:00Z',
          payload: {},
        },
        {
          id: '2',
          type: 'PushEvent',
          repo: { name: 'prinnsipeeeee/portfolio' },
          created_at: '2026-11-23T09:00:00Z',
          payload: {
            commits: [{ message: 'feat: add header\n\nextra body line ignored' }],
          },
        },
      ],
      5
    )

    expect(pushes).toHaveLength(1)
    expect(pushes[0].repo).toBe('portfolio')
    expect(pushes[0].message).toBe('feat: add header')
  })
})
