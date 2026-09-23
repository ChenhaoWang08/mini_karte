# Render scene ownership

`RenderEngine` owns and disposes the renderer, canvas, development helpers,
resize observer, and animation frame that it creates.

Scene-content modules attach through `RenderEngine.attachSceneContent()`. A
content module owns every GPU resource it creates and implements its own
`dispose()` method. The engine removes the content root and invokes that method;
it does not traverse or dispose another subsystem's geometry, materials,
textures, or render targets itself.

The normal shutdown path is:

1. stop the animation frame loop;
2. disconnect the resize observer;
3. detach scene content and invoke its owner-provided disposal method;
4. remove and dispose engine-owned helpers;
5. call `WebGLRenderer.dispose()`;
6. remove the renderer canvas.

Three.js 0.186.0 implements `GridHelper.dispose()` and `AxesHelper.dispose()` by
disposing each helper's owned geometry and material. The engine uses those
public APIs. Forced WebGL context loss is not part of normal shutdown.

Phase 3.1 can provide a `RenderSceneContent` implementation without replacing
the renderer, canvas mounting, camera, resize system, render loop, StrictMode
lifecycle, or viewport layering. Phase 3.0 intentionally supplies no celestial
scene content.
