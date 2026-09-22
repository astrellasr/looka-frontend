import { useEffect, useId, useRef } from 'react'
import { CloseIcon } from './Icons'

/**
 * Small centred dialog. Same behaviour as the Lookbook/Calendar detail
 * modals -- closes on Escape, backdrop click and the X, locks background
 * scroll, and restores focus to whatever opened it.
 *
 * Bottom sheet on mobile, centred card from sm up.
 */
function Modal({ title, onClose, children, className = '' }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/25 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target)) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`animate-scale-in max-h-[92vh] w-full overflow-y-auto rounded-t-card bg-surface p-6 shadow-raised sm:max-w-md sm:rounded-card ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-section">
            {title}
          </h2>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal
