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

  // Clear any pending transition if the user leaves mid-request.
  const timerRef = useRef(null)
  useEffect(() => () => clearTimeout(timerRef.current), [])

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
      setRecommendation({ ...previewRecommendation, occasion })
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
    setSaved(true)
    setFeedback('Look saved to your Lookbook ♡')
  }

  const handleWearToday = () => {
    setWorn(true)
    setFeedback("Added to today's look ♡")
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
