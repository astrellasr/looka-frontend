import { ChevronDownIcon } from './Icons'

/**
 * Native <select> styled to match Input: the native control keeps
 * keyboard and mobile behaviour, we only replace the arrow.
 */
function Select({ options = [], placeholder, className = '', ...props }) {
  return (
    <div className="relative w-full">
      <select
        className={`h-11 w-full appearance-none rounded-control border border-line bg-surface pl-4 pr-10 text-body text-ink transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
          props.value ? '' : 'text-ink-muted'
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
        <ChevronDownIcon className="h-4 w-4" />
      </span>
    </div>
  )
}

export default Select
