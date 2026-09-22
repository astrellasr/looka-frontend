import { useRef } from 'react'
import Modal from '../common/Modal'
import { CameraIcon, TrashIcon, UserIcon } from '../common/Icons'

/** Local preview only -- nothing is uploaded. */
function ChangePhotoModal({ photoUrl, onSelect, onRemove, onClose, error }) {
  const inputRef = useRef(null)

  const handleChange = (event) => {
    const file = event.target.files?.[0]
    if (file) onSelect(file)
    event.target.value = ''
  }

  return (
    <Modal title="Change Profile Photo" onClose={onClose}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleChange}
        className="sr-only"
        aria-label="Choose a profile photo (JPG or PNG, up to 5MB)"
      />

      <div className="flex flex-col items-center">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blush/45 to-lavender/30">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile preview" className="h-full w-full object-cover" />
          ) : (
            <UserIcon className="h-11 w-11 text-primary-strong/60" aria-hidden="true" />
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
        >
          <CameraIcon className="h-4 w-4" aria-hidden="true" />
          Upload New Photo
        </button>

        <button
          type="button"
          onClick={onRemove}
          disabled={!photoUrl}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-control border border-line bg-surface px-5 text-body font-medium text-error transition-colors duration-150 hover:bg-error/5 disabled:cursor-not-allowed disabled:text-ink-muted disabled:hover:bg-surface"
        >
          <TrashIcon className="h-4 w-4" aria-hidden="true" />
          Remove Photo
        </button>

        {error ? (
          <p className="mt-3 text-caption text-error">{error}</p>
        ) : (
          <p className="mt-3 text-caption text-ink-muted">JPG, PNG up to 5MB</p>
        )}
      </div>
    </Modal>
  )
}

export default ChangePhotoModal
