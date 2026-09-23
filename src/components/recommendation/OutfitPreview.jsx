import { Fragment } from 'react'
import OutfitItem from './OutfitItem'

/**
 * The outfit as a cohesive look: pieces joined by soft plus marks
 * rather than laid out as an independent product grid.
 *
 * Stacks vertically on phones, sits in a row from sm up.
 */
function OutfitPreview({ items = [], lockedItemId, onToggleLock }) {
  return (
    <div className="stagger flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:gap-3">
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <div className="min-w-0 sm:flex-1">
            <OutfitItem
              item={item}
              locked={lockedItemId === item.id}
              onToggleLock={onToggleLock}
            />
          </div>

          {index < items.length - 1 && (
            <span
              aria-hidden="true"
              className="self-center text-body text-primary sm:pt-20"
            >
              +
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default OutfitPreview
