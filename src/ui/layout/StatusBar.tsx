import SimulationControls from '../controls/SimulationControls'

export default function StatusBar() {
  return (
    <footer className="status-bar" aria-label="Simulation status">
      <div className="status-bar__left">
        <span className="status-indicator status-indicator--ready mk-data"><i aria-hidden="true" /> READY</span>
        <span className="status-bar__secondary mk-data">LOCAL DATA</span>
      </div>

      <SimulationControls />

      <div className="status-bar__right mk-data">
        <span>J2000</span>
        <span>HELIOCENTRIC</span>
        <span className="status-bar__secondary">SCIENTIFIC</span>
        <span className="status-bar__fps">FPS --</span>
      </div>
    </footer>
  )
}
