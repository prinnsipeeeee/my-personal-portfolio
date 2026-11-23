import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Theme and grain texture', () => {
  test('follows prefers-color-scheme: dark when no preference is saved', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')

    const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    expect(hasDark).toBe(true)
  })

  test('follows prefers-color-scheme: light when no preference is saved', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')

    const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    expect(hasDark).toBe(false)
  })

  test('toggles theme on html class and persists across reload', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')

    const html = page.locator('html')
    await expect(html).not.toHaveClass(/\bdark\b/)

    const toggle = page.locator('[data-testid="theme-toggle"]:visible').first()
    await expect(toggle).toBeVisible()
    await toggle.click()

    await expect(html).toHaveClass(/\bdark\b/)
    const stored = await page.evaluate(() => localStorage.getItem('theme'))
    expect(stored).toBe('dark')

    await page.reload()
    await expect(html).toHaveClass(/\bdark\b/)

    // Toggle back to light and verify persistence
    await page.locator('[data-testid="theme-toggle"]:visible').first().click()
    await expect(html).not.toHaveClass(/\bdark\b/)
    await page.reload()
    await expect(html).not.toHaveClass(/\bdark\b/)
  })

  test('grain overlay is non-blocking (pointer-events: none) and allows clicks underneath', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')

    const grain = page.getByTestId('grain-overlay')
    await expect(grain).toBeAttached()
    const pointerEvents = await grain.evaluate((el) => getComputedStyle(el).pointerEvents)
    expect(pointerEvents).toBe('none')

    // Click an interactive element underneath the fixed overlay
    const toggle = page.locator('[data-testid="theme-toggle"]:visible').first()
    const before = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    await toggle.click()
    const after = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    expect(after).toBe(!before)
  })

  test('passes axe accessibility scan in light and dark modes', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    await runAxeScan(page)

    await page.locator('[data-testid="theme-toggle"]:visible').first().click()
    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
    await runAxeScan(page)
  })
})
