/**
 * Category pills. Local presentation state for now; later these map to
 * GET /clothes?category=...
 *
 * Scrolls horizontally on narrow screens rather than wrapping, so the
 * row stays one line without causing page overflow.
 */
function WardrobeFilter({ categories, active, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const isActive = category === active

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-control border px-4 py-2 text-secondary transition-colors duration-150 ${
              isActive
                ? 'border-primary/40 bg-blush/45 font-medium text-ink'
                : 'border-line bg-surface text-ink-soft hover:bg-surface-soft/70 hover:text-ink'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default WardrobeFilter
