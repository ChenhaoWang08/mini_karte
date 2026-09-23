import CelestialExplorer from '../explorer/CelestialExplorer'

interface SidebarProps {
  onClose: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Celestial explorer">
      <button className="panel-close" type="button" aria-label="Close celestial explorer" onClick={onClose}>
        ×
      </button>
      <CelestialExplorer />
    </aside>
  )
}
