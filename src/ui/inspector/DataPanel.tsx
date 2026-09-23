interface DataPanelProps {
  compact?: boolean
}

const provenance = [
  ['MODEL', 'LOCAL STATIC DATA'],
  ['SOURCE', 'MINI KARTE CATALOGUE'],
  ['FRAME', 'J2000'],
  ['PRECISION', 'EDUCATIONAL / PLACEHOLDER'],
] as const

export default function DataPanel({ compact = false }: DataPanelProps) {
  return (
    <section className={`data-panel${compact ? ' data-panel--compact' : ''}`}>
      <header className="section-heading">
        <span className="mk-section-title">ПРОИСХОЖДЕНИЕ ДАННЫХ</span>
        <span className="mk-secondary-label">DATA ORIGIN</span>
      </header>
      <dl className="provenance-list">
        {provenance.map(([label, value]) => (
          <div key={label}>
            <dt className="mk-label">{label}</dt>
            <dd className="mk-data">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="provenance-status">
        <span className="status-indicator status-indicator--static mk-data">
          <i aria-hidden="true" /> LOCAL STATIC
        </span>
        <span className="mk-data">REV. P2-01</span>
      </div>
    </section>
  )
}
