import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Contact section and Footer', () => {
  test.beforeEach(async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')
  })

  test('renders mailto project pills with encoded subject and body, Copy button, and safe external socials', async ({ page }) => {
    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()

    // Check every project type pill has valid encoded mailto: href
    const pills = contact.getByTestId('project-type-pill')
    const count = await pills.count()
    expect(count).toBeGreaterThanOrEqual(4)

    for (let i = 0; i < count; i++) {
      const href = await pills.nth(i).getAttribute('href')
      expect(href).toMatch(/^mailto:[^?]+\?subject=[^&]+&body=.+/)
      // Ensure spaces are URL-encoded
      expect(href).not.toMatch(/\s/)
    }

    // Copy email button switches text to "Copied"
    const copyBtn = contact.getByTestId('contact-copy-email')
    await copyBtn.click()
    await expect(copyBtn).toContainText('Copied')

    // External social links open in new tab safely
    const socials = contact.getByTestId('contact-social-link')
    const socialCount = await socials.count()
    expect(socialCount).toBeGreaterThan(0)
    for (let i = 0; i < socialCount; i++) {
      await expect(socials.nth(i)).toHaveAttribute('target', '_blank')
      await expect(socials.nth(i)).toHaveAttribute('rel', 'noopener noreferrer')
    }

    await runAxeScan(page, { include: '#contact' })
  })

  test('footer displays current year, stack credits, decorative outline name, and Back to top works', async ({ page }) => {
    const footer = page.locator('footer[role="contentinfo"]')
    await footer.scrollIntoViewIfNeeded()

    const currentYear = String(new Date().getFullYear())
    await expect(footer.getByTestId('footer-copyright')).toContainText(currentYear)
    await expect(footer.getByTestId('footer-stack')).toContainText('Built with React · Tailwind · Motion')
    await expect(footer.getByTestId('footer-giant-name')).toHaveAttribute('aria-hidden', 'true')

    await runAxeScan(page, { include: 'footer' })

    // Back to top button scrolls viewport back to top
    await footer.getByTestId('footer-back-to-top').click()
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeLessThan(40)
  })
})
