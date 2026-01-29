import type { SandboxError } from "./errors";

// ============================================================================
// WebGL Types
// ============================================================================

/** WebGL version (1 = WebGL, 2 = WebGL2) */
export type WebGLVersion = 1 | 2;

/** Union of WebGL context types */
export type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;

// ============================================================================
// Uniform Types
// ============================================================================

/** Vector types as readonly tuples for type safety */
export type Vec2 = readonly [number, number];
export type Vec3 = readonly [number, number, number];
export type Vec4 = readonly [number, number, number, number];

/** Matrix types (column-major, as WebGL expects) */
export type Mat2 = readonly [number, number, number, number];
export type Mat3 = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];
export type Mat4 = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

/** Single uniform value types */
export type UniformValue = number | boolean | Vec2 | Vec3 | Vec4 | Mat2 | Mat3 | Mat4;

/** Array uniform types (for u_colors[10], u_positions[10], etc.) */
export type UniformArrayValue =
  | readonly number[]
  | readonly Vec2[]
  | readonly Vec3[]
  | readonly Vec4[];

/** Combined uniform value type */
export type AnyUniformValue = UniformValue | UniformArrayValue;

/** WebGL uniform setter method names */
export type UniformMethod =
  | "uniform1f"
  | "uniform1i"
  | "uniform1fv"
  | "uniform2fv"
  | "uniform3fv"
  | "uniform4fv"
  | "uniformMatrix2fv"
  | "uniformMatrix3fv"
  | "uniformMatrix4fv";

// ============================================================================
// Clock Types
// ============================================================================

/** Clock state passed to render callbacks */
export interface ClockState {
  /** Total elapsed time in seconds */
  time: number;
  /** Delta time since last frame in seconds */
  delta: number;
  /** Frame counter */
  frame: number;
}

/** Render callback signature */
export type RenderCallback = (clock: ClockState) => void;

// ============================================================================
// Options Types
// ============================================================================

/** Sandbox configuration options */
export interface SandboxOptions {
  /** Vertex shader source code */
  vertex?: string;
  /** Fragment shader source code */
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
  onBeforeRender?: RenderCallback;
  /** Callback called each frame after render */
  onAfterRender?: RenderCallback;
  /** Initial uniforms to set */
  uniforms?: Record<string, AnyUniformValue>;
}

/** Resolved sandbox options with all defaults applied */
export type ResolvedSandboxOptions = Required<
  Omit<SandboxOptions, "uniforms" | "onBeforeRender" | "onAfterRender">
> & {
  uniforms: Record<string, AnyUniformValue>;
  onBeforeRender: RenderCallback | null;
  onAfterRender: RenderCallback | null;
};

// ============================================================================
// Internal Types
// ============================================================================

/** Internal uniform entry for caching */
export interface UniformEntry {
  name: string;
  location: WebGLUniformLocation | null;
  method: UniformMethod;
  value: AnyUniformValue;
  isArray: boolean;
  needsTranspose: boolean;
}

/** Geometry draw mode */
export type DrawMode = "TRIANGLES" | "TRIANGLE_STRIP" | "TRIANGLE_FAN";
