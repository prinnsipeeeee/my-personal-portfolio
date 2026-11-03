/**
 * Skills data — Stack Index
 *
 * Paano i-edit:
 * - Magdagdag ng category: mag-push ng object sa `categories` (id, label, description, skills[]). Max 6 categories.
 * - Magbawas: tanggalin ang category o skill object. Ang tab count ay automatic.
 * - Palitan ang skill: i-edit ang `name`, `icon` (simple-icons export o `null` para sa initials), `tier` (`core` | `familiar`), at `note` (1 linya, ~60 chars).
 * - Currently learning: i-edit ang `learning` array. Walang personal info dito.
 */

import {
  siHtml5,
  siCss,
  siJavascript,
  siReact,
  siVuedotjs,
  siTailwindcss,
  siOpenjdk,
  siPhp,
  siPython,
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
  categories: [
    {
      id: 'frontend',
      label: 'Frontend',
      description: 'Interfaces I actually ship: markup, layout, and component UI.',
      skills: [
        { name: 'HTML5', icon: siHtml5, tier: 'core', note: 'Semantic markup and accessible structure' },
        { name: 'CSS3', icon: siCss, tier: 'core', note: 'Responsive layouts with Flexbox and Grid' },
        { name: 'JavaScript', icon: siJavascript, tier: 'core', note: 'DOM, ES6+, and async client logic' },
        { name: 'React.js', icon: siReact, tier: 'familiar', note: 'Components, hooks, and shared state' },
        { name: 'Vue.js', icon: siVuedotjs, tier: 'core', note: 'Composition API and reactive UI' },
        { name: 'Tailwind CSS', icon: siTailwindcss, tier: 'core', note: 'Utility-first interface styling' },
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      description: 'Languages I use beyond the browser for logic and training.',
      skills: [
        { name: 'Java', icon: siOpenjdk, tier: 'familiar', note: 'NC III training and object-oriented code' },
        { name: 'PHP', icon: siPhp, tier: 'familiar', note: 'Server-side scripting and data handling' },
        { name: 'Python', icon: siPython, tier: 'familiar', note: 'Scripting, algorithms, and automation' },
      ],
    },
    {
      id: 'database',
      label: 'Database',
      description: 'Stores and backend services I have used in student and client work.',
      skills: [
        { name: 'MySQL', icon: siMysql, tier: 'familiar', note: 'Relational schemas and SQL queries' },
        { name: 'Firebase', icon: siFirebase, tier: 'familiar', note: 'Realtime NoSQL store and hosting' },
        { name: 'Supabase', icon: siSupabase, tier: 'familiar', note: 'Postgres backend, auth, and realtime' },
      ],
    },
    {
      id: 'testing',
      label: 'Testing & QA',
      description: 'How I check that a build actually works before it ships.',
      skills: [
        { name: 'Manual Testing', icon: null, tier: 'familiar', note: 'Test cases and verification' },
        { name: 'Functional Testing', icon: null, tier: 'familiar', note: 'Feature flows and UX checks' },
        { name: 'Bug Identification', icon: null, tier: 'familiar', note: 'Defect logging and troubleshooting' },
        { name: 'Debugging', icon: null, tier: 'familiar', note: 'Isolating and fixing broken behavior' },
        { name: 'Quality Assurance', icon: null, tier: 'familiar', note: 'Cross-browser and device checks' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      description: 'Daily editors, version control, and design-to-code workflow.',
      skills: [
        { name: 'Git', icon: siGit, tier: 'core', note: 'Branching, merges, and commit hygiene' },
        { name: 'GitHub', icon: siGithub, tier: 'core', note: 'Remote repos and collaboration' },
        { name: 'Vite', icon: siVite, tier: 'core', note: 'Dev server and production bundling' },
        { name: 'VS Code', icon: null, tier: 'core', note: 'Primary editor and local setup' },
        { name: 'Figma', icon: siFigma, tier: 'familiar', note: 'Reading UI and turning it into code' },
      ],
    },
    {
      id: 'deployment',
      label: 'Deployment',
      description: 'Where I publish sites after they are ready for people to use.',
      skills: [
        { name: 'Vercel', icon: siVercel, tier: 'familiar', note: 'Production hosting for web apps' },
        { name: 'GitHub Pages', icon: siGithubpages, tier: 'familiar', note: 'Static site hosting from a repo' },
        { name: 'Hostinger', icon: siHostinger, tier: 'familiar', note: 'Shared hosting and site updates' },
      ],
    },
  ],

  learning: ['Java NC III SIL', 'Software QA Testing', 'TypeScript'],
}
