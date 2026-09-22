import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/** Reads the auth session. Throws if used outside AuthProvider. */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export default useAuth
