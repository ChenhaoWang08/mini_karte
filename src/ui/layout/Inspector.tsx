import { useState } from 'react'
import DataPanel from '../inspector/DataPanel'
import ObjectHeader from '../inspector/ObjectHeader'
import OverviewPanel from '../inspector/OverviewPanel'
import StructurePanel from '../inspector/StructurePanel'

interface InspectorProps {
  onClose: () => void
}

type InspectorTab = 'overview' | 'structure' | 'orbit' | 'data'

const tabs: { id: InspectorTab; russian: string; english: string }[] = [
  { id: 'overview', russian: 'ОБЗОР', english: 'Overview' },
  { id: 'structure', russian: 'СТРОЕНИЕ', english: 'Structure' },
  { id: 'orbit', russian: 'ОРБИТА', english: 'Orbit' },
  { id: 'data', russian: 'ДАННЫЕ', english: 'Data' },
]

function OrbitPlaceholder() {
  return (
    <section className="inspector-placeholder">
      <span className="mk-section-title">ОРБИТАЛЬНЫЕ ПАРАМЕТРЫ</span>
      <span className="mk-secondary-label">ORBITAL PARAMETERS</span>
      <div className="orbit-placeholder" aria-hidden="true"><span /></div>
      <p className="mk-body">Orbital calculation and ephemeris integration are not active in Phase 2.</p>
      <span className="placeholder-status mk-data">EPHEMERIS / NOT LOADED</span>
    </section>
  )
}

export default function Inspector({ onClose }: InspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>('overview')

  return (
    <aside className="inspector" aria-label="Earth object inspector">
      <button className="panel-close" type="button" aria-label="Close object inspector" onClick={onClose}>
        ×
      </button>
      <ObjectHeader />

      <div className="inspector-tabs" role="tablist" aria-label="Object dossier sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`inspector-tab-${tab.id}`}
            className={activeTab === tab.id ? 'is-active' : ''}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="inspector-tabpanel"
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.russian}</span>
            <small>{tab.english}</small>
          </button>
        ))}
      </div>

      <div
        id="inspector-tabpanel"
        className="inspector-content"
        role="tabpanel"
        aria-labelledby={`inspector-tab-${activeTab}`}
      >
        {activeTab === 'overview' && <OverviewPanel />}
        {activeTab === 'structure' && <StructurePanel />}
        {activeTab === 'orbit' && <OrbitPlaceholder />}
        {activeTab === 'data' && <DataPanel />}
      </div>
    </aside>
  )
}
