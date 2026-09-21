/**
 * Neutral surface card. Pastels belong on accents inside a card,
 * not on the card surface itself.
 */
function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-6 shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
