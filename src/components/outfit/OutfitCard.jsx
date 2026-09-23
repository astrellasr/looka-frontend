import OutfitComposition from './OutfitComposition'
import { HeartIcon, HeartFilledIcon } from '../common/Icons'
import { formatLookDate } from '../../utils/formatDate'

/**
 * A saved look, presented as a fashion lookbook card.
 *
 * The card body opens the detail view; the heart is a separate control
 * layered above it, so both stay keyboard reachable.
 */
function OutfitCard({ look, onOpen, onToggleFavorite }) {
  const summary = look.items?.map((item) => item.name).join(' · ')

  return (
    <article className="group relative overflow-hidden rounded-card border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-raised">
      <div className="overflow-hidden">
        <OutfitComposition
          look={look}
          className="aspect-[4/5] transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-4">
        <h3 className="truncate text-body font-medium text-ink">
          {/* Stretched trigger: the whole card is clickable, but the
              accessible name stays on a real heading-linked button. */}
          <button
            type="button"
            onClick={() => onOpen(look)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="block truncate">{look.name}</span>
          </button>
        </h3>

        <p className="mt-0.5 truncate text-secondary">
          <span className="text-primary-strong">{look.occasion}</span>
          <span className="text-ink-soft"> · {look.style}</span>
        </p>

        {summary && (
          <p className="mt-2 line-clamp-2 text-secondary leading-relaxed text-ink-soft">
            {summary}
          </p>
        )}

        <p className="mt-3 text-caption text-ink-muted">
          {formatLookDate(look.savedAt)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onToggleFavorite(look.id)}
        aria-pressed={Boolean(look.favorite)}
        aria-label={
          look.favorite
            ? `Remove ${look.name} from favorites`
            : `Add ${look.name} to favorites`
        }
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-card transition duration-150 hover:scale-110 active:scale-95 ${
          look.favorite
            ? 'bg-surface text-primary'
            : 'bg-surface/90 text-ink-soft hover:bg-surface hover:text-primary-strong'
        }`}
      >
        {look.favorite ? (
          <HeartFilledIcon className="h-4 w-4" />
        ) : (
          <HeartIcon className="h-4 w-4" />
        )}
      </button>
    </article>
  )
}

export default OutfitCard
