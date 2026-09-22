/** Formats an ISO date as "Sep 21, 2026". */
export function formatLookDate(iso) {
  if (!iso) return ''

  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
