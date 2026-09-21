import {
  HomeIcon,
  HangerIcon,
  SparkleIcon,
  HeartIcon,
  CalendarIcon,
  UserIcon,
} from '../common/Icons'

/** Primary navigation, shared by the sidebar and the mobile bottom bar. */
export const mainNav = [
  { to: '/dashboard', label: 'Home', icon: HomeIcon },
  { to: '/wardrobe', label: 'Wardrobe', icon: HangerIcon },
  { to: '/recommendation', label: 'Recommendation', icon: SparkleIcon },
  { to: '/lookbook', label: 'Lookbook', icon: HeartIcon },
  { to: '/calendar', label: 'Calendar', icon: CalendarIcon },
]

/** Sits below the sidebar divider. */
export const secondaryNav = [
  { to: '/profile', label: 'Profile', icon: UserIcon },
]
