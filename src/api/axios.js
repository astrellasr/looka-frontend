import axios from 'axios'
import { getToken, notifyUnauthorized } from './tokenStore'

// VITE_API_BASE_URL already ends in /api, so paths here are written
// as '/auth/login', never '/api/auth/login'.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/** Attach the JWT when we have one. */
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * A 401 means the token is missing, expired or rejected. Tell the auth
 * context so it can clear state and send the user to /login.
 *
 * The login and register calls are excluded: a 401 there is "wrong
 * credentials", which the form shows inline -- it must not trigger a
 * session teardown.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url ?? ''
    const isAuthAttempt =
      url.includes('/auth/login') || url.includes('/auth/register')

    if (status === 401 && !isAuthAttempt) {
      notifyUnauthorized()
    }

    return Promise.reject(error)
  },
)

/**
 * Turns an axios failure into a message worth showing a person.
 * Prefers the backend's own message; never surfaces a raw status line.
 */
export function toErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data

  if (typeof data?.message === 'string' && data.message.trim()) return data.message
  if (typeof data?.error === 'string' && data.error.trim()) return data.error

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    const first = data.errors[0]
    if (typeof first === 'string') return first
    if (typeof first?.msg === 'string') return first.msg
    if (typeof first?.message === 'string') return first.message
  }

  if (error?.code === 'ERR_NETWORK') {
    return 'Cannot reach the server. Please check your connection and try again.'
  }

  return fallback
}

export default api
