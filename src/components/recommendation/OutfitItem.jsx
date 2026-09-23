import { LockIcon, LockOpenIcon } from '../common/Icons'
import clothingPlaceholder from '../../assets/placeholders/clothing-item.svg'

/**
 * One piece of a recommended outfit.
 *
 * Reads as a personal wardrobe piece, not a product listing: no price,
 * no CTA, just the slot and the name. Real photos replace the
 * placeholder via `item.imageUrl` during API integration.
 */

const ACCENTS = {
  sand: 'from-surface-soft to-peach/20',
  powder: 'from-powder/30 to-lavender/20',
  lavender: 'from-lavender/30 to-blush/20',
  sage: 'from-sage/30 to-powder/20',
}

function OutfitItem({ item, locked = false, onToggleLock }) {
  return (
    <article
      className={`overflow-hidden rounded-card border bg-surface transition duration-200 ${
        locked
          ? 'border-primary/50 ring-1 ring-primary/25'
          : 'border-line hover:-translate-y-0.5 hover:shadow-card'
      }`}
    >
      <div
        className={`relative aspect-square bg-gradient-to-br ${
          ACCENTS[item.accent] ?? ACCENTS.sand
        }`}
      >
        <img
          src={item.imageUrl ?? clothingPlaceholder}
          alt=""
          className="h-full w-full object-contain p-5"
        />

        <button
          type="button"
          onClick={() => onToggleLock?.(item.id)}
          aria-pressed={locked}
          aria-label={
            locked ? `Unlock ${item.name}` : `Lock ${item.name} into this look`
          }
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full transition duration-150 hover:scale-110 active:scale-95 ${
            locked
              ? 'bg-primary text-white'
              : 'bg-surface/85 text-ink-soft hover:bg-surface hover:text-ink'
          }`}
        >
          {locked ? (
            <LockIcon className="h-3.5 w-3.5" />
          ) : (
            <LockOpenIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <div className="px-3.5 py-3">
        <p className="text-caption text-ink-muted">{item.slot}</p>
        <h3 className="truncate text-body font-medium text-ink">{item.name}</h3>
        {locked && (
          <p className="mt-0.5 text-caption text-primary-strong">
            Locked · kept when you shuffle
          </p>
        )}
      </div>
    </article>
  )
}

export default OutfitItem
