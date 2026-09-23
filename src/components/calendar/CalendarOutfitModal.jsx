import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import OutfitComposition from '../outfit/OutfitComposition'
import { CloseIcon, CheckIcon, TrashIcon } from '../common/Icons'
import { formatDayLabel } from '../../utils/calendar'

/**
 * Day outfit detail. Same dialog language as the Lookbook modal:
 * centred on desktop, bottom sheet on mobile, closes on Escape,
 * backdrop click and the X, and restores focus on the way out.
 */
function CalendarOutfitModal({
  dateKey,
  outfit,
  onClose,
  onWearThisLook,
  onDelete,
  feedback,
  confirmingDelete,
  onRequestDelete,
  onCancelDelete,
}) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const navigate = useNavigate()

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

  if (!outfit) return null

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
        aria-labelledby="calendar-look-title"
        className="animate-scale-in max-h-[92vh] w-full overflow-y-auto rounded-card border border-line bg-surface shadow-raised sm:max-w-3xl"
      >
        <div className="grid sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <OutfitComposition
            look={outfit}
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

            <h2 id="calendar-look-title" className="pr-12 text-section">
              {outfit.name}
            </h2>
            <p className="mt-1 text-secondary text-ink-soft">
              {formatDayLabel(dateKey)}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-[0.5rem] bg-blush/30 px-2.5 py-1 text-caption text-ink">
                {outfit.occasion}
              </span>
              <span className="rounded-[0.5rem] bg-surface-soft/70 px-2.5 py-1 text-caption text-ink-soft">
                {outfit.style}
              </span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {outfit.items?.map((item) => (
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

            {outfit.note && (
              <p className="mt-5 text-secondary leading-relaxed text-ink-soft">
                {outfit.note}
              </p>
            )}

            <button
              type="button"
              onClick={onWearThisLook}
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-control bg-primary px-4 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
            >
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Wear This Look
            </button>

            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/lookbook')}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-control border border-line bg-surface px-4 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={onRequestDelete}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control px-4 text-body font-medium text-primary-strong transition-colors duration-150 hover:bg-blush/20"
              >
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>

            {confirmingDelete && (
              <div className="mt-4 rounded-control border border-line bg-surface-soft/50 p-4">
                <p className="text-secondary text-ink">
                  Remove this look from {formatDayLabel(dateKey)}?
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={onDelete}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-control bg-primary px-4 text-secondary font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={onCancelDelete}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-control border border-line bg-surface px-4 text-secondary font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
                  >
                    Keep it
                  </button>
                </div>
              </div>
            )}

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

export default CalendarOutfitModal
