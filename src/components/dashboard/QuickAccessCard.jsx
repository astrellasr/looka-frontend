import { Link } from 'react-router-dom'

/**
 * A navigation shortcut. Renders as a Link, so keyboard focus and
 * activation come for free.
 *
 * The pastel is confined to the icon chip; the card surface stays neutral.
 */

const ACCENTS = {
  blush: 'bg-blush/45 text-ink',
  lavender: 'bg-lavender/40 text-ink',
  powder: 'bg-powder/40 text-ink',
  sage: 'bg-sage/40 text-ink',
}

function QuickAccessCard({ to, icon: Icon, title, meta, accent = 'blush' }) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-4 rounded-card border border-line bg-surface p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-raised"
    >
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 items-center justify-center rounded-control transition-transform duration-200 group-hover:scale-105 ${ACCENTS[accent]}`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span className="min-w-0">
        <span className="block text-body font-medium text-ink">{title}</span>
        {meta && (
          <span className="mt-0.5 block text-secondary text-ink-soft">
            {meta}
          </span>
        )}
      </span>
    </Link>
  )
}

export default QuickAccessCard
