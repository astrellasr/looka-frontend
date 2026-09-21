import { Link } from 'react-router-dom'
import ClothingCard from './ClothingCard'

/**
 * The wardrobe grid, with its empty state.
 *
 * `items` is whatever the caller has -- preview data today, GET /clothes
 * later. `emptyVariant` distinguishes a genuinely empty wardrobe from a
 * search that matched nothing, since the two need different wording.
 */
function ClothingGrid({ items = [], onToggleFavorite, emptyVariant = 'wardrobe' }) {
  if (items.length === 0) {
    const isSearch = emptyVariant === 'search'

    return (
      <div className="rounded-card border border-line bg-surface px-6 py-14 text-center shadow-card">
        <p className="text-section">
          {isSearch
            ? 'Nothing matches that just yet.'
            : 'Your wardrobe is waiting for its first piece.'}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-body text-ink-soft">
          {isSearch
            ? 'Try another search, or a different category.'
            : 'Add the clothes you already own and LOOKA will help you style them.'}
        </p>

        {!isSearch && (
          <Link
            to="/wardrobe/add"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-control bg-primary px-5 text-body font-medium text-white transition-colors duration-150 hover:bg-primary-strong"
          >
            Add Clothing
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ClothingCard
          key={item.id}
          item={item}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default ClothingGrid
