/**
 * Skills Data
 *
 * Paano i-edit:
 * - Magdagdag o magbawas ng group sa `groups` (Core, Tooling, Also work with, Currently learning).
 * - Bawat skill ay may `name`, `icon` (export mula sa `simple-icons` o `null` para sa initials fallback), at `note`.
 * - Palitan ang mga linyang may `// EDIT ME` kung may update ka sa stack mo.
 */

import {
  siHtml5,
  siCss,
  siJavascript,
  siReact,
  siVuedotjs,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siPhp,
  siPython,
  siOpenjdk,
  siMysql,
  siFirebase,
  siSupabase,
  siGit,
  siGithub,
  siGithubpages,
  siVite,
  siFigma,
  siVercel,
  siHostinger,
} from 'simple-icons'

export const skillsData = {
  groups: [
    {
      id: 'core',
      label: 'Core',
      emphasis: 'primary',
      description: 'Primary front-end tools I use to ship responsive React landing pages and clean UI.', // EDIT ME
      skills: [
        { name: 'React', icon: siReact, note: 'Landing pages, modular components, and hooks' }, // EDIT ME
        { name: 'JavaScript', icon: siJavascript, note: 'ES6+, DOM interaction, and async client flows' },
        { name: 'HTML5', icon: siHtml5, note: 'Semantic markup, SEO structure, and accessibility' },
        { name: 'CSS3', icon: siCss, note: 'Responsive Flexbox, CSS Grid, and fluid typography' },
        { name: 'Tailwind CSS', icon: siTailwindcss, note: 'Design tokens and rapid utility styling' },
      ],
    },
    {
      id: 'tooling',
      label: 'Tooling',
      emphasis: 'standard',
      description: 'Build tools, version control, design handoff, and deployment workflow.', // EDIT ME
      skills: [
        { name: 'Vite', icon: siVite, note: 'Fast local dev server and optimized bundling' },
        { name: 'Git', icon: siGit, note: 'Clean commits, branching, and version hygiene' },
        { name: 'GitHub', icon: siGithub, note: 'Repositories, collaboration, and CI workflows' },
        { name: 'Figma', icon: siFigma, note: 'Translating design specs into pixel-accurate UI' },
        { name: 'VS Code', icon: null, note: 'Primary code editor and debugging environment' },
        { name: 'Vercel', icon: siVercel, note: 'Zero-config production deployment for front-end apps' },
        { name: 'GitHub Pages', icon: siGithubpages, note: 'Static site hosting directly from Git repos' },
        { name: 'Hostinger', icon: siHostinger, note: 'Client hosting setup and routine updates' },
      ],
    },
    {
      id: 'also-work-with',
      label: 'Also work with',
      emphasis: 'secondary',
      description: 'Secondary web systems, backend, database, and QA fundamentals.', // EDIT ME
      skills: [
        { name: 'Vue.js', icon: siVuedotjs, note: 'Composition API experience on client work' },
        { name: 'Node.js', icon: siNodedotjs, note: 'JavaScript runtime and API integration' }, // EDIT ME
        { name: 'Express', icon: siExpress, note: 'Lightweight REST endpoints for web systems' }, // EDIT ME
        { name: 'Supabase', icon: siSupabase, note: 'Postgres database, auth, and realtime data' },
        { name: 'MySQL', icon: siMysql, note: 'Relational schema design and SQL queries' },
        { name: 'Firebase', icon: siFirebase, note: 'Cloud Firestore and quick client hosting' },
        { name: 'PHP', icon: siPhp, note: 'Server-side scripting for legacy web systems' },
        { name: 'Java', icon: siOpenjdk, note: 'NC III competency training and OOP foundations' },
        { name: 'Python', icon: siPython, note: 'Scripting and problem-solving fundamentals' },
        { name: 'Manual Testing & QA', icon: null, note: 'Functional testing, bug reporting, and cross-browser checks' },
      ],
    },
    {
      id: 'learning',
      label: 'Currently learning',
      emphasis: 'compact',
      description: 'Areas I am actively deepening to write more resilient interfaces.', // EDIT ME
      skills: [
        { name: 'TypeScript', icon: null, note: 'Static typing for scalable React codebases' }, // EDIT ME
        { name: 'Automated UI Testing', icon: null, note: 'Playwright end-to-end and accessibility testing' }, // EDIT ME
        { name: 'Web Performance', icon: null, note: 'Core Web Vitals, bundle optimization, and rendering' }, // EDIT ME
      ],
    },
  ],
}
