/**
 * =======================================================================
 * PRINCE ALBERT C. PEÑAFLOR - SKILLS DATA CONFIGURATION
 * =======================================================================
 * Naka-base sa opisyal na Resume:
 * - Frontend Development
 * - Programming Languages
 * - Database Management
 * - Software Testing & QA
 * - Tools & Deployment
 * =======================================================================
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
  siVite,
  siFigma,
  siVercel
} from 'simple-icons'

// Helper function para sa awtomatikong level labels
export const getLevelLabel = (level) => {
  switch (Number(level)) {
    case 1: return 'Learning'
    case 2: return 'Basic'
    case 3: return 'Comfortable'
    case 4: return 'Proficient'
    case 5: return 'Advanced'
    default: return 'Familiar'
  }
}

export const skillsData = {
  categories: [
    {
      id: 'frontend',
      label: 'Frontend',
      command: 'stack --load frontend',
      description: 'Responsive web design, modern component architectures, and UI implementation.',
      skills: [
        { name: 'HTML5', icon: siHtml5, level: 5, note: 'Semantic markup & accessible structure' },
        { name: 'CSS3', icon: siCss, level: 5, note: 'Responsive design & flexbox/grid layouts' },
        { name: 'JavaScript', icon: siJavascript, level: 4, note: 'DOM manipulation, ES6+ & async logic' },
        { name: 'React.js', icon: siReact, level: 4, note: 'Reusable components, hooks & state' },
        { name: 'Vue.js', icon: siVuedotjs, level: 4, note: 'Composition API & reactive architecture' },
        { name: 'Tailwind CSS', icon: siTailwindcss, level: 5, note: 'Utility-first modern interface styling' },
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      command: 'stack --load languages',
      description: 'Core programming languages for application logic, scripting, and enterprise systems.',
      skills: [
        { name: 'Java', icon: siOpenjdk, level: 4, note: 'NC III Competency Training & OOP' },
        { name: 'PHP', icon: siPhp, level: 4, note: 'Server-side scripting & data handling' },
        { name: 'Python', icon: siPython, level: 3, note: 'Scripting, algorithms & automation' },
        { name: 'JavaScript', icon: siJavascript, level: 4, note: 'Full-stack application logic' },
      ],
    },
    {
      id: 'database',
      label: 'Database',
      command: 'stack --load database',
      description: 'Relational data modeling, cloud datastores, authentication, and backend services.',
      skills: [
        { name: 'Supabase', icon: siSupabase, level: 4, note: 'Postgres backend, auth & real-time' },
        { name: 'Firebase', icon: siFirebase, level: 4, note: 'NoSQL real-time store & hosting' },
        { name: 'MySQL', icon: siMysql, level: 4, note: 'Relational database schema & queries' },
      ],
    },
    {
      id: 'testing',
      label: 'Testing & QA',
      command: 'stack --load testing-qa',
      description: 'Manual verification, bug reporting, and functional component testing.',
      skills: [
        { name: 'Manual Testing', icon: null, level: 4, note: 'Test case execution & verification' },
        { name: 'Functional Testing', icon: null, level: 4, note: 'Feature workflows & UX validation' },
        { name: 'Bug Identification', icon: null, level: 4, note: 'Defect logging & troubleshooting' },
        { name: 'Quality Assurance', icon: null, level: 4, note: 'Cross-browser & device compliance' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools & DevOps',
      command: 'stack --load tools-devops',
      description: 'Version control, collaborative workflows, and continuous deployment platforms.',
      skills: [
        { name: 'Git', icon: siGit, level: 4, note: 'Branching, merges & commit hygiene' },
        { name: 'GitHub', icon: siGithub, level: 4, note: 'Remote repositories & GitHub Pages' },
        { name: 'Vite', icon: siVite, level: 5, note: 'Blazing fast bundler & dev server' },
        { name: 'VS Code', icon: null, level: 5, note: 'Primary IDE & development setup' },
        { name: 'Figma', icon: siFigma, level: 4, note: 'UI/UX design translation to code' },
        { name: 'Vercel', icon: siVercel, level: 4, note: 'Production web hosting & deployment' },
      ],
    },
  ],

  // Nakabatay sa iyong target competencies at training
  learning: ['Java NC III SIL', 'Software QA Testing', 'TypeScript'],
}