import { ChevronIcon } from '../common/Icons'
import { monthLabel } from '../../utils/calendar'

/** Month navigation. Quiet round icon buttons, never filled blocks. */
function CalendarHeader({ year, month, onPrev, onNext, onToday }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
        >
          <ChevronIcon direction="left" className="h-4 w-4" />
        </button>

        <h2 className="min-w-[10rem] text-center text-section sm:min-w-[11rem]">
          {monthLabel(year, month)}
        </h2>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink"
        >
          <ChevronIcon direction="right" className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={onToday}
        className="rounded-control border border-line bg-surface px-4 py-2 text-secondary font-medium text-ink transition-colors duration-150 hover:bg-surface-soft"
      >
        Today
      </button>
    </div>
  )
}

export default CalendarHeader
