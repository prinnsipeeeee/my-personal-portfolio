/**
 * GitHub Activity Configuration & Sample Fallback Data
 *
 * Paano i-edit:
 * - Ang `githubUsername` ay kinukuha mula sa `src/config.js` para iisa lang ang papalitan mo.
 * - Ang `samplePushes` at `buildSampleContributions()` ay ginagamit lamang bilang malinaw na
 *   "sample data" fallback kapag down o rate-limited ang public GitHub API.
 */

import { siteConfig } from '../config'

export const githubConfig = {
  username: siteConfig.githubUsername, // EDIT ME sa src/config.js
  profileUrl: `https://github.com/${siteConfig.githubUsername}`,
  cacheTtlMs: 60 * 60 * 1000, // 1 hour client-side cache
  maxPushes: 6,
}

export function buildSampleContributions(days = 364) {
  const list = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const date = `${yyyy}-${mm}-${dd}`

    let count = 0
    if (i < 4) {
      count = 2 + (i % 3)
    } else if ((i * 7 + 3) % 5 === 0) {
      count = ((i * 3) % 8) + 1
    } else if (i % 4 === 0) {
      count = 1
    }

    list.push({ date, count })
  }

  return list
}

export const samplePushes = [
  {
    id: 'sample-1',
    repo: 'my-personal-portfolio',
    fullRepo: `${siteConfig.githubUsername}/my-personal-portfolio`,
    message: 'feat: refine monochrome sidebar layout and typography', // EDIT ME
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    url: `https://github.com/${siteConfig.githubUsername}/my-personal-portfolio`,
  },
  {
    id: 'sample-2',
    repo: 'react-landing-template',
    fullRepo: `${siteConfig.githubUsername}/react-landing-template`,
    message: 'perf: optimize hero image loading and font subsets', // EDIT ME
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    url: `https://github.com/${siteConfig.githubUsername}`,
  },
  {
    id: 'sample-3',
    repo: 'saas-product-page',
    fullRepo: `${siteConfig.githubUsername}/saas-product-page`,
    message: 'a11y: add focus trap and keyboard tab navigation', // EDIT ME
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    url: `https://github.com/${siteConfig.githubUsername}`,
  },
  {
    id: 'sample-4',
    repo: 'client-booking-ui',
    fullRepo: `${siteConfig.githubUsername}/client-booking-ui`,
    message: 'style: align responsive spacing across 375px and 768px', // EDIT ME
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    url: `https://github.com/${siteConfig.githubUsername}`,
  },
  {
    id: 'sample-5',
    repo: 'ui-motion-snippets',
    fullRepo: `${siteConfig.githubUsername}/ui-motion-snippets`,
    message: 'fix: respect prefers-reduced-motion on section reveals', // EDIT ME
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    url: `https://github.com/${siteConfig.githubUsername}`,
  },
]
