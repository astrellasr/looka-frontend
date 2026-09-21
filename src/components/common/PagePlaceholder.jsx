/**
 * Temporary page body used to verify the AppShell.
 * Replaced as each feature is implemented.
 */
function PagePlaceholder({ title, note }) {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-page md:text-[2rem]">{title}</h1>
      </header>
      <div className="rounded-card border border-line bg-surface p-8 shadow-card">
        <p className="text-body text-ink-soft">{note}</p>
      </div>
    </>
  )
}

export default PagePlaceholder
