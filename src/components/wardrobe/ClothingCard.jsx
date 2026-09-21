import { HeartIcon, HeartFilledIcon } from '../common/Icons'

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

function ClothingCard({ item, onToggleFavorite }) {
  const favorite = Boolean(item.favorite)

  return (
    <article className="group overflow-hidden rounded-card border border-line bg-surface shadow-card transition duration-200 hover:shadow-raised">
      <div
        className={`relative aspect-square bg-gradient-to-br ${
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
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-surface/85 text-primary-strong transition-colors duration-150 hover:bg-surface hover:text-primary"
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
      </div>
    </article>
  )
}

export default ClothingCard
