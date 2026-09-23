export default function SimulationControls() {
  return (
    <div className="simulation-controls" aria-label="Static simulation controls">
      <span className="mk-data">T+00:00:00</span>
      <button type="button" aria-label="Simulation playback unavailable in Phase 2" data-tooltip={'PLAYBACK\nStatic in Phase 2'}>
        <span aria-hidden="true">▶</span>
        <span className="mk-data">×1</span>
      </button>
      <span className="simulation-controls__date mk-data">2026-09-23 02:31 UTC</span>
    </div>
  )
}
