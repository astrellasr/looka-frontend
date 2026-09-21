import { Link } from 'react-router-dom'
import Brand from '../../components/common/Brand'

function Login() {
  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Editorial panel, desktop only. */}
      <section className="hidden w-1/2 flex-col justify-between border-r border-line bg-surface-soft/50 p-12 lg:flex">
        <Brand variant="logo" className="h-16 w-auto" />
        <p className="max-w-sm text-[2rem] leading-tight text-ink" style={{ fontFamily: 'var(--font-display)' }}>
          A Better You, With What You Already Own.
        </p>
        <p className="text-secondary text-ink-muted">Style What You Own</p>
      </section>

      <section className="flex w-full flex-col justify-center px-5 py-12 sm:px-10 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Brand variant="wordmark" className="h-7 w-auto" />
          </div>

          <h1 className="text-page">Welcome Back</h1>
          <p className="mt-2 text-secondary text-ink-soft">Sign in to continue your style journey</p>

          <div className="mt-8 rounded-card border border-line bg-surface p-6 shadow-card">
            <p className="text-body text-ink-soft">Sign in form will be implemented next.</p>
          </div>

          <p className="mt-8 text-secondary text-ink-soft">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-strong hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login
