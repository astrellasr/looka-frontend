import Modal from '../common/Modal'
import { CheckIcon } from '../common/Icons'

function ProfileSuccessModal({ title, note, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success"
        >
          <CheckIcon className="h-7 w-7" />
        </span>

        <p className="mt-5 text-section">{title}!</p>
        <p className="mt-2 text-secondary text-ink-soft">{note}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
        >
          Got it
        </button>
      </div>
    </Modal>
  )
}

export default ProfileSuccessModal
