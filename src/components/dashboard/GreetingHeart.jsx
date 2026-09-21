/**
 * Small decorative heart used beside dashboard copy.
 * Decorative only -- hidden from assistive tech.
 */
export function HeartMarkSmall({ className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`shrink-0 text-primary ${className}`}
    >
      <path d="M12 20.2s-7.4-4.4-7.4-9.6a3.95 3.95 0 0 1 7.4-1.95 3.95 3.95 0 0 1 7.4 1.95c0 5.2-7.4 9.6-7.4 9.6Z" />
    </svg>
  )
}
