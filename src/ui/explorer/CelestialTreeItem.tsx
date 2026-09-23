import type { ReactNode } from 'react'

interface CelestialTreeItemProps {
  id?: string
  index?: string
  symbol?: string
  primary: string
  secondary?: string
  depth?: number
  selected?: boolean
  expandable?: boolean
  expanded?: boolean
  muted?: boolean
  onToggle?: () => void
  children?: ReactNode
}

export default function CelestialTreeItem({
  id,
  index,
  symbol,
  primary,
  secondary,
  depth = 0,
  selected = false,
  expandable = false,
  expanded = false,
  muted = false,
  onToggle,
  children,
}: CelestialTreeItemProps) {
  return (
    <div className="tree-node">
      <button
        className={`tree-item${!index && !symbol ? ' is-group' : ''}${selected ? ' is-selected' : ''}${muted ? ' is-muted' : ''}`}
        type="button"
        role="treeitem"
        aria-selected={selected}
        aria-expanded={expandable ? expanded : undefined}
        style={{ '--tree-depth': depth } as React.CSSProperties}
        onClick={onToggle}
      >
        <span className="tree-item__chevron" aria-hidden="true">
          {expandable ? (expanded ? '▾' : '▸') : ''}
        </span>
        {index && <span className="tree-item__index mk-data">{index}</span>}
        {symbol && <span className="tree-item__symbol" aria-hidden="true">{symbol}</span>}
        <span className="tree-item__names">
          <span className="tree-item__primary">{primary}</span>
          {secondary && <span className="tree-item__secondary">{secondary}</span>}
        </span>
        {id && <span className="tree-item__id mk-data">{id}</span>}
      </button>
      {expanded && children && <div role="group">{children}</div>}
    </div>
  )
}
