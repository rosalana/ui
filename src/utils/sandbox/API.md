# Sandbox API Reference

## Overview

Sandbox je lightweight WebGL wrapper navržený pro jednoduché shader efekty - gradienty, animace, vizuální efekty. Nahrazuje p5.js pro případy, kdy nepotřebujeme plnou 3D engine.

## Architektura

```
Sandbox (public API)
  └── WebGL (orchestrátor)
        ├── Program (kompilace shaderů)
        ├── Uniforms (správa uniformů)
        ├── Geometry (vertex buffery)
        └── Clock (timing animací)
```

---

## Sandbox Class

### Constructor

```typescript
new Sandbox(canvas: HTMLCanvasElement, options?: SandboxOptions)
```

**Parametry:**
- `canvas` - HTML canvas element pro rendering
- `options` - Volitelná konfigurace

**Options:**

| Property | Type | Default | Popis |
|----------|------|---------|-------|
| `vertex` | `string` | Default shader | Vertex shader source |
| `fragment` | `string` | Default shader | Fragment shader source |
| `autoplay` | `boolean` | `true` | Automaticky spustit animaci |
| `pauseWhenHidden` | `boolean` | `true` | Pozastavit když canvas není vidět |
| `dpr` | `number \| "auto"` | `"auto"` | Device pixel ratio |
| `preserveDrawingBuffer` | `boolean` | `false` | Pro screenshoty |
| `antialias` | `boolean` | `true` | Antialiasing |
| `onError` | `(error: SandboxError) => void` | `console.error` | Error callback |
| `onLoad` | `() => void` | `() => {}` | Load callback |
| `onBeforeRender` | `RenderCallback` | `null` | Před každým renderem |
| `onAfterRender` | `RenderCallback` | `null` | Po každém renderu |
| `uniforms` | `Record<string, AnyUniformValue>` | `{}` | Počáteční uniformy |

---

## Metody

### Uniform API

#### `setUniform(name, value)`

Nastaví jednu uniform proměnnou.

```typescript
sandbox.setUniform(name: string, value: AnyUniformValue): this
```

**Příklady:**
```typescript
// Float
sandbox.setUniform("u_time", 1.5);

// Vec2
sandbox.setUniform("u_resolution", [800, 600]);

// Vec3
sandbox.setUniform("u_color", [1.0, 0.5, 0.0]);

// Vec4
sandbox.setUniform("u_rect", [0, 0, 100, 100]);

// Int (jako number - WebGL rozpozná z shaderu)
sandbox.setUniform("u_count", 5);

// Boolean
sandbox.setUniform("u_enabled", true);

// Array of Vec3
sandbox.setUniform("u_colors", [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

// Array of Vec2
sandbox.setUniform("u_positions", [[0.3, 0.5], [0.7, 0.2]]);
```

#### `setUniforms(uniforms)`

Nastaví více uniformů najednou.

```typescript
sandbox.setUniforms(uniforms: Record<string, AnyUniformValue>): this
```

**Příklad:**
```typescript
sandbox.setUniforms({
  u_resolution: [800, 600],
  u_time: 1.5,
  u_bgColor: [0.9, 0.9, 0.95],
  u_colors: [[1, 0, 0], [0, 1, 0]],
  u_positions: [[0.3, 0.5], [0.7, 0.3]],
  u_numberPoints: 2,
});
```

#### `getUniform(name)`

Vrátí aktuální hodnotu uniformu.

```typescript
sandbox.getUniform(name: string): AnyUniformValue | undefined
```

---

### Shader API

#### `setShader(vertex, fragment)`

Změní shadery za běhu.

```typescript
sandbox.setShader(vertex: string, fragment: string): this
```

#### `setFragmentShader(fragment)`

Změní pouze fragment shader (použije default vertex).

```typescript
sandbox.setFragmentShader(fragment: string): this
```

---

### Playback API

#### `play()`

Spustí animační smyčku.

```typescript
sandbox.play(): this
```

#### `pause()`

Pozastaví animační smyčku.

```typescript
sandbox.pause(): this
```

#### `togglePlay()`

Přepne mezi play/pause.

```typescript
sandbox.togglePlay(): this
```

#### `render()`

Vykreslí jeden snímek (pro statické renderování).

```typescript
sandbox.render(): this
```

**Použití:**
```typescript
// Pro statické obrázky - nepotřebujeme animaci
const sandbox = new Sandbox(canvas, { autoplay: false });
sandbox.setUniforms({ ... }).render();
```

#### `renderAt(time)`

Vykreslí snímek s konkrétním časem (pro deterministický výstup).

```typescript
sandbox.renderAt(time: number): this
```

**Použití:**
```typescript
// Vždy stejný výsledek pro stejný čas
sandbox.renderAt(2.5);
```

---

### State API

#### `isPlaying`

Getter - vrací zda běží animace.

```typescript
sandbox.isPlaying: boolean
```

#### `webglVersion`

Getter - vrací verzi WebGL (1 nebo 2).

```typescript
sandbox.webglVersion: WebGLVersion // 1 | 2
```

#### `canvasElement`

Getter - vrací canvas element.

```typescript
sandbox.canvasElement: HTMLCanvasElement
```

---

### Lifecycle

#### `destroy()`

Uvolní všechny zdroje.

```typescript
sandbox.destroy(): void
```

**Důležité:** Vždy volat při unmount komponenty!

```typescript
onUnmounted(() => {
  sandbox.destroy();
});
```

---

## Typy

### Uniform Value Types

```typescript
// Skaláry
type GLSLFloat = number;
type GLSLInt = number;
type GLSLBool = boolean;

// Vektory (readonly tuples pro type safety)
type Vec2 = readonly [number, number];
type Vec3 = readonly [number, number, number];
type Vec4 = readonly [number, number, number, number];

// Matice
type Mat3 = readonly [/* 9 numbers */];
type Mat4 = readonly [/* 16 numbers */];

// Array uniformy
type UniformArrayValue =
  | readonly number[]      // float[]
  | readonly Vec2[]        // vec2[]
  | readonly Vec3[]        // vec3[]
  | readonly Vec4[];       // vec4[]

// Kombinovaný typ
type AnyUniformValue = UniformValue | UniformArrayValue;
```

### Clock State

```typescript
interface ClockState {
  time: number;   // Celkový čas v sekundách
  delta: number;  // Delta čas od posledního framu
  frame: number;  // Číslo framu
}
```

### Render Callback

```typescript
type RenderCallback = (clock: ClockState) => void;
```

---

## Built-in Uniformy

Tyto uniformy jsou automaticky nastaveny, pokud existují v shaderu:

| Uniform | Typ | Popis |
|---------|-----|-------|
| `u_resolution` | `vec2` | Rozměry canvasu v pixelech |
| `u_time` | `float` | Čas v sekundách od startu |
| `u_delta` | `float` | Delta čas od posledního framu |
| `u_mouse` | `vec2` | Pozice myši v canvas souřadnicích |
| `u_frame` | `int` | Číslo framu |

---

## Error Handling

### Error Types

```typescript
// Base error
class SandboxError extends Error {
  code: SandboxErrorCode;
}

// WebGL kontext nelze vytvořit
class ContextError extends SandboxError {
  // code: "WEBGL_NOT_SUPPORTED" | "CONTEXT_CREATION_FAILED"
}

// Chyba kompilace shaderu
class ShaderCompilationError extends SandboxError {
  shaderType: "vertex" | "fragment";
  source: string;
  infoLog: string;
  lines: number[];  // Čísla řádků s chybami
}

// Chyba linkování programu
class ProgramLinkError extends SandboxError {
  infoLog: string;
}
```

### Použití

```typescript
import Sandbox, { ShaderCompilationError } from "@/utils/sandbox";

try {
  const sandbox = new Sandbox(canvas, { fragment: badShader });
} catch (error) {
  if (error instanceof ShaderCompilationError) {
    console.error("Chyba na řádcích:", error.lines);
    console.error("Detail:", error.infoLog);
  }
}
```

Nebo přes callback:

```typescript
const sandbox = new Sandbox(canvas, {
  fragment: shader,
  onError: (error) => {
    if (error instanceof ShaderCompilationError) {
      showErrorUI(error.lines, error.infoLog);
    }
  },
});
```

---

## Chainable API

Všechny metody (kromě getterů) vrací `this` pro řetězení:

```typescript
sandbox
  .setUniform("u_time", 1.5)
  .setUniforms({ u_color: [1, 0, 0] })
  .render();

sandbox
  .pause()
  .setFragmentShader(newShader)
  .play();
```

---

## WebGL Version Detection

Sandbox automaticky detekuje verzi WebGL podle shaderů:

- `#version 300 es` → WebGL2
- Bez version directive → WebGL1

Pokud WebGL2 není dostupné, automaticky fallback na WebGL1.

---

# Použití v useGradient

## Současný stav (p5.js)

```typescript
// useGradient/index.ts - SOUČASNÝ KÓD
import p5 from "p5";

async function _draw(w: number, h: number, canvasEl: HTMLCanvasElement | null = null) {
  return new Promise((resolve) => {
    const sketch = (p: p5) => {
      let shader: p5.Shader;

      p.setup = () => {
        p.pixelDensity(1);
        p.createCanvas(w, h, p.WEBGL);
        shader = p.createShader(vertSource, fragSource);
        p.noStroke();
        p.noLoop();
      };

      p.draw = () => {
        p.background(0);
        shader.setUniform("u_resolution", [p.width, p.height]);
        shader.setUniform("u_time", seed.next() * 100 + (progress / 100) * 10);
        shader.setUniform("u_bgColor", toRgb(seed.background()));
        // ... další uniformy ...
        p.shader(shader);
        p.rect(0, 0, p.width, p.height);
        resolve(container?.querySelector("canvas"));
      };
    };

    p5Instance = new p5(sketch, container!);
  });
}
```

## Nový stav (Sandbox)

```typescript
// useGradient/index.ts - NOVÝ KÓD
import Sandbox from "@/utils/sandbox";

async function _draw(w: number, h: number, canvasEl: HTMLCanvasElement | null = null) {
  // Vytvoř canvas pokud není poskytnut
  const canvas = canvasEl ?? document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  // Vytvoř Sandbox
  const sandbox = new Sandbox(canvas, {
    vertex: vertSource,
    fragment: fragSource,
    autoplay: false,  // Statický render
    preserveDrawingBuffer: true,  // Pro toDataURL/toBlob
  });

  // Nastav uniformy
  const colors = seed.colors().map(toRgb);
  const colorsPadded = Array.from({ length: 10 }, (_, i) => colors[i] || [0, 0, 0]);

  const positions = seed.positions();
  const positionsPadded = Array.from({ length: 10 }, (_, i) => {
    const x = positions[i * 2];
    const y = positions[i * 2 + 1];
    return [x ?? 0, y ?? 0];
  });

  sandbox.setUniforms({
    u_resolution: [w, h],
    u_time: seed.next() * 100 + (progress / 100) * 10,
    u_bgColor: toRgb(seed.background()),
    u_colors: colorsPadded,
    u_positions: positionsPadded,
    u_numberPoints: seed.points(),
    u_warpSize: WARP_SIZE,
    u_warpRatio: WARP_RADIUS,
    u_noiseRatio: NOISE_RATIO,
    u_mouse: [0, 0],
  });

  // Renderuj jeden frame
  sandbox.render();

  // Vrať canvas a cleanup funkci
  return {
    canvas,
    destroy: () => sandbox.destroy(),
  };
}
```

## Porovnání

| Aspekt | p5.js | Sandbox |
|--------|-------|---------|
| Bundle size | ~800KB | ~5KB |
| API | Callback-based, imperativní | Fluent, deklarativní |
| TypeScript | Částečný | Strict |
| Kontrola | Skrytá logika | Plná kontrola |
| Závislosti | p5.js | Žádné |
| WebGL verze | Vždy WebGL1 | Auto-detect |

## Klíčové změny

1. **Žádný container div** - Sandbox renderuje přímo do canvasu
2. **Synchronní API** - Není potřeba Promise pro setup
3. **Explicitní cleanup** - `sandbox.destroy()` místo `p5Instance.remove()`
4. **Přímá kontrola** - Uniformy se nastavují přímo, ne přes shader objekt
5. **Preservování bufferu** - `preserveDrawingBuffer: true` pro `toDataURL()`

## Kompletní příklad useGradient refaktoru

```typescript
import Sandbox from "@/utils/sandbox";
import vertSource from "./shaders/shader.vert?raw";
import fragSource from "./shaders/shader.frag?raw";

export function useGradient(options: GradientOptions) {
  const { seed: s, canvas, progress = 100, onRender, onError } = options;

  let sandbox: Sandbox | null = null;
  let seed: Seed | null = null;

  function init() {
    seed = new Seed(s);
  }

  init();

  async function render(): Promise<void> {
    const canvasEl = canvas?.value;
    if (!canvasEl) {
      throw new Error("Canvas element required");
    }

    const { w, h } = getCanvasDimensions(canvasEl);

    // Cleanup previous
    sandbox?.destroy();

    // Create new sandbox
    sandbox = new Sandbox(canvasEl, {
      vertex: vertSource,
      fragment: fragSource,
      autoplay: false,
      preserveDrawingBuffer: true,
      onError,
    });

    // Set uniforms
    sandbox.setUniforms(buildUniforms(seed!, w, h, progress));

    // Render
    sandbox.render();

    onRender?.();
  }

  async function toImage(w = 500, h = 500, format: "png" | "jpeg" | "webp" = "png"): Promise<string> {
    const tempCanvas = document.createElement("canvas");
    const tempSandbox = new Sandbox(tempCanvas, {
      vertex: vertSource,
      fragment: fragSource,
      autoplay: false,
      preserveDrawingBuffer: true,
    });

    tempSandbox
      .setUniforms(buildUniforms(seed!, w, h, progress))
      .render();

    const image = tempCanvas.toDataURL(`image/${format}`);
    tempSandbox.destroy();

    return image;
  }

  async function toBlob(w = 500, h = 500, format: "png" | "jpeg" | "webp" = "png", quality?: number): Promise<Blob> {
    const tempCanvas = document.createElement("canvas");
    const tempSandbox = new Sandbox(tempCanvas, {
      vertex: vertSource,
      fragment: fragSource,
      autoplay: false,
      preserveDrawingBuffer: true,
    });

    tempSandbox
      .setUniforms(buildUniforms(seed!, w, h, progress))
      .render();

    return new Promise<Blob>((resolve, reject) => {
      tempCanvas.toBlob(
        (blob) => {
          tempSandbox.destroy();
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        },
        `image/${format}`,
        quality,
      );
    });
  }

  function destroy(): void {
    sandbox?.destroy();
    sandbox = null;
  }

  return { render, toImage, toBlob, destroy };
}

// Helper function
function buildUniforms(seed: Seed, w: number, h: number, progress: number) {
  const colors = seed.colors().map(toRgb);
  const colorsPadded = Array.from({ length: 10 }, (_, i) => colors[i] || [0, 0, 0]);

  const positions = seed.positions();
  const positionsPadded = Array.from({ length: 10 }, (_, i) => [
    positions[i * 2] ?? 0,
    positions[i * 2 + 1] ?? 0,
  ]);

  return {
    u_resolution: [w, h] as const,
    u_time: seed.next() * 100 + (progress / 100) * 10,
    u_bgColor: toRgb(seed.background()),
    u_colors: colorsPadded,
    u_positions: positionsPadded,
    u_numberPoints: seed.points(),
    u_warpSize: WARP_SIZE,
    u_warpRatio: WARP_RADIUS,
    u_noiseRatio: NOISE_RATIO,
    u_mouse: [0, 0] as const,
  };
}
```

---

## Shrnutí

Sandbox poskytuje:
- ✅ Čistý TypeScript s strict typy
- ✅ Fluent/chainable API
- ✅ Automatická detekce WebGL verze
- ✅ Zero dependencies
- ✅ Malý bundle size (~5KB vs 800KB p5.js)
- ✅ Jednoduché API pro běžné use-cases
- ✅ Rozšiřitelná architektura pro budoucí features (textury, atd.)
