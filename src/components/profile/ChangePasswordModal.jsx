import { useState } from 'react'
import Modal from '../common/Modal'
import { EyeIcon, EyeOffIcon } from '../common/Icons'

function PasswordField({ id, label, value, onChange, error }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-secondary font-medium text-ink">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={label}
          className={`h-11 w-full rounded-control border bg-surface pl-4 pr-11 text-body text-ink placeholder:text-ink-muted transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/25 ${
            error ? 'border-error' : 'border-line focus:border-primary'
          }`}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:text-ink"
        >
          {visible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-caption text-error">
          {error}
        </p>
      )}
    </div>
  )
}

/** Local validation only -- no request is sent. */
function ChangePasswordModal({ onClose, onUpdated }) {
  const [values, setValues] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})

  const set = (key) => (value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const next = {}
    if (!values.current) next.current = 'Please enter your current password.'
    if (!values.next) next.next = 'Please enter a new password.'
    else if (values.next.length < 8)
      next.next = 'Use at least 8 characters.'
    if (!values.confirm) next.confirm = 'Please confirm your new password.'
    else if (values.next && values.confirm !== values.next)
      next.confirm = 'Passwords do not match.'

    setErrors(next)
    if (Object.keys(next).length === 0) onUpdated()
  }

  return (
    <Modal title="Change Password" onClose={onClose}>
      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          id="current-password"
          label="Current Password"
          value={values.current}
          onChange={set('current')}
          error={errors.current}
        />
        <PasswordField
          id="new-password"
          label="New Password"
          value={values.next}
          onChange={set('next')}
          error={errors.next}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm New Password"
          value={values.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-control border border-line bg-surface px-5 text-body font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
          >
            Update Password
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal
