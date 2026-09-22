import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '../common/Icons'

/**
 * Labelled input with a leading icon, optional password toggle and
 * inline error. Used by both auth forms.
 */
function AuthField({
  id,
  label,
  type = 'text',
  icon: Icon,
  error,
  value,
  onChange,
  ...props
}) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-secondary font-medium text-ink">
        {label}
      </label>

      <div className="relative mt-2">
        {Icon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          >
            <Icon className="h-4 w-4" />
          </span>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-11 w-full rounded-control border bg-surface text-body text-ink placeholder:text-ink-muted transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/25 ${
            Icon ? 'pl-10' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} ${
            error ? 'border-error' : 'border-line focus:border-primary'
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? `Hide ${label}` : `Show ${label}`}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:text-ink"
          >
            {visible ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-start gap-1 text-caption text-error"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default AuthField
