import api from './axios'

/**
 * Auth endpoints. Only the four that exist in the backend contract:
 *   POST /auth/register
 *   POST /auth/login
 *   GET  /auth/me
 *   PUT  /auth/profile
 *
 * Paths omit /api because VITE_API_BASE_URL already includes it.
 *
 * The backend's exact envelope is not confirmed yet, so the two helpers
 * below read the common shapes ({ token, user }, { data: { ... } },
 * { accessToken }) rather than assuming one. If the real shape differs,
 * these are the only two functions that need changing.
 */

function pickToken(payload) {
  if (!payload) return null
  return (
    payload.token ??
    payload.accessToken ??
    payload.data?.token ??
    payload.data?.accessToken ??
    null
  )
}

function pickUser(payload) {
  if (!payload) return null
  return payload.user ?? payload.data?.user ?? payload.data ?? payload
}

export async function register(credentials) {
  const { data } = await api.post('/auth/register', credentials)
  return { token: pickToken(data), user: pickUser(data), raw: data }
}

export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return { token: pickToken(data), user: pickUser(data), raw: data }
}

export async function getMe() {
  const { data } = await api.get('/auth/me')
  return pickUser(data)
}

export async function updateProfile(changes) {
  const { data } = await api.put('/auth/profile', changes)
  return pickUser(data)
}
