/**
 * Reusable Motion Constants & Variants (motion/react)
 * Transform and opacity only for smooth, restrained motion.
 */

export const EASE = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.18,
  base: 0.35,
  slow: 0.55,
}

export const STAGGER = {
  tight: 0.04,
  base: 0.07,
}

export const SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 36,
  mass: 0.8,
}

export const VIEWPORT = {
  once: true,
  amount: 'some',
}

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE,
    },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
    },
  },
}
