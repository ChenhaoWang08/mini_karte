interface TopBarProps {
  onToggleInspector: () => void
}

export default function TopBar({ onToggleInspector }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="product-mark" aria-label="Mini Karte">
        <span className="product-mark__monogram">МК</span>
        <span className="product-mark__name">MINI KARTE</span>
      </div>

      <nav className="breadcrumb" aria-label="Current location">
        <span>SOL</span>
        <span className="breadcrumb__separator" aria-hidden="true">›</span>
        <span className="breadcrumb__secondary">SOLAR SYSTEM</span>
        <span className="breadcrumb__separator" aria-hidden="true">›</span>
        <span className="breadcrumb__current">EARTH</span>
      </nav>

      <button className="command-field" type="button" aria-label="Search or command, Command K">
        <span className="command-field__icon" aria-hidden="true">⌕</span>
        <span className="command-field__label">SEARCH / COMMAND</span>
        <kbd>⌘K</kbd>
      </button>

      <div className="top-status mk-data" aria-label="Static workstation status">
        <span className="top-status__utc"><b>UTC</b> 02:31</span>
        <span className="status-indicator status-indicator--static">
          <i aria-hidden="true" /> LOCAL
        </span>
      </div>

      <button
        className="top-bar__inspector-toggle"
        type="button"
        aria-label="Toggle object inspector"
        onClick={onToggleInspector}
      >
        ▤
      </button>
    </header>
  )
}
