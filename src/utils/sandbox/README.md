# Sandbox

Sandbox is a lightweight WebGL wrapper for **simple, beautiful shader effects**. It focuses on a clean API, type safety, and fast setup so you can go from idea → shader in minutes.

It’s **DX‑friendly**, small, and intentionally minimal — perfect for gradients, ambient backgrounds, and animated GLSL experiments. If you are not building a full 3D engine, Sandbox is a great alternative to larger libraries like three.js or p5.js.

It works in both **WebGL1 and WebGL2** contexts, with automatic fallback and detection.

## Installation

If you wish to give Sandbox a try, you can install it via npm:

```bash
npm install @rosalana/sandbox-js
```

## Quick setup

Sandbox is designed to get you up and running with minimal effort. It ships with sensible defaults, so in most cases it only takes a few lines of code to get started.

```ts
import { Sandbox } from "@rosalana/sandbox-js";

const sandbox = Sandbox.create(canvas, {
  fragment: fragSource,
});
```

That’s it. You get a running render loop and a fullscreen quad.

## Usage

Sandbox works as a magic box that somehow processes your shaders and displays them on a canvas. All the WebGL boilerplate is handled for you.

All of this are done without limiting your creativity. Sandbox comes with default shaders and uniforms, but you can override everything as needed.

Autoplay is enabled by default, so your shader starts rendering immediately. You can pause, play, or render a single frame whenever you want.

```ts
const sandbox = Sandbox.create(canvas, {
  fragment: fragSource,
  autoplay: false,
});

sandbox.play(); // play the animation
sandbox.pause(); // pause the animation
sandbox.toggle(); // toggle play/pause
sandbox.render(); // render a single frame
```

### Shaders (what you actually write)

Shaders are the only thing you need to provide to Sandbox. Rendering program requires vertex and fragment shaders.

Sandbox comes with a default fullscreen vertex shader, so you usually don’t need to write one yourself. Default vertex shader gets automatically switch to WebGL1 or WebGL2 version depending on the context and provided fragment.

Most of the time you only need a fragment shader. Sandbox provides a default fullscreen vertex shader for you.

```ts
sandbox.setFragment(fragmentSource);
```

When you need a custom vertex shader (rare, but useful for special geometry):

```ts
sandbox.setShader(vertexSource, fragmentSource);
```

### Uniforms (how you control the shader)

Uniforms are the main way to feed data into your shader. Sandbox makes them **type‑safe** and **chainable**.

Set a single uniform:

```ts
sandbox.setUniform<number>("u_intensity", 0.8);
```

Set multiple uniforms with explicit types:

```ts
interface MyUniforms extends UniformSchema {
  u_intensity: number;
  u_colors: Vec3[];
}

sandbox.setUniforms<MyUniforms>({
  u_intensity: 0.75,
  u_colors: [
    [1, 0.2, 0.3],
    [0.2, 0.6, 1],
  ],
});
```

Get a uniform value:

```ts
const intensity = sandbox.getUniform<number>("u_intensity");
```

> All numeric values are treated as floats. This keeps the API simple and predictable.

### Hooks

Hooks are perfect for logic for your uniforms that run every frame or to synchonize Sandbox state with reactive frameworks.

Hooks are called either before or after each render. So keep that in mind. Sometimes it matters!

```ts
const remove = sandbox.hook(({ time }) => {
  const intensity = (Math.sin(time) + 1) / 2;
  sandbox.setUniform("u_intensity", intensity);
}, "before");

// To remove the hook later:
remove();
```

When you need to run logic only once. You can set the hook to auto-remove itself when returning false:

```ts
sandbox.hook(({ time }) => {
  console.log(time);
  if (time > 5) return false; // remove hook after 5 seconds
}, "after");
```

You can also use hooks to sync Sandbox state with external systems:

```ts
const playing = ref(false);

sandbox.hook(() => {
  playing.value = sandbox.value?.isPlaying() || false;
}, "after");
```

### Cleanup

Always cleanup when you’re done:

```ts
sandbox.destroy();

// or in frameworks like Vue:
onUnmounted(() => {
  sandbox.destroy();
});
```

## Built‑in uniforms (automatic)

If your shader declares any of these, Sandbox fills them for you on every frame — no manual setup needed:

| Uniform        | Type  | Description                 |
| -------------- | ----- | --------------------------- |
| `u_resolution` | vec2  | Canvas size in pixels       |
| `u_time`       | float | Elapsed time (seconds)      |
| `u_delta`      | float | Delta time since last frame |
| `u_mouse`      | vec2  | Mouse position in canvas    |
| `u_frame`      | int   | Frame counter               |

## Error handling

Sandbox handles errors internally and reports them via a single, friendly callback. This means you don’t need `try/catch` for normal use — just provide a fallback if you want one.

```ts
Sandbox.create(canvas, {
  fragment: shader,
  onError: (error) => {
    console.error(error.message);
  },
});
```

## Options

```typescript
interface SandboxOptions {
  /** Vertex shader source code (save version fragment) */
  vertex?: string;
  /** Fragment shader source code (save version vertex) */
  fragment?: string;
  /** Auto-play the sandbox on creation (default: true) */
  autoplay?: boolean;
  /** Pause rendering when canvas not visible (default: true) */
  pauseWhenHidden?: boolean;
  /** Device pixel ratio - "auto" uses window.devicePixelRatio (default: "auto") */
  dpr?: number | "auto";
  /** Preserve drawing buffer for screenshots (default: false) */
  preserveDrawingBuffer?: boolean;
  /** Enable antialiasing (default: true) */
  antialias?: boolean;
  /** Error callback for shader compilation or runtime errors */
  onError?: (error: SandboxError) => void;
  /** Callback when sandbox is ready */
  onLoad?: () => void;
  /** Callback called each frame before render */
  onBeforeRender?: HookCallback | null;
  /** Callback called each frame after render */
  onAfterRender?: HookCallback | null;
  /** Initial uniforms to set */
  uniforms?: UniformSchema;
}
```

## WebGL version detection

- `#version 300 es` → WebGL2
- no version directive → WebGL1

If WebGL2 is not available, Sandbox falls back to WebGL1 automatically.

## Limitations (by design)

- No textures (planned, not included)
- No multi‑pass rendering
- No 3D scene graph

If you need a full engine, reach for three.js. For clean shader‑only effects, Sandbox is a joy to use.
