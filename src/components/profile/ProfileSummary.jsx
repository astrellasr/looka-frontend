import { CameraIcon, UserIcon } from '../common/Icons'
import { HeartMarkSmall } from '../dashboard/GreetingHeart'

function Stat({ value, label }) {
  return (
    <div className="min-w-0 text-center">
      <p className="text-section text-ink">{value}</p>
      <p className="mt-0.5 text-caption leading-tight text-ink-muted">{label}</p>
    </div>
  )
}

/**
 * Identity card: avatar, name, the three counts and a closing quote.
 * Distinct from the settings column, which holds the editable fields.
 */
function ProfileSummary({ profile, photoUrl, onChangePhoto }) {
  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blush/45 to-lavender/30">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${profile.name}'s profile photo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-12 w-12 text-primary-strong/60" aria-hidden="true" />
            )}
          </div>

          <button
            type="button"
            onClick={onChangePhoto}
            aria-label="Change profile photo"
            className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-soft shadow-card transition-colors duration-150 hover:text-ink"
          >
            <CameraIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Identity: display name leads, username identifies the
            account. Email belongs in Personal Information, not here. */}
        <h2 className="mt-4 w-full truncate text-section">{profile.name}</h2>
        {profile.username && (
          <p className="mt-0.5 w-full truncate text-secondary text-ink-soft">
            @{profile.username}
          </p>
        )}

        <button
          type="button"
          onClick={onChangePhoto}
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
        >
          <CameraIcon className="h-4 w-4" aria-hidden="true" />
          Change Photo
        </button>
      </div>

      <div className="mt-6 rounded-card bg-blush/20 px-4 py-5 text-center">
        <p
          className="text-body leading-snug text-primary-strong"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Same Outfits
          <br />
          Brighter Days
        </p>
        <HeartMarkSmall className="mx-auto mt-2 h-3.5 w-3.5" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 border-y border-line py-5">
        <Stat value={profile.wardrobeCount} label="Items in Wardrobe" />
        <Stat value={profile.savedLooks} label="Saved Looks" />
        <Stat value={profile.daysStyled} label="Days Styled" />
      </div>

      <figure className="mt-6 text-center">
        <blockquote
          className="text-body leading-relaxed text-ink"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          &ldquo;Good style is a form of self-care.&rdquo;
        </blockquote>
        <figcaption className="mt-2 text-caption tracking-[0.12em] text-ink-muted">
          — LOOKA
        </figcaption>
      </figure>
    </section>
  )
}

export default ProfileSummary
