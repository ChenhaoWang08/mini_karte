export default function ObjectHeader() {
  return (
    <header className="object-header">
      <div className="object-header__eyebrow">
        <span className="mk-label">ОБЪЕКТ</span>
        <span className="mk-object-id">SOL-03</span>
      </div>
      <h1 className="mk-display">ЗЕМЛЯ</h1>
      <div className="object-header__english">EARTH</div>
      <div className="object-header__class">TERRESTRIAL PLANET</div>
      <div className="object-header__registration mk-data">
        <span>CATALOGUE / SOL</span>
        <span>CLASS / TP-01</span>
      </div>
    </header>
  )
}
