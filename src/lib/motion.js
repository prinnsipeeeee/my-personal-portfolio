/**
 * Shared Motion Variants and Transition Configurations
 */

export const standardEase = [0.16, 1, 0.3, 1]

export const springTransition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
}

// Stagger container for Hero entrance
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

// Fade up item for badges, taglines, buttons, and socials
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

// Masked word slide-up reveal variant
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

// Gentle floating animation loop for the profile image
export const floatingLoop = {
  y: [-3, 3, -3],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

// Mobile drawer slide-down transition
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