import { useEffect, useRef } from 'react'
import { RenderEngine, type RenderEngineStatus } from './RenderEngine'

interface SceneRootProps {
  onStatusChange: (status: RenderEngineStatus) => void
}

export default function SceneRoot({ onStatusChange }: SceneRootProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let engine: RenderEngine | null = null
    onStatusChange('initializing')

    try {
      engine = new RenderEngine(container)
      engine.initialize()
      engine.start(
        () => onStatusChange('ready'),
        (error) => {
          console.error('Mini Karte render loop failed.', error)
          onStatusChange('error')
        },
      )
    } catch (error) {
      console.error('Mini Karte render engine initialization failed.', error)
      engine?.dispose()
      onStatusChange('error')
    }

    return () => {
      engine?.dispose()
      onStatusChange('disposed')
    }
  }, [onStatusChange])

  return <div ref={containerRef} className="scene-root" aria-hidden="true" />
}
