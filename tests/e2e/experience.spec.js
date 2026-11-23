import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Experience and Education section', () => {
  test('switches tabs, displays CV records, and expands/collapses details', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')

    const exp = page.locator('#experience')
    await exp.scrollIntoViewIfNeeded()

    // Default tab: Experience
    await expect(exp).toContainText('Part-Time Front-End Developer')
    await expect(exp).toContainText('6 mos')

    // First item details open by default -> toggle collapse and re-expand
    const detailsBtn = exp.getByTestId('timeline-details-toggle').first()
    await expect(detailsBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(exp.getByTestId('timeline-details-panel').first()).toBeVisible()

    await detailsBtn.click()
    await expect(detailsBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(exp.getByTestId('timeline-details-panel')).toHaveCount(0)

    await detailsBtn.click()
    await expect(detailsBtn).toHaveAttribute('aria-expanded', 'true')

    // Switch to Education tab
    const eduTab = exp.getByRole('tab', { name: /Education/i })
    await eduTab.click()
    await expect(eduTab).toHaveAttribute('aria-selected', 'true')
    await expect(exp).toContainText('Informatics College')
    await expect(exp).toContainText('Present')
    await expect(exp).toContainText('University of Rizal System')

    // Switch to Certifications tab
    const certTab = exp.getByRole('tab', { name: /Certifications/i })
    await certTab.click()
    await expect(certTab).toHaveAttribute('aria-selected', 'true')
    await expect(exp).toContainText('Programming (Java) NC III')

    await runAxeScan(page, { include: '#experience' })
  })

  test('renders clean empty state without crashing when all tabs have 0 entries', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.addInitScript(() => {
      window.__PORTFOLIO_TEST_OVERRIDES__ = {
        experience: {
          experience: [],
          education: [],
          certifications: [],
        },
      }
    })

    await page.goto('/')
    const exp = page.locator('#experience')
    await exp.scrollIntoViewIfNeeded()

    await expect(exp.getByRole('tablist')).toHaveCount(0)
    await expect(exp.getByTestId('experience-empty')).toContainText('Open to my first role')
  })
})
