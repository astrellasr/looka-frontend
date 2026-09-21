import { useMemo, useState } from 'react'
import WardrobeToolbar from '../../components/wardrobe/WardrobeToolbar'
import WardrobeFilter from '../../components/wardrobe/WardrobeFilter'
import ClothingGrid from '../../components/wardrobe/ClothingGrid'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'

// Temporary presentation values. See src/utils/previewData.js --
// replaced by GET /clothes during API integration.
import { previewClothes, wardrobeCategories } from '../../utils/previewData'

function Wardrobe() {
  const [items, setItems] = useState(previewClothes)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  // Local filtering only. This moves server-side with GET /clothes.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesQuery =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.style ?? '').toLowerCase().includes(q)

      return matchesCategory && matchesQuery
    })
  }, [items, query, category])

  const toggleFavorite = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    )
  }

  const isFiltered = query.trim() !== '' || category !== 'All'

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
        <WardrobeToolbar query={query} onQueryChange={setQuery} />
        <WardrobeFilter
          categories={wardrobeCategories}
          active={category}
          onChange={setCategory}
        />
      </div>

      <ClothingGrid
        items={visible}
        onToggleFavorite={toggleFavorite}
        emptyVariant={isFiltered ? 'search' : 'wardrobe'}
      />
    </div>
  )
}

export default Wardrobe
