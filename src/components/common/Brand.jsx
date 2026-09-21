import logoUrl from '../../assets/branding/looka-logo.png'
import wordmarkUrl from '../../assets/branding/looka-wordmark.png'
import markUrl from '../../assets/branding/looka-mark.png'

/**
 * The final LOOKA brand assets.
 *
 * `variant` picks the intended lockup:
 *   logo     - full lockup with tagline (expanded sidebar, auth pages)
 *   wordmark - wordmark only (compact headers)
 *   mark     - standalone mark (collapsed sidebar, tight spaces)
 *
 * Callers set ONE dimension (a height or a width) and `object-contain`
 * keeps the other proportional, so the assets can never be distorted.
 * The images ship with transparency; nothing is tinted, cropped or filtered.
 */

const ASSETS = {
  logo: { src: logoUrl, alt: 'LOOKA — Style What You Own' },
  wordmark: { src: wordmarkUrl, alt: 'LOOKA' },
  mark: { src: markUrl, alt: 'LOOKA' },
}

function Brand({ variant = 'logo', className = '', ...props }) {
  const asset = ASSETS[variant]

  return (
    <img
      src={asset.src}
      alt={asset.alt}
      className={`object-contain ${className}`}
      {...props}
    />
  )
}

export default Brand
