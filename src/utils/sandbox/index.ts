import type {
  AnyUniformValue,
  ResolvedSandboxOptions,
  SandboxOptions,
  WebGLVersion,
} from "./types";
import type { SandboxError } from "./errors";

import defaultVert from "./shaders/shader.vert?raw";
import defaultFrag from "./shaders/shader.frag?raw";

import Listener from "./tools/listener";
import WebGL from "./tools/web_gl";

export * from "./types";
export * from "./errors";

/**
 * Sandbox - A lightweight WebGL wrapper for shader effects.
 *
 * @example
 * // Static rendering
 * const sandbox = new Sandbox(canvas, {
 *   fragment: myShader,
 *   autoplay: false,
 * });
 * sandbox.setUniforms({ u_time: 1.5 }).render();
 *
 * @example
 * // Animation loop
 * const sandbox = new Sandbox(canvas, {
 *   fragment: myShader,
 *   autoplay: true,
 * });
 */
export default class Sandbox {
  /** Active event listeners */
  private listeners: (() => void)[] = [];
  /** HTML canvas element */
  private canvas: HTMLCanvasElement;
  /** Resolved options */
  private options: ResolvedSandboxOptions;
  /** WebGL engine */
  private engine: WebGL;

  constructor(canvas: HTMLCanvasElement, options?: SandboxOptions) {
    this.canvas = canvas;
    this.options = this.resolveOptions(options);

    this.engine = WebGL.setup(this.canvas, this.options);

    this.setupListeners();
    this.setViewport();

    this.options.onLoad();

    if (this.options.autoplay) {
      this.play();
    }
  }

  // ===========================================================================
  // Options
  // ===========================================================================

  private resolveOptions(options?: SandboxOptions): ResolvedSandboxOptions {
    return {
      vertex: options?.vertex ?? defaultVert,
      fragment: options?.fragment ?? defaultFrag,
      autoplay: options?.autoplay ?? true,
      pauseWhenHidden: options?.pauseWhenHidden ?? true,
      dpr: options?.dpr ?? "auto",
      preserveDrawingBuffer: options?.preserveDrawingBuffer ?? false,
      antialias: options?.antialias ?? true,
      onError: options?.onError ?? ((error: SandboxError) => console.error(error)),
      onLoad: options?.onLoad ?? (() => {}),
      onBeforeRender: options?.onBeforeRender ?? null,
      onAfterRender: options?.onAfterRender ?? null,
      uniforms: options?.uniforms ?? {},
    };
  }

  // ===========================================================================
  // Event Listeners
  // ===========================================================================

  private setupListeners(): void {
    this.listeners.push(
      // Window resize
      Listener.on(window, "resize", () => {
        this.setViewport();
      }),

      // Canvas resize
      Listener.on(this.canvas, "resize", () => {
        this.setViewport();
      }),

      // Visibility check on scroll
      Listener.on(document, "scroll", () => {
        if (!this.options.pauseWhenHidden) return;

        if (this.isInViewport()) {
          this.play();
        } else {
          this.pause();
        }
      }),

      // Mouse tracking
      Listener.on(document, "mousemove", (e) => {
        this.updateMouse(e.clientX || e.pageX, e.clientY || e.pageY);
      }),
    );
  }

  private destroyListeners(): void {
    this.listeners.forEach((off) => off());
    this.listeners = [];
  }

  private setViewport(): void {
    const dpr =
      this.options.dpr === "auto"
        ? Math.min(2, window.devicePixelRatio || 1)
        : this.options.dpr;

    const cssW = this.canvas.clientWidth || this.canvas.width || 1;
    const cssH = this.canvas.clientHeight || this.canvas.height || 1;

    this.engine.viewport(
      0,
      0,
      Math.max(1, Math.floor(cssW * dpr)),
      Math.max(1, Math.floor(cssH * dpr)),
    );
  }

  private isInViewport(): boolean {
    const rect = this.canvas.getBoundingClientRect();

    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  private updateMouse(x: number, y: number): void {
    const rect = this.canvas.getBoundingClientRect();
    const inCanvas =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (inCanvas) {
      this.engine.setMouse(x - rect.left, y - rect.top);
    }
  }

  // ===========================================================================
  // Uniform API
  // ===========================================================================

  /**
   * Set a single uniform value.
   * @example
   * sandbox.setUniform("u_time", 1.5);
   * sandbox.setUniform("u_color", [1, 0, 0]);
   */
  setUniform(name: string, value: AnyUniformValue): this {
    this.engine.uniform(name, value);
    return this;
  }

  /**
   * Set multiple uniforms at once.
   * @example
   * sandbox.setUniforms({
   *   u_time: 1.5,
   *   u_resolution: [800, 600],
   *   u_colors: [[1, 0, 0], [0, 1, 0]],
   * });
   */
  setUniforms(uniforms: Record<string, AnyUniformValue>): this {
    this.engine.setUniforms(uniforms);
    return this;
  }

  /**
   * Get current uniform value.
   */
  getUniform(name: string): AnyUniformValue | undefined {
    return this.engine.getUniform(name);
  }

  // ===========================================================================
  // Shader API
  // ===========================================================================

  /**
   * Update shaders.
   * @example
   * sandbox.setShader(vertexSource, fragmentSource);
   */
  setShader(vertex: string, fragment: string): this {
    this.engine.shader(vertex, fragment);
    return this;
  }

  /**
   * Update only fragment shader (uses default vertex).
   * @example
   * sandbox.setFragmentShader(fragmentSource);
   */
  setFragmentShader(fragment: string): this {
    this.engine.shader(defaultVert, fragment);
    return this;
  }

  // ===========================================================================
  // Playback API
  // ===========================================================================

  /**
   * Start animation loop.
   */
  play(): this {
    this.engine.play();
    return this;
  }

  /**
   * Stop animation loop.
   */
  pause(): this {
    this.engine.pause();
    return this;
  }

  /**
   * Toggle play/pause state.
   */
  togglePlay(): this {
    if (this.engine.playing) {
      this.pause();
    } else {
      this.play();
    }
    return this;
  }

  /**
   * Render a single frame (for static rendering).
   * @example
   * sandbox.setUniforms({ u_time: 1.5 }).render();
   */
  render(): this {
    this.engine.render();
    return this;
  }

  /**
   * Render at specific time (for deterministic output).
   * @example
   * sandbox.renderAt(2.5); // Render as if 2.5 seconds elapsed
   */
  renderAt(time: number): this {
    this.engine.renderAt(time);
    return this;
  }

  // ===========================================================================
  // State API
  // ===========================================================================

  /**
   * Check if currently playing.
   */
  get isPlaying(): boolean {
    return this.engine.playing;
  }

  /**
   * Get WebGL version (1 or 2).
   */
  get webglVersion(): WebGLVersion {
    return this.engine.getVersion();
  }

  /**
   * Get canvas element.
   */
  get canvasElement(): HTMLCanvasElement {
    return this.canvas;
  }

  // ===========================================================================
  // Lifecycle
  // ===========================================================================

  /**
   * Destroy sandbox and release all resources.
   * @example
   * onUnmounted(() => {
   *   sandbox.destroy();
   * });
   */
  destroy(): void {
    this.destroyListeners();
    this.engine.destroy();
  }
}
