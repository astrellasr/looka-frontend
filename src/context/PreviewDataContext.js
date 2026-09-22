import { createContext } from 'react'

/**
 * Shared preview data for frontend-only mode.
 *
 * Kept in its own module (no component export) so the provider file can
 * fast-refresh cleanly, matching AuthContext.
 */
export const PreviewDataContext = createContext(null)
