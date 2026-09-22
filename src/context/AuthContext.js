import { createContext } from 'react'

/**
 * Auth state shared across the app.
 *
 * Kept in its own module (no component export) so the provider file can
 * fast-refresh cleanly, matching how lookbookOptions.js was split out.
 */
export const AuthContext = createContext(null)
