import { useRef } from 'react'
import {
  UploadCloudIcon,
  CameraIcon,
  SparkleIcon,
  HeartIcon,
  CloseIcon,
  TrashIcon,
} from '../common/Icons'

const GUIDANCE = [
  { icon: CameraIcon, title: 'Clear photo', note: 'Show the full item' },
  { icon: SparkleIcon, title: 'Good lighting', note: 'Natural light works best' },
  { icon: HeartIcon, title: 'Any angle', note: 'Front, back, or detail' },
]

/**
 * Photo picker with a browser-local preview.
 *
 * Nothing is uploaded: the parent holds the File and the preview URL,
 * and owns revoking that URL. During API integration the File goes
 * into the multipart body for POST /clothes.
 */
function ClothingImageUpload({
  previewUrl,
  fileName,
  onSelect,
  onRemove,
  error,
  describedBy,
  // Edit mode shows a framed photo with buttons beneath it; Add mode
  // keeps the plain dashed drop area.
  variant = 'upload',
}) {
  const isEdit = variant === 'edit'
  const showRemoveBadge = isEdit && Boolean(previewUrl)
  const inputRef = useRef(null)

  const openPicker = () => inputRef.current?.click()

  const handleChange = (event) => {
    const file = event.target.files?.[0]
    if (file) onSelect(file)
    // Reset so picking the same file twice still fires a change.
    event.target.value = ''
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleChange}
        className="sr-only"
        id="clothing-photo"
        aria-label="Choose a clothing photo (JPG or PNG, up to 5MB)"
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
      />

      <div
        className={`relative flex min-h-[19rem] flex-col items-center justify-center rounded-card px-6 py-10 text-center transition-colors duration-150 ${
          showRemoveBadge
            ? 'border border-line bg-surface-soft/45'
            : 'border border-dashed'
        } ${
          showRemoveBadge
            ? ''
            : error
              ? 'border-error bg-error/5'
              : 'border-primary/35 bg-blush/12'
        }`}
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt={fileName ? `Preview of ${fileName}` : 'Clothing photo'}
              className="max-h-64 w-full object-contain"
            />

            {showRemoveBadge && (
              <button
                type="button"
                onClick={onRemove}
                aria-label="Remove photo"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-primary-strong shadow-card transition-colors duration-150 hover:bg-surface hover:text-primary"
              >
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-blush/35 text-primary-strong"
            >
              <UploadCloudIcon className="h-7 w-7" />
            </span>

            <p className="mt-5 text-body font-medium text-ink">Add a photo</p>
            <p className="mt-1.5 text-body text-ink-soft">
              Upload a clear photo of your clothing
            </p>
            <p className="mt-1 text-secondary text-ink-muted">
              JPG, PNG up to 5MB
            </p>

            <button
              type="button"
              onClick={openPicker}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-control bg-primary px-6 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
            >
              Choose Photo
            </button>
          </>
        )}
      </div>

      {showRemoveBadge && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
          >
            <CameraIcon className="h-4 w-4" aria-hidden="true" />
            Replace photo
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-control bg-blush/25 px-5 text-body font-medium text-primary-strong transition-colors duration-150 hover:bg-blush/40"
          >
            <CloseIcon className="h-4 w-4" aria-hidden="true" />
            Remove
          </button>
        </div>
      )}

      {/* Guidance: quiet, never competing with the upload area. */}
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GUIDANCE.map(({ icon: Icon, title, note }) => (
          <li key={title} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush/25 text-primary-strong"
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-secondary font-medium text-ink">
                {title}
              </span>
              <span className="block text-caption text-ink-muted">{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClothingImageUpload
