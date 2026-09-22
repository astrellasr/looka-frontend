import Modal from '../common/Modal'
import { TrashIcon } from '../common/Icons'

function DeleteAccountModal({ onClose, onConfirm }) {
  return (
    <Modal title="Delete Account" onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-error/15 text-error"
        >
          <TrashIcon className="h-6 w-6" />
        </span>

        <p className="mt-5 text-section">Are you sure?</p>
        <p className="mt-2 text-secondary leading-relaxed text-ink-soft">
          This will permanently delete your account and all your data. This
          action cannot be undone.
        </p>

        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-control bg-error px-5 text-body font-medium text-white transition-colors duration-150 hover:brightness-95"
          >
            Delete Account
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteAccountModal
