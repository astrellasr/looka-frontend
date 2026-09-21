import Brand from '../common/Brand'
import Input from '../common/Input'
import { BellIcon, SearchIcon } from '../common/Icons'

function IconButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-control text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
    >
      {children}
    </button>
  )
}

function Avatar() {
  return (
    <button
      type="button"
      aria-label="Account"
      className="h-9 w-9 shrink-0 rounded-full bg-surface-soft ring-1 ring-line transition-shadow duration-150 hover:ring-primary/50"
    />
  )
}

/**
 * One bar, two arrangements: a compact search + actions on desktop,
 * wordmark + actions on mobile.
 */
function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <div className="lg:hidden">
          <Brand variant="wordmark" className="h-6 w-auto" />
        </div>

        <div className="hidden lg:block lg:w-full lg:max-w-xs">
          <Input
            type="search"
            placeholder="Search something..."
            aria-label="Search"
            icon={<SearchIcon className="h-4 w-4" />}
            className="h-10 bg-surface"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton label="Notifications">
            <BellIcon className="h-5 w-5" />
          </IconButton>
          <Avatar />
        </div>
      </div>
    </header>
  )
}

export default TopBar
