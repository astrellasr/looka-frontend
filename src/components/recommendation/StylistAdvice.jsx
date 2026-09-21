import LucaAvatar from '../common/LucaAvatar'
import { SparkleIcon, SunIcon, HangerIcon, StarIcon } from '../common/Icons'

/**
 * Luca's styling note and the supporting reasons.
 *
 * Every string here arrives from the backend recommendation response --
 * the frontend renders it and never generates stylist copy itself.
 */

const REASON_ICONS = {
  sun: SunIcon,
  hanger: HangerIcon,
  star: StarIcon,
}

const REASON_TINTS = {
  sun: 'bg-butter/40',
  hanger: 'bg-blush/35',
  star: 'bg-lavender/35',
}

function StylistAdvice({ note, reasons = [] }) {
  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card">
      <h2 className="flex items-center gap-2 text-section">
        <SparkleIcon className="h-4 w-4 text-primary" aria-hidden="true" />
        Luca&apos;s Style Note
      </h2>

      {note && (
        <div className="mt-5 flex items-start gap-3">
          <LucaAvatar size="sm" />
          <p className="min-w-0 flex-1 rounded-card rounded-tl-sm bg-blush/18 px-4 py-3 text-secondary leading-relaxed text-ink">
            {note}
          </p>
        </div>
      )}

      {reasons.length > 0 && (
        <>
          <h3 className="mt-7 text-body font-medium text-ink">
            Why This Works
          </h3>

          <ul className="mt-4 space-y-4">
            {reasons.map((reason) => {
              const Icon = REASON_ICONS[reason.icon] ?? StarIcon

              return (
                <li key={reason.id} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink ${
                      REASON_TINTS[reason.icon] ?? 'bg-surface-soft'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-secondary font-medium text-ink">
                      {reason.title}
                    </span>
                    <span className="block text-caption leading-relaxed text-ink-soft">
                      {reason.note}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}

export default StylistAdvice
