import Input from '../common/Input'
import { LockIcon } from '../common/Icons'

/** Name is editable; email is read-only until the API supports changing it. */
function PersonalInformation({ name, username, email, onNameChange, action }) {
  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card">
      {/* The save action lives here rather than at the page foot, so it
          is reachable without scrolling past every card.

          Below sm it stacks under the heading at full width, rather than
          being squeezed beside it -- at 320px there is no room for both
          on one row. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-section">Personal Information</h2>
          <p className="mt-1 text-secondary text-ink-soft">
            Keep your information up to date.
          </p>
        </div>

        {action && <div className="shrink-0 [&>button]:w-full sm:[&>button]:w-auto">{action}</div>}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="profile-name"
            className="block text-secondary font-medium text-ink"
          >
            Name <span className="text-error">*</span>
          </label>
          <div className="mt-2">
            <Input
              id="profile-name"
              name="name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="profile-username"
            className="block text-secondary font-medium text-ink"
          >
            Username
          </label>

          <div className="relative mt-2">
            <input
              id="profile-username"
              name="username"
              value={username ?? ''}
              readOnly
              aria-describedby="username-note"
              className="h-11 w-full cursor-not-allowed rounded-control border border-line bg-surface-soft/45 pl-4 pr-10 text-body text-ink-soft"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            >
              <LockIcon className="h-4 w-4" />
            </span>
          </div>

          <p id="username-note" className="mt-1.5 text-caption text-ink-muted">
            You sign in with this username.
          </p>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="profile-email"
            className="block text-secondary font-medium text-ink"
          >
            Email
          </label>

          <div className="relative mt-2">
            <input
              id="profile-email"
              name="email"
              type="email"
              value={email}
              readOnly
              aria-describedby="email-note"
              className="h-11 w-full cursor-not-allowed rounded-control border border-line bg-surface-soft/45 pl-4 pr-10 text-body text-ink-soft"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            >
              <LockIcon className="h-4 w-4" />
            </span>
          </div>

          <p id="email-note" className="mt-1.5 text-caption text-ink-muted">
            Email cannot be changed right now.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PersonalInformation
