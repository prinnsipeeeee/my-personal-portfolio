import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers.js'

test.describe('Work section and project modal', () => {
  test('filters projects correctly with landing pages listed first in All', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')

    const work = page.locator('#work')
    await work.scrollIntoViewIfNeeded()

    const rows = work.getByTestId('work-row')
    await expect(rows).toHaveCount(5)

    // Landing pages must appear first in default All view
    const firstThreeTypes = await rows.evaluateAll((els) =>
      els.slice(0, 3).map((el) => el.getAttribute('data-project-type'))
    )
    expect(firstThreeTypes).toEqual(['landing', 'landing', 'landing'])

    // Filter: Landing pages
    await work.getByRole('tab', { name: /Landing pages/i }).click()
    await expect(rows).toHaveCount(3)

    // Filter: Web systems
    await work.getByRole('tab', { name: /Web systems/i }).click()
    await expect(rows).toHaveCount(2)

    // Filter: All
    await work.getByRole('tab', { name: /All/i }).click()
    await expect(rows).toHaveCount(5)

    await runAxeScan(page, { include: '#work' })
  })

  test('opens detail modal, traps focus, locks scroll, and closes via Escape, backdrop, and close button', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')

    const work = page.locator('#work')
    await work.scrollIntoViewIfNeeded()

    const firstRow = work.getByTestId('work-row').first()
    await firstRow.click()

    const modal = page.getByTestId('project-modal')
    await expect(modal).toBeVisible()
    await expect(modal).toHaveAttribute('role', 'dialog')
    await expect(modal).toHaveAttribute('aria-modal', 'true')

    // Body scroll is locked while modal is open
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow)
    expect(bodyOverflow).toBe('hidden')

    // Axe scan on open modal
    await runAxeScan(page, { include: '[data-testid="project-modal"]' })

    // Focus stays inside modal across Tab presses
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab')
      const inside = await page.evaluate(() => {
        const m = document.querySelector('[data-testid="project-modal"]')
        return m ? m.contains(document.activeElement) : false
      })
      expect(inside).toBe(true)
    }

    // Close via Escape -> restores focus to trigger row and unlocks scroll
    await page.keyboard.press('Escape')
    await expect(modal).toBeHidden()
    await expect(firstRow).toBeFocused()
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')

    // Reopen and close via backdrop click
    await firstRow.click()
    await expect(modal).toBeVisible()
    await page.getByTestId('project-modal-backdrop').click({ position: { x: 5, y: 5 }, force: true })
    await expect(modal).toBeHidden()

    // Reopen and close via Close button
    await firstRow.click()
    await expect(modal).toBeVisible()
    await page.getByTestId('project-modal-close').click()
    await expect(modal).toBeHidden()
  })

  test('navigates project modal slideshow via prev/next buttons, thumbnails, and arrow keys', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.goto('/')

    const work = page.locator('#work')
    await work.scrollIntoViewIfNeeded()
    await work.getByTestId('work-row').first().click()

    const modal = page.getByTestId('project-modal')
    await expect(modal).toBeVisible()

    const counter = modal.getByTestId('project-slide-counter')
    const thumbs = modal.getByTestId('project-slide-thumb')
    const total = await thumbs.count()
    expect(total).toBeGreaterThanOrEqual(2)
    const pad = (n) => String(n).padStart(2, '0')

    await expect(counter).toHaveText(`01 / ${pad(total)}`)
    await expect(thumbs.nth(0)).toHaveAttribute('aria-pressed', 'true')

    // Live link points directly to an absolute https:// URL opening in a new tab
    const liveLink = modal.getByTestId('project-modal-live')
    await expect(liveLink).toHaveAttribute('href', /^https:\/\/.+/)
    await expect(liveLink).toHaveAttribute('target', '_blank')
    await expect(liveLink).toHaveAttribute('rel', /noopener/)

    // Click Next toggle -> slide 02
    await modal.getByTestId('project-slide-next').click()
    await expect(counter).toHaveText(`02 / ${pad(total)}`)
    await expect(thumbs.nth(1)).toHaveAttribute('aria-pressed', 'true')

    // Click Prev toggle -> back to 01, then Prev wraps to last slide
    await modal.getByTestId('project-slide-prev').click()
    await expect(counter).toHaveText(`01 / ${pad(total)}`)
    await modal.getByTestId('project-slide-prev').click()
    await expect(counter).toHaveText(`${pad(total)} / ${pad(total)}`)
    await expect(thumbs.nth(total - 1)).toHaveAttribute('aria-pressed', 'true')

    // Click second small thumbnail directly -> 02
    await thumbs.nth(1).click()
    await expect(counter).toHaveText(`02 / ${pad(total)}`)

    // ArrowRight / ArrowLeft keyboard navigation
    await page.keyboard.press('ArrowRight')
    await expect(counter).toHaveText(`03 / ${pad(total)}`)
    await page.keyboard.press('ArrowLeft')
    await expect(counter).toHaveText(`02 / ${pad(total)}`)
  })

  test('normalizes bare domain Live URLs to https:// automatically', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.addInitScript(() => {
      window.__PORTFOLIO_TEST_OVERRIDES__ = {
        projects: [
          {
            id: 'bare-domain-project',
            title: 'Bare Domain Live Link Test',
            type: 'landing',
            role: 'Front-End Developer',
            year: '2026',
            stack: ['React'],
            description: 'Verifies bare domains receive https:// automatically.',
            image: '',
            live: 'rozanatravels.com',
            repo: 'github.com/prinnsipeeeee/rozana-tours-travel-website',
          },
        ],
      }
    })

    await page.goto('/')
    const work = page.locator('#work')
    await work.scrollIntoViewIfNeeded()
    await work.getByTestId('work-row').first().click()

    const modal = page.getByTestId('project-modal')
    await expect(modal.getByTestId('project-modal-live')).toHaveAttribute(
      'href',
      'https://rozanatravels.com'
    )
    await expect(modal.getByTestId('project-modal-repo')).toHaveAttribute(
      'href',
      'https://github.com/prinnsipeeeee/rozana-tours-travel-website'
    )
  })

  test('hides blank image, live, and repo links without breaking layout', async ({ page }) => {
    await mockGitHubAPIs(page)
    await page.addInitScript(() => {
      window.__PORTFOLIO_TEST_OVERRIDES__ = {
        projects: [
          {
            id: 'minimal-project',
            title: 'Minimal Project Without Links Or Image',
            type: 'landing',
            role: 'Front-End Developer',
            year: '2026',
            stack: ['React'],
            description: 'Testing blank optional fields.',
            image: '',
            live: '',
            repo: '',
            featured: false,
          },
        ],
      }
    })

    await page.goto('/')
    const work = page.locator('#work')
    await work.scrollIntoViewIfNeeded()

    const row = work.getByTestId('work-row').first()
    await expect(row).toBeVisible()
    await expect(row.locator('img')).toHaveCount(0)

    await row.click()
    const modal = page.getByTestId('project-modal')
    await expect(modal).toBeVisible()
    await expect(modal.locator('img')).toHaveCount(0)
    await expect(modal.getByTestId('project-modal-live')).toHaveCount(0)
    await expect(modal.getByTestId('project-modal-repo')).toHaveCount(0)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })
})
