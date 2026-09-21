/**
 * Reserved space for Luca, the LOOKA mascot.
 *
 * The final asset does not exist yet, so this renders a soft pastel
 * surface with a small sparkle -- intentional, not an error state.
 * To finish: drop the artwork in place of the sparkle block and keep
 * the speech bubble.
 */
function LucaGreeting({ message = "Let's make today stylish!" }) {
  return (
    <div className="flex items-center justify-end gap-3">
      {/* Speech bubble */}
      <p className="max-w-[10rem] rounded-card rounded-br-sm border border-line bg-surface px-4 py-3 text-secondary text-ink-soft shadow-card">
        {message}
      </p>

      {/* Mascot slot */}
      <div
        aria-hidden="true"
        className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blush/50 to-lavender/35"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-primary-strong/70" fill="currentColor">
          <path d="M12 2.5c1.15 4.6 2.4 5.85 7 7-4.6 1.15-5.85 2.4-7 7-1.15-4.6-2.4-5.85-7-7 4.6-1.15 5.85-2.4 7-7Z" />
        </svg>
      </div>
    </div>
  )
}

export default LucaGreeting
