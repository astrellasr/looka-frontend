import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthField from '../../components/auth/AuthField'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'
import { UserIcon, LockIcon } from '../../components/common/Icons'
import { useAuth } from '../../hooks/useAuth'
import { toErrorMessage } from '../../api/axios'

const MESSAGES = {
  username: 'Username is required.',
  password: 'Password is required.',
}

function Login() {
  const [values, setValues] = useState({ username: '', password: '' })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Return the user to whatever protected page sent them here.
  const redirectTo = location.state?.from?.pathname ?? '/dashboard'

  const set = (key) => (value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setFormError('')
  }

  const blur = (key) => () => {
    setTouched((current) => ({ ...current, [key]: true }))
    if (!values[key].trim()) {
      setErrors((current) => ({ ...current, [key]: MESSAGES[key] }))
    }
  }

  // Both fields filled -> the CTA becomes active.
  const ready =
    values.username.trim() !== '' && values.password.trim() !== ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Guard against a double submit while the request is in flight.
    if (!ready || status === 'loading') return

    const next = {}
    if (!values.username.trim()) next.username = MESSAGES.username
    if (!values.password.trim()) next.password = MESSAGES.password

    setErrors(next)
    setTouched({ username: true, password: true })
    if (Object.keys(next).length > 0) return

    setStatus('loading')
    setFormError('')

    try {
      await login({
        username: values.username.trim(),
        password: values.password,
      })
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setStatus('idle')
      setFormError(
        toErrorMessage(error, 'Username or password is incorrect.'),
      )
    }
  }

  const busy = status === 'loading'

  return (
    <AuthLayout
      headline={
        <>
          Same Clothes.
          <br />
          New Possibilities.
        </>
      }
      supporting="Organize, style, and make the most of what you already own."
    >
      <h1 className="flex items-center gap-2 text-page">
        Welcome Back
        <HeartMarkSmall />
      </h1>
      <p className="mt-2 text-secondary text-ink-soft">
        Sign in to your LOOKA account
      </p>

      <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Always rendered so the layout never jumps between states. */}
        <div aria-live="polite">
          {formError && (
            <p className="rounded-control border border-error/40 bg-error/10 px-4 py-3 text-secondary text-ink">
              {formError}
            </p>
          )}
        </div>

        <AuthField
          id="username"
          label="Username"
          icon={UserIcon}
          placeholder="Enter your username"
          autoComplete="username"
          value={values.username}
          onChange={set('username')}
          onBlur={blur('username')}
          error={touched.username ? errors.username : undefined}
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          icon={LockIcon}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={set('password')}
          onBlur={blur('password')}
          error={touched.password ? errors.password : undefined}
        />

        <button
          type="submit"
          disabled={!ready || busy}
          className={`inline-flex h-12 w-full items-center justify-center rounded-control text-body font-medium transition-colors duration-200 ${
            ready && !busy
              ? 'bg-primary text-white hover:bg-primary-strong'
              : 'cursor-not-allowed bg-blush/35 text-white/80'
          }`}
        >
          {busy ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-center text-secondary text-ink-soft">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-primary-strong hover:underline"
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login
