import LucaAvatar from '../common/LucaAvatar'
import { HeartMarkSmall } from '../dashboard/GreetingHeart'

/**
 * Editorial promo panel. No photography exists yet, so the wardrobe
 * imagery is suggested with soft CSS shapes -- a hanging rail and a
 * couple of polaroid-style cards -- rather than stock images.
 */
function LucaPromoPanel() {
  return (
    <section className="relative overflow-hidden rounded-card border border-line bg-gradient-to-br from-surface-soft/70 via-blush/12 to-peach/15 p-6 shadow-card sm:p-8">
      <div className="relative z-10 max-w-[19rem]">
        <p
          className="text-[1.75rem] leading-tight text-ink"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Same Clothes,
          <br />
          New Stories
        </p>

        <p className="mt-4 flex items-start gap-1.5 text-body text-ink-soft">
          <span>
            Let Luca help you create fresh looks from pieces you already own.
          </span>
          <HeartMarkSmall className="mt-1 h-3.5 w-3.5" />
        </p>

        <div className="mt-6">
          <LucaAvatar size="lg" floating />
        </div>
      </div>

      {/* Suggested wardrobe rail -- decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] sm:block"
      >
        <div className="absolute left-6 right-6 top-12 h-px bg-ink-muted/30" />
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-12 w-10 rounded-b-[1.4rem] rounded-t-sm border border-line/70"
            style={{
              left: `${14 + i * 17}%`,
              height: `${52 + (i % 3) * 8}%`,
              background: [
                'var(--color-surface)',
                'var(--color-surface-soft)',
                'var(--color-blush)',
                'var(--color-surface)',
                'var(--color-peach)',
              ][i],
              opacity: 0.55,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default LucaPromoPanel
