import clothingPlaceholder from '../../assets/placeholders/clothing-item.svg'

/**
 * Flat-lay outfit composition.
 *
 * Real garment photos do not exist yet, so each slot renders the neutral
 * placeholder illustration arranged in an editorial flat lay -- top and
 * bottom leading, footwear and accessory smaller beneath. The tint comes
 * from the look's accent so cards read as distinct without being colourful.
 *
 * During API integration each slot takes `item.imageUrl`; the layout
 * itself does not change.
 */

const TINTS = {
  sand: 'from-surface-soft/80 to-peach/20',
  blush: 'from-blush/25 to-surface-soft/70',
  lavender: 'from-lavender/25 to-surface-soft/70',
  powder: 'from-powder/25 to-surface-soft/70',
  sage: 'from-sage/25 to-surface-soft/70',
  peach: 'from-peach/25 to-surface-soft/70',
}

function Piece({ item, className }) {
  return (
    <img
      src={item?.imageUrl ?? clothingPlaceholder}
      alt=""
      aria-hidden="true"
      className={`object-contain drop-shadow-[0_2px_6px_rgba(61,57,59,0.06)] ${className}`}
    />
  )
}

function OutfitComposition({ look, className = '' }) {
  const [top, bottom, third, fourth] = look.items ?? []

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${
        TINTS[look.accent] ?? TINTS.sand
      } ${className}`}
    >
      <div className="absolute inset-0 p-[8%]">
        {/* Top-left and top-right carry the two leading pieces. */}
        <Piece item={top} className="absolute left-[4%] top-[6%] h-[52%] w-[44%]" />
        <Piece item={bottom} className="absolute right-[4%] top-[10%] h-[62%] w-[42%]" />

        {third && (
          <Piece
            item={third}
            className="absolute bottom-[4%] left-[8%] h-[32%] w-[36%]"
          />
        )}
        {fourth && (
          <Piece
            item={fourth}
            className="absolute bottom-[6%] right-[10%] h-[28%] w-[30%]"
          />
        )}
      </div>
    </div>
  )
}

export default OutfitComposition
