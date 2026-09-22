import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClothingImageUpload from '../../components/wardrobe/ClothingImageUpload'
import ClothingForm, { FormActions } from '../../components/wardrobe/ClothingForm'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'
import { ArrowLeftIcon, InfoIcon, CheckIcon } from '../../components/common/Icons'
import { useClothingForm } from '../../hooks/useClothingForm'
import { usePreviewData } from '../../hooks/usePreviewData'
import { previewEditItem } from '../../utils/previewData'

// Preview mode holds items in memory only -- the wording says so rather
// than implying the server stored anything.
const SYNC_NOTE = 'Updated in your preview wardrobe. Not yet saved to a server.'

function EditClothing() {
  // The id is read but not fetched -- GET /clothes/:id arrives with
  // API integration and will supply these initial values.
  const { id } = useParams()
  const { findClothing, updateClothing } = usePreviewData()
  const navigate = useNavigate()

  // The real item from the shared store; falls back to the sample so a
  // hand-typed id still renders something coherent in preview mode.
  const existing = findClothing(id)
  const source = existing ?? {
    ...previewEditItem.values,
    imageUrl: previewEditItem.photoUrl,
  }

  const {
    values,
    errors,
    photo,
    confirmed,
    handleChange,
    selectPhoto,
    removePhoto,
    validate,
  } = useClothingForm({
    initialValues: {
      name: source.name ?? '',
      category: source.category ?? '',
      color: source.color ?? '',
      style: source.style ?? '',
      occasion: source.occasion ?? '',
      weather: source.weather ?? '',
    },
    initialPhoto: {
      url: source.imageUrl ?? previewEditItem.photoUrl,
    },
  })

  // Guards the submit button. Preview mode resolves immediately; the
  // same flag covers the await once PUT /clothes/:id is wired in.
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (submitting) return
    if (!validate()) return

    setSubmitting(true)

    // Preview mode has nothing to await, so the save is committed on the
    // next frame: the submitting label actually paints, and the guard
    // above blocks a second submit in between. When the real request
    // lands this becomes `await`, and the structure is unchanged.
    window.requestAnimationFrame(() => {
      // Local only. Replaced by PUT /clothes/:id.
      if (existing) {
        updateClothing(existing.id, { ...values, imageUrl: photo?.url })
      }

      navigate('/wardrobe')
    })
  }

  return (
    <div>
      <Link
        to="/wardrobe"
        className="inline-flex items-center gap-2 text-body text-ink-soft transition-colors duration-150 hover:text-ink"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back to Wardrobe
      </Link>

      <header className="mt-6">
        <h1 className="flex items-center gap-2.5 text-page md:text-[2rem]">
          Edit Clothing
          <HeartMarkSmall />
        </h1>
        <p className="mt-1 text-body text-ink-soft">
          Update this piece in your wardrobe.
        </p>
      </header>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-8 overflow-hidden rounded-card border border-line bg-surface shadow-card"
      >
        <div className="grid lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
          <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <ClothingImageUpload
              variant="edit"
              previewUrl={photo?.url}
              fileName={photo?.file?.name ?? values.name}
              onSelect={selectPhoto}
              onRemove={removePhoto}
              error={errors.photo}
              describedBy={errors.photo ? 'photo-error' : undefined}
            />

            {errors.photo && (
              <p id="photo-error" className="mt-3 text-caption text-error">
                {errors.photo}
              </p>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <ClothingForm
              values={values}
              errors={errors}
              onChange={handleChange}
            />

            <FormActions
              note={SYNC_NOTE}
              submitLabel="Save Changes"
              submitIcon={CheckIcon}
              submitting={submitting}
              submittingLabel="Saving..."
            />

            <div aria-live="polite">
              {confirmed && (
                <p className="mt-4 flex items-start gap-2 rounded-control border border-success/40 bg-success/10 px-4 py-3 text-secondary text-ink">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Looks good! Your changes will be saved once wardrobe sync is connected.</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditClothing
