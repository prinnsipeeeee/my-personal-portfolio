import { motion, useReducedMotion } from 'motion/react'
import { EASE, DURATION, VIEWPORT } from '../lib/motion'

export default function Reveal({
  children,
  delay = 0,
  y = 14,
  className = '',
  as = 'div',
}) {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  if (shouldReduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Component>
  )
}
