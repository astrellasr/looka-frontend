/**
 * Frontend preview mode.
 *
 * TEMPORARY: while the UI is being finalised ahead of backend
 * integration, the app runs without a server. Preview mode simulates
 * authentication locally so every page is reachable with `npm run dev`
 * alone -- no backend, no requests, no "cannot reach server" errors.
 *
 * Set VITE_FRONTEND_PREVIEW=false to fall back to the real JWT flow
 * built in Phase 1. Nothing in that flow was removed.
 *
 * Vite inlines env vars as strings, so the value is compared as text.
 * It defaults to ON: an unset or malformed flag keeps the frontend
 * runnable rather than locking the UI behind an absent backend.
 */

const raw = import.meta.env.VITE_FRONTEND_PREVIEW

export const IS_PREVIEW_MODE = String(raw ?? 'true').toLowerCase() !== 'false'

/**
 * The stand-in account used while previewing. Shaped like what
 * GET /auth/me is expected to return, so swapping modes changes
 * nothing downstream.
 */
export const PREVIEW_USER = {
  id: 'preview-user',
  name: 'Stella',
  username: 'stella',
  email: 'preview@looka.local',
}

/** Marks a session as simulated so real and preview tokens never mix. */
export const PREVIEW_TOKEN = 'preview-mode-token'
