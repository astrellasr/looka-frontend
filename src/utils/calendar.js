/**
 * Month-grid helpers. Pure date maths, no UI and no locale surprises:
 * every cell is keyed by a local "YYYY-MM-DD" string so it can be
 * matched against API records directly.
 */

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Local ISO key, avoiding the UTC shift of toISOString(). */
export function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayKey() {
  return toKey(new Date())
}

/**
 * Six weeks of cells covering `month`, padded with the adjacent months
 * so the grid never changes height between months.
 */
export function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())

  const cells = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    return {
      key: toKey(date),
      date,
      day: date.getDate(),
      inMonth: date.getMonth() === month,
    }
  })

  // Drop a trailing week that belongs entirely to the next month.
  const lastWeek = cells.slice(35)
  return lastWeek.every((c) => !c.inMonth) ? cells.slice(0, 35) : cells
}

export function monthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

/** "Wed, Sep 9, 2026" */
export function formatDayLabel(key) {
  if (!key) return ''
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function addMonths(year, month, delta) {
  const next = new Date(year, month + delta, 1)
  return { year: next.getFullYear(), month: next.getMonth() }
}
