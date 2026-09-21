import { Link } from 'react-router-dom'
import Input from '../common/Input'
import Button from '../common/Button'
import { SearchIcon, FilterIcon, PlusIcon } from '../common/Icons'

/**
 * Search + filter + add. Wraps naturally at narrow widths; the search
 * field takes the full row to itself on mobile.
 *
 * "Add Clothing" is a Link, not a Button, because it navigates -- it
 * carries the primary button styling so it still reads as the main action.
 */
function WardrobeToolbar({ query, onQueryChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1 basis-full sm:basis-64">
        <Input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search clothes..."
          aria-label="Search clothes"
          icon={<SearchIcon className="h-4 w-4" />}
        />
      </div>

      {/* Advanced filtering arrives with GET /clothes/meta/filters. */}
      <Button variant="outline" disabled title="More filters coming soon">
        <FilterIcon className="h-4 w-4" aria-hidden="true" />
        Filter
      </Button>

      <Link
        to="/wardrobe/add"
        className="ml-auto inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong sm:ml-0"
      >
        <PlusIcon className="h-4 w-4" aria-hidden="true" />
        Add Clothing
      </Link>
    </div>
  )
}

export default WardrobeToolbar
