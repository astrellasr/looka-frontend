import { useEffect, useId, useRef, useState } from 'react'
import { BellIcon } from '../common/Icons'
import { HeartMarkSmall } from '../dashboard/GreetingHeart'

/**
 * Bell plus a small anchored popover.
 *
 * There is no notification system in the MVP, so the popover states
 * that plainly instead of the bell sitting dead. Closes on a second
 * click, an outside click and Escape, and returns focus to the bell.
 *
 * Anchored right and width-capped so it cannot leave the viewport on
 * a narrow screen.
 */
function NotificationBell() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        className={`flex h-10 w-10 items-center justify-center rounded-control transition-colors duration-150 active:scale-95 ${
          open
            ? 'bg-surface-soft text-ink'
            : 'text-ink-soft hover:bg-surface-soft hover:text-ink'
        }`}
      >
        <BellIcon className="h-5 w-5" />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Notifications"
          className="animate-fade-in absolute right-0 top-full z-40 mt-2 w-[min(17rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-line bg-surface shadow-card"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="text-secondary font-medium text-ink">Notifications</p>
          </div>

          <div className="px-4 py-6 text-center">
            <p className="flex items-center justify-center gap-1.5 text-body text-ink">
              You&apos;re all caught up
              <HeartMarkSmall className="h-3.5 w-3.5" />
            </p>
            <p className="mt-1 text-secondary leading-relaxed text-ink-soft">
              No new notifications right now.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
