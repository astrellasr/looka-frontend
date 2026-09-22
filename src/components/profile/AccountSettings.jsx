import { LockIcon, TrashIcon, ChevronIcon } from '../common/Icons'

function Row({ icon: Icon, title, note, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-control px-2 py-4 text-left transition-colors duration-150 hover:bg-surface-soft/60"
    >
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          danger ? 'bg-error/15 text-error' : 'bg-surface-soft text-ink-soft'
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block text-body font-medium ${danger ? 'text-error' : 'text-ink'}`}
        >
          {title}
        </span>
        <span className="block truncate text-secondary text-ink-soft">{note}</span>
      </span>

      <ChevronIcon
        direction="right"
        className="h-4 w-4 shrink-0 text-ink-muted"
        aria-hidden="true"
      />
    </button>
  )
}

function AccountSettings({ onChangePassword, onDeleteAccount }) {
  return (
    <section className="rounded-card border border-line bg-surface p-6 shadow-card">
      <h2 className="text-section">Account</h2>
      <p className="mt-1 text-secondary text-ink-soft">
        Manage your account settings.
      </p>

      <div className="mt-4 divide-y divide-line">
        <Row
          icon={LockIcon}
          title="Change Password"
          note="Update your password to keep your account secure."
          onClick={onChangePassword}
        />
        <Row
          icon={TrashIcon}
          title="Delete Account"
          note="Permanently delete your account and all data."
          onClick={onDeleteAccount}
          danger
        />
      </div>
    </section>
  )
}

export default AccountSettings
