import { NavLink } from 'react-router-dom'
import Brand from '../common/Brand'
import SidebarToggle from './SidebarToggle'
import { LogoutIcon, UserIcon } from '../common/Icons'
import { mainNav, secondaryNav } from './navItems'

function SidebarLink({ item, collapsed }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) => {
        const base = `group/nav relative flex items-center rounded-control py-2.5 text-body transition-colors duration-150 ${
          collapsed ? 'justify-center px-0' : 'gap-3 px-3.5'
        }`
        return isActive
          ? `${base} bg-blush/45 font-medium text-ink`
          : `${base} text-ink-soft hover:bg-surface-soft/70 hover:text-ink`
      }}
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`h-5 w-5 shrink-0 ${isActive ? 'text-ink' : 'text-ink-muted'}`}
          />

          {/* Label is removed from the flow when collapsed, so it can't
              force the narrow sidebar to overflow. */}
          {!collapsed && <span className="truncate">{item.label}</span>}

          {/* Tooltip: collapsed state only. Rendered inside the sidebar and
              clipped by the shell, so it never widens the page. */}
          {collapsed && (
            <span
              role="tooltip"
              className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-caption text-white opacity-0 shadow-raised transition-opacity duration-150 group-hover/nav:opacity-100 group-focus-visible/nav:opacity-100"
            >
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

/**
 * Desktop sidebar. Ivory surface, hairline right border, no shadow --
 * a fashion app, not an admin panel.
 *
 * Width is driven by the parent grid in AppShell; this component only
 * decides what to show at each state.
 */
function Sidebar({ collapsed, onToggle, user, avatarUrl, onLogout }) {
  return (
    <aside className="hidden h-screen flex-col border-r border-line bg-canvas lg:flex">
      {/* Brand, then the toggle on its own row so it never crowds
          the wordmark. Tagline is live text, not part of the image. */}
      <div
        className={`flex shrink-0 flex-col py-7 ${collapsed ? 'px-3' : 'px-5'}`}
      >
        <NavLink
          to="/dashboard"
          aria-label="LOOKA home"
          className="flex flex-col items-center rounded-md"
        >
          <Brand
            variant={collapsed ? 'mark' : 'wordmark'}
            className={collapsed ? 'h-8 w-auto' : 'w-[135px]'}
          />
        </NavLink>

        <div className={`mt-5 flex ${collapsed ? 'justify-center' : 'justify-end'}`}>
          <SidebarToggle collapsed={collapsed} onToggle={onToggle} />
        </div>
      </div>

      <nav
        className={`flex flex-1 flex-col gap-1 ${collapsed ? 'px-3' : 'px-4'}`}
      >
        {mainNav.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} />
        ))}

        <div className="my-4 border-t border-line" />

        {secondaryNav.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div
        className={`shrink-0 border-t border-line py-5 ${
          collapsed ? 'px-3' : 'px-5'
        }`}
      >
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-soft">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            )}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-secondary font-medium text-ink">
                {user?.name ?? user?.username ?? 'Your profile'}
              </p>
              {user?.username && (
                <p className="truncate text-caption text-ink-muted">
                  @{user.username}
                </p>
              )}
            </div>
          )}

          {!collapsed && (
            <button
              type="button"
              onClick={onLogout}
              aria-label="Log out"
              title="Log out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
            >
              <LogoutIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            title="Log out"
            className="mt-3 flex h-8 w-full items-center justify-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
          >
            <LogoutIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
