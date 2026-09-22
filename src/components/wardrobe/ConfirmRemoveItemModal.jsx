import Modal from '../common/Modal'
import { TrashIcon } from '../common/Icons'

/**
 * Confirms removing a clothing item.
 *
 * Reuses the shared Modal, so Escape, backdrop click, scroll lock and
 * focus restoration all behave like every other LOOKA confirmation.
 */
function ConfirmRemoveItemModal({ itemName, onCancel, onConfirm }) {
  return (
    <Modal title="Remove this item?" onClose={onCancel}>
      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blush/25 text-primary-strong"
        >
          <TrashIcon className="h-6 w-6" />
        </span>

        <p className="mt-5 text-body leading-relaxed text-ink-soft">
          Are you sure you want to remove
          {itemName ? ` ${itemName} ` : ' this clothing item '}
          from your wardrobe?
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
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
            Remove Item
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmRemoveItemModal
