import { useEffect, useRef, useState } from 'react'

/**
 * Shared state for the Add and Edit clothing forms: field values,
 * validation, and a browser-local photo preview.
 *
 * Nothing here touches the network. During API integration the caller
 * sends `values` plus `photo.file` to POST /clothes or PUT /clothes/:id.
 */

export const MAX_FILE_BYTES = 5 * 1024 * 1024

export const EMPTY_VALUES = {
  name: '',
  category: '',
  color: '',
  style: '',
  occasion: '',
  weather: '',
}

const REQUIRED_MESSAGES = {
  name: 'Please enter a clothing name.',
  category: 'Please select a category.',
  color: 'Please select a color.',
  style: 'Please select a style.',
  occasion: 'Please select an occasion.',
  weather: 'Please select a weather type.',
}

export function useClothingForm({ initialValues = EMPTY_VALUES, initialPhoto = null } = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [photo, setPhoto] = useState(initialPhoto) // { file?, url }
  const [confirmed, setConfirmed] = useState(false)

  // Track the current photo so unmount can revoke an object URL we made.
  // Assigned in an effect, never during render.
  const photoRef = useRef(photo)
  useEffect(() => {
    photoRef.current = photo
  }, [photo])
  useEffect(
    () => () => {
      if (photoRef.current?.objectUrl) {
        URL.revokeObjectURL(photoRef.current.objectUrl)
      }
    },
    [],
  )

  const handleChange = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setConfirmed(false)
  }

  const releasePhoto = (current) => {
    if (current?.objectUrl) URL.revokeObjectURL(current.objectUrl)
  }

  const selectPhoto = (file) => {
    if (file.size > MAX_FILE_BYTES) {
      setErrors((current) => ({
        ...current,
        photo: 'That photo is larger than 5MB. Please choose a smaller one.',
      }))
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPhoto((current) => {
      releasePhoto(current)
      return { file, url: objectUrl, objectUrl }
    })
    setErrors((current) => ({ ...current, photo: undefined }))
    setConfirmed(false)
  }

  const removePhoto = () => {
    setPhoto((current) => {
      releasePhoto(current)
      return null
    })
    setConfirmed(false)
  }

  /** Returns true when the form is valid. */
  const validate = () => {
    const nextErrors = {}
    if (!photo) nextErrors.photo = 'Please add a photo.'
    for (const field of Object.keys(EMPTY_VALUES)) {
      if (!String(values[field] ?? '').trim()) {
        nextErrors[field] = REQUIRED_MESSAGES[field]
      }
    }

    setErrors(nextErrors)
    const ok = Object.keys(nextErrors).length === 0
    setConfirmed(ok)
    return ok
  }

  return {
    values,
    errors,
    photo,
    confirmed,
    handleChange,
    selectPhoto,
    removePhoto,
    validate,
  }
}
