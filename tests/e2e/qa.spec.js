import { test, expect } from '@playwright/test'
import { mockGitHubAPIs, runAxeScan } from '../helpers'

test.describe('Phase 11 Final QA', () => {
  test('full-page scroll has zero console/page errors, valid SEO meta, and loaded images', async ({ page }) => {
    const consoleErrors = []
    const pageErrors = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', (err) => pageErrors.push(err.message))

    await mockGitHubAPIs(page, { mode: 'success' })
    await page.goto('/')

    // Verify SEO and Open Graph metadata
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    const title = await page.title()
    expect(title).toContain('Prince Peñaflor')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /.+/)

    // Scroll through every section + footer so lazy content & animations settle
    const anchors = ['#home', '#about', '#stack', '#work', '#experience', '#github', '#contact', 'footer']
    for (const selector of anchors) {
      const el = page.locator(selector).first()
      await el.scrollIntoViewIfNeeded()
      await expect(el).toBeVisible()
    }

    // Scroll through every visible <img> so lazy-loaded images finish loading
    const allImgs = page.locator('img')
    const imgCount = await allImgs.count()
    let checkedVisibleImgs = 0
    for (let i = 0; i < imgCount; i++) {
      const img = allImgs.nth(i)
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded()
        await expect
          .poll(
            () => img.evaluate((el) => el.complete && el.naturalWidth > 0),
            { message: `Visible image #${i} failed to load`, timeout: 5000 }
          )
          .toBe(true)
        const alt = await img.getAttribute('alt')
        expect(alt && alt.trim().length, `Missing alt on visible image #${i}`).toBeGreaterThan(0)
        checkedVisibleImgs++
      }
    }
    expect(checkedVisibleImgs).toBeGreaterThan(0)

    expect(consoleErrors).toEqual([])
    expect(pageErrors).toEqual([])
  })

  test('passes full-page axe scan in both dark and light modes after revealing all sections', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'success' })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')

    // Scroll step-by-step through the entire page so every IntersectionObserver reveal settles
    const totalHeight = await page.evaluate(() => document.body.scrollHeight)
    const step = 450
    for (let y = 0; y <= totalHeight; y += step) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y)
      await page.waitForTimeout(80)
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(250)

    // Dark mode full-page axe audit
    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
    await runAxeScan(page)

    // Switch to light mode via visible theme toggle
    await page.evaluate(() => window.scrollTo(0, 0))
    const toggles = page.locator('[data-testid="theme-toggle"]')
    const count = await toggles.count()
    for (let i = 0; i < count; i++) {
      if (await toggles.nth(i).isVisible()) {
        await toggles.nth(i).click()
        break
      }
    }
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)

    // Light mode full-page axe audit
    await runAxeScan(page)
  })

  test('keyboard-only navigation works with visible focus indicators', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'success' })
    await page.goto('/')

    // First Tab lands on skip-to-content link with visible focus outline
    await page.keyboard.press('Tab')
    const skipLink = page.locator('a.skip-link')
    await expect(skipLink).toBeFocused()
    const focusStyle = await skipLink.evaluate((el) => {
      const style = getComputedStyle(el)
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth }
    })
    expect(focusStyle.outlineStyle).not.toBe('none')
    expect(focusStyle.outlineWidth).not.toBe('0px')

    // Activate skip link -> moves focus to #main-content
    await page.keyboard.press('Enter')
    await expect(page.locator('#main-content')).toBeFocused()

    // Focus a project row via keyboard and open/close modal using Enter & Escape
    const firstRow = page.locator('[data-testid="work-row"]').first()
    await firstRow.scrollIntoViewIfNeeded()
    await firstRow.focus()
    await expect(firstRow).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('[data-testid="project-modal"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-testid="project-modal"]')).toHaveCount(0)
    await expect(firstRow).toBeFocused()
  })

  test('respects prefers-reduced-motion: reduce with zero stuck opacity-0 content', async ({ page }) => {
    await mockGitHubAPIs(page, { mode: 'success' })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    // Scroll behavior should resolve to auto under reduced motion
    const scrollBehavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
    expect(scrollBehavior).toBe('auto')

    // Check every section heading & main block renders at full opacity immediately
    const hiddenContent = await page.evaluate(() => {
      const targets = document.querySelectorAll('section h1, section h2, section p, footer p')
      const stuck = []
      for (const el of targets) {
        let cur = el
        while (cur && cur !== document.body) {
          const op = parseFloat(getComputedStyle(cur).opacity)
          if (op < 0.99) {
            stuck.push({ tag: el.tagName, text: el.textContent?.slice(0, 40), opacity: op })
            break
          }
          cur = cur.parentElement
        }
      }
      return stuck
    })
    expect(hiddenContent).toEqual([])
  })

  test('handles blank optional fields and extra-long strings without crash or horizontal overflow', async ({ page }) => {
    const consoleErrors = []
    const pageErrors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', (err) => pageErrors.push(err.message))

    await page.addInitScript(() => {
      window.__PORTFOLIO_TEST_OVERRIDES__ = {
        skills: {
          groups: [
            {
              id: 'core',
              title: 'Core',
              emphasis: 'primary',
              description: '',
              skills: [
                {
                  name: 'SupercalifragilisticexpialidociousFrontendFrameworkArchitectureV99',
                  note: 'ExtraordinarilyLongSingleTokenNoteWithoutSpacesToVerifyWrappingBehavior',
                  icon: null,
                },
              ],
            },
          ],
        },
        projects: [
          {
            id: 'long-project',
            title: 'UltraLongLandingPageProjectTitleWithoutAnyNaturalBreakPointsForStressTesting',
            type: 'landing',
            role: '',
            year: '',
            stack: ['React', 'VeryLongCustomToolingIdentifierName'],
            description:
              'Stress-testing long unbroken URLs like https://example.com/very/long/path/that/must/not/cause/horizontal/overflow/on/mobile/devices',
            image: '',
            live: '',
            repo: '',
          },
        ],
        experience: {
          experience: [
            {
              id: 'stress-exp',
              role: 'FrontEndDeveloperWithAnExceptionallyLongRoleTitleForOverflowChecks',
              company: 'IndependentClientProjectsStudioInternational',
              location: '',
              type: '',
              start: '2025-01',
              end: null,
              highlights: ['Built responsive React landing pages with strict accessibility and zero overflow.'],
              tech: [],
            },
          ],
          education: [],
          certifications: [],
        },
        contact: {
          email: 'superlongemailaddressforstresstestingoverflow@subdomain.example.com',
          location: '',
          timezoneLabel: '',
          responseTime: '',
          availability: { open: false, label: '', closedLabel: 'Currently booked' },
          socials: [{ name: 'GitHub', url: 'https://github.com/prinnsipeeeee', handle: '' }],
          projectTypes: [{ id: 'other', label: 'Project inquiry', subject: 'Hello', body: '' }],
          checklist: [],
        },
      }
    })

    await mockGitHubAPIs(page, { mode: 'empty' })
    await page.goto('/')

    // Verify no horizontal overflow at 375px, 768px, and 1280px
    for (const width of [375, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 })
      await page.waitForTimeout(100)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
      expect(overflow, `Horizontal overflow at ${width}px with stress data`).toBeLessThanOrEqual(1)
    }

    expect(consoleErrors).toEqual([])
    expect(pageErrors).toEqual([])
  })
})
