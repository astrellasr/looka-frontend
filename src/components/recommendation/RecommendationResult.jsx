import OutfitPreview from './OutfitPreview'
import StylistAdvice from './StylistAdvice'
import RecommendationActions from './RecommendationActions'
import { HeartMarkSmall } from '../dashboard/GreetingHeart'

/**
 * The success state: the look, its score, Luca's note and the actions.
 * Everything is rendered from `recommendation`, which will be the
 * POST /recommendations response.
 */
function RecommendationResult({
  recommendation,
  lockedItemId,
  onToggleLock,
  onShuffle,
  onSave,
  onWearToday,
  saved,
  worn,
  busy,
  feedback,
}) {
  const { items, score, occasion, weather, stylistNote, reasons } = recommendation

  const context = [occasion, weather?.city, weather ? `${weather.temperature}°${weather.unit}` : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-section">
              Your Look
              <HeartMarkSmall />
            </h2>
            <p className="mt-1 text-secondary text-ink-soft">{context}</p>
          </div>

          {/* Understated score, not a leaderboard. */}
          <div className="flex shrink-0 items-baseline gap-2 rounded-control bg-blush/20 px-4 py-2">
            <span className="text-caption tracking-[0.12em] text-ink-soft">
              LOOKA MATCH
            </span>
            <span className="text-body font-medium text-ink">{score}</span>
            <span className="text-caption text-ink-muted">/ 100</span>
          </div>
        </div>

        <div className="mt-6">
          <OutfitPreview
            items={items}
            lockedItemId={lockedItemId}
            onToggleLock={onToggleLock}
          />
        </div>

        <RecommendationActions
          hasLockedItem={Boolean(lockedItemId)}
          onShuffle={onShuffle}
          onSave={onSave}
          onWearToday={onWearToday}
          saved={saved}
          worn={worn}
          busy={busy}
        />

        <div aria-live="polite">
          {feedback && (
            <p className="mt-4 rounded-control border border-success/40 bg-success/10 px-4 py-3 text-secondary text-ink">
              {feedback}
            </p>
          )}
        </div>
      </section>

      <StylistAdvice note={stylistNote} reasons={reasons} />
    </div>
  )
}

export default RecommendationResult
