import { useState } from 'react'

interface ActivityBarProps {
  explorerOpen: boolean
  inspectorOpen: boolean
  onToggleExplorer: () => void
  onToggleInspector: () => void
}

const inactiveTools = [
  { glyph: '⌕', label: 'Search', detail: 'Global search · Phase 3' },
  { glyph: '◎', label: 'Orbital Systems', detail: 'Orbital systems · Phase 3' },
  { glyph: '∿', label: 'Physics', detail: 'Physics models · Phase 3' },
  { glyph: '▤', label: 'Data', detail: 'Object dossier' },
  { glyph: '◷', label: 'Simulation Time', detail: 'Simulation time · Phase 3' },
]

export default function ActivityBar({
  explorerOpen,
  inspectorOpen,
  onToggleExplorer,
  onToggleInspector,
}: ActivityBarProps) {
  const [activeTool, setActiveTool] = useState('catalogue')

  return (
    <nav className="activity-bar" aria-label="Primary workstation tools">
      <div className="activity-bar__tools">
        <button
          className={`activity-button${activeTool === 'catalogue' && explorerOpen ? ' is-active' : ''}`}
          type="button"
          aria-label="Celestial Catalogue"
          aria-pressed={explorerOpen}
          data-tooltip={'CELESTIAL CATALOGUE\nНебесный каталог'}
          onClick={() => {
            setActiveTool('catalogue')
            onToggleExplorer()
          }}
        >
          <span aria-hidden="true">◉</span>
        </button>

        {inactiveTools.map((tool) => (
          <button
            key={tool.label}
            className={`activity-button${tool.label === 'Data' && inspectorOpen ? ' is-active' : ''}`}
            type="button"
            aria-label={tool.label}
            aria-pressed={tool.label === 'Data' ? inspectorOpen : undefined}
            data-tooltip={`${tool.label.toUpperCase()}\n${tool.detail}`}
            onClick={() => {
              setActiveTool(tool.label.toLowerCase())
              if (tool.label === 'Data') onToggleInspector()
            }}
          >
            <span aria-hidden="true">{tool.glyph}</span>
          </button>
        ))}
      </div>

      <button
        className="activity-button activity-bar__settings"
        type="button"
        aria-label="Settings"
        data-tooltip={'SETTINGS\nWorkstation preferences'}
      >
        <span aria-hidden="true">⚙</span>
      </button>
    </nav>
  )
}
