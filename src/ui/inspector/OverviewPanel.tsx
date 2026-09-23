import DataPanel from './DataPanel'

const parameters = [
  { label: 'MASS', value: '5.972 168 × 10²⁴', unit: 'kg' },
  { label: 'MEAN RADIUS', value: '6 371.008', unit: 'km' },
  { label: 'DENSITY', value: '5 513.4', unit: 'kg·m⁻³' },
  { label: 'SURFACE GRAVITY', value: '9.806 65', unit: 'm·s⁻²' },
] as const

export default function OverviewPanel() {
  return (
    <div className="overview-panel">
      <section className="inspector-section">
        <header className="section-heading">
          <span className="mk-section-title">ФИЗИЧЕСКИЕ ПАРАМЕТРЫ</span>
          <span className="mk-secondary-label">PHYSICAL PARAMETERS</span>
        </header>

        <div className="parameter-grid">
          {parameters.map((parameter) => (
            <div className="parameter" key={parameter.label}>
              <span className="mk-label">{parameter.label}</span>
              <span className="mk-data-large">{parameter.value}</span>
              <span className="mk-unit">{parameter.unit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="classification-strip" aria-label="Earth classification">
        <div>
          <span className="mk-label">SYSTEM</span>
          <strong className="mk-data">SOL</strong>
        </div>
        <div>
          <span className="mk-label">ORDER</span>
          <strong className="mk-data">03 / 08</strong>
        </div>
        <div>
          <span className="mk-label">SATELLITES</span>
          <strong className="mk-data">01</strong>
        </div>
      </section>

      <DataPanel compact />
    </div>
  )
}
