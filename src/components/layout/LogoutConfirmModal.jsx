import Modal from '../common/Modal'
import { LogoutIcon } from '../common/Icons'

/**
 * Confirms signing out. Reuses the shared Modal, so Escape, backdrop
 * click and focus restoration all come for free.
 *
 * The destructive action uses the muted dusty-rose primary rather than
 * a bright red, matching the rest of LOOKA.
 */
function LogoutConfirmModal({ onCancel, onConfirm }) {
  return (
    <Modal title="Log out?" onClose={onCancel}>
      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blush/25 text-primary-strong"
        >
          <LogoutIcon className="h-6 w-6" />
        </span>

        <p className="mt-5 text-body leading-relaxed text-ink-soft">
          Are you sure you want to log out of your LOOKA account?
        </p>

        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
          >
            <LogoutIcon className="h-4 w-4" aria-hidden="true" />
            Log Out
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default LogoutConfirmModal
