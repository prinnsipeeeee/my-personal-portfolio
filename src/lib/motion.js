/**
 * Shared Motion Variants and Transition Configurations
 */

export const standardEase = [0.16, 1, 0.3, 1]

export const springTransition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
}

// Hero Stagger & Reveal Variants
export const heroStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

export const heroFadeUpItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: standardEase,
    },
  },
}

export const heroMaskWord = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: standardEase,
    },
  },
}

export const floatingLoop = {
  y: [-3, 3, -3],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export const mobileMenuVariant = {
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

/**
 * About Section Upgraded Motion Variants
 */

// Headline Word Reveal with Blur-to-Sharp
export const blurWordReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: standardEase },
  },
}

// Direction-Aware Carousel Slide & Wipe Variants
export const directionalSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.06,
    filter: 'blur(4px)',
  }),
  center: {
    x: '0%',
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { duration: 0.65, ease: standardEase },
      opacity: { duration: 0.45 },
      scale: { duration: 0.65, ease: standardEase },
      filter: { duration: 0.45 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: {
      x: { duration: 0.55, ease: 'easeInOut' },
      opacity: { duration: 0.35 },
      filter: { duration: 0.35 },
    },
  }),
}

// Ken Burns Slow Ambient Zoom
export const kenBurnsZoom = {
  scale: [1, 1.08],
  transition: {
    duration: 6,
    ease: 'linear',
  },
}

// Signature Horizontal Draw / Reveal
export const signatureReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    },
  },
}