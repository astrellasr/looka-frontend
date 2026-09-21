import { NavLink } from 'react-router-dom'
import { mainNav } from './navItems'

/**
 * Fixed 5-item bottom bar, mobile + tablet only.
 * AppShell reserves matching bottom padding so content is never covered.
 */
function MobileBottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
    >
      <ul className="flex items-stretch">
        {mainNav.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to} className="min-w-0 flex-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex h-16 flex-col items-center justify-center gap-1 px-1 transition-colors duration-150 ${
                    isActive ? 'text-primary-strong' : 'text-ink-muted'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="w-full truncate text-center text-[0.625rem] leading-tight">
                  {item.label}
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MobileBottomNav
