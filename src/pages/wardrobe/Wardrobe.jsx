import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import WardrobeToolbar from '../../components/wardrobe/WardrobeToolbar'
import WardrobeFilter from '../../components/wardrobe/WardrobeFilter'
import WardrobeAdvancedFilters from '../../components/wardrobe/WardrobeAdvancedFilters'
import ClothingGrid from '../../components/wardrobe/ClothingGrid'
import ConfirmRemoveItemModal from '../../components/wardrobe/ConfirmRemoveItemModal'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'
import { usePreviewData } from '../../hooks/usePreviewData'

// Category list is local UI config; the items come from the shared
// preview store so additions and edits survive navigation.
import { wardrobeCategories } from '../../utils/previewData'

const EMPTY_FILTERS = { style: '', color: '', occasion: '', weather: '' }

function Wardrobe() {
  const { clothes, toggleClothingFavorite, removeClothing } = usePreviewData()
  const navigate = useNavigate()

  // Seeded from ?q= so the top bar search lands here with a term.
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [category, setCategory] = useState('All')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [showFilters, setShowFilters] = useState(false)

  // Removal is staged here; nothing leaves the store until confirmed.
  const [pendingRemovalId, setPendingRemovalId] = useState(null)

  // Local filtering only. This moves server-side with GET /clothes.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()

    return clothes.filter((item) => {
      if (category !== 'All' && item.category !== category) return false
      if (filters.style && item.style !== filters.style) return false
      if (filters.color && item.color !== filters.color) return false
      if (filters.occasion && item.occasion !== filters.occasion) return false
      if (filters.weather && item.weather !== filters.weather) return false

      if (q === '') return true

      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.style ?? '').toLowerCase().includes(q) ||
        (item.color ?? '').toLowerCase().includes(q)
      )
    })
  }, [clothes, query, category, filters])

  const pendingRemoval =
    clothes.find((item) => item.id === pendingRemovalId) ?? null

  const handleConfirmRemove = () => {
    if (pendingRemovalId) removeClothing(pendingRemovalId)
    setPendingRemovalId(null)
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length
  const isFiltered =
    query.trim() !== '' || category !== 'All' || activeFilterCount > 0

  return (
    <div className="space-y-8">
      <header>
        <h1 className="flex items-center gap-2 text-page md:text-[2rem]">
          My Wardrobe
          <HeartMarkSmall />
        </h1>
        <p className="mt-1 text-body text-ink-soft">
          Your collection, your story.
        </p>
      </header>

      <div className="space-y-4">
        <WardrobeToolbar
          query={query}
          onQueryChange={setQuery}
          filtersOpen={showFilters}
          onToggleFilters={() => setShowFilters((open) => !open)}
          activeFilterCount={activeFilterCount}
        />

        {showFilters && (
          <WardrobeAdvancedFilters
            filters={filters}
            onChange={(key, value) =>
              setFilters((current) => ({ ...current, [key]: value }))
            }
            onClear={() => setFilters(EMPTY_FILTERS)}
            activeCount={activeFilterCount}
          />
        )}

        <WardrobeFilter
          categories={wardrobeCategories}
          active={category}
          onChange={setCategory}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-secondary text-ink-soft">
          {visible.length} {visible.length === 1 ? 'item' : 'items'}
          {isFiltered && ` of ${clothes.length}`}
        </p>

        {isFiltered && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('All')
              setFilters(EMPTY_FILTERS)
            }}
            className="text-secondary text-primary-strong transition-colors duration-150 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <ClothingGrid
        items={visible}
        onToggleFavorite={toggleClothingFavorite}
        onEdit={(id) => navigate(`/wardrobe/${id}/edit`)}
        onDelete={setPendingRemovalId}
        emptyVariant={isFiltered ? 'search' : 'wardrobe'}
      />

      {pendingRemoval && (
        <ConfirmRemoveItemModal
          itemName={pendingRemoval.name}
          onCancel={() => setPendingRemovalId(null)}
          onConfirm={handleConfirmRemove}
        />
      )}
    </div>
  )
}

export default Wardrobe
