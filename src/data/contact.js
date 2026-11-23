/**
 * Contact Data
 *
 * Paano i-edit:
 * - Palitan ang mga linyang may `// EDIT ME` ng sarili mong email, availability, socials, at templates.
 * - Walang personal info rito maliban sa public email at social links na gusto mong ipakita.
 * - Kung blangko ang isang field (`''` o `[]`), awtomatiko itong itatago sa UI.
 */

export const contactData = {
  email: 'prynzpenaflor@gmail.com', // EDIT ME: Public work email mo
  location: 'Antipolo City, Philippines', // EDIT ME: City / Country lang (huwag full address)
  timezone: 'Asia/Manila',
  timezoneLabel: 'Manila (GMT+8)',
  responseTime: 'I usually reply within 24 hours.', // EDIT ME

  availability: {
    open: true, // EDIT ME: Gawing `false` kapag puno na ang schedule
    label: 'Available for front-end projects', // EDIT ME
    closedLabel: 'Currently booked for projects', // EDIT ME
  },

  socials: [
    {
      name: 'GitHub',
      handle: '@prinnsipeeeee',
      url: 'https://github.com/prinnsipeeeee', // EDIT ME
      svg: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    {
      name: 'LinkedIn',
      handle: 'in/prynz-peñaflor',
      url: 'https://www.linkedin.com/in/prynz-peñaflor', // EDIT ME
      svg: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5v-8.37H5.07v8.37h2.79z',
    },
  ],

  projectTypes: [
    {
      id: 'landing-page',
      label: 'Landing Page', // EDIT ME
      subject: 'Landing Page Project Inquiry',
      body: `Hi Prince,\n\nI need a fast, responsive React landing page.\n\n- Name / Brand: \n- Goal of the page: \n- Target timeline: \n- Budget range: \n- Reference links: \n\nThanks!`,
    },
    {
      id: 'website',
      label: 'Website', // EDIT ME
      subject: 'Website Project Inquiry',
      body: `Hi Prince,\n\nI would like to build a website.\n\n- Name / Company: \n- What you need: \n- Target timeline: \n- Budget range: \n- Reference links: \n\nLooking forward to your reply.`,
    },
    {
      id: 'web-system',
      label: 'Web System', // EDIT ME
      subject: 'Web System Front-End Inquiry',
      body: `Hi Prince,\n\nI am looking for a front-end developer for a web system.\n\n- Name / Company: \n- Main screens or features: \n- Target timeline: \n- Budget range: \n- Reference links: \n\nLet's discuss.`,
    },
    {
      id: 'maintenance',
      label: 'UI Polish & Fixes', // EDIT ME
      subject: 'Front-End Maintenance & UI Polish Inquiry',
      body: `Hi Prince,\n\nI need responsive fixes or UI updates on an existing website.\n\n- Live URL: \n- Issues or updates needed: \n- Target timeline: \n\nThank you!`,
    },
    {
      id: 'other',
      label: 'Other', // EDIT ME
      subject: 'Front-End Project Inquiry',
      body: `Hi Prince,\n\nI have a project or role I'd like to talk about.\n\n- Name: \n- Details: \n\nBest regards,`,
    },
  ],

  checklist: [
    'What you want built (landing page, site, or web system)', // EDIT ME
    'Your target timeline',
    'Estimated budget range',
    'Figma file or reference links',
  ],
}
