import { HeartIcon, HeartFilledIcon, PencilIcon, TrashIcon } from '../common/Icons'

/**
 * A single wardrobe item.
 *
 * Presentational: everything arrives through `item`. When the backend
 * supplies photos, render an <img src={item.imageUrl} alt={item.name} />
 * inside the image area -- the rest of the card is unchanged.
 *
 * The card itself is not interactive yet (no detail route in scope), so
 * only the favourite control is a button.
 */

const ACCENTS = {
  sand: 'from-surface-soft to-peach/25',
  peach: 'from-peach/35 to-butter/25',
  lavender: 'from-lavender/35 to-blush/25',
  powder: 'from-powder/35 to-lavender/25',
  sage: 'from-sage/35 to-powder/25',
}

function ClothingCard({ item, onToggleFavorite, onEdit, onDelete }) {
  const favorite = Boolean(item.favorite)

  return (
    <article className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-raised">
      <div
        className={`relative aspect-square overflow-hidden bg-gradient-to-br ${
          ACCENTS[item.accent] ?? ACCENTS.sand
        }`}
      >
        {/* Real photography replaces this field during API integration. */}
        <button
          type="button"
          onClick={() => onToggleFavorite?.(item.id)}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Remove ${item.name} from favourites`
              : `Add ${item.name} to favourites`
          }
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-surface/85 text-primary-strong transition duration-150 hover:scale-110 hover:bg-surface hover:text-primary active:scale-95"
        >
          {favorite ? (
            <HeartFilledIcon className="h-3.5 w-3.5" />
          ) : (
            <HeartIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <div className="px-3.5 py-3">
        <h3 className="truncate text-body font-medium text-ink">{item.name}</h3>
        <p className="truncate text-secondary text-ink-soft">
          {item.category}
          {item.style ? ` · ${item.style}` : ''}
        </p>

        {(onEdit || onDelete) && (
          <div className="mt-2.5 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(item.id)}
                aria-label={`Edit ${item.name}`}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
              >
                <PencilIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Edit
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                aria-label={`Remove ${item.name} from your wardrobe`}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption text-ink-soft transition-colors duration-150 hover:bg-error/10 hover:text-error"
              >
                <TrashIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default ClothingCard
