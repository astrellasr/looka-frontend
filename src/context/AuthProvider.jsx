import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import * as authApi from '../api/auth'
import {
  getToken,
  setToken as persistToken,
  clearToken,
  onUnauthorized,
} from '../api/tokenStore'
import {
  IS_PREVIEW_MODE,
  PREVIEW_USER,
  PREVIEW_TOKEN,
} from '../config/previewMode'

/**
 * Owns the session: the JWT, the current user, and the three actions
 * that change them.
 *
 * Two modes, selected by VITE_FRONTEND_PREVIEW:
 *
 *   preview (default, temporary) - authentication is simulated in the
 *     browser. No request is ever made, so the app runs with the
 *     backend switched off while the UI is finalised.
 *
 *   real - the Phase 1 JWT flow: /auth/login, /auth/register,
 *     /auth/me, plus 401 teardown. Left fully intact.
 *
 * `restoring` is true only while a stored token is verified on boot.
 * Routes wait on it so a protected page is never rendered, and never
 * bounced to /login, before we know.
 */
function AuthProvider({ children }) {
  // Preview mode starts signed in: the point is to reach the UI, and a
  // stale real token from an earlier session must not leak into it.
  const [user, setUser] = useState(IS_PREVIEW_MODE ? PREVIEW_USER : null)
  const [token, setTokenState] = useState(() =>
    IS_PREVIEW_MODE ? PREVIEW_TOKEN : getToken(),
  )
  const [restoring, setRestoring] = useState(() =>
    IS_PREVIEW_MODE ? false : Boolean(getToken()),
  )

  /**
   * The signed-in user's avatar, shared by every avatar in the app.
   *
   * Preview mode only: the image is a browser object URL, never
   * uploaded. Held here rather than in Profile so the top bar and
   * sidebar see the same value without duplicating state.
   *
   * The ref mirrors the URL so the previous one can be revoked when a
   * new photo replaces it, and the last one on unmount -- without
   * revoking a URL that is still on screen.
   */
  const [avatarUrl, setAvatarUrlState] = useState(null)
  const avatarRef = useRef(null)

  useEffect(() => {
    avatarRef.current = avatarUrl
  }, [avatarUrl])

  useEffect(
    () => () => {
      if (avatarRef.current) URL.revokeObjectURL(avatarRef.current)
    },
    [],
  )

  /** Replaces the avatar, releasing the URL it supersedes. */
  const setAvatarUrl = useCallback((nextUrl) => {
    setAvatarUrlState((current) => {
      if (current && current !== nextUrl) URL.revokeObjectURL(current)
      return nextUrl ?? null
    })
  }, [])

  /** Clears everything. Used by logout and by a 401 from the server. */
  const endSession = useCallback(() => {
    clearToken()
    setTokenState(null)
    setUser(null)
    setAvatarUrl(null)
  }, [setAvatarUrl])

  const startSession = useCallback((nextToken, nextUser) => {
    persistToken(nextToken)
    setTokenState(nextToken)
    setUser(nextUser ?? null)
  }, [])

  // A 401 on any authenticated request ends the session. The redirect
  // itself is left to RequireAuth, which reacts to the state change.
  // Preview mode makes no requests, so there is nothing to listen for.
  useEffect(() => {
    if (IS_PREVIEW_MODE) return undefined
    return onUnauthorized(endSession)
  }, [endSession])

  // On boot, a stored token is only trusted once /auth/me confirms it.
  // With no token there is nothing to restore -- `restoring` already
  // initialised to false, so this effect simply does not run its body.
  useEffect(() => {
    if (IS_PREVIEW_MODE) return undefined
    if (!getToken()) return undefined

    let cancelled = false

    authApi
      .getMe()
      .then((me) => {
        if (!cancelled) setUser(me)
      })
      .catch(() => {
        // Invalid or expired token, or the server is unreachable.
        // Either way we cannot claim a session.
        if (!cancelled) endSession()
      })
      .finally(() => {
        if (!cancelled) setRestoring(false)
      })

    return () => {
      cancelled = true
    }
  }, [endSession])

  const login = useCallback(
    async (credentials) => {
      if (IS_PREVIEW_MODE) {
        // Simulated: no request. Carry the typed username through so
        // the signed-in UI reflects what was entered.
        const typed = credentials?.username?.trim()
        const previewUser = {
          ...PREVIEW_USER,
          username: typed || PREVIEW_USER.username,
          // Display name defaults to the username until the user edits it.
          name: typed || PREVIEW_USER.name,
        }
        setTokenState(PREVIEW_TOKEN)
        setUser(previewUser)
        return previewUser
      }

      const result = await authApi.login(credentials)

      if (!result.token) {
        throw new Error('Sign-in did not return a token.')
      }

      // Persist first so the follow-up /auth/me carries the header.
      persistToken(result.token)
      setTokenState(result.token)

      let nextUser = result.user
      if (!nextUser || !nextUser.id) {
        try {
          nextUser = await authApi.getMe()
        } catch {
          /* Keep whatever the login response gave us. */
        }
      }

      setUser(nextUser ?? null)
      return nextUser
    },
    [],
  )

  const register = useCallback(
    async (credentials) => {
      if (IS_PREVIEW_MODE) {
        const typed = credentials?.username?.trim()
        const previewUser = {
          ...PREVIEW_USER,
          username: typed || PREVIEW_USER.username,
          name: typed || PREVIEW_USER.name,
          email: credentials?.email?.trim() || PREVIEW_USER.email,
        }
        setTokenState(PREVIEW_TOKEN)
        setUser(previewUser)
        return { authenticated: true, user: previewUser }
      }

      const result = await authApi.register(credentials)

      // Some backends sign the user in on register, some do not.
      // Both are handled: a token means straight into the app.
      if (!result.token) return { authenticated: false, user: result.user }

      startSession(result.token, result.user)

      if (!result.user || !result.user.id) {
        try {
          setUser(await authApi.getMe())
        } catch {
          /* Non-fatal; the session is still valid. */
        }
      }

      return { authenticated: true, user: result.user }
    },
    [startSession],
  )

  const logout = useCallback(() => {
    if (IS_PREVIEW_MODE) {
      // Drop the simulated session so /login renders. Signing in again
      // restores it, since no server is involved.
      setTokenState(null)
      setUser(null)
      setAvatarUrl(null)
      return
    }

    endSession()
  }, [endSession, setAvatarUrl])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      restoring,
      isPreviewMode: IS_PREVIEW_MODE,
      avatarUrl,
      setAvatarUrl,
      login,
      register,
      logout,
      setUser,
    }),
    [user, token, restoring, avatarUrl, setAvatarUrl, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
