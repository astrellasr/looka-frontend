import { CheckIcon, PlusIcon } from '../common/Icons'
import {
  STYLE_PREFERENCE_OPTIONS,
  COLOR_PREFERENCE_OPTIONS,
} from '../../utils/previewData'

/** Style chips and colour swatches. Local state, lifted to the page. */
function StylePreferences({ styles, colors, onToggleStyle, onToggleColor }) {
  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card">
      <h2 className="text-section">Style Preferences</h2>
      <p className="mt-1 text-secondary text-ink-soft">
        Tell us more about your style.
      </p>

      <fieldset className="mt-6">
        <legend className="text-secondary font-medium text-ink">
          What styles do you usually wear?{' '}
          <span className="font-normal text-ink-muted">
            (Select all that apply)
          </span>
        </legend>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {STYLE_PREFERENCE_OPTIONS.map((style) => {
            const active = styles.includes(style)

            return (
              <button
                key={style}
                type="button"
                onClick={() => onToggleStyle(style)}
                aria-pressed={active}
                className={`flex items-center gap-2.5 rounded-control border px-3.5 py-2.5 text-left text-secondary transition-colors duration-150 ${
                  active
                    ? 'border-primary/50 bg-blush/30 font-medium text-ink'
                    : 'border-line bg-surface text-ink-soft hover:bg-surface-soft/60'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    active ? 'border-primary bg-primary text-white' : 'border-line'
                  }`}
                >
                  {active && <CheckIcon className="h-3 w-3" />}
                </span>
                <span className="min-w-0 truncate">{style}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-secondary font-medium text-ink">
          What colors do you usually like?
        </legend>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          {COLOR_PREFERENCE_OPTIONS.map((color) => {
            const active = colors.includes(color.id)

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onToggleColor(color.id)}
                aria-pressed={active}
                aria-label={color.label}
                title={color.label}
                className={`relative h-10 w-10 shrink-0 rounded-full transition-shadow duration-150 ${
                  active
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
                    : 'ring-1 ring-line hover:ring-ink-muted'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {active && (
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    <CheckIcon className="h-4 w-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
                  </span>
                )}
              </button>
            )
          })}

          <button
            type="button"
            aria-label="Add another color"
            title="More colors coming soon"
            disabled
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-line text-ink-muted disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </fieldset>
    </section>
  )
}

export default StylePreferences
