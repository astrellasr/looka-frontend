/**
 * Luca placeholder.
 *
 * The final mascot artwork does not exist yet. This is the same soft
 * pastel treatment already approved on the Dashboard, lifted into a
 * shared component so every Luca appearance stays identical.
 *
 * To finish: swap the sparkle for the artwork, keep the sizing API.
 */

const SIZES = {
  sm: 'h-12 w-12',
  md: 'h-20 w-20',
  lg: 'h-28 w-28',
}

const SPARKLE = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

function LucaAvatar({ size = 'md', floating = false, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blush/50 to-lavender/35 ${
        SIZES[size]
      } ${floating ? 'animate-luca-float' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-primary-strong/70 ${SPARKLE[size]}`}
      >
        <path d="M12 2.5c1.15 4.6 2.4 5.85 7 7-4.6 1.15-5.85 2.4-7 7-1.15-4.6-2.4-5.85-7-7 4.6-1.15 5.85-2.4 7-7Z" />
      </svg>
    </div>
  )
}

export default LucaAvatar
