export default function ScaleModeSelector() {
  return (
    <button
      className="scale-mode-selector"
      type="button"
      aria-label="Scale mode: Scientific"
      data-tooltip={'SCALE MODE\nScientific scale selected'}
    >
      <span className="scale-mode-selector__marker" aria-hidden="true" />
      SCIENTIFIC
      <span aria-hidden="true">▾</span>
    </button>
  )
}
