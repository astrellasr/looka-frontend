import { Link } from 'react-router-dom'
import LucaAvatar from '../common/LucaAvatar'
import { HeartMarkSmall } from '../dashboard/GreetingHeart'
import { PlusIcon } from '../common/Icons'

/** Shared shell so every state sits in the same frame. */
function StatePanel({ children }) {
  return (
    <section className="rounded-card border border-line bg-surface px-6 py-14 text-center shadow-card">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        {children}
      </div>
    </section>
  )
}

export function RecommendationLoading() {
  return (
    <StatePanel>
      <LucaAvatar size="lg" floating />
      <p className="mt-6 text-section" aria-live="polite">
        Luca is styling your look...
      </p>
      <p className="mt-1.5 text-body text-ink-soft">
        Finding pieces from your wardrobe
      </p>
    </StatePanel>
  )
}

export function RecommendationIncomplete() {
  return (
    <StatePanel>
      <LucaAvatar size="lg" />
      <p className="mt-6 flex items-center gap-2 text-section">
        Almost there
        <HeartMarkSmall />
      </p>
      <p className="mt-1.5 text-body text-ink-soft">
        Luca needs a few more pieces to complete your look.
      </p>

      <Link
        to="/wardrobe/add"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
      >
        <PlusIcon className="h-4 w-4" aria-hidden="true" />
        Add Clothing
      </Link>
    </StatePanel>
  )
}

export function RecommendationError({ onRetry }) {
  return (
    <StatePanel>
      <LucaAvatar size="lg" />
      <p className="mt-6 flex items-center gap-2 text-section">
        Something went wrong
        <HeartMarkSmall />
      </p>
      <p className="mt-1.5 text-body text-ink-soft">
        Luca couldn&apos;t put your look together right now.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
      >
        Try Again
      </button>
    </StatePanel>
  )
}

/** Shown before the first request. */
export function RecommendationIdle() {
  return (
    <StatePanel>
      <LucaAvatar size="lg" floating />
      <p className="mt-6 text-section">Your look starts here</p>
      <p className="mt-1.5 text-body text-ink-soft">
        Pick an occasion above and Luca will put a look together from your
        wardrobe.
      </p>
    </StatePanel>
  )
}
