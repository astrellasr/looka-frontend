import { Link } from 'react-router-dom'
import Input from '../common/Input'
import Select from '../common/Select'
import { HangerIcon, InfoIcon } from '../common/Icons'
import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  STYLE_OPTIONS,
  OCCASION_OPTIONS,
  WEATHER_OPTIONS,
} from './clothingFormOptions'

function Field({ id, label, error, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-secondary font-medium text-ink">
        {label} <span className="text-error">*</span>
      </label>

      <div className="mt-2">{children}</div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-caption text-error">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * The clothing detail fields. Controlled by the page, which owns the
 * values, the errors and submission.
 */
function ClothingForm({ values, errors, onChange }) {
  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => onChange(name, e.target.value),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <div className="space-y-5">
      <Field id="name" label="Name" error={errors.name}>
        <Input {...bind('name')} placeholder="e.g. White Knit Top" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="category" label="Category" error={errors.category}>
          <Select
            {...bind('category')}
            options={CATEGORY_OPTIONS}
            placeholder="Select category"
          />
        </Field>

        <Field id="color" label="Color" error={errors.color}>
          <Select
            {...bind('color')}
            options={COLOR_OPTIONS}
            placeholder="Select color"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="style" label="Style" error={errors.style}>
          <Select
            {...bind('style')}
            options={STYLE_OPTIONS}
            placeholder="Select style"
          />
        </Field>

        <Field id="occasion" label="Occasion" error={errors.occasion}>
          <Select
            {...bind('occasion')}
            options={OCCASION_OPTIONS}
            placeholder="Select occasion"
          />
        </Field>
      </div>

      <Field id="weather" label="Weather" error={errors.weather}>
        <Select
          {...bind('weather')}
          options={WEATHER_OPTIONS}
          placeholder="Select weather"
        />
      </Field>
    </div>
  )
}

export function FormActions({
  note,
  submitLabel = 'Add to Wardrobe',
  submitIcon: SubmitIcon = HangerIcon,
  submitting = false,
  submittingLabel = 'Saving...',
}) {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          to="/wardrobe"
          className="inline-flex h-11 items-center justify-center rounded-control border border-line bg-surface px-6 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-control bg-primary px-6 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong disabled:cursor-not-allowed disabled:bg-primary/55 disabled:hover:bg-primary/55"
        >
          <SubmitIcon className="h-4 w-4" aria-hidden="true" />
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>

      <p className="mt-4 flex items-start justify-end gap-2 text-right text-secondary text-ink-muted">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{note}</span>
      </p>
    </div>
  )
}

export default ClothingForm
