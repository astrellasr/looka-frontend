import { useMemo, useState } from 'react'
import LookbookFilter from '../../components/outfit/LookbookFilter'
import { SORT_OPTIONS } from '../../components/outfit/lookbookOptions'
import OutfitGrid from '../../components/outfit/OutfitGrid'
import OutfitDetailModal from '../../components/outfit/OutfitDetailModal'
import ConfirmDeleteLookModal from '../../components/outfit/ConfirmDeleteLookModal'
import {
  LookbookEmpty,
  FavoritesEmpty,
  LookbookError,
  LookbookSkeleton,
} from '../../components/outfit/LookbookStates'
import lucaLookbookUrl from '../../assets/mascots/luca-lookbook.png'
import { HeartMarkSmall } from '../../components/dashboard/GreetingHeart'

// Temporary presentation values. See src/utils/previewData.js --
// replaced by GET /outfits during API integration.
import { usePreviewData } from '../../hooks/usePreviewData'

function sortLooks(looks, sort) {
  const copy = [...looks]

  if (sort === 'Oldest First') {
    return copy.sort((a, b) => a.savedAt.localeCompare(b.savedAt))
  }
  if (sort === 'Name (A–Z)') {
    return copy.sort((a, b) => a.name.localeCompare(b.name))
  }
  return copy.sort((a, b) => b.savedAt.localeCompare(a.savedAt))
}

function Lookbook() {
  const { looks, toggleLookFavorite, removeLook, setCalendarEntry } =
    usePreviewData()
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState(SORT_OPTIONS[0])
  const [status, setStatus] = useState('success') // loading | success | error
  const [openId, setOpenId] = useState(null)
  const [feedback, setFeedback] = useState('')

  // Deletion is staged here; the look stays until confirmed. The detail
  // modal hides while this is open -- two shared Modals mounted at once
  // would both lock body scroll and both answer Escape.
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const visible = useMemo(() => {
    const scoped = tab === 'favorites' ? looks.filter((l) => l.favorite) : looks
    return sortLooks(scoped, sort)
  }, [looks, tab, sort])

  const openLook = looks.find((l) => l.id === openId) ?? null

  const toggleFavorite = toggleLookFavorite

  const handleWearToday = () => {
    if (!openLook) return

    // Local only: lands on today's date in the preview calendar.
    // Becomes POST /outfits/wear-today during integration.
    const today = new Date()
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    setCalendarEntry(key, { ...openLook })
    setFeedback("Added to today's preview calendar ♡")
  }

  const handleConfirmDelete = () => {
    // Local only. Becomes DELETE /outfits/:id during integration.
    if (openId) removeLook(openId)
    setConfirmingDelete(false)
    setOpenId(null)
    setFeedback('')
  }

  const closeModal = () => {
    setOpenId(null)
    setConfirmingDelete(false)
    setFeedback('')
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2.5 text-page md:text-[2rem]">
            My Lookbook
            <HeartMarkSmall className="h-5 w-5" />
          </h1>
          <p className="mt-1 text-body text-ink-soft">
            Your saved looks, ready whenever you need them.
          </p>
        </div>

        {/* Decorative companion. The artwork already carries the
            "Same Outfits Brighter Days" sign, so the separate caption
            would only repeat it. Width only + object-contain keeps the
            proportions; the PNG is transparent, so no container. */}
        <img
          src={lucaLookbookUrl}
          alt=""
          aria-hidden="true"
          className="hidden h-auto w-[146px] shrink-0 -translate-x-2 translate-y-1 select-none object-contain sm:block lg:w-[183px] lg:-translate-x-4 lg:translate-y-2"
        />
      </header>

      <LookbookFilter
        tab={tab}
        onTabChange={setTab}
        count={looks.length}
        sort={sort}
        onSortChange={setSort}
      />

      {status === 'loading' && <LookbookSkeleton />}
      {status === 'error' && (
        <LookbookError onRetry={() => setStatus('success')} />
      )}

      {status === 'success' && (
        <>
          {visible.length === 0 ? (
            tab === 'favorites' ? (
              <FavoritesEmpty onViewAll={() => setTab('all')} />
            ) : (
              <LookbookEmpty />
            )
          ) : (
            <OutfitGrid
              looks={visible}
              onOpen={(look) => {
                setOpenId(look.id)
                setFeedback('')
              }}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </>
      )}

      {openLook && !confirmingDelete && (
        <OutfitDetailModal
          look={openLook}
          onClose={closeModal}
          onToggleFavorite={toggleFavorite}
          onWearToday={handleWearToday}
          onDelete={() => setConfirmingDelete(true)}
          feedback={feedback}
        />
      )}

      {confirmingDelete && openLook && (
        <ConfirmDeleteLookModal
          lookName={openLook.name}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

export default Lookbook
