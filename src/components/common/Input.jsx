/**
 * Text input with a soft dusty-rose focus ring.
 * `icon` renders a leading adornment (e.g. a search glyph).
 */
function Input({ icon = null, className = '', ...props }) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
          {icon}
        </span>
      )}
      <input
        className={`h-11 w-full rounded-control border border-line bg-surface text-body text-ink placeholder:text-ink-muted transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 ${
          icon ? 'pl-10 pr-4' : 'px-4'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

export default Input
