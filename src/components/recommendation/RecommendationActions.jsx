import { LockIcon, ShuffleIcon, HeartIcon, HeartFilledIcon, CheckIcon } from '../common/Icons'

/**
 * Utility actions (lock hint, shuffle) and the two primary result
 * actions. Saving maps to POST /outfits and wearing to
 * POST /outfits/wear-today once integration lands.
 */
function RecommendationActions({
  hasLockedItem,
  onShuffle,
  onSave,
  onWearToday,
  saved = false,
  worn = false,
  busy = false,
}) {
  return (
    <div className="mt-6 grid gap-5 border-t border-line pt-6 lg:grid-cols-2">
      {/* Utility */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex h-11 items-center justify-center gap-2 rounded-control border border-line bg-surface px-4 text-body font-medium text-ink-soft">
            <LockIcon className="h-4 w-4" aria-hidden="true" />
            {hasLockedItem ? 'Item locked' : 'Lock an Item'}
          </div>
          <p className="mt-2 text-caption leading-relaxed text-ink-muted">
            Keep a piece you love and find new matches around it.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onShuffle}
            disabled={busy}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-control border border-line bg-surface px-4 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-55"
          >
            <ShuffleIcon className="h-4 w-4" aria-hidden="true" />
            Shuffle
          </button>
          <p className="mt-2 text-caption leading-relaxed text-ink-muted">
            Get a new outfit combination from your wardrobe.
          </p>
        </div>
      </div>

      {/* Primary */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <button
            type="button"
            onClick={onSave}
            disabled={saved}
            className={`flex h-11 w-full items-center justify-center gap-2 rounded-control px-4 text-body font-medium transition-colors duration-150 ${
              saved
                ? 'bg-blush/40 text-primary-strong'
                : 'bg-blush/20 text-primary-strong hover:bg-blush/35'
            }`}
          >
            {saved ? (
              <HeartFilledIcon className="h-4 w-4" />
            ) : (
              <HeartIcon className="h-4 w-4" aria-hidden="true" />
            )}
            {saved ? 'Saved' : 'Save Look'}
          </button>
          <p className="mt-2 text-caption leading-relaxed text-ink-muted">
            Save to your Lookbook.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={onWearToday}
            disabled={worn}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-control bg-primary px-4 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong disabled:bg-primary/50"
          >
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
            {worn ? 'Added' : 'Wear Today'}
          </button>
          <p className="mt-2 text-caption leading-relaxed text-ink-muted">
            Add to your calendar.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecommendationActions
