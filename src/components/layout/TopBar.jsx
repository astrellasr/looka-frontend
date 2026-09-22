import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Brand from '../common/Brand'
import Input from '../common/Input'
import { SearchIcon, UserIcon } from '../common/Icons'
import NotificationBell from './NotificationBell'
import { useAuth } from '../../hooks/useAuth'

/** Shows the shared session avatar, so it tracks the Profile photo. */
function Avatar({ onClick, photoUrl }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Account"
      title="Account"
      className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-soft ring-1 ring-line transition-shadow duration-150 hover:ring-primary/50 active:scale-95"
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <UserIcon className="h-4 w-4 text-ink-muted" aria-hidden="true" />
      )}
    </button>
  )
}

/**
 * One bar, two arrangements: a compact search + actions on desktop,
 * wordmark + actions on mobile.
 *
 * Search sends the query to the wardrobe, which is the only searchable
 * collection today. The bell opens its own popover; the avatar shows the
 * shared session photo and links to the profile.
 */
function TopBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { avatarUrl } = useAuth()

  const handleSearch = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/wardrobe?q=${encodeURIComponent(term)}` : '/wardrobe')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <div className="lg:hidden">
          <Brand variant="wordmark" className="h-6 w-auto" />
        </div>

        <form
          onSubmit={handleSearch}
          role="search"
          className="hidden lg:block lg:w-full lg:max-w-xs"
        >
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your wardrobe..."
            aria-label="Search your wardrobe"
            icon={<SearchIcon className="h-4 w-4" />}
            className="h-10 bg-surface"
          />
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          <NotificationBell />
          <Avatar
            photoUrl={avatarUrl}
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>
    </header>
  )
}

export default TopBar
