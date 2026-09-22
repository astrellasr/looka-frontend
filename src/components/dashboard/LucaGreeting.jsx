import lucaUrl from '../../assets/mascots/luca/luca-dashboard.png'

/**
 * Luca, the LOOKA mascot, delivering the daily greeting.
 *
 * The artwork ships with a transparent background and sits directly on
 * the page -- no circular container, no tint, no crop. Only the width is
 * set, so `h-auto` keeps the 2412x2608 artwork in proportion.
 *
 * The bubble carries the message on its own, so nothing is lost for
 * anyone who cannot see the illustration.
 */
function LucaGreeting({ message = "Let's make today stylish!" }) {
  // The right padding nudges Luca inward from the page edge, so the pair
  // reads as bubble + mascot rather than mascot pinned to the side.
  return (
    <div className="flex items-end justify-end gap-2 pr-0 sm:gap-3 sm:pr-4 lg:pr-8">
      {/* Speech bubble: tail points toward Luca, so the message reads
          as coming from the mascot. */}
      <p className="mb-3 max-w-[9rem] rounded-card rounded-br-sm border border-line bg-surface px-4 py-3 text-secondary text-ink-soft shadow-card sm:max-w-[10rem]">
        {message}
      </p>

      <img
        src={lucaUrl}
        alt="Luca, LOOKA mascot"
        className="h-auto w-[109px] shrink-0 select-none sm:w-[132px] lg:w-[156px]"
      />
    </div>
  )
}

export default LucaGreeting
