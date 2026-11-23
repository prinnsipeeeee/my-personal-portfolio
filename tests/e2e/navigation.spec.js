import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Sidebar, MobileNav, and Layout shell', () => {
  test.beforeEach(async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')
  })

  test('shows sidebar on desktop and mobile topbar on tablet/mobile', async ({ page, viewport }) => {
    const isDesktop = (viewport?.width ?? 1280) >= 1024
    const sidebar = page.getByTestId('desktop-sidebar')
    const topbar = page.getByTestId('mobile-topbar')

    if (isDesktop) {
      await expect(sidebar).toBeVisible()
      await expect(topbar).toBeHidden()
    } else {
      await expect(sidebar).toBeHidden()
      await expect(topbar).toBeVisible()
    }
  })

  test('desktop nav links scroll to target section and active link updates on scroll', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 1280) < 1024, 'Desktop sidebar test')

    const sidebar = page.getByTestId('desktop-sidebar')
    const workLink = sidebar.getByRole('link', { name: /Work/i })
    await workLink.click()

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const el = document.getElementById('work')
          if (!el) return 9999
          return Math.abs(el.getBoundingClientRect().top)
        })
      })
      .toBeLessThan(140)

    await expect(workLink).toHaveAttribute('aria-current', 'location')

    // Scroll to bottom and verify Contact becomes active
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const contactLink = sidebar.getByRole('link', { name: /Contact/i })
    await expect(contactLink).toHaveAttribute('aria-current', 'location')
  })

  test('mobile drawer opens, traps focus, closes via Escape returning focus, and closes on link click', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 1280) >= 1024, 'Mobile/Tablet drawer test')

    const menuBtn = page.getByTestId('mobile-menu-button')
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')

    await menuBtn.click()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    const drawer = page.getByTestId('mobile-nav-drawer')
    await expect(drawer).toBeVisible()

    // Focus should move inside drawer and stay trapped across Tab presses
    await expect
      .poll(() =>
        page.evaluate(() => {
          const d = document.getElementById('mobile-nav-drawer')
          return d ? d.contains(document.activeElement) : false
        })
      )
      .toBe(true)

    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('Tab')
      const inside = await page.evaluate(() => {
        const d = document.getElementById('mobile-nav-drawer')
        return d ? d.contains(document.activeElement) : false
      })
      expect(inside).toBe(true)
    }

    // Escape closes drawer and restores focus to menu button
    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(menuBtn).toBeFocused()

    // Reopen and click a nav link -> closes drawer and scrolls
    await menuBtn.click()
    await expect(drawer).toBeVisible()
    await drawer.getByRole('link', { name: /Work/i }).click()
    await expect(drawer).toBeHidden()
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const el = document.getElementById('work')
          return el ? Math.abs(el.getBoundingClientRect().top) : 9999
        })
      })
      .toBeLessThan(140)
  })

  test('skip-to-content link focuses main landmark via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: /Skip to main content/i })
    await expect(skipLink).toBeFocused()
    await page.keyboard.press('Enter')
    const main = page.locator('#main-content')
    await expect(main).toBeVisible()
  })

  test('has no horizontal overflow at 375px, 768px, and 1280px', async ({ page }) => {
    for (const width of [375, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 })
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
      expect(overflow, `Horizontal overflow at ${width}px`).toBeLessThanOrEqual(0)
    }
  })

  test('passes axe scan on layout shell', async ({ page }) => {
    await runAxeScan(page)
  })
})
