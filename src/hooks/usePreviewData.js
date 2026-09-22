import { useContext } from 'react'
import { PreviewDataContext } from '../context/PreviewDataContext'

/** Reads the shared preview store. Throws outside PreviewDataProvider. */
export function usePreviewData() {
  const context = useContext(PreviewDataContext)

  if (!context) {
    throw new Error('usePreviewData must be used within PreviewDataProvider')
  }

  return context
}

export default usePreviewData
