import { useEffect, useRef, useState } from 'react'

/**
 * Reports when an element first scrolls into view.
 *
 * Fires once and then disconnects: a reveal that replays on every
 * scroll is distracting, and re-observing costs us nothing useful.
 *
 * Falls back to "visible" when IntersectionObserver is unavailable, so
 * content is never hidden by a missing API.
 */
export function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0.1 } = {}) {
  const ref = useRef(null)

  // Without IntersectionObserver there is nothing to wait for, so start
  // visible. Deriving this at init avoids a cascading render, and means
  // content is never hidden by a missing API.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView]
}

export default useInView
