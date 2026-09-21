const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-strong',
  secondary: 'bg-surface-soft text-ink hover:bg-line',
  outline: 'border border-line bg-transparent text-ink hover:bg-surface-soft',
  ghost: 'bg-transparent text-ink-soft hover:bg-surface-soft hover:text-ink',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-secondary',
  md: 'h-11 px-5 text-body',
}

function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
