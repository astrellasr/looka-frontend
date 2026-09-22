import { useEffect, useRef, useState } from 'react'
import ProfileSummary from '../../components/profile/ProfileSummary'
import PersonalInformation from '../../components/profile/PersonalInformation'
import StylePreferences from '../../components/profile/StylePreferences'
import AccountSettings from '../../components/profile/AccountSettings'
import ChangePhotoModal from '../../components/profile/ChangePhotoModal'
import ChangePasswordModal from '../../components/profile/ChangePasswordModal'
import DeleteAccountModal from '../../components/profile/DeleteAccountModal'
import ProfileSuccessModal from '../../components/profile/ProfileSuccessModal'
import ConfirmPhotoModal from '../../components/profile/ConfirmPhotoModal'
import ConfirmSaveModal from '../../components/profile/ConfirmSaveModal'
import lucaProfileUrl from '../../assets/mascots/luca-profile.png'
import { UserIcon } from '../../components/common/Icons'

// Temporary presentation values. See src/utils/previewData.js --
// replaced by GET /auth/me and GET /users/analytics during integration.
import { previewProfile } from '../../utils/previewData'
import { useAuth } from '../../hooks/useAuth'
import { usePreviewData } from '../../hooks/usePreviewData'

const MAX_FILE_BYTES = 5 * 1024 * 1024

function toggle(list, value) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value]
}

function Profile() {
  const { user, setUser, avatarUrl, setAvatarUrl } = useAuth()
  const { clothes, looks, calendar } = usePreviewData()

  // Saved identity, and the draft the form edits. Nothing reaches the
  // session until Save Changes is confirmed.
  const savedName = user?.name ?? user?.username ?? previewProfile.name
  const [name, setName] = useState(savedName)
  const [styles, setStyles] = useState(previewProfile.styles)
  const [colors, setColors] = useState(previewProfile.colors)
  const [photoError, setPhotoError] = useState('')
  const [modal, setModal] = useState(null) // photo | password | delete
  const [success, setSuccess] = useState(null) // { title, note }
  const [confirmingSave, setConfirmingSave] = useState(false)

  /**
   * A photo the user picked but has not confirmed yet. Held apart from
   * the shared avatar so the current picture stays put until Save Photo,
   * and its object URL is released if they cancel or pick another.
   */
  const [pendingPhoto, setPendingPhoto] = useState(null)
  const pendingRef = useRef(null)

  useEffect(() => {
    pendingRef.current = pendingPhoto
  }, [pendingPhoto])

  useEffect(
    () => () => {
      if (pendingRef.current) URL.revokeObjectURL(pendingRef.current)
    },
    [],
  )

  const releasePending = () => {
    setPendingPhoto((current) => {
      if (current) URL.revokeObjectURL(current)
      return null
    })
  }

  const hasUnsavedChanges = name.trim() !== savedName && name.trim() !== ''

  const handleSelectPhoto = (file) => {
    if (file.size > MAX_FILE_BYTES) {
      setPhotoError('That photo is larger than 5MB. Please choose a smaller one.')
      return
    }

    // Staged only: confirmation applies it to the shared avatar.
    setPendingPhoto((current) => {
      if (current) URL.revokeObjectURL(current)
      return URL.createObjectURL(file)
    })
    setPhotoError('')
    setModal('confirm-photo')
  }

  const handleConfirmPhoto = () => {
    // Hand the URL to the provider, which now owns revoking it. Clear
    // the pending slot without revoking -- it is the live avatar now.
    setAvatarUrl(pendingPhoto)
    setPendingPhoto(null)
    setModal(null)
  }

  const handleCancelPhoto = () => {
    releasePending()
    setModal('photo')
  }

  const handleRemovePhoto = () => {
    setAvatarUrl(null)
    setPhotoError('')
  }

  // Local only -- becomes PUT /auth/profile during integration. Writing
  // to the session makes the new name show in the sidebar and dashboard.
  const handleConfirmSave = () => {
    const trimmed = name.trim()
    setConfirmingSave(false)

    // Only the display name changes; the username identifies the
    // account and is not editable here.
    setUser((current) => ({ ...(current ?? {}), name: trimmed }))

    setSuccess({
      title: 'Profile Updated',
      note: 'Saved for this preview session. Not yet stored on a server.',
    })
  }

  // Counts mirror the live preview store rather than fixed numbers.
  const profile = {
    ...previewProfile,
    // The card shows the saved identity, not the in-progress draft.
    name: savedName,
    username: user?.username ?? previewProfile.username,
    email: user?.email ?? previewProfile.email,
    wardrobeCount: clothes.length,
    savedLooks: looks.length,
    daysStyled: Object.keys(calendar).length,
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2.5 text-page md:text-[2rem]">
            Profile
            <UserIcon className="h-6 w-6 text-primary" aria-hidden="true" />
          </h1>
          <p className="mt-1 text-body text-ink-soft">
            Manage your account and style preferences.
          </p>
        </div>

        {/* Decorative companion. The artwork already carries the
            "More Stylish You Every Day" sign, so the separate caption
            would only repeat it. Width only + object-contain keeps the
            proportions; the PNG is transparent, so no container. */}
        <img
          src={lucaProfileUrl}
          alt=""
          aria-hidden="true"
          className="hidden h-auto w-[150px] shrink-0 translate-y-1 select-none object-contain sm:block lg:w-[190px] lg:translate-y-2"
        />
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:items-start">
        <ProfileSummary
          profile={profile}
          photoUrl={avatarUrl}
          onChangePhoto={() => setModal('photo')}
        />

        <div className="space-y-5">
          <PersonalInformation
            name={name}
            username={profile.username}
            email={profile.email}
            onNameChange={setName}
            action={
              <button
                type="button"
                onClick={() => setConfirmingSave(true)}
                disabled={!hasUnsavedChanges}
                className={`inline-flex h-10 shrink-0 items-center justify-center rounded-control px-5 text-secondary font-medium transition-colors duration-150 ${
                  hasUnsavedChanges
                    ? 'bg-primary text-white hover:bg-primary-strong'
                    : 'cursor-not-allowed bg-blush/30 text-white/80'
                }`}
              >
                Save Changes
              </button>
            }
          />

          <StylePreferences
            styles={styles}
            colors={colors}
            onToggleStyle={(style) => setStyles((c) => toggle(c, style))}
            onToggleColor={(color) => setColors((c) => toggle(c, color))}
          />

          <AccountSettings
            onChangePassword={() => setModal('password')}
            onDeleteAccount={() => setModal('delete')}
          />
        </div>
      </div>

      {modal === 'photo' && (
        <ChangePhotoModal
          photoUrl={avatarUrl}
          error={photoError}
          onSelect={handleSelectPhoto}
          onRemove={handleRemovePhoto}
          onClose={() => {
            releasePending()
            setModal(null)
            setPhotoError('')
          }}
        />
      )}

      {modal === 'confirm-photo' && pendingPhoto && (
        <ConfirmPhotoModal
          previewUrl={pendingPhoto}
          onCancel={handleCancelPhoto}
          onConfirm={handleConfirmPhoto}
        />
      )}

      {confirmingSave && (
        <ConfirmSaveModal
          onCancel={() => setConfirmingSave(false)}
          onConfirm={handleConfirmSave}
        />
      )}

      {modal === 'password' && (
        <ChangePasswordModal
          onClose={() => setModal(null)}
          onUpdated={() => {
            setModal(null)
            setSuccess({
              title: 'Not Changed',
              note: 'Your details look right. Password changes need the server.',
            })
          }}
        />
      )}

      {modal === 'delete' && (
        <DeleteAccountModal
          onClose={() => setModal(null)}
          onConfirm={() => {
            // Prototype only: nothing is deleted.
            setModal(null)
            setSuccess({
              title: 'Not Deleted',
              note: 'Account deletion needs the server, so nothing was removed.',
            })
          }}
        />
      )}

      {success && (
        <ProfileSuccessModal
          title={success.title}
          note={success.note}
          onClose={() => setSuccess(null)}
        />
      )}
    </div>
  )
}

export default Profile
