import Select from '../common/Select'
import {
  STYLE_OPTIONS,
  COLOR_OPTIONS,
  OCCASION_OPTIONS,
  WEATHER_OPTIONS,
} from './clothingFormOptions'

/**
 * Style / colour / occasion / weather filters.
 *
 * Uses the same option lists the clothing form writes, so every value
 * here can actually match an item. During API integration these come
 * from GET /clothes/meta/filters instead.
 */

const FIELDS = [
  { key: 'style', label: 'Style', options: STYLE_OPTIONS },
  { key: 'color', label: 'Color', options: COLOR_OPTIONS },
  { key: 'occasion', label: 'Occasion', options: OCCASION_OPTIONS },
  { key: 'weather', label: 'Weather', options: WEATHER_OPTIONS },
]

function WardrobeAdvancedFilters({ filters, onChange, onClear, activeCount }) {
  return (
    <div
      id="wardrobe-advanced-filters"
      className="animate-fade-in rounded-card border border-line bg-surface p-4 shadow-card sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-secondary font-medium text-ink">Refine by</p>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-secondary text-primary-strong transition-colors duration-150 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {FIELDS.map(({ key, label, options }) => (
          <div key={key} className="min-w-0">
            <label
              htmlFor={`filter-${key}`}
              className="block text-caption text-ink-muted"
            >
              {label}
            </label>
            <div className="mt-1.5">
              <Select
                id={`filter-${key}`}
                value={filters[key]}
                onChange={(e) => onChange(key, e.target.value)}
                options={options}
                placeholder={`Any ${label.toLowerCase()}`}
                className="h-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WardrobeAdvancedFilters
