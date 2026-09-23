import { useInView } from '../../hooks/useInView'

/**
 * Reveals its children once, when they scroll into view.
 *
 * Only worth wrapping sections that sit below the fold -- content
 * already visible on load should use `animate-rise-in` directly rather
 * than waiting on an observer.
 *
 * `delay` staggers sibling sections; keep it small.
 */
function RevealOnScroll({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`${inView ? 'reveal-in' : 'reveal'} ${className}`}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default RevealOnScroll
