/**
 * Work / Projects Data
 *
 * Paano i-edit:
 * - Palitan ang mga placeholder na may `// EDIT ME` ng totoong detalye at screenshots mo.
 * - `type`: gamitin ang `'landing'` para sa React landing pages o `'system'` para sa web systems.
 * - `images`: array ng screenshots para sa slideshow sa modal (unang image ang cover preview).
 *   Pwedeng path mula sa `public/` (hal. `'/landing-1.png'`) o imported image mula sa `src/assets/projects/`.
 * - Kung blangko ang `images` (`[]`), `live`, o `repo` (`''`), awtomatiko itong itatago nang hindi nasisira ang layout.
 * - Panatilihing nauuna ang `'landing'` projects para malinaw ang front-end focus.
 */

import landing1Svg from '../assets/projects/landing-1.svg'
import landing2Img from '../assets/projects/landing-2.svg'
import landing3Img from '../assets/projects/landing-3.svg'
import system1Img from '../assets/projects/system-1.svg'
import system2Img from '../assets/projects/system-2.svg'

// Isang array variable para sa lahat ng screenshots ng project (unang item ang cover)
const rozanaImages = [
  '/rozana-1.png',
  '/rozana-2.png',
  '/rozana-3.png',
  '/rozana-4.png',
  '/rozana-5.png',
  '/rozana-6.png',
  '/rozana-7.png',
  '/rozana-8.png',
  '/rozana-9.png',
  '/rozana-10.png',
  '/rozana-11.png',
]

/**
 * Normalizes an external project URL (live site or repo).
 * - Trims whitespace
 * - Auto-prepends `https://` if the user enters a bare domain like `rozanatravels.com`
 * - Rejects empty or unsafe protocols (e.g. `javascript:`)
 */
export function normalizeExternalUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return ''
  const trimmed = rawUrl.trim()
  if (!trimmed) return ''
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (/^\/\//.test(trimmed)) return `https:${trimmed}`
  return `https://${trimmed.replace(/^\/+/, '')}`
}

/**
 * Returns a clean display hostname/path for preview UI (e.g. `rozanatravels.com`).
 */
export function formatDisplayUrl(rawUrl) {
  const normalized = normalizeExternalUrl(rawUrl)
  if (!normalized) return ''
  try {
    const parsed = new URL(normalized)
    const cleanPath = parsed.pathname === '/' ? '' : parsed.pathname.replace(/\/$/, '')
    return `${parsed.host}${cleanPath}`
  } catch {
    return normalized.replace(/^https?:\/\//i, '')
  }
}

/**
 * Normalizes a project's `images` array (or single `image` string) into
 * an array of `{ src, alt }` objects, filtering out blank entries.
 */
export function getProjectImages(project) {
  if (!project) return []

  const rawList = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : project.image
      ? [project.image]
      : []

  const seen = new Set()
  const normalized = []

  rawList.forEach((entry, idx) => {
    const src = typeof entry === 'string' ? entry.trim() : entry?.src?.trim()
    if (!src || seen.has(src)) return
    seen.add(src)
    normalized.push({
      src,
      alt:
        (typeof entry === 'object' && entry?.alt) ||
        `${project.title || 'Project'} preview ${idx + 1}`,
    })
  })

  return normalized
}

export const projectsData = [
  {
    id: 'project-landing-01',
    title: 'Rozana Travel Agency', // EDIT ME
    type: 'landing',
    role: 'Front-End Developer', // EDIT ME
    year: '2026', // EDIT ME
    stack: ['React', 'Tailwind CSS', 'Vite', 'Motion'], // EDIT ME
    description:
      'Placeholder description for a conversion-focused React landing page featuring responsive grid choreography, semantic markup, fast initial paint, and accessible keyboard navigation.', // EDIT ME
    images: rozanaImages, // Isang array variable lang ang tinatawag para sa lahat ng screenshots
    live: 'https://rozanatravels.com/', 
    repo: 'https://github.com/prinnsipeeeee/rozana-tours-travel-website', 
    featured: true,
  },
  {
    id: 'project-landing-02',
    title: 'Project Title — SaaS Product Showcase', // EDIT ME
    type: 'landing',
    role: 'Front-End Developer', // EDIT ME
    year: '2026', // EDIT ME
    stack: ['React', 'Tailwind CSS', 'Lucide Icons', 'Vite'], // EDIT ME
    description:
      'Placeholder description for a modular SaaS marketing page built with reusable React sections, responsive pricing comparisons, and lightweight motion transitions tuned for mobile devices.', // EDIT ME
    image: landing2Img, // EDIT ME
    images: [landing2Img, landing1Svg, landing3Img], // EDIT ME: Palitan ng screenshots para sa slideshow
    live: 'https://example.com/landing-02', // EDIT ME
    repo: 'https://github.com/prinnsipeeeee', // EDIT ME
    featured: true,
  },
  {
    id: 'project-landing-03',
    title: 'Project Title — Editorial Studio Site', // EDIT ME
    type: 'landing',
    role: 'Front-End Developer', // EDIT ME
    year: '2025', // EDIT ME
    stack: ['React', 'Tailwind CSS', 'Motion', 'HTML/CSS'], // EDIT ME
    description:
      'Placeholder description for a minimalist editorial landing site emphasizing clean typography hierarchy, high-contrast monochrome surfaces, and smooth section anchoring.', // EDIT ME
    image: landing3Img, // EDIT ME
    images: [landing3Img, landing1Svg, landing2Img], // EDIT ME: Palitan ng screenshots para sa slideshow
    live: 'https://example.com/landing-03', // EDIT ME
    repo: '', // EDIT ME: Halimbawa ng project na walang public repo (kusang itatago ang Code link)
    featured: false,
  },
  {
    id: 'project-system-01',
    title: 'Project Title — Client Booking & Portal System', // EDIT ME
    type: 'system',
    role: 'Front-End Developer', // EDIT ME
    year: '2026', // EDIT ME
    stack: ['React', 'Tailwind CSS', 'Supabase', 'REST API'], // EDIT ME
    description:
      'Placeholder description for a compact web system allowing staff to track client bookings, filter records, and manage schedules with a clean, responsive dashboard UI.', // EDIT ME
    image: system1Img, // EDIT ME
    images: [system1Img, system2Img, landing1Svg], // EDIT ME: Palitan ng screenshots para sa slideshow
    live: 'https://example.com/system-01', // EDIT ME
    repo: 'https://github.com/prinnsipeeeee', // EDIT ME
    featured: false,
  },
  {
    id: 'project-system-02',
    title: 'Project Title — Issue & QA Tracking Workspace', // EDIT ME
    type: 'system',
    role: 'Front-End & Manual QA', // EDIT ME
    year: '2025', // EDIT ME
    stack: ['React', 'JavaScript', 'MySQL', 'PHP'], // EDIT ME
    description:
      'Placeholder description for an internal web system designed for logging functional test cases, tracking bug status, and reviewing release readiness across browsers.', // EDIT ME
    image: system2Img, // EDIT ME
    images: [system2Img, system1Img, landing2Img], // EDIT ME: Palitan ng screenshots para sa slideshow
    live: '', // EDIT ME: Halimbawa ng internal system na walang public live link
    repo: 'https://github.com/prinnsipeeeee', // EDIT ME
    featured: false,
  },
]
