/**
 * Work / Projects Data
 *
 * Paano i-edit:
 * - Palitan ang mga placeholder na may `// EDIT ME` ng totoong detalye at screenshots mo.
 * - `type`: gamitin ang `'landing'` para sa React landing pages o `'system'` para sa web systems.
 * - Kung blangko ang `image`, `live`, o `repo` (`''`), awtomatiko itong itatago nang hindi nasisira ang layout.
 * - Panatilihing nauuna ang `'landing'` projects para malinaw ang front-end focus.
 */

import landing1Img from '../assets/projects/landing-1.svg'
import landing2Img from '../assets/projects/landing-2.svg'
import landing3Img from '../assets/projects/landing-3.svg'
import system1Img from '../assets/projects/system-1.svg'
import system2Img from '../assets/projects/system-2.svg'

export const projectsData = [
  {
    id: 'project-landing-01',
    title: 'Project Title — Brand Launch Landing Page', // EDIT ME
    type: 'landing',
    role: 'Front-End Developer', // EDIT ME
    year: '2026', // EDIT ME
    stack: ['React', 'Tailwind CSS', 'Vite', 'Motion'], // EDIT ME
    description:
      'Placeholder description for a conversion-focused React landing page featuring responsive grid choreography, semantic markup, fast initial paint, and accessible keyboard navigation.', // EDIT ME
    image: landing1Img, // EDIT ME: Palitan ng screenshot path o imported image
    live: 'https://example.com/landing-01', // EDIT ME: Ilagay ang live URL o '' kung wala
    repo: 'https://github.com/prinnsipeeeee', // EDIT ME: Ilagay ang repo URL o '' kung private
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
    live: '', // EDIT ME: Halimbawa ng internal system na walang public live link
    repo: 'https://github.com/prinnsipeeeee', // EDIT ME
    featured: false,
  },
]
