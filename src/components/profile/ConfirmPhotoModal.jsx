import Modal from '../common/Modal'
import { CameraIcon } from '../common/Icons'

/**
 * Confirms a newly picked photo before it becomes the profile picture.
 *
 * The candidate image is previewed here; nothing reaches the shared
 * avatar state until Save Photo. Cancelling leaves the previous picture
 * untouched and releases the candidate URL.
 */
function ConfirmPhotoModal({ previewUrl, onCancel, onConfirm }) {
  return (
    <Modal title="Use this photo?" onClose={onCancel}>
      <div className="flex flex-col items-center text-center">
        <div className="h-32 w-32 overflow-hidden rounded-full bg-surface-soft ring-1 ring-line">
          <img
            src={previewUrl}
            alt="Selected profile photo preview"
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mt-5 text-secondary leading-relaxed text-ink-soft">
          This will become your profile photo across LOOKA.
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
            <CameraIcon className="h-4 w-4" aria-hidden="true" />
            Save Photo
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmPhotoModal
