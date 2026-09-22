import wordmarkUrl from '../../assets/branding/looka-wordmark.png'
import markUrl from '../../assets/branding/looka-mark.png'

/**
 * The final LOOKA brand assets.
 *
 * `variant` picks the intended lockup:
 *   wordmark - the primary LOOKA logo (the default)
 *   mark     - standalone mark (collapsed sidebar, tight spaces)
 *
 * The old logo+tagline lockup is intentionally not available here: the
 * wordmark is the brand, and no tagline is rendered beneath it.
 *
 * Callers set ONE dimension (a height or a width) and `object-contain`
 * keeps the other proportional, so the assets can never be distorted.
 * The images ship with transparency; nothing is tinted, cropped or filtered.
 */

const ASSETS = {
  wordmark: { src: wordmarkUrl, alt: 'LOOKA' },
  mark: { src: markUrl, alt: 'LOOKA' },
}

function Brand({ variant = 'wordmark', className = '', ...props }) {
  const asset = ASSETS[variant] ?? ASSETS.wordmark

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
