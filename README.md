# Prince Peñaflor — Personal Portfolio

A minimalist, monochrome Front-End Web Developer portfolio built with **React 18**, **Vite**, **Tailwind CSS**, and **Motion**. Focused on responsive React landing pages, clean UI craft, web performance, and accessibility — with web systems as a secondary focus.

> **Backup Note:** The previous Vue 3 version of this repository is preserved under the `vue-v1` git tag (`git checkout vue-v1` to inspect).

## Features

- **Monochrome Design System:** Dark (`#0a0a0a`) and light (`#f4f4f2`) themes with system preference detection, localStorage persistence, zero FOUC, subtle SVG grain overlay, and hairline/dot-grid accents.
- **Responsive Navigation:** Fixed left sidebar on desktop (`lg+`) with active section tracking, live Manila time, theme toggle, and social links; top bar + focus-trapped slide-over drawer on tablet/mobile.
- **Sections:** Home, About, Stack, Work (with All / Landing pages / Web systems filters + accessible detail modal), Experience & Education, GitHub Activity (52-week monochrome heatmap + recent pushes with 1-hour cache and sample fallback), Contact (design-only `mailto:` project templates), and Footer.
- **Accessibility & Motion:** Keyboard-first navigation, skip-to-content link, ARIA landmarks, WCAG AA contrast, and full `prefers-reduced-motion` support.

## Tech Stack

- **Core:** React 18 (JavaScript), Vite 6, Tailwind CSS 3
- **Motion & Icons:** `motion` (`motion/react`), `lucide-react`, `simple-icons`
- **Typography:** `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono`, `@fontsource/instrument-serif`
- **Testing:** Vitest (unit), Playwright + `@axe-core/playwright` (E2E & accessibility)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Running Tests

```bash
# Run all unit tests (Vitest) and E2E + accessibility tests (Playwright)
npm test

# Run unit tests only
npm run test:unit

# Run Playwright E2E tests only (Desktop Chrome, Tablet, Mobile)
npm run test:e2e
```

## Paano palitan ang content

Lahat ng text, links, projects, at profile details ay nasa `src/config.js` at `src/data/`. Walang hardcoded personal content sa mga UI component.

1. Mag-search ng `EDIT ME` sa buong project (hal. `Ctrl+Shift+F` → `EDIT ME`) para makita agad ang bawat placeholder na puwede mong palitan.
2. I-edit ang mga sumusunod na file:

| File | Ano ang pwedeng palitan |
| --- | --- |
| `src/config.js` | `githubUsername`, `siteTitle`, `siteDescription`, `favicon`, at `ogImage` (awtomatikong ini-inject sa `index.html`) |
| `src/data/profile.js` | Pangalan, initials, role/title, tagline, `currently` status, bio paragraphs, quick facts, CV download path (`public/`), at sidebar navigation links |
| `src/data/skills.js` | Mga tech stack item sa `Core`, `Tooling`, `Also work with`, at `Currently learning` |
| `src/data/projects.js` | Mga project sa Work section (`category: 'landing'` o `'system'`), screenshots, role, year, stack, description, live URL, at repo URL |
| `src/data/experience.js` | Work/project experience, education history, at certifications (may automatic duration calculation) |
| `src/data/github.js` | GitHub username (galing sa `siteConfig`), fallback sample pushes, at profile URL |
| `src/data/contact.js` | Email address, location, response time, availability status (`open: true/false`), social links, `mailto:` project type templates, at checklist |

> **Tip para sa CV at Project Screenshots:**
> - Ilagay ang PDF CV mo sa `public/` (hal. `public/Prince-Penaflor-CV.pdf`) at itugma ang `cvUrl` sa `src/data/profile.js`.
> - Palitan ang placeholder SVGs sa `src/assets/projects/` ng totoong screenshots ng mga website mo at i-update ang imports sa `src/data/projects.js`.

## Project Structure

```text
src/
├── assets/projects/   # Project preview images / wireframes
├── components/        # React section & UI components
├── context/           # ThemeContext (dark/light mode)
├── data/              # Plain JS data files (profile, skills, projects, experience, github, contact)
├── hooks/             # useActiveSection, useFocusTrap, useManilaTime
├── lib/               # motion.js constants & github.js API/cache helpers
├── App.jsx
├── config.js          # Site metadata & GitHub username
├── main.jsx
└── style.css          # Monochrome design tokens, textures & focus styles
tests/
├── unit/              # Vitest unit tests
├── e2e/               # Playwright E2E & axe-core accessibility tests
└── helpers.js         # Shared GitHub API mocks & axe scan helper
```

## License

Personal portfolio project. All rights reserved.
