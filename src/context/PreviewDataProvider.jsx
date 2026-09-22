import { useCallback, useMemo, useState } from 'react'
import { PreviewDataContext } from './PreviewDataContext'
import {
  previewClothes,
  previewLooks,
  previewCalendar,
} from '../utils/previewData'

/**
 * TEMPORARY: in-memory store for preview mode.
 *
 * Without this, adding a clothing item "succeeds" and then vanishes the
 * moment you navigate back to the wardrobe, because every page seeded
 * its own copy of the preview arrays. Holding them here lets the
 * frontend behave like a real product while the backend is off.
 *
 * Nothing is persisted: a refresh restores the seed data, which is the
 * honest behaviour for preview mode and keeps this easy to delete when
 * the real API lands.
 */
function PreviewDataProvider({ children }) {
  const [clothes, setClothes] = useState(previewClothes)
  const [looks, setLooks] = useState(previewLooks)
  const [calendar, setCalendar] = useState(previewCalendar)

  /* ---------------------------------------------------------------- */
  /* Clothes                                                           */
  /* ---------------------------------------------------------------- */

  const addClothing = useCallback((item) => {
    const created = { ...item, id: `preview-${Date.now()}` }
    setClothes((current) => [created, ...current])
    return created
  }, [])

  const updateClothing = useCallback((id, changes) => {
    setClothes((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    )
  }, [])

  const removeClothing = useCallback((id) => {
    setClothes((current) => current.filter((item) => item.id !== id))
  }, [])

  const toggleClothingFavorite = useCallback((id) => {
    setClothes((current) =>
      current.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item,
      ),
    )
  }, [])

  const findClothing = useCallback(
    (id) => clothes.find((item) => item.id === id) ?? null,
    [clothes],
  )

  /* ---------------------------------------------------------------- */
  /* Saved looks                                                       */
  /* ---------------------------------------------------------------- */

  const toggleLookFavorite = useCallback((id) => {
    setLooks((current) =>
      current.map((look) =>
        look.id === id ? { ...look, favorite: !look.favorite } : look,
      ),
    )
  }, [])

  const removeLook = useCallback((id) => {
    setLooks((current) => current.filter((look) => look.id !== id))
  }, [])

  const saveLook = useCallback((look) => {
    const created = {
      ...look,
      id: `preview-look-${Date.now()}`,
      savedAt: new Date().toISOString().slice(0, 10),
      favorite: false,
    }
    setLooks((current) => [created, ...current])
    return created
  }, [])

  /* ---------------------------------------------------------------- */
  /* Calendar                                                          */
  /* ---------------------------------------------------------------- */

  /** Places an outfit on a date key ("YYYY-MM-DD"). */
  const setCalendarEntry = useCallback((dateKey, outfit) => {
    setCalendar((current) => ({ ...current, [dateKey]: outfit }))
  }, [])

  const removeCalendarEntry = useCallback((dateKey) => {
    setCalendar((current) => {
      const next = { ...current }
      delete next[dateKey]
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      clothes,
      addClothing,
      updateClothing,
      removeClothing,
      toggleClothingFavorite,
      findClothing,

      looks,
      toggleLookFavorite,
      removeLook,
      saveLook,

      calendar,
      setCalendarEntry,
      removeCalendarEntry,
    }),
    [
      clothes,
      addClothing,
      updateClothing,
      removeClothing,
      toggleClothingFavorite,
      findClothing,
      looks,
      toggleLookFavorite,
      removeLook,
      saveLook,
      calendar,
      setCalendarEntry,
      removeCalendarEntry,
    ],
  )

  return (
    <PreviewDataContext.Provider value={value}>
      {children}
    </PreviewDataContext.Provider>
  )
}

export default PreviewDataProvider
