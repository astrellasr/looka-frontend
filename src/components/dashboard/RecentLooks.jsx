import { Link } from 'react-router-dom'
import { ArrowRightIcon, HeartIcon } from '../common/Icons'

/**
 * Recent saved/worn looks.
 *
 * `looks` is presentational: an empty array renders the empty state, so
 * the real GET /outfits response can be passed straight in later. The
 * image area is a soft pastel field until outfit photos exist.
 */

const ACCENTS = {
  blush: 'from-blush/45 to-peach/30',
  butter: 'from-butter/45 to-peach/25',
  powder: 'from-powder/40 to-lavender/30',
  sage: 'from-sage/40 to-powder/25',
}

function LookCard({ look }) {
  return (
    <article className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition duration-200 hover:shadow-raised">
      {/* Compact preview ratio -- the Lookbook page uses the taller 4:5
          treatment. Pastel field stands in until photos exist. */}
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${
          ACCENTS[look.accent] ?? ACCENTS.blush
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-surface/85 text-primary-strong"
        >
          <HeartIcon className="h-3 w-3" />
        </span>
      </div>

      <div className="px-3.5 py-3">
        <h3 className="truncate text-secondary font-medium text-ink">{look.name}</h3>
        <p className="truncate text-caption text-ink-soft">{look.occasion}</p>
      </div>
    </article>
  )
}

function RecentLooks({ looks = [] }) {
  return (
    <section aria-labelledby="recent-looks-heading">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 id="recent-looks-heading" className="text-section">
          Recent Looks
        </h2>

        <Link
          to="/lookbook"
          className="inline-flex shrink-0 items-center gap-1.5 text-secondary text-ink-soft transition-colors duration-150 hover:text-ink"
        >
          View All
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {looks.length === 0 ? (
        <div className="rounded-card border border-line bg-surface p-8 text-center shadow-card">
          <p className="text-body text-ink-soft">
            Your saved looks will appear here.
          </p>
        </div>
      ) : (
        <div className="stagger grid max-w-lg grid-cols-2 gap-4 lg:max-w-none lg:grid-cols-4">
          {looks.map((look) => (
            <LookCard key={look.id} look={look} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecentLooks
