import CalendarDay from './CalendarDay'
import { WEEKDAYS, buildMonthGrid, todayKey } from '../../utils/calendar'

function CalendarGrid({ year, month, outfits = {}, selected, onSelect }) {
  const cells = buildMonthGrid(year, month)
  const today = todayKey()

  return (
    <div className="mt-6">
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="pb-2 text-center text-caption text-ink-muted sm:text-secondary"
          >
            <span className="sm:hidden">{day.slice(0, 1)}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}

        {cells.map((cell) => (
          <CalendarDay
            key={cell.key}
            cell={cell}
            outfit={outfits[cell.key]}
            selected={cell.key === selected}
            isToday={cell.key === today}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default CalendarGrid
