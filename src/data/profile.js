/**
 * Profile & Navigation Data
 *
 * Paano i-edit:
 * - Palitan ang mga linyang may `// EDIT ME` ng sarili mong impormasyon.
 * - Ang `socials`, `email`, at `availability` ay kinukuha mula sa `contact.js` para iisa lang ang source of truth.
 * - Ang blangkong field (`''` o `[]`) ay awtomatikong itatago sa UI.
 */

import { contactData } from './contact'

export const profileData = {
  name: 'Prince Peñaflor',
  firstName: 'Prince',
  lastName: 'Peñaflor',
  initials: 'PP', // EDIT ME: Initials sa sidebar logo
  title: 'Front-End Developer', // EDIT ME: Pangunahing role headline
  tagline: 'Building fast, responsive React websites with clean, modern, and user-friendly interfaces.',
  taglinePrefix: 'Building fast, responsive',
  taglineAccent: 'Websites',
  taglineSuffix: 'with clean, modern, and user-friendly interfaces.',
  currently: 'Building React landing pages & learning TypeScript + UI testing', // EDIT ME
  cvPath: '/Prince_Albert_Cinco_Peñaflor_CV.pdf', 
  location: contactData.location,
  timezone: contactData.timezone,
  timezoneLabel: contactData.timezoneLabel,
  availability: contactData.availability,
  email: contactData.email,
  socials: contactData.socials,

  about: {
    heading: 'Design-minded front-end craft,', // EDIT ME
    headingAccent: 'built for clarity', // EDIT ME
    paragraphs: [
      'I am a front-end web developer focused on turning Figma layouts and product ideas into fast, responsive React landing pages. I care deeply about layout rhythm, legible typography, and accessible interactions that hold up across every viewport.', // EDIT ME
      'Most of my work centers on marketing sites, product landing pages, and modular UI components—with a secondary background supporting full web systems, database integrations, and manual QA testing when a project needs end-to-end reliability.', // EDIT ME
      'Whether shipping a new landing page or tightening an existing interface, I keep code simple, semantic, and maintainable so teams can iterate with confidence.', // EDIT ME
    ],
    quickFacts: [
      { label: 'Location', value: 'Antipolo City, PH' }, // EDIT ME
      { label: 'Experience', value: '1+ yr shipping front-end UI' }, // EDIT ME
      { label: 'Primary focus', value: 'React landing pages & UI craft' }, // EDIT ME
      { label: 'Secondary', value: 'Web systems & manual QA' }, // EDIT ME
      { label: 'Languages', value: 'English, Filipino' }, // EDIT ME
    ],
    portraitAlt: 'Portrait of Prince Peñaflor, Front-End Web Developer', // EDIT ME
    portraitCaption: 'Antipolo City, PH — Front-End Dev', // EDIT ME
  },

  navLinks: [
    { id: 'home', num: '01', label: 'Home', href: '#home', icon: 'home' },
    { id: 'about', num: '02', label: 'About', href: '#about', icon: 'user' },
    { id: 'stack', num: '03', label: 'Stack', href: '#stack', icon: 'layers' },
    { id: 'work', num: '04', label: 'Work', href: '#work', icon: 'briefcase' },
    { id: 'experience', num: '05', label: 'Experience', href: '#experience', icon: 'clock' },
    { id: 'github', num: '06', label: 'GitHub', href: '#github', icon: 'git-branch' },
    { id: 'contact', num: '07', label: 'Contact', href: '#contact', icon: 'mail' },
  ],
}
