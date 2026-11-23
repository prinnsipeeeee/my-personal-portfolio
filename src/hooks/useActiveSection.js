import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'home')

  useEffect(() => {
    if (!sectionIds.length) return undefined

    const visibleRatios = new Map()

    const updateFromScrollEdges = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      if (scrollY < 40) {
        setActiveId(sectionIds[0])
        return true
      }
      if (scrollY + winHeight >= docHeight - 24) {
        setActiveId(sectionIds[sectionIds.length - 1])
        return true
      }
      return false
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio)
          } else {
            visibleRatios.delete(entry.target.id)
          }
        }

        if (updateFromScrollEdges()) return

        if (visibleRatios.size > 0) {
          // Pick the first visible section in document order
          for (const id of sectionIds) {
            if (visibleRatios.has(id)) {
              setActiveId(id)
              break
            }
          }
        }
      },
      {
        rootMargin: '-18% 0px -60% 0px',
        threshold: [0, 0.25, 0.5],
      }
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    elements.forEach((el) => observer.observe(el))

    const onScroll = () => {
      if (updateFromScrollEdges()) return

      // Fallback sync for rapid programmatic jumps
      const marker = window.scrollY + window.innerHeight * 0.28
      let current = sectionIds[0]
      for (const el of elements) {
        if (el.offsetTop <= marker) {
          current = el.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [sectionIds])

  return [activeId, setActiveId]
}
