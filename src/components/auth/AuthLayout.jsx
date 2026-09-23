import Brand from '../common/Brand'

/**
 * Split-screen auth shell: branding panel on the left from lg up,
 * form column on the right. On mobile the panel is hidden and the
 * wordmark sits centred above the form.
 *
 * Wordmark only -- no tagline anywhere.
 */
function AuthLayout({ headline, supporting, children }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-line bg-surface-soft/45 p-12 lg:flex xl:p-16">
        <Brand variant="wordmark" className="w-[190px] max-w-full" />

        <div className="relative z-10 max-w-md">
          <h2
            className="text-[2.5rem] leading-[1.15] text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {headline}
          </h2>
          <p className="mt-5 max-w-sm text-body leading-relaxed text-ink-soft">
            {supporting}
          </p>
        </div>

        {/* Keeps the headline in the lower-middle rather than pinned to
            the bottom edge now that the panel holds two blocks. */}
        <div aria-hidden="true" className="h-16 shrink-0" />

        {/* Understated decoration: a soft light wash, no photography. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-full w-2/3 bg-gradient-to-bl from-blush/20 via-peach/10 to-transparent blur-2xl"
        />
      </section>

      <section className="flex w-full flex-col justify-center px-5 py-12 sm:px-10 lg:w-1/2 lg:px-12">
        <div className="animate-rise-in mx-auto w-full max-w-[26rem]">
          <div className="mb-8 flex justify-center lg:hidden">
            <Brand variant="wordmark" className="w-[150px] max-w-full" />
          </div>

          {children}
        </div>
      </section>
    </div>
  )
}

export default AuthLayout
