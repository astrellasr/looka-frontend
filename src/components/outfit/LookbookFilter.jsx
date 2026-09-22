import Select from '../common/Select'
import { HeartIcon, GridIcon } from '../common/Icons'
import { SORT_OPTIONS } from './lookbookOptions'

/**
 * Tabs + count + sort. Lookbook is a collection, so this stays
 * deliberately light -- no wardrobe-style filtering.
 */
function LookbookFilter({ tab, onTabChange, count, sort, onSortChange }) {
  const tabs = [
    { id: 'all', label: 'All Looks', icon: GridIcon },
    { id: 'favorites', label: 'Favorites', icon: HeartIcon },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div
        role="tablist"
        aria-label="Lookbook view"
        className="flex gap-2 rounded-control border border-line bg-surface p-1"
      >
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = tab === id

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(id)}
              className={`inline-flex items-center gap-2 rounded-[0.5rem] px-4 py-2 text-secondary transition-colors duration-150 ${
                active
                  ? 'bg-blush/45 font-medium text-ink'
                  : 'text-ink-soft hover:bg-surface-soft/70 hover:text-ink'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <p className="shrink-0 text-secondary text-ink-soft">
          {count} saved {count === 1 ? 'look' : 'looks'}
        </p>

        <div className="w-40 shrink-0">
          <label htmlFor="lookbook-sort" className="sr-only">
            Sort looks
          </label>
          <Select
            id="lookbook-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            options={SORT_OPTIONS}
            className="h-10"
          />
        </div>
      </div>
    </div>
  )
}

export default LookbookFilter
