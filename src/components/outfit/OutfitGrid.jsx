import OutfitCard from './OutfitCard'

/** Responsive grid of saved looks: 2 on mobile, up to 4 on wide desktop. */
function OutfitGrid({ looks = [], onOpen, onToggleFavorite }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:gap-5">
      {looks.map((look) => (
        <OutfitCard
          key={look.id}
          look={look}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default OutfitGrid
