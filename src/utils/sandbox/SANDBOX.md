# Sandbox - WebGL Wrapper

Lightweight, type-safe WebGL wrapper for simple shader rendering (gradients, animations, effects). An alternative to p5.js/three.js for non-complex use cases.

## Design Principles

1. **Pure TypeScript** - strict types, no external dependencies
2. **Simple API** - Laravel-style fluent interface
3. **Lightweight** - focus on common use cases, not a full 3D engine
4. **Extensible** - plug-and-play architecture for future features (textures, etc.)
5. **Clear errors** - wrap WebGL errors with helpful messages

## Architecture

```
Sandbox (public API)
  └── WebGL (orchestrator)
        ├── Program (shader compilation)
        ├── Uniforms (uniform management)
        ├── Geometry (vertex buffers)
        └── Clock (animation timing)
```

## Usage

### Static Rendering (like useGradient)

```typescript
import Sandbox from "@/utils/sandbox";

const sandbox = new Sandbox(canvas, {
  vertex: vertSource,
  fragment: fragSource,
  autoplay: false,
});

sandbox.setUniforms({
  u_resolution: [800, 600],
  u_time: 1.5,
  u_bgColor: [0.9, 0.9, 0.95],
  u_colors: [[1, 0, 0], [0, 1, 0]],
  u_positions: [[0.3, 0.5], [0.7, 0.3]],
  u_numberPoints: 2,
}).render();

sandbox.destroy();
```

### Animation Loop

```typescript
const sandbox = new Sandbox(canvas, {
  fragment: fragSource,
  autoplay: true,
  onBeforeRender: ({ time }) => {
    sandbox.setUniform("u_phase", Math.sin(time));
  },
});

// Pause/resume
sandbox.pause();
sandbox.play();
sandbox.togglePlay();

// Cleanup
sandbox.destroy();
```

### Chainable API

```typescript
sandbox
  .setUniform("u_time", 1.5)
  .setUniforms({ u_colors: [[1,0,0], [0,1,0]] })
  .render();
```

## Options

```typescript
interface SandboxOptions {
  /** Vertex shader source code */
  vertex?: string;
  /** Fragment shader source code */
  fragment?: string;
  /** Auto-play on creation (default: true) */
  autoplay?: boolean;
  /** Pause when canvas not visible (default: true) */
  pauseWhenHidden?: boolean;
  /** Device pixel ratio (default: "auto") */
  dpr?: number | "auto";
  /** Preserve buffer for screenshots (default: false) */
  preserveDrawingBuffer?: boolean;
  /** Antialiasing (default: true) */
  antialias?: boolean;
  /** Error callback */
  onError?: (error: SandboxError) => void;
  /** Load callback */
  onLoad?: () => void;
  /** Before render callback */
  onBeforeRender?: (clock: ClockState) => void;
  /** After render callback */
  onAfterRender?: (clock: ClockState) => void;
}
```

## Uniform Types

TypeScript tuple types for type safety:

```typescript
type Vec2 = readonly [number, number];
type Vec3 = readonly [number, number, number];
type Vec4 = readonly [number, number, number, number];

// Examples
sandbox.setUniform("u_time", 1.5);                        // float
sandbox.setUniform("u_resolution", [800, 600]);           // vec2
sandbox.setUniform("u_color", [1, 0, 0]);                 // vec3
sandbox.setUniform("u_colors", [[1,0,0], [0,1,0]]);       // vec3[]
sandbox.setUniform("u_count", 5);                         // int (inferred)
```

## Built-in Uniforms

These uniforms are automatically set if present in the shader:

| Uniform | Type | Description |
|---------|------|-------------|
| `u_resolution` | vec2 | Canvas dimensions in pixels |
| `u_time` | float | Elapsed time in seconds |
| `u_delta` | float | Delta time since last frame |
| `u_mouse` | vec2 | Mouse position in canvas coordinates |
| `u_frame` | int | Frame counter |

## Error Handling

Typed errors with clear messages:

```typescript
try {
  const sandbox = new Sandbox(canvas, { fragment: badShader });
} catch (error) {
  if (error instanceof ShaderCompilationError) {
    console.log("Shader error at lines:", error.lines);
    console.log("Info log:", error.infoLog);
  }
}
```

## WebGL Version

Automatically detected from shader source:

- `#version 300 es` → WebGL2
- No version directive → WebGL1

Falls back to WebGL1 if WebGL2 is not available.

## File Structure

```
src/utils/sandbox/
├── index.ts          # Sandbox class (public API)
├── types.ts          # TypeScript types
├── errors.ts         # Error classes
├── shaders/
│   ├── shader.vert   # Default vertex shader
│   └── shader.frag   # Default fragment shader
└── tools/
    ├── web_gl.ts     # WebGL orchestrator
    ├── program.ts    # Shader compilation
    ├── uniforms.ts   # Uniform collection
    ├── uniform.ts    # Single uniform handler
    ├── geometry.ts   # Vertex buffers
    ├── clock.ts      # Animation timing
    └── listener.ts   # Event helpers
```

## Out of Scope (v1)

- Texture support (designed for, not implemented)
- Multi-pass rendering / framebuffers
- 3D geometry / matrix transforms
- Complex mouse interactions
