import { SunIcon } from '../common/Icons'

/**
 * Compact weather/context strip.
 *
 * Presentational only: it renders whatever `weather` it is given. When the
 * backend supplies weather, pass it in and add loading/empty handling at
 * the caller -- this component needs no change.
 */
function WeatherCard({ weather }) {
  if (!weather) return null

  const { city, temperature, unit, note } = weather

  return (
    <div className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-butter/40 text-ink"
      >
        <SunIcon className="h-5 w-5" />
      </span>

      <div className="min-w-0">
        <p className="truncate text-body font-medium text-ink">
          {city} · {temperature}°{unit}
        </p>
        {note && (
          <p className="truncate text-secondary text-ink-soft">{note}</p>
        )}
      </div>
    </div>
  )
}

export default WeatherCard
