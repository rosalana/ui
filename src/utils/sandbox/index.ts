import { ResolvedSandboxOptions, SandboxOptions } from "./types";

import defaultVert from "./shaders/shader.vert?raw";
import defaultFrag from "./shaders/shader.frag?raw";

import Listener from "./tools/listener";
import WebGL from "./tools/web_gl";

export * from "./types";

export default class Sandbox {
  /** list of active event listeners */
  private listeners: (() => void)[] = [];
  /** HTML canvas element for rendering */
  private canvas: HTMLCanvasElement;
  /** Resolved sandbox options */
  private options: ResolvedSandboxOptions;
  /** WebGL rendering engine */
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

    return this;
  }

  private resolveOptions(options?: SandboxOptions): ResolvedSandboxOptions {
    const defaults = {
      vertex: defaultVert,
      fragment: defaultFrag,
      autoplay: true,
      pauseWhenHidden: true,
      dpr: "auto" as const,
      preserveDrawingBuffer: false,
      antialias: true,
      onError: (error: Error) => console.error(error),
      onLoad: () => {},
    };

    return { ...defaults, ...options };
  }

  private setupListeners() {
    this.listeners.push(
      // Window resize listener
      Listener.on(window, "resize", () => {
        this.setViewport();
      }),

      // Canvas resize listener
      Listener.on(this.canvas, "resize", () => {
        this.setViewport();
      }),

      // Document scroll listener to check if canvas is in viewport
      Listener.on(document, "scroll", () => {
        if (!this.options.pauseWhenHidden) return;

        if (this.isInViewport()) {
          this.play();
        } else {
          this.pause();
        }
      }),

      // Mouse move listener
      Listener.on(document, "mousemove", (e) => {
        this.setMouse(e.clientX || e.pageX, e.clientY || e.pageY);
      }),
    );
  }

  private destroyListeners() {
    this.listeners.forEach((off) => off());
    this.listeners = [];
  }

  private setViewport(): void {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
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

  private setMouse(x: number, y: number) {
    const rect = this.canvas.getBoundingClientRect();
    const inCanvas =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (inCanvas) {
      this.engine.mouse(x - rect.left, y - rect.top);
    }
  }

  /**
   * Sets a uniform variable in the shader program.
   * @param name - The name of the uniform variable.
   * @param value - The value to set for the uniform variable.
   * @example
   * sandbox.setUniform("u_var", 1.0);
   * sandbox.setUniform("u_var2", [800, 600]);
   *
   * @returns void
   */
  setUniform(name: string, value: any): void {
    this.engine.uniform(name, value);
  }

  /**
   * Sets multiple uniform variables in the shader program.
   * @param uniforms - An object containing uniform variable names and their corresponding values.
   * @example
   * sandbox.setUniforms({
   *   u_var: 1.0,
   *   u_var2: [800, 600],
   * });
   *
   * @returns void
   */
  setUniforms(uniforms: Record<string, any>): void {
    for (const name in uniforms) {
      this.setUniform(name, uniforms[name]);
    }
  }

  /**
   * Sets the shader program using provided vertex and fragment shader source code.
   * @param vertex - The source code for the vertex shader.
   * @param fragment - The source code for the fragment shader.
   * @example
   * sandbox.setShader(vertexSource, fragmentSource);
   *
   * @returns void
   */
  setShader(vertex: string, fragment: string): void {
    this.engine.shader(vertex, fragment);
  }

  /**
   * Plays the sandbox rendering loop. If the sandbox is already playing, this has no effect.
   * @example
   * handleButtonClick() {
   *   sandbox.play();
   * }
   *
   * @returns void
   */
  play(): void {
    this.engine.play();
  }

  /**
   * Pauses the sandbox rendering loop.
   * @example
   * handleButtonClick() {
   *   sandbox.pause();
   * };
   *
   * @returns void
   */
  pause(): void {
    this.engine.pause();
  }

  /**
   * Toggles the play/pause state of the sandbox rendering loop.
   * @example
   * handleButtonClick() {
   *   sandbox.togglePlay();
   * };
   *
   * @returns void
   */
  togglePlay(): void {
    if (this.engine.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Destroys the sandbox instance, releasing all resources and event listeners.
   * @example
   * onUnmounted(() => {
   *   sandbox.destroy();
   * });
   *
   * @returns void
   */
  destroy() {
    this.destroyListeners();
    this.engine.destroy();
  }
}
