import { test, expect } from '@playwright/test'
import { mockGitHubAPIs } from '../helpers.js'

test.describe('Smoke test', () => {
  test('loads page with valid title and zero console or page errors', async ({ page }) => {
    const consoleErrors = []
    const pageErrors = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    page.on('pageerror', (err) => {
      pageErrors.push(err.message)
    })

    await mockGitHubAPIs(page)
    await page.goto('/')

    await expect(page).toHaveTitle(/Prince Peñaflor/i)
    await expect(page.locator('main')).toBeVisible()

    expect(consoleErrors, `Console errors: ${consoleErrors.join('\n')}`).toEqual([])
    expect(pageErrors, `Page errors: ${pageErrors.join('\n')}`).toEqual([])
  })
})
