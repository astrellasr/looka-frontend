import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MobileBottomNav from './MobileBottomNav'

const STORAGE_KEY = 'looka:sidebar-collapsed'

/**
 * Layout for authenticated routes: sidebar + top bar on desktop,
 * top bar + fixed bottom nav on mobile.
 *
 * Sidebar and main sit in a flex row, so main reclaims the space when the
 * sidebar collapses -- no hardcoded left offset to keep in sync.
 */
function AppShell() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(collapsed))
    } catch {
      /* Storage can be unavailable (private mode); the layout still works. */
    }
  }, [collapsed])

  return (
    <div className="flex min-h-screen overflow-x-clip bg-canvas">
      {/* Width lives here so the sidebar and its reserved space animate as
          one. Hidden below lg, so mobile is untouched by collapse state. */}
      <div
        className={`hidden shrink-0 lg:block lg:sticky lg:top-0 lg:h-screen lg:transition-[width] lg:duration-200 lg:ease-out ${
          collapsed ? 'lg:w-[76px]' : 'lg:w-60'
        }`}
      >
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* min-w-0 lets this column shrink instead of forcing page overflow. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        {/* Left-aligned, not mx-auto: centering the max-width box pushed
            content further from the sidebar the wider the screen got. */}
        <main className="w-full max-w-[1280px] flex-1 px-4 pb-28 pt-8 sm:px-8 lg:px-12 lg:pb-16">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  )
}

export default AppShell
