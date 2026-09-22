import { Link } from 'react-router-dom'
import OutfitComposition from '../outfit/OutfitComposition'
import LucaAvatar from '../common/LucaAvatar'
import { ShuffleIcon, SparkleIcon } from '../common/Icons'
import { formatDayLabel } from '../../utils/calendar'

function Tag({ children }) {
  return (
    <span className="rounded-[0.5rem] bg-surface-soft/70 px-2.5 py-1 text-caption text-ink-soft">
      {children}
    </span>
  )
}

/** Shown when the selected day has no outfit. */
function DayEmptyState() {
  return (
    <div className="flex flex-col items-center px-2 py-10 text-center">
      <SparkleIcon className="h-7 w-7 text-primary/70" aria-hidden="true" />
      <p className="mt-4 text-section">No outfit for this day yet</p>
      <p className="mt-2 text-secondary leading-relaxed text-ink-soft">
        Make it a stylish day! You can wear a look or choose one from your
        lookbook.
      </p>

      <Link
        to="/recommendation"
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
      >
        Find My Look
      </Link>
      <Link
        to="/lookbook"
        className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
      >
        Browse Lookbook
      </Link>
    </div>
  )
}

/** The selected day: its outfit, or the empty-day state. */
function CalendarDayDetail({ dateKey, outfit, onViewDetails }) {
  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card">
      <h2 className="text-body font-medium text-ink">
        {formatDayLabel(dateKey)}
      </h2>

      {outfit ? (
        <>
          <div className="mt-5 flex gap-4">
            <OutfitComposition
              look={outfit}
              className="aspect-[4/5] w-28 shrink-0 rounded-card"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-body font-medium text-ink">
                {outfit.name}
              </h3>

              <div className="mt-2 flex flex-wrap gap-1.5">
                <Tag>{outfit.occasion}</Tag>
                <Tag>{outfit.style}</Tag>
              </div>

              <ul className="mt-3 space-y-1.5">
                {outfit.items?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 text-secondary text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 rounded-full bg-surface-soft/70"
                    />
                    <span className="min-w-0 truncate">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {outfit.note && (
            <p className="mt-5 text-secondary leading-relaxed text-ink-soft">
              {outfit.note}
            </p>
          )}

          <button
            type="button"
            onClick={onViewDetails}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
          >
            View Details
          </button>

          <Link
            to="/recommendation"
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
          >
            <ShuffleIcon className="h-4 w-4" aria-hidden="true" />
            Change Outfit
          </Link>
        </>
      ) : (
        <DayEmptyState />
      )}
    </section>
  )
}

/** Shown when the whole calendar has no entries at all. */
export function CalendarEmptyState() {
  return (
    <section className="rounded-card border border-line bg-surface px-6 py-16 text-center shadow-card">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        <LucaAvatar size="md" />
        <h2 className="mt-6 text-section">No outfits on your calendar yet</h2>
        <p className="mt-2 text-body leading-relaxed text-ink-soft">
          Start by wearing a look or add one manually to see it here.
        </p>

        <Link
          to="/recommendation"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-control bg-primary px-6 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
        >
          Find My Look
        </Link>

        <p className="mt-6 flex items-center gap-2 text-secondary text-ink-muted">
          <SparkleIcon className="h-4 w-4 text-primary/70" aria-hidden="true" />
          Plan your days, your way.
        </p>
      </div>
    </section>
  )
}

export default CalendarDayDetail
