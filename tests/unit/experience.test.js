import { describe, it, expect } from 'vitest'
import {
  formatPeriodDate,
  calculateDuration,
  sortEntriesNewestFirst,
} from '../../src/data/experience.js'

describe('experience date and duration helpers', () => {
  it('formats YYYY-MM strings and returns Present for null/empty', () => {
    expect(formatPeriodDate(null)).toBe('Present')
    expect(formatPeriodDate('')).toBe('Present')
    expect(formatPeriodDate('2026-06')).toBe('Jun 2026')
    expect(formatPeriodDate('2023-09')).toBe('Sep 2023')
  })

  it('computes single-month, multi-month, year-boundary, and multi-year durations', () => {
    expect(calculateDuration('2026-06', '2026-06')).toBe('1 mo')
    expect(calculateDuration('2026-06', '2026-11')).toBe('6 mos')
    expect(calculateDuration('2025-11', '2026-02')).toBe('4 mos')
    expect(calculateDuration('2025-01', '2025-12')).toBe('1 yr')
    expect(calculateDuration('2024-09', '2025-12')).toBe('1 yr 4 mos')
    expect(calculateDuration('2023-01', '2025-03')).toBe('2 yrs 3 mos')
  })

  it('computes duration up to referenceDate when end is null', () => {
    const ref = new Date(2026, 10, 23) // Nov 2026
    expect(calculateDuration('2026-08', null, ref)).toBe('4 mos')
    expect(calculateDuration('2025-08', null, ref)).toBe('1 yr 4 mos')
  })

  it('sorts current (end: null) entries first, then newest start date descending', () => {
    const sorted = sortEntriesNewestFirst([
      { id: 'old', start: '2023-09', end: '2025-04' },
      { id: 'present', start: '2026-08', end: null },
      { id: 'mid', start: '2025-05', end: '2026-01' },
    ])
    expect(sorted.map((item) => item.id)).toEqual(['present', 'mid', 'old'])
  })
})
