import { useEffect } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(containerRef, isActive, onClose, returnFocusRef) {
  useEffect(() => {
    if (!isActive) return undefined

    const previouslyFocused = returnFocusRef?.current || document.activeElement
    const container = containerRef.current

    const focusFirst = () => {
      if (!container) return
      const focusables = container.querySelectorAll(FOCUSABLE_SELECTOR)
      if (focusables.length > 0) {
        focusables[0].focus({ preventScroll: true })
      } else {
        container.focus({ preventScroll: true })
      }
    }

    const frameId = requestAnimationFrame(focusFirst)

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
        return
      }

      if (e.key !== 'Tab' || !container) return

      const focusables = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last || !container.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      cancelAnimationFrame(frameId)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [containerRef, isActive, onClose, returnFocusRef])
}
