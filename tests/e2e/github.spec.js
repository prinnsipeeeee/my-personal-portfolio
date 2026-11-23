import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('GitHub Activity section', () => {
  test('renders 52-week heatmap, tooltip, streak summary, and recent pushes on success', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'success' })
    await page.goto('/')

    const section = page.locator('#github')
    await section.scrollIntoViewIfNeeded()

    await expect(section.getByTestId('github-heatmap')).toBeVisible()
    await expect(section.getByTestId('heatmap-cell')).toHaveCount(364)
    await expect(section.getByTestId('github-streak')).toHaveText('5')
    await expect(section.getByTestId('github-pushes').locator('li')).toHaveCount(5)
    await expect(section.getByTestId('github-sample-badge')).toHaveCount(0)

    // Hover a square -> updates tooltip with "N contribution(s) on <date>"
    const activeCell = section.locator('[data-testid="heatmap-cell"][data-count]:not([data-count="0"])').last()
    await activeCell.hover()
    await expect(section.getByTestId('github-tooltip')).toContainText(/contributions? on /i)

    await runAxeScan(page, { include: '#github' })
  })

  test('shows sample data and clear label when API returns server error (500)', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'error' })
    await page.goto('/')

    const section = page.locator('#github')
    await section.scrollIntoViewIfNeeded()

    await expect(section.getByTestId('github-sample-badge')).toContainText(/sample data/i)
    await expect(section.getByTestId('github-fallback-notice')).toContainText(/sample data/i)
    await expect(section.getByTestId('github-heatmap')).toBeVisible()
    await expect(section.getByTestId('github-pushes').locator('li')).toHaveCount(5)
  })

  test('shows rate-limit notice and sample data when API returns 403', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'rateLimit' })
    await page.goto('/')

    const section = page.locator('#github')
    await section.scrollIntoViewIfNeeded()

    await expect(section.getByTestId('github-sample-badge')).toContainText(/sample data/i)
    await expect(section.getByTestId('github-fallback-notice')).toContainText(/rate limit/i)
    await expect(section.getByTestId('github-heatmap')).toBeVisible()
  })

  test('renders clean empty state when API returns empty data', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'empty' })
    await page.goto('/')

    const section = page.locator('#github')
    await section.scrollIntoViewIfNeeded()

    await expect(section.getByTestId('github-empty')).toBeVisible()
    await expect(section.getByTestId('github-heatmap')).toHaveCount(0)
  })
})
