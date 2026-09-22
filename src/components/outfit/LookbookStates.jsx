import { Link } from 'react-router-dom'
import LucaAvatar from '../common/LucaAvatar'
import { HeartIcon, SparkleIcon } from '../common/Icons'

function StatePanel({ children }) {
  return (
    <section className="rounded-card border border-line bg-surface px-6 py-16 text-center shadow-card">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        {children}
      </div>
    </section>
  )
}

export function LookbookEmpty() {
  return (
    <StatePanel>
      <LucaAvatar size="md" />
      <h2 className="mt-6 text-section">Your Lookbook is empty</h2>
      <p className="mt-2 text-body leading-relaxed text-ink-soft">
        Save your favorite looks here and keep your go-to outfits close.
      </p>

      <Link
        to="/recommendation"
        className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-control bg-primary px-6 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
      >
        <SparkleIcon className="h-4 w-4" aria-hidden="true" />
        Find My Look
      </Link>
    </StatePanel>
  )
}

export function FavoritesEmpty({ onViewAll }) {
  return (
    <StatePanel>
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-blush/25 text-primary"
      >
        <HeartIcon className="h-7 w-7" />
      </span>

      <h2 className="mt-6 text-section">No favorite looks yet</h2>
      <p className="mt-2 text-body leading-relaxed text-ink-soft">
        Tap the heart on a saved look to keep it here for quick access.
      </p>

      <button
        type="button"
        onClick={onViewAll}
        className="mt-7 inline-flex h-11 items-center justify-center rounded-control border border-line bg-surface px-6 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
      >
        View All Looks
      </button>
    </StatePanel>
  )
}

export function LookbookError({ onRetry }) {
  return (
    <StatePanel>
      <LucaAvatar size="md" />
      <h2 className="mt-6 text-section">We couldn&apos;t load your looks</h2>
      <p className="mt-2 text-body leading-relaxed text-ink-soft">
        Something went wrong while fetching your saved outfits.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex h-11 items-center justify-center rounded-control bg-primary px-6 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
      >
        Try Again
      </button>
    </StatePanel>
  )
}

/** Skeleton cards, matching the real card's proportions. */
export function LookbookSkeleton({ count = 8 }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-card border border-line bg-surface shadow-card"
          >
            <div className="aspect-[4/5] animate-pulse bg-blush/12" />
            <div className="space-y-2.5 p-4">
              <div className="h-3.5 w-2/3 animate-pulse rounded bg-surface-soft" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-surface-soft/70" />
              <div className="h-3 w-full animate-pulse rounded bg-surface-soft/70" />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-body text-ink-soft" aria-live="polite">
        Loading your lookbook...
      </p>
      <p className="mt-1 text-center text-secondary text-ink-muted">
        Just a moment while we gather your looks.
      </p>
    </>
  )
}
