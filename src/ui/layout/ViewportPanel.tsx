import { useCallback, useState } from 'react'
import SceneRoot from '../../scene/SceneRoot'
import type { RenderEngineStatus } from '../../scene/RenderEngine'
import ScaleModeSelector from '../controls/ScaleModeSelector'

interface ViewportTool {
  id: string
  glyph: string
  label: string
  help: string
  disabled?: boolean
}

const tools: ViewportTool[] = [
  { id: 'select', glyph: '↖', label: 'Select', help: 'Object selection' },
  { id: 'orbit', glyph: '⟳', label: 'Orbit Camera', help: 'Right Mouse + Drag' },
  { id: 'pan', glyph: '✥', label: 'Pan Camera', help: 'Middle Mouse + Drag' },
  { id: 'measure', glyph: '↔', label: 'Measure Distance', help: 'Not available in Phase 2', disabled: true },
  { id: 'focus', glyph: '⊙', label: 'Focus', help: 'Focus selected object' },
  { id: 'frame', glyph: '⌗', label: 'Reference Frame', help: 'J2000 / Heliocentric' },
  { id: 'grid', glyph: '▦', label: 'Grid', help: 'Reference grid' },
  { id: 'labels', glyph: 'A', label: 'Labels', help: 'Object labels' },
  { id: 'paths', glyph: '⌒', label: 'Orbit Paths', help: 'Not available in Phase 2', disabled: true },
  { id: 'spacetime', glyph: '≋', label: 'Spacetime', help: 'Not available in Phase 2', disabled: true },
  { id: 'fullscreen', glyph: '⛶', label: 'Fullscreen', help: 'Viewport fullscreen' },
]

export default function ViewportPanel() {
  const [activeTools, setActiveTools] = useState<Set<string>>(new Set(['select', 'grid']))
  const [engineStatus, setEngineStatus] = useState<RenderEngineStatus>('initializing')

  const handleEngineStatus = useCallback((status: RenderEngineStatus) => {
    setEngineStatus(status)
  }, [])

  const engineLabel = {
    initializing: 'INITIALIZING',
    ready: 'ONLINE',
    error: 'ERROR',
    disposed: 'OFFLINE',
  }[engineStatus]

  const toggleTool = (id: string) => {
    setActiveTools((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <main className="viewport-panel" aria-label="Scientific viewport">
      <header className="viewport-header">
        <div>
          <span className="mk-panel-title">VIEW 01</span>
          <span className="viewport-header__meta mk-data">RENDER ENGINE / WEBGL</span>
        </div>
        <div className="viewport-header__controls">
          <span className={`engine-badge engine-badge--${engineStatus} mk-data`}>
            <i aria-hidden="true" /> ENGINE {engineLabel}
          </span>
          <ScaleModeSelector />
        </div>
      </header>

      <div className="viewport-toolbar" role="toolbar" aria-label="Viewport tools">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`viewport-tool${activeTools.has(tool.id) ? ' is-active' : ''}`}
            type="button"
            aria-label={tool.label}
            aria-pressed={tool.disabled ? undefined : activeTools.has(tool.id)}
            disabled={tool.disabled}
            data-tooltip={`${tool.label}\n${tool.help}`}
            onClick={() => toggleTool(tool.id)}
          >
            <span aria-hidden="true">{tool.glyph}</span>
          </button>
        ))}
      </div>

      <section className="render-surface" aria-label="WebGL render surface">
        <SceneRoot onStatusChange={handleEngineStatus} />

        <div className="hud hud--frame">
          <span>FRAME / REFERENCE</span>
          <strong>J2000</strong>
          <small>RESERVED</small>
        </div>

        <div className="hud hud--camera">
          <span>CAMERA</span>
          <strong>PERSPECTIVE</strong>
          <dl>
            <div><dt>FOV</dt><dd>45°</dd></div>
            <div><dt>X</dt><dd>0.000</dd></div>
            <div><dt>Y</dt><dd>0.000</dd></div>
            <div><dt>Z</dt><dd>5.000</dd></div>
          </dl>
        </div>

        <div className="engineering-crosshair" aria-hidden="true">
          <span className="crosshair-horizontal" />
          <span className="crosshair-vertical" />
          <i />
        </div>

        <div className="viewport-standby">
          <span className="viewport-standby__index mk-data">VIEWPORT 01</span>
          <span className="viewport-standby__rule" aria-hidden="true" />
          <strong>RENDER ENGINE</strong>
          <em className={`engine-text engine-text--${engineStatus}`}>{engineLabel}</em>
          <small>{engineStatus === 'error' ? 'INITIALIZATION FAILED' : 'SCENE EMPTY · CELESTIAL OBJECTS 0'}</small>
        </div>

        <div className="scale-indicator" aria-label="Generic render-space reference">
          <span className="scale-indicator__line" aria-hidden="true" />
          <span className="mk-data">REFERENCE / UNASSIGNED</span>
        </div>

        <div className="viewport-corner viewport-corner--tl" aria-hidden="true" />
        <div className="viewport-corner viewport-corner--tr" aria-hidden="true" />
        <div className="viewport-corner viewport-corner--bl" aria-hidden="true" />
        <div className="viewport-corner viewport-corner--br" aria-hidden="true" />
      </section>
    </main>
  )
}
