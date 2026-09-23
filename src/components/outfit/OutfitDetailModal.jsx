import { useEffect, useRef } from 'react'
import OutfitComposition from './OutfitComposition'
import {
  CloseIcon,
  HeartIcon,
  HeartFilledIcon,
  CheckIcon,
  TrashIcon,
} from '../common/Icons'
import { formatLookDate } from '../../utils/formatDate'

/**
 * Outfit detail. A centred dialog on desktop, a bottom sheet on mobile.
 *
 * Closes on Escape and on backdrop click, restores focus to whatever
 * opened it, and locks background scroll while open.
 */
function OutfitDetailModal({ look, onClose, onToggleFavorite, onWearToday, onDelete, feedback }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [onClose])

  if (!look) return null

  const meta = [look.occasion, look.style, formatLookDate(look.savedAt)]
    .filter(Boolean)
    .join(' · ')

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target)) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="look-title"
        className="animate-scale-in max-h-[92vh] w-full overflow-y-auto rounded-card border border-line bg-surface shadow-raised sm:max-w-3xl"
      >
        <div className="grid sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <OutfitComposition
            look={look}
            className="aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[22rem]"
          />

          <div className="relative p-6 sm:p-7">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            <h2 id="look-title" className="pr-12 text-section">
              {look.name}
            </h2>
            <p className="mt-1 text-secondary text-ink-soft">{meta}</p>

            <ul className="mt-5 space-y-2.5">
              {look.items?.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-8 w-8 shrink-0 rounded-full bg-surface-soft/70"
                  />
                  <span className="min-w-0 truncate text-body text-ink">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>

            {look.note && (
              <p className="mt-5 text-secondary leading-relaxed text-ink-soft">
                {look.note}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onToggleFavorite(look.id)}
                aria-pressed={Boolean(look.favorite)}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control border border-line bg-surface px-4 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
              >
                {look.favorite ? (
                  <HeartFilledIcon className="h-4 w-4 text-primary" />
                ) : (
                  <HeartIcon className="h-4 w-4" aria-hidden="true" />
                )}
                {look.favorite ? 'In Favorites' : 'Add to Favorites'}
              </button>

              <button
                type="button"
                onClick={() => onWearToday(look.id)}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control bg-primary px-4 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
              >
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
                Wear Today
              </button>
            </div>

            <button
              type="button"
              onClick={() => onDelete(look.id)}
              className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-control px-4 text-body font-medium text-primary-strong transition-colors duration-150 hover:bg-blush/20"
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
              Delete Look
            </button>

            <div aria-live="polite">
              {feedback && (
                <p className="mt-4 rounded-control border border-success/40 bg-success/10 px-4 py-2.5 text-secondary text-ink">
                  {feedback}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutfitDetailModal
