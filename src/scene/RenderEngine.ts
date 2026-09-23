import {
  AxesHelper,
  Color,
  GridHelper,
  type Material,
  NoToneMapping,
  type Object3D,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three'

export type RenderEngineStatus = 'initializing' | 'ready' | 'error' | 'disposed'

/**
 * Phase 3.1 scene content attaches through this boundary. The content module
 * creates and owns its GPU resources, and its dispose method releases them.
 */
export interface RenderSceneContent {
  readonly root: Object3D
  dispose: () => void
}

const CAMERA_FOV = 45
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 100
const MAX_PIXEL_RATIO = 2
const FALLBACK_CLEAR_COLOR = '#151614'

export class RenderEngine {
  private readonly container: HTMLElement
  private scene: Scene | null = null
  private camera: PerspectiveCamera | null = null
  private renderer: WebGLRenderer | null = null
  private gridHelper: GridHelper | null = null
  private axesHelper: AxesHelper | null = null
  private sceneContent: RenderSceneContent | null = null
  private resizeObserver: ResizeObserver | null = null
  private animationFrame: number | null = null
  private running = false
  private disposed = false
  private firstFrameRendered = false

  constructor(container: HTMLElement) {
    this.container = container
  }

  initialize() {
    if (this.renderer || this.disposed) return

    const scene = new Scene()
    const camera = new PerspectiveCamera(CAMERA_FOV, 1, CAMERA_NEAR, CAMERA_FAR)
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
    })

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)

    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = NoToneMapping
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO))

    const clearColor = getComputedStyle(this.container)
      .getPropertyValue('--color-bg-render')
      .trim() || FALLBACK_CLEAR_COLOR
    renderer.setClearColor(clearColor, 1)

    const canvas = renderer.domElement
    canvas.className = 'render-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    canvas.dataset.renderEngine = 'webgl'
    canvas.dataset.engineStatus = 'initializing'
    canvas.dataset.pixelRatio = renderer.getPixelRatio().toString()

    const gridHelper = new GridHelper(6, 12, 0x762421, 0x343531)
    this.gridHelper = gridHelper
    gridHelper.rotation.x = Math.PI / 2
    gridHelper.position.z = -1
    this.configureHelperMaterials(gridHelper.material, 0.42)

    const axesHelper = new AxesHelper(0.72)
    this.axesHelper = axesHelper
    axesHelper.setColors(
      new Color(0x98534d),
      new Color(0x78876f),
      new Color(0x71808d),
    )
    this.configureHelperMaterials(axesHelper.material, 0.72)

    scene.add(gridHelper, axesHelper)
    this.container.prepend(canvas)

    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      this.resize(entry.contentRect.width, entry.contentRect.height)
    })
    this.resizeObserver.observe(this.container)

    const bounds = this.container.getBoundingClientRect()
    this.resize(bounds.width, bounds.height)
  }

  start(onFirstFrame?: () => void, onError?: (error: unknown) => void) {
    if (this.running || this.disposed || !this.renderer || !this.scene || !this.camera) return

    this.running = true

    const renderFrame = () => {
      if (!this.running || !this.renderer || !this.scene || !this.camera) return
      try {
        this.renderer.render(this.scene, this.camera)

        if (!this.firstFrameRendered) {
          this.firstFrameRendered = true
          this.renderer.domElement.dataset.frameRendered = 'true'
          this.renderer.domElement.dataset.engineStatus = 'ready'
          onFirstFrame?.()
        }

        this.animationFrame = window.requestAnimationFrame(renderFrame)
      } catch (error) {
        this.renderer.domElement.dataset.engineStatus = 'error'
        this.stop()
        onError?.(error)
      }
    }

    this.animationFrame = window.requestAnimationFrame(renderFrame)
  }

  stop() {
    this.running = false
    if (this.animationFrame !== null) {
      window.cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  attachSceneContent(content: RenderSceneContent) {
    if (this.disposed || !this.scene) {
      throw new Error('RenderEngine must be initialized before scene content is attached.')
    }

    this.detachSceneContent()
    this.sceneContent = content
    this.scene.add(content.root)
  }

  detachSceneContent() {
    const content = this.sceneContent
    if (!content) return

    this.sceneContent = null
    this.scene?.remove(content.root)
    content.dispose()
  }

  resize(width?: number, height?: number) {
    if (!this.renderer || !this.camera || this.disposed) return

    const bounds = width === undefined || height === undefined
      ? this.container.getBoundingClientRect()
      : null
    const nextWidth = width ?? bounds?.width ?? 0
    const nextHeight = height ?? bounds?.height ?? 0

    if (nextWidth <= 0 || nextHeight <= 0) return

    const nextPixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
    if (this.renderer.getPixelRatio() !== nextPixelRatio) {
      this.renderer.setPixelRatio(nextPixelRatio)
    }

    this.camera.aspect = nextWidth / nextHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(nextWidth, nextHeight, false)

    const canvas = this.renderer.domElement
    canvas.dataset.logicalWidth = nextWidth.toFixed(3)
    canvas.dataset.logicalHeight = nextHeight.toFixed(3)
    canvas.dataset.pixelRatio = nextPixelRatio.toString()
    canvas.dataset.aspect = this.camera.aspect.toFixed(6)
    canvas.dataset.bufferWidth = canvas.width.toString()
    canvas.dataset.bufferHeight = canvas.height.toString()
  }

  dispose() {
    if (this.disposed) return
    this.disposed = true

    this.stop()
    this.resizeObserver?.disconnect()
    this.resizeObserver = null

    this.detachSceneContent()

    if (this.scene && this.gridHelper) this.scene.remove(this.gridHelper)
    if (this.scene && this.axesHelper) this.scene.remove(this.axesHelper)
    this.gridHelper?.dispose()
    this.axesHelper?.dispose()

    if (this.renderer) {
      const canvas = this.renderer.domElement
      this.renderer.dispose()
      canvas.remove()
    }

    this.gridHelper = null
    this.axesHelper = null
    this.renderer = null
    this.camera = null
    this.scene = null
    this.firstFrameRendered = false
  }

  private configureHelperMaterials(
    material: Material | Material[],
    opacity: number,
  ) {
    const materials = Array.isArray(material) ? material : [material]
    materials.forEach((helperMaterial) => {
      helperMaterial.transparent = true
      helperMaterial.opacity = opacity
      helperMaterial.depthWrite = false
    })
  }
}
