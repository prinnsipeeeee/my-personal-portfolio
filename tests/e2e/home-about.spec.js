import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Home and About sections', () => {
  test.beforeEach(async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')
  })

  test('renders name, Front-End Developer headline, tagline, and currently status', async ({ page }) => {
    const home = page.locator('#home')
    await expect(home.locator('h1')).toContainText(/Prince/i)
    await expect(home.locator('h1')).toContainText(/Peñaflor/i)
    await expect(home.locator('h1')).toContainText(/Front-End Developer/i)
    await expect(home).toContainText(/React landing pages/i)
    await expect(home).toContainText(/Currently/i)
  })

  test('View work button scrolls to #work and Download CV link has valid href and download', async ({ page }) => {
    const home = page.locator('#home')
    const cvLink = home.getByRole('link', { name: /Download CV/i })
    await expect(cvLink).toHaveAttribute('href', /\/cv\/.*\.pdf$/i)
    await expect(cvLink).toHaveAttribute('download', '')

    const viewWorkLink = home.getByRole('link', { name: /View work/i })
    await viewWorkLink.click()

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const el = document.getElementById('work')
          return el ? Math.abs(el.getBoundingClientRect().top) : 9999
        })
      })
      .toBeLessThan(150)
  })

  test('About section displays bio, quick facts, and loaded portrait image with alt text', async ({ page }) => {
    const about = page.locator('#about')
    await about.scrollIntoViewIfNeeded()

    await expect(about).toContainText(/Quick facts/i)
    await expect(about).toContainText(/Antipolo City/i)

    const img = about.locator('img')
    await expect(img).toBeVisible()
    const alt = await img.getAttribute('alt')
    expect(alt && alt.trim().length).toBeGreaterThan(5)

    await expect
      .poll(async () => img.evaluate((el) => el.complete && el.naturalWidth > 0))
      .toBe(true)
  })

  test('passes axe scan on Home and About sections', async ({ page }) => {
    await runAxeScan(page, { include: '#home' })
    await page.locator('#about').scrollIntoViewIfNeeded()
    await runAxeScan(page, { include: '#about' })
  })
})
