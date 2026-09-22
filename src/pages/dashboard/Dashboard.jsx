import WeatherCard from '../../components/dashboard/WeatherCard'
import LucaGreeting from '../../components/dashboard/LucaGreeting'
import QuickAccess from '../../components/dashboard/QuickAccess'
import RecentLooks from '../../components/dashboard/RecentLooks'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'

// Temporary presentation values. See src/utils/previewData.js --
// every one of these is replaced by backend data during API integration.
import { previewWeather } from '../../utils/previewData'
import { useAuth } from '../../hooks/useAuth'
import { usePreviewData } from '../../hooks/usePreviewData'

function formatToday() {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Dashboard() {
  // Counts and recent looks track the shared preview store, so adding a
  // clothing item or saving a look is reflected here immediately.
  const { user } = useAuth()
  const { clothes, looks, calendar } = usePreviewData()

  const counts = {
    wardrobeItems: clothes.length,
    savedLooks: looks.length,
    daysStyled: Object.keys(calendar).length,
  }

  const recentLooks = looks.slice(0, 4)
  const firstName = user?.username ?? user?.name ?? 'there'

  return (
    <div className="space-y-10">
      {/* Greeting + context */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h1 className="flex items-center gap-2 text-page md:text-[2rem]">
              Hi, {firstName}!
              <HeartMarkSmall />
            </h1>
            <p className="text-secondary text-ink-muted">{formatToday()}</p>
          </div>

          <p className="mt-1 text-body text-ink-soft">
            What are we wearing today?
          </p>

          <div className="mt-6 max-w-md">
            <WeatherCard weather={previewWeather} />
          </div>
        </div>

        {/* Luca sits beside the greeting on desktop, below it on mobile. */}
        <div className="lg:pt-2">
          <LucaGreeting />
        </div>
      </section>

      <QuickAccess counts={counts} />

      <RecentLooks looks={recentLooks} />

      {/* Light closing note -- no charts, no analytics. */}
      <p className="flex items-center justify-center gap-2 pt-2 text-secondary text-ink-muted">
        Make the most of what you own.
        <HeartMarkSmall />
      </p>
    </div>
  )
}

export default Dashboard
