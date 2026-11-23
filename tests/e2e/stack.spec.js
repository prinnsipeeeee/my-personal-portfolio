import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Stack section', () => {
  test('renders Core first alongside Tooling, Also work with, and Currently learning', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')

    const stack = page.locator('#stack')
    await stack.scrollIntoViewIfNeeded()

    await expect(page.getByTestId('stack-group-core')).toBeVisible()
    await expect(page.getByTestId('stack-group-tooling')).toBeVisible()
    await expect(page.getByTestId('stack-group-also-work-with')).toBeVisible()
    await expect(page.getByTestId('stack-group-learning')).toBeVisible()

    // Core must be first
    const firstGroupTestId = await stack.locator('[data-testid^="stack-group-"]').first().getAttribute('data-testid')
    expect(firstGroupTestId).toBe('stack-group-core')

    // Contains key front-end skills & initials fallback (VS Code has null icon -> VC)
    await expect(page.getByTestId('stack-group-core')).toContainText('React')
    await expect(page.getByTestId('stack-group-tooling')).toContainText('VS Code')

    await runAxeScan(page, { include: '#stack' })
  })

  test('hides empty groups and handles 1 skill, 12 skills, and very long names without overflow', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.addInitScript(() => {
      window.__PORTFOLIO_TEST_OVERRIDES__ = {
        skills: {
          groups: [
            {
              id: 'empty-group',
              label: 'Should Stay Hidden',
              emphasis: 'standard',
              skills: [],
            },
            {
              id: 'single',
              label: 'Single Skill Group',
              emphasis: 'primary',
              description: 'Testing 1 item.',
              skills: [
                {
                  name: 'SupercalifragilisticexpialidociousUltraLongFrontEndFrameworkNameWithoutSpaces2026',
                  icon: null,
                  note: '',
                },
              ],
            },
            {
              id: 'twelve',
              label: 'Twelve Skills Group',
              emphasis: 'standard',
              skills: Array.from({ length: 12 }, (_, idx) => ({
                name: `Skill Item ${idx + 1}`,
                icon: null,
                note: idx % 2 === 0 ? `Short note for item ${idx + 1}` : '',
              })),
            },
          ],
        },
      }
    })

    await page.goto('/')
    const stack = page.locator('#stack')
    await stack.scrollIntoViewIfNeeded()

    await expect(page.getByTestId('stack-group-empty-group')).toHaveCount(0)
    await expect(page.getByTestId('stack-group-single')).toBeVisible()
    await expect(page.getByTestId('stack-group-twelve')).toBeVisible()
    await expect(page.getByTestId('stack-group-twelve').locator('li')).toHaveCount(12)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
})
