import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClothingImageUpload from '../../components/wardrobe/ClothingImageUpload'
import ClothingForm, { FormActions } from '../../components/wardrobe/ClothingForm'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'
import { ArrowLeftIcon, InfoIcon } from '../../components/common/Icons'
import { useClothingForm } from '../../hooks/useClothingForm'
import { usePreviewData } from '../../hooks/usePreviewData'

// Preview mode holds items in memory only -- the wording says so rather
// than implying the server stored anything.
const SYNC_NOTE = 'Added to your preview wardrobe. Not yet saved to a server.'

function AddClothing() {
  const {
    values,
    errors,
    photo,
    confirmed,
    handleChange,
    selectPhoto,
    removePhoto,
    validate,
  } = useClothingForm()

  const { addClothing } = usePreviewData()
  const navigate = useNavigate()

  // Guards the submit button. Preview mode resolves immediately; the
  // same flag covers the await once POST /clothes is wired in.
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
      // Local only: the item joins the shared preview store so it shows
      // up in the wardrobe. Replaced by POST /clothes.
      addClothing({
        ...values,
        imageUrl: photo?.url,
        favorite: false,
        accent: 'sand',
      })

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
          Add New Clothing
          <HeartMarkSmall />
        </h1>
        <p className="mt-1 text-body text-ink-soft">
          Add a piece to your wardrobe.
        </p>
      </header>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-8 overflow-hidden rounded-card border border-line bg-surface shadow-card"
      >
        {/* One composition: a single divider, not two floating cards. */}
        <div className="grid lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
          <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <ClothingImageUpload
              previewUrl={photo?.url}
              fileName={photo?.file?.name}
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
              submitting={submitting}
              submittingLabel="Adding..."
            />

            {/* Success is informational only -- never claims a save. */}
            <div aria-live="polite">
              {confirmed && (
                <p className="mt-4 flex items-start gap-2 rounded-control border border-success/40 bg-success/10 px-4 py-3 text-secondary text-ink">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Looks good! {SYNC_NOTE}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddClothing
