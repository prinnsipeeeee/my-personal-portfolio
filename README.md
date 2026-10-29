# My Personal Portfolio

A minimalist personal portfolio website showcasing my web development projects, skills, and experience for clients and employers.

> **Status:** 🚧 Under development

## Overview

This portfolio is built feature by feature, with every feature documented through its own Git branch and commit history.

## Features (Planned)

- Responsive, mobile-first layout
- Dark mode and light mode toggle
- Sections: Hero, About, Skills, Projects, Experience/Education, Contact
- Smooth scrolling navigation
- Dark blue and orange minimalist theme

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Git and GitHub for version control

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd <project-folder>

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── assets/        # Images and static assets
├── components/    # Vue components (Navbar, Hero, About, etc.)
├── App.vue
└── main.js
```

## Development Workflow

Each feature is developed on its own branch and merged into `main`:

```bash
git checkout -b feat/<feature-name>
git add .
git commit -m "feat: <short description>"
git push -u origin feat/<feature-name>
```

## Contact

- **Name:** <Your Name>
- **Email:** <your-email@example.com>
- **GitHub:** <https://github.com/your-username>
- **LinkedIn:** <https://linkedin.com/in/your-profile>

## License

This project is for personal portfolio use. All rights reserved.