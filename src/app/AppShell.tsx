import { useCallback, useEffect, useRef, useState } from 'react'
import ActivityBar from '../ui/layout/ActivityBar'
import Inspector from '../ui/layout/Inspector'
import Sidebar from '../ui/layout/Sidebar'
import StatusBar from '../ui/layout/StatusBar'
import TopBar from '../ui/layout/TopBar'
import ViewportPanel from '../ui/layout/ViewportPanel'

type PanelSide = 'explorer' | 'inspector'

const PANEL_LIMITS = {
  explorer: { min: 220, max: 420, initial: 280 },
  inspector: { min: 280, max: 480, initial: 340 },
} as const

const ACTIVITY_BAR_WIDTH = 48
const VIEWPORT_MIN_WIDTH = 480
const RESIZE_HANDLES_WIDTH = 2

interface ResizeHandleProps {
  side: PanelSide
  onResizeStart: (side: PanelSide, event: React.PointerEvent<HTMLDivElement>) => void
  onResize: (event: React.PointerEvent<HTMLDivElement>) => void
  onResizeEnd: () => void
}

function ResizeHandle({ side, onResizeStart, onResize, onResizeEnd }: ResizeHandleProps) {
  return (
    <div
      className={`resize-handle resize-handle--${side}`}
      role="separator"
      aria-label={`Resize ${side} panel`}
      aria-orientation="vertical"
      onPointerDown={(event) => onResizeStart(side, event)}
      onPointerMove={onResize}
      onPointerUp={onResizeEnd}
      onPointerCancel={onResizeEnd}
      onLostPointerCapture={onResizeEnd}
    />
  )
}

export default function AppShell() {
  const [explorerWidth, setExplorerWidth] = useState<number>(PANEL_LIMITS.explorer.initial)
  const [inspectorWidth, setInspectorWidth] = useState<number>(PANEL_LIMITS.inspector.initial)
  const [explorerOpen, setExplorerOpen] = useState(true)
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [resizing, setResizing] = useState<PanelSide | null>(null)
  const resizeState = useRef<{ side: PanelSide; startX: number; startWidth: number } | null>(null)

  const stopResize = useCallback(() => {
    resizeState.current = null
    setResizing(null)
    document.body.classList.remove('is-resizing')
  }, [])

  useEffect(() => {
    return () => document.body.classList.remove('is-resizing')
  }, [])

  const startResize = useCallback((side: PanelSide, event: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1100) return

    event.currentTarget.setPointerCapture(event.pointerId)
    resizeState.current = {
      side,
      startX: event.clientX,
      startWidth: side === 'explorer' ? explorerWidth : inspectorWidth,
    }
    setResizing(side)
    document.body.classList.add('is-resizing')
  }, [explorerWidth, inspectorWidth])

  const resizePanel = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = resizeState.current
    if (!state) return

    const direction = state.side === 'explorer' ? 1 : -1
    const delta = (event.clientX - state.startX) * direction
    const limits = PANEL_LIMITS[state.side]
    const otherPanelWidth = state.side === 'explorer' ? inspectorWidth : explorerWidth
    const availableMax = window.innerWidth
      - ACTIVITY_BAR_WIDTH
      - otherPanelWidth
      - VIEWPORT_MIN_WIDTH
      - RESIZE_HANDLES_WIDTH
    const width = Math.min(Math.max(state.startWidth + delta, limits.min), limits.max, availableMax)

    if (state.side === 'explorer') setExplorerWidth(width)
    else setInspectorWidth(width)
  }, [explorerWidth, inspectorWidth])

  return (
    <div
      className="app-shell"
      style={{
        '--explorer-width': `${explorerWidth}px`,
        '--inspector-width': `${inspectorWidth}px`,
      } as React.CSSProperties}
    >
      <TopBar onToggleInspector={() => setInspectorOpen((open) => !open)} />
      <div className="workspace">
        <ActivityBar
          explorerOpen={explorerOpen}
          inspectorOpen={inspectorOpen}
          onToggleExplorer={() => setExplorerOpen((open) => !open)}
          onToggleInspector={() => setInspectorOpen((open) => !open)}
        />

        <div className={`sidebar-region${explorerOpen ? ' is-overlay-open' : ''}`}>
          <Sidebar onClose={() => setExplorerOpen(false)} />
        </div>
        <ResizeHandle
          side="explorer"
          onResizeStart={startResize}
          onResize={resizePanel}
          onResizeEnd={stopResize}
        />

        <ViewportPanel />

        <ResizeHandle
          side="inspector"
          onResizeStart={startResize}
          onResize={resizePanel}
          onResizeEnd={stopResize}
        />
        <div className={`inspector-region${inspectorOpen ? ' is-overlay-open' : ''}`}>
          <Inspector onClose={() => setInspectorOpen(false)} />
        </div>

        {resizing && (
          <div
            className="resize-capture"
            onPointerMove={resizePanel}
            onPointerUp={stopResize}
            onPointerCancel={stopResize}
          />
        )}
      </div>
      <div className="bottom-panel-slot" aria-hidden="true" />
      <StatusBar />
    </div>
  )
}
