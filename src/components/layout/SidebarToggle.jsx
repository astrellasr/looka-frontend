import { ChevronIcon } from '../common/Icons'

/**
 * Collapse/expand control. Discoverable at rest -- a soft neutral chip
 * with a charcoal chevron -- while still reading as part of the sidebar
 * rather than a floating widget.
 */
function SidebarToggle({ collapsed, onToggle, className = '' }) {
  const label = collapsed ? 'Expand sidebar' : 'Collapse sidebar'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={!collapsed}
      title={label}
      className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-surface-soft/55 text-ink-soft transition-colors duration-150 hover:bg-[#f0e9e6] hover:text-ink ${className}`}
    >
      <ChevronIcon
        direction={collapsed ? 'right' : 'left'}
        className="h-[17px] w-[17px]"
        strokeWidth="1.75"
      />
    </button>
  )
}

export default SidebarToggle
