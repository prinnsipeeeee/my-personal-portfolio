/**
 * =======================================================================
 * PROJECTS DATA CONFIGURATION
 * =======================================================================
 * Gabay:
 * - Madaling magdagdag/magbawas: maglagay lang ng bagong object sa array.
 * - Bawat project ay may array ng `images` para sa in-modal carousel.
 * - Palitan ang `liveUrl` at `githubUrl` ng iyong totoong links.
 * =======================================================================
 */

export const projectsData = [
  {
    id: 'e-commerce-platform',
    title: 'Modern E-Commerce Store',
    category: 'Full-Stack Web App',
    tagline: 'High-performance storefront with real-time cart, checkout, and inventory management.',
    description: 'A full-featured responsive e-commerce web application featuring dynamic product catalog filtering, cart state persistence, secure mock checkout flow, and dark/light responsive interface design.',
    tags: ['Vue 3', 'Tailwind CSS', 'Vite', 'Supabase', 'REST API'],
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/prinnsipeeeee',
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Real-time state management for persistent shopping carts',
      'Responsive mobile-first navigation and layout',
      'Instant search and category-based filtering',
      'Secure backend integration with database persistence'
    ],
  },
  {
    id: 'task-management-dashboard',
    title: 'Productivity Task Hub',
    category: 'Web Application',
    tagline: 'Collaborative task planner with drag-and-drop boards and analytics.',
    description: 'An interactive productivity dashboard enabling users to organize milestones, track development tickets, monitor project completion rates, and manage priorities with clean visual boards.',
    tags: ['React.js', 'Tailwind CSS', 'Firebase', 'JavaScript'],
    featured: true,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/prinnsipeeeee',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Kanban board layout with priority color tags',
      'Real-time database sync for status updates',
      'Productivity completion statistics and charts',
      'Lightweight client-side performance'
    ],
  },
  {
    id: 'restaurant-booking-system',
    title: 'Gourmet Table Booking',
    category: 'Client Website',
    tagline: 'Interactive culinary landing page with table reservation system.',
    description: 'A bespoke modern restaurant website designed to present menu specialties, showcase high-resolution culinary photography, and facilitate seamless reservation bookings for diners.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/prinnsipeeeee',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Interactive date & seating reservation picker',
      'Dynamic menu section with dietary filters',
      'Optimized asset loading for rapid page speed',
      'Fully responsive mobile dining experience'
    ],
  },
  {
    id: 'developer-portfolio-template',
    title: 'Minimalist Developer Portfolio',
    category: 'Portfolio / UI',
    tagline: 'Typography-driven portfolio showcase built for creative engineers.',
    description: 'A clean, high-performance developer portfolio template emphasizing typography, subtle ambient motion, responsive dark/light theme switching, and interactive component showcases.',
    tags: ['Vue 3', 'Tailwind CSS', 'Motion-v', 'Vite'],
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/prinnsipeeeee',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Single-page architecture with smooth anchor scrolling',
      'System-preferred dark and light mode synchronization',
      'Interactive HUD terminal and radar components',
      'Touch-friendly mobile drawer and controls'
    ],
  },
  {
    id: 'qa-bug-tracker-suite',
    title: 'QA Bug & Defect Tracker',
    category: 'Quality Assurance Tool',
    tagline: 'Streamlined issue logging and testing workflow verification tool.',
    description: 'A testing and defect tracking utility tailored for software quality assurance, enabling testers to record test cases, document reproduce steps, log severity, and track resolution lifecycles.',
    tags: ['Java', 'MySQL', 'PHP', 'Manual Testing'],
    featured: false,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/prinnsipeeeee',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Structured defect reporting with severity rankings',
      'Test case execution status tracking',
      'Database logging and relational record management',
      'Designed for QA workflow efficiency'
    ],
  },
]