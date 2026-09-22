/**
 * The JWT, kept in one place.
 *
 * This module deliberately imports nothing from the app: the axios
 * interceptors and the auth context both talk to it, so keeping it
 * dependency-free is what stops those two from importing each other.
 *
 * The token lives in localStorage so a reload can restore the session,
 * and is mirrored in memory so reads on every request do not touch
 * storage. Every storage access is guarded -- private mode and blocked
 * site data throw rather than returning null.
 */

const STORAGE_KEY = 'looka:token'

let token = read()

function read() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function getToken() {
  return token
}

export function setToken(next) {
  token = next ?? null

  try {
    if (token) localStorage.setItem(STORAGE_KEY, token)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* Session still works for this tab; it just will not survive reload. */
  }
}

export function clearToken() {
  setToken(null)
}

/**
 * Lets the auth context react to a 401 without axios importing it.
 * The context registers a handler on mount; the interceptor calls it.
 */
let unauthorizedHandler = null

export function onUnauthorized(handler) {
  unauthorizedHandler = handler
  return () => {
    if (unauthorizedHandler === handler) unauthorizedHandler = null
  }
}

export function notifyUnauthorized() {
  unauthorizedHandler?.()
}
