import { useMemo, useState } from 'react'
import CelestialTreeItem from './CelestialTreeItem'

type CatalogueFilter = 'ALL' | 'PLANETS' | 'MOONS' | 'OTHER'

const catalogueObjects = [
  { id: 'SOL-00', index: '00', symbol: '☉', primary: 'SUN', secondary: 'СОЛНЦЕ', kind: 'OTHER' },
  { id: 'SOL-01', index: '01', symbol: '○', primary: 'MERCURY', secondary: 'МЕРКУРИЙ', kind: 'PLANETS' },
  { id: 'SOL-02', index: '02', symbol: '○', primary: 'VENUS', secondary: 'ВЕНЕРА', kind: 'PLANETS' },
  { id: 'SOL-03', index: '03', symbol: '●', primary: 'EARTH', secondary: 'ЗЕМЛЯ', kind: 'PLANETS' },
  { id: 'SOL-03-M01', index: 'M01', symbol: '○', primary: 'MOON', secondary: 'ЛУНА', kind: 'MOONS' },
  { id: 'SOL-04', index: '04', symbol: '○', primary: 'MARS', secondary: 'МАРС', kind: 'PLANETS' },
] as const

export default function CelestialExplorer() {
  const [activeFilter, setActiveFilter] = useState<CatalogueFilter>('ALL')
  const [query, setQuery] = useState('')
  const [groups, setGroups] = useState({ sol: true, inner: true, earth: true })

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleUpperCase()
    return catalogueObjects.filter((object) => {
      const matchesKind = activeFilter === 'ALL' || object.kind === activeFilter
      const matchesQuery = !normalizedQuery || [object.id, object.primary, object.secondary]
        .some((value) => value.includes(normalizedQuery))
      return matchesKind && matchesQuery
    })
  }, [activeFilter, query])

  const has = (id: string) => visible.some((object) => object.id === id)

  return (
    <section className="celestial-explorer">
      <header className="panel-heading">
        <div className="mk-panel-title">НЕБЕСНЫЙ КАТАЛОГ</div>
        <div className="mk-secondary-label">CELESTIAL CATALOGUE</div>
      </header>

      <div className="catalogue-filters" role="group" aria-label="Catalogue type filter">
        {(['ALL', 'PLANETS', 'MOONS', 'OTHER'] as const).map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? 'is-active' : ''}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <label className="catalogue-search">
        <span className="sr-only">Filter celestial catalogue</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          placeholder="FILTER CATALOGUE"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className="catalogue-tree" role="tree" aria-label="Solar system catalogue">
        <CelestialTreeItem
          primary="SOL / СОЛНЕЧНАЯ СИСТЕМА"
          secondary="HELIOCENTRIC CATALOGUE"
          expandable
          expanded={groups.sol}
          onToggle={() => setGroups((state) => ({ ...state, sol: !state.sol }))}
        >
          {has('SOL-00') && <CelestialTreeItem {...catalogueObjects[0]} depth={1} />}

          <CelestialTreeItem
            primary="INNER PLANETS"
            depth={1}
            expandable
            expanded={groups.inner}
            onToggle={() => setGroups((state) => ({ ...state, inner: !state.inner }))}
          >
            {has('SOL-01') && <CelestialTreeItem {...catalogueObjects[1]} depth={2} />}
            {has('SOL-02') && <CelestialTreeItem {...catalogueObjects[2]} depth={2} />}
            {(has('SOL-03') || has('SOL-03-M01')) && (
              <CelestialTreeItem
                {...catalogueObjects[3]}
                depth={2}
                selected
                expandable
                expanded={groups.earth}
                onToggle={() => setGroups((state) => ({ ...state, earth: !state.earth }))}
              >
                {has('SOL-03-M01') && <CelestialTreeItem {...catalogueObjects[4]} depth={3} />}
              </CelestialTreeItem>
            )}
            {has('SOL-04') && <CelestialTreeItem {...catalogueObjects[5]} depth={2} />}
          </CelestialTreeItem>

          <CelestialTreeItem primary="ASTEROID BELT" depth={1} expandable expanded={false} muted />
          <CelestialTreeItem primary="OUTER PLANETS" depth={1} expandable expanded={false} muted />
          <CelestialTreeItem primary="TRANS-NEPTUNIAN OBJECTS" depth={1} expandable expanded={false} muted />
        </CelestialTreeItem>

        {visible.length === 0 && (
          <div className="catalogue-empty mk-data">NO MATCHING OBJECTS</div>
        )}
      </div>

      <footer className="catalogue-footer mk-data">
        <span>{visible.length.toString().padStart(2, '0')} OBJECTS</span>
        <span>LOCAL INDEX</span>
      </footer>
    </section>
  )
}
