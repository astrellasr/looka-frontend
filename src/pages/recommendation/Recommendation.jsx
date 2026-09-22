import { useEffect, useRef, useState } from 'react'
import RecommendationForm from '../../components/recommendation/RecommendationForm'
import LucaPromoPanel from '../../components/recommendation/LucaPromoPanel'
import RecommendationResult from '../../components/recommendation/RecommendationResult'
import {
  RecommendationIdle,
  RecommendationLoading,
  RecommendationError,
  RecommendationIncomplete,
} from '../../components/recommendation/RecommendationStates'
import { SparkleIcon } from '../../components/common/Icons'

// Temporary presentation values. See src/utils/previewData.js --
// replaced by POST /recommendations during API integration.
import { previewRecommendation } from '../../utils/previewData'
import { usePreviewData } from '../../hooks/usePreviewData'

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  incomplete: 'incomplete',
  error: 'error',
}

function Recommendation() {
  const [occasion, setOccasion] = useState('')
  const [status, setStatus] = useState(STATUS.idle)
  const [recommendation, setRecommendation] = useState(null)
  const [lockedItemId, setLockedItemId] = useState(null)
  const [saved, setSaved] = useState(false)
  const [worn, setWorn] = useState(false)
  const [feedback, setFeedback] = useState('')

  const { clothes, saveLook, setCalendarEntry } = usePreviewData()

  // Clear any pending transition if the user leaves mid-request.
  const timerRef = useRef(null)
  useEffect(() => () => clearTimeout(timerRef.current), [])

  /**
   * Picks one item per slot from the preview wardrobe.
   *
   * This is presentation shuffling, not a recommendation algorithm --
   * the backend owns scoring and combination logic. It exists so the
   * Shuffle button visibly does something in preview mode, and so a
   * locked item demonstrably stays put.
   */
  const buildPreviewOutfit = (lockedId) => {
    const slots = [
      { slot: 'Top', categories: ['Tops'] },
      { slot: 'Bottom', categories: ['Bottoms'] },
      { slot: 'Footwear', categories: ['Footwear'] },
    ]

    const base = previewRecommendation.items

    return slots.map((entry, index) => {
      const fallback = base[index]

      // A locked item keeps its slot untouched.
      if (lockedId && fallback && lockedId === fallback.id) return fallback

      const pool = clothes.filter((item) =>
        entry.categories.includes(item.category),
      )
      if (pool.length === 0) return fallback

      const picked = pool[Math.floor(Math.random() * pool.length)]
      return {
        id: picked.id,
        slot: entry.slot,
        name: picked.name,
        accent: picked.accent,
      }
    })
  }

  /**
   * Stands in for the request. During integration this becomes:
   *
   *   api.post('/recommendations', { occasion, lockedItemId })
   *
   * with the response driving setRecommendation / setStatus, and the
   * backend deciding score, weather, combination and stylist note.
   */
  const requestLook = () => {
    if (!occasion) return

    setStatus(STATUS.loading)
    setFeedback('')
    setSaved(false)
    setWorn(false)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      // Not enough pieces to dress a full look -> the incomplete state,
      // which previously could never be reached.
      const hasEnough = ['Tops', 'Bottoms', 'Footwear'].every((category) =>
        clothes.some((item) => item.category === category),
      )

      if (!hasEnough) {
        setStatus(STATUS.incomplete)
        return
      }

      setRecommendation({
        ...previewRecommendation,
        occasion,
        items: buildPreviewOutfit(lockedItemId),
        score: 80 + Math.floor(Math.random() * 16),
      })
      setStatus(STATUS.success)
    }, 900)
  }

  const handleShuffle = () => {
    // The backend returns the next combination; the locked item is sent
    // along so it is preserved.
    requestLook()
  }

  const handleToggleLock = (id) => {
    setLockedItemId((current) => (current === id ? null : id))
  }

  const handleSave = () => {
    if (!recommendation) return

    // Local only: joins the preview Lookbook. Becomes POST /outfits.
    saveLook({
      name: `${recommendation.occasion} Look`,
      occasion: recommendation.occasion,
      style: recommendation.items[0]?.slot ? 'Casual' : 'Casual',
      items: recommendation.items.map((item) => ({
        id: item.id,
        name: item.name,
      })),
      note: recommendation.stylistNote,
      accent: recommendation.items[0]?.accent ?? 'sand',
    })

    setSaved(true)
    setFeedback('Saved to your preview Lookbook ♡')
  }

  const handleWearToday = () => {
    if (!recommendation) return

    // Local only: lands on today's date. Becomes POST /outfits/wear-today.
    const today = new Date()
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    setCalendarEntry(key, {
      id: `preview-wear-${Date.now()}`,
      name: `${recommendation.occasion} Look`,
      occasion: recommendation.occasion,
      style: 'Casual',
      accent: recommendation.items[0]?.accent ?? 'sand',
      note: recommendation.stylistNote,
      items: recommendation.items.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    })

    setWorn(true)
    setFeedback("Added to today's preview calendar ♡")
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2.5 text-page md:text-[2rem]">
          Recommendation
          <SparkleIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </h1>
        <p className="mt-1 text-body text-ink-soft">
          Find a look from what you already own.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <RecommendationForm
          occasion={occasion}
          onOccasionChange={(value) => {
            setOccasion(value)
            setFeedback('')
          }}
          weather={previewRecommendation.weather}
          onSubmit={requestLook}
          busy={status === STATUS.loading}
        />

        <LucaPromoPanel />
      </div>

      {status === STATUS.idle && <RecommendationIdle />}
      {status === STATUS.loading && <RecommendationLoading />}
      {status === STATUS.incomplete && <RecommendationIncomplete />}
      {status === STATUS.error && (
        <RecommendationError onRetry={requestLook} />
      )}

      {status === STATUS.success && recommendation && (
        <RecommendationResult
          recommendation={recommendation}
          lockedItemId={lockedItemId}
          onToggleLock={handleToggleLock}
          onShuffle={handleShuffle}
          onSave={handleSave}
          onWearToday={handleWearToday}
          saved={saved}
          worn={worn}
          busy={status === STATUS.loading}
          feedback={feedback}
        />
      )}
    </div>
  )
}

export default Recommendation
