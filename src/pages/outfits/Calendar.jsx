import { useState } from 'react'
import CalendarHeader from '../../components/calendar/CalendarHeader'
import CalendarGrid from '../../components/calendar/CalendarGrid'
import CalendarDayDetail, {
  CalendarEmptyState,
} from '../../components/calendar/CalendarDayDetail'
import CalendarOutfitModal from '../../components/calendar/CalendarOutfitModal'
import lucaCalendarUrl from '../../assets/mascots/luca-calendar.png'
import { CalendarIcon } from '../../components/common/Icons'
import { addMonths, todayKey } from '../../utils/calendar'

// Temporary presentation values. See src/utils/previewData.js --
// replaced by GET /outfits/calendar during API integration.
import { usePreviewData } from '../../hooks/usePreviewData'

// Open on the current month and today's date, rather than a fixed one.
// The seeded preview entries live in Sept 2026, so they are reachable by
// navigating there -- the calendar itself is no longer pinned.
function currentMonth() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() }
}

function Calendar() {
  const { calendar: entries, removeCalendarEntry } = usePreviewData()
  const [view, setView] = useState(currentMonth)
  const [selected, setSelected] = useState(todayKey)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [feedback, setFeedback] = useState('')

  const selectedOutfit = entries[selected] ?? null
  const hasAnyEntries = Object.keys(entries).length > 0

  const goToday = () => {
    const now = new Date()
    setView({ year: now.getFullYear(), month: now.getMonth() })
    setSelected(todayKey())
  }

  const closeModal = () => {
    setModalOpen(false)
    setConfirmingDelete(false)
    setFeedback('')
  }

  const handleDelete = () => {
    // Local only. Becomes DELETE /outfits/calendar/:id during integration.
    removeCalendarEntry(selected)
    closeModal()
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2.5 text-page md:text-[2rem]">
            My Calendar
            <CalendarIcon className="h-6 w-6 text-primary" aria-hidden="true" />
          </h1>
          <p className="mt-1 text-body text-ink-soft">Your style, day by day.</p>
        </div>

        {/* Decorative companion. The artwork already carries the
            "Small Outfits Brighter Days" sign, so the separate caption
            would only repeat it. Width only + object-contain keeps the
            proportions; the PNG is transparent, so no container. */}
        <img
          src={lucaCalendarUrl}
          alt=""
          aria-hidden="true"
          className="hidden h-auto w-[155px] shrink-0 translate-y-1 select-none object-contain sm:block lg:w-[195px] lg:translate-y-2"
        />
      </header>

      {hasAnyEntries ? (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
          <section className="rounded-card border border-line bg-surface p-4 shadow-card sm:p-6">
            <CalendarHeader
              year={view.year}
              month={view.month}
              onPrev={() => setView(addMonths(view.year, view.month, -1))}
              onNext={() => setView(addMonths(view.year, view.month, 1))}
              onToday={goToday}
            />

            <CalendarGrid
              year={view.year}
              month={view.month}
              outfits={entries}
              selected={selected}
              onSelect={setSelected}
            />
          </section>

          <CalendarDayDetail
            dateKey={selected}
            outfit={selectedOutfit}
            onViewDetails={() => {
              setFeedback('')
              setModalOpen(true)
            }}
          />
        </div>
      ) : (
        <CalendarEmptyState />
      )}

      {modalOpen && selectedOutfit && (
        <CalendarOutfitModal
          dateKey={selected}
          outfit={selectedOutfit}
          onClose={closeModal}
          onWearThisLook={() =>
            setFeedback('Kept on this date in your preview calendar ♡')
          }
          onRequestDelete={() => setConfirmingDelete(true)}
          onCancelDelete={() => setConfirmingDelete(false)}
          onDelete={handleDelete}
          confirmingDelete={confirmingDelete}
          feedback={feedback}
        />
      )}
    </div>
  )
}

export default Calendar
