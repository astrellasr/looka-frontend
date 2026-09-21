import Select from '../common/Select'
import { SunIcon, SparkleIcon } from '../common/Icons'
import { OCCASION_OPTIONS } from '../wardrobe/clothingFormOptions'

/**
 * Occasion input + weather context + the primary CTA.
 *
 * Weather is contextual data supplied by the backend, never a field the
 * user fills in to steer the recommendation.
 */
function RecommendationForm({
  occasion,
  onOccasionChange,
  weather,
  onChangeCity,
  onSubmit,
  busy = false,
}) {
  const ready = Boolean(occasion)

  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
      <h2 className="text-section">What are you dressing for?</h2>
      <p className="mt-1 text-body text-ink-soft">
        Choose an occasion and let Luca style your look.
      </p>

      <div className="mt-6">
        <label htmlFor="occasion" className="sr-only">
          Occasion
        </label>
        <Select
          id="occasion"
          name="occasion"
          value={occasion}
          onChange={(e) => onOccasionChange(e.target.value)}
          options={OCCASION_OPTIONS}
          placeholder="Select an occasion"
        />
      </div>

      {weather && (
        <div className="mt-4 flex items-center gap-3 rounded-control border border-line bg-surface-soft/40 p-3.5">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-butter/40 text-ink"
          >
            <SunIcon className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-body font-medium text-ink">
              {weather.city} · {weather.temperature}°{weather.unit}
            </p>
            <p className="truncate text-secondary text-ink-soft">
              {weather.note}
            </p>
          </div>

          {onChangeCity && (
            <button
              type="button"
              onClick={onChangeCity}
              className="shrink-0 rounded-control border border-line bg-surface px-3.5 py-2 text-secondary font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
            >
              Change
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!ready || busy}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-control bg-primary text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong disabled:cursor-not-allowed disabled:bg-primary/40"
      >
        <SparkleIcon className="h-4 w-4" aria-hidden="true" />
        Find My Look
      </button>

      {!ready && (
        <p className="mt-2.5 text-center text-caption text-ink-muted">
          Choose an occasion to get started.
        </p>
      )}
    </section>
  )
}

export default RecommendationForm
