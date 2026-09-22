import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthField from '../../components/auth/AuthField'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'
import { UserIcon, MailIcon, LockIcon } from '../../components/common/Icons'
import { useAuth } from '../../hooks/useAuth'
import { toErrorMessage } from '../../api/axios'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Frontend-only confirmation shown after a valid submission. */
function RegisterSuccess() {
  return (
    <div className="text-center">
      <span
        aria-hidden="true"
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush/25 text-primary-strong"
      >
        <MailIcon className="h-7 w-7" />
      </span>

      <h1 className="mt-6 flex items-center justify-center gap-2 text-page">
        Welcome to LOOKA!
        <HeartMarkSmall />
      </h1>
      <p className="mt-2 text-body leading-relaxed text-ink-soft">
        Your account is ready to get started.
      </p>

      <Link
        to="/login"
        className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-control bg-primary text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
      >
        Get Started
      </Link>
    </div>
  )
}

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success

  const { register } = useAuth()
  const navigate = useNavigate()

  const validateField = (key, value) => {
    const text = value.trim()

    if (key === 'username') return text ? undefined : 'Username is required.'
    if (key === 'email') {
      if (!text) return 'Email is required.'
      return EMAIL_PATTERN.test(text) ? undefined : 'Please enter a valid email.'
    }
    if (key === 'password') return text ? undefined : 'Password is required.'
    return undefined
  }

  const set = (key) => (value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setFormError('')
  }

  const blur = (key) => () => {
    setTouched((current) => ({ ...current, [key]: true }))
    setErrors((current) => ({ ...current, [key]: validateField(key, values[key]) }))
  }

  // All three filled -> the CTA becomes active. No checkbox, no confirm.
  const ready =
    values.username.trim() !== '' &&
    values.email.trim() !== '' &&
    values.password.trim() !== ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Guard against a double submit while the request is in flight.
    if (!ready || status === 'loading') return

    const next = {}
    for (const key of ['username', 'email', 'password']) {
      const message = validateField(key, values[key])
      if (message) next[key] = message
    }

    setErrors(next)
    setTouched({ username: true, email: true, password: true })

    if (Object.keys(next).length > 0) {
      setFormError('Please check your information and try again.')
      return
    }

    setStatus('loading')
    setFormError('')

    try {
      const { authenticated } = await register({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      })

      if (authenticated) {
        // Backend signed us in -- go straight into the app.
        navigate('/dashboard', { replace: true })
        return
      }

      // No token returned: the account exists, but the contract wants a
      // separate sign-in. Show the confirmation, which links to /login.
      setStatus('success')
    } catch (error) {
      setStatus('idle')
      setFormError(
        toErrorMessage(error, 'Please check your information and try again.'),
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
      supporting="A more intentional wardrobe starts here."
    >
      {status === 'success' ? (
        <RegisterSuccess />
      ) : (
        <>
          <h1 className="flex items-center gap-2 text-page">
            Create Your Account
            <HeartMarkSmall />
          </h1>
          <p className="mt-2 text-secondary text-ink-soft">
            Join LOOKA and start styling your day
          </p>

          <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              placeholder="Choose a username"
              autoComplete="username"
              value={values.username}
              onChange={set('username')}
              onBlur={blur('username')}
              error={touched.username ? errors.username : undefined}
            />

            <AuthField
              id="email"
              label="Email"
              type="email"
              icon={MailIcon}
              placeholder="you@email.com"
              autoComplete="email"
              value={values.email}
              onChange={set('email')}
              onBlur={blur('email')}
              error={touched.email ? errors.email : undefined}
            />

            <AuthField
              id="password"
              label="Password"
              type="password"
              icon={LockIcon}
              placeholder="Enter your password"
              autoComplete="new-password"
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
              {busy ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-secondary text-ink-soft">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-strong hover:underline"
            >
              Sign in
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}

export default Register
