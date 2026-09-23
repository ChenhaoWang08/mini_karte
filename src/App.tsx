import * as THREE from 'three'

export default function App() {
  return (
    <main>
      <h1>Mini Karte</h1>
      <p>Runtime foundation operational.</p>

      <dl>
        <dt>React</dt>
        <dd>Operational</dd>

        <dt>TypeScript</dt>
        <dd>Operational</dd>

        <dt>Three.js</dt>
        <dd>r{THREE.REVISION}</dd>
      </dl>
    </main>
  )
}