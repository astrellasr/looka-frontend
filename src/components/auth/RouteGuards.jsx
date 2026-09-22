import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LucaAvatar from '../common/LucaAvatar'
import { IS_PREVIEW_MODE } from '../../config/previewMode'

/**
 * Shown only while a stored token is being verified on boot. Uses the
 * existing Luca placeholder rather than introducing a new spinner.
 */
function RestoringSession() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas">
      <LucaAvatar size="md" floating />
      <p className="text-body text-ink-soft">Getting things ready...</p>
    </div>
  )
}

/**
 * Gate for the authenticated app. Waits for the boot check to finish so
 * a protected page is never rendered -- or wrongly bounced -- before we
 * know whether the session is valid.
 *
 * The attempted path is remembered so /login can return there afterwards.
 *
 * In preview mode the gate is open: every page must be reachable with no
 * backend, including straight after a preview logout. The guard itself
 * stays in place for when real mode is switched back on.
 */
export function RequireAuth() {
  const { isAuthenticated, restoring } = useAuth()
  const location = useLocation()

  if (IS_PREVIEW_MODE) return <Outlet />

  if (restoring) return <RestoringSession />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

/**
 * Keeps signed-in users away from /login and /register.
 *
 * In preview mode both pages stay reachable so their UI can be reviewed
 * without logging out first.
 */
export function RedirectIfAuthenticated() {
  const { isAuthenticated, restoring } = useAuth()

  if (IS_PREVIEW_MODE) return <Outlet />

  if (restoring) return <RestoringSession />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
