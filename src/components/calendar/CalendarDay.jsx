import OutfitComposition from '../outfit/OutfitComposition'

/**
 * One day cell. Shows the outfit as a small flat-lay when there is one,
 * so the grid reads as a wardrobe calendar rather than an event list.
 */
function CalendarDay({ cell, outfit, selected, isToday, onSelect }) {
  const { day, inMonth, key } = cell

  return (
    <button
      type="button"
      onClick={() => onSelect(key)}
      aria-pressed={selected}
      aria-label={`${day}${outfit ? `, ${outfit.name}` : ', no outfit'}`}
      className={`relative flex aspect-square w-full flex-col items-stretch rounded-[0.6rem] p-1 text-left transition-colors duration-150 sm:aspect-[4/3.4] sm:p-1.5 ${
        selected
          ? 'bg-blush/40'
          : inMonth
            ? 'hover:bg-surface-soft/60'
            : 'opacity-40'
      }`}
    >
      <span className="flex items-center justify-between gap-1">
        <span
          className={`text-caption sm:text-secondary ${
            isToday && !selected
              ? 'flex h-5 w-5 items-center justify-center rounded-full bg-primary/25 font-medium text-ink sm:h-6 sm:w-6'
              : selected
                ? 'font-medium text-ink'
                : 'text-ink-soft'
          }`}
        >
          {day}
        </span>

        {outfit && (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
          />
        )}
      </span>

      {outfit && (
        <span className="mt-0.5 min-h-0 flex-1 overflow-hidden rounded-[0.4rem]">
          <OutfitComposition look={outfit} className="h-full w-full" />
        </span>
      )}
    </button>
  )
}

export default CalendarDay
