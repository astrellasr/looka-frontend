import QuickAccessCard from './QuickAccessCard'
import {
  HangerIcon,
  SparkleIcon,
  HeartIcon,
  CalendarIcon,
} from '../common/Icons'

/**
 * The four primary shortcuts. `counts` is optional -- each card renders
 * without its metric line if the number is not available yet.
 */
function QuickAccess({ counts = {} }) {
  const items = [
    {
      to: '/wardrobe',
      icon: HangerIcon,
      title: 'My Wardrobe',
      meta:
        counts.wardrobeItems != null
          ? `${counts.wardrobeItems} items`
          : null,
      accent: 'blush',
    },
    {
      to: '/recommendation',
      icon: SparkleIcon,
      title: 'Get a Recommendation',
      meta: 'Find your next look',
      accent: 'lavender',
    },
    {
      to: '/lookbook',
      icon: HeartIcon,
      title: 'My Lookbook',
      meta: counts.savedLooks != null ? `${counts.savedLooks} saved looks` : null,
      accent: 'powder',
    },
    {
      to: '/calendar',
      icon: CalendarIcon,
      title: 'Calendar',
      meta: 'See your history',
      accent: 'sage',
    },
  ]

  return (
    <section aria-labelledby="quick-access-heading">
      <h2 id="quick-access-heading" className="sr-only">
        Quick access
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <QuickAccessCard key={item.to} {...item} />
        ))}
      </div>
    </section>
  )
}

export default QuickAccess
