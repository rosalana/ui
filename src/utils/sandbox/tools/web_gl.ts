import type {
  AnyUniformValue,
  ClockState,
  ResolvedSandboxOptions,
  Vec2,
  WebGLContext,
  WebGLVersion,
} from "../types";
import { ContextError } from "../errors";
import Clock from "./clock";
import Geometry from "./geometry";
import Program from "./program";
import Uniforms from "./uniforms";

/**
 * Main WebGL orchestrator.
 * Manages context, program, geometry, uniforms, and rendering loop.
 */
export default class WebGL {
  private canvas: HTMLCanvasElement;
  private gl: WebGLContext;
  private program: Program;
  private geometry: Geometry;
  private uniforms: Uniforms;
  private clock: Clock;
  private options: ResolvedSandboxOptions;

  private resolution: Vec2 = [1, 1];
  private mouse: Vec2 = [0, 0];
  private version: WebGLVersion = 1;

  playing = false;

  private constructor(
    canvas: HTMLCanvasElement,
    options: ResolvedSandboxOptions,
  ) {
    this.canvas = canvas;
    this.options = options;

    // Initialize context
    this.gl = this.initContext();

    // Enable extensions
    this.enableExtensions();

    // Initialize subsystems
    this.program = new Program(this.gl);
    this.geometry = Geometry.fullscreenQuad(this.gl);
    this.uniforms = new Uniforms(this.gl);
    this.clock = new Clock();

    // Bind render method
    this.onRender = this.onRender.bind(this);
  }

  /**
   * Factory method to create and setup WebGL instance.
   */
  static setup(
    canvas: HTMLCanvasElement,
    options: ResolvedSandboxOptions,
  ): WebGL {
    const webgl = new WebGL(canvas, options);

    // Compile shaders if provided
    if (options.vertex && options.fragment) {
      webgl.shader(options.vertex, options.fragment);
    }

    // Set initial uniforms
    if (options.uniforms) {
      webgl.uniforms.setMany(options.uniforms);
    }

    return webgl;
  }

  /**
   * Initialize WebGL context.
   * Tries WebGL2 first, falls back to WebGL1.
   */
  private initContext(): WebGLContext {
    const attrs: WebGLContextAttributes = {
      antialias: this.options.antialias,
      preserveDrawingBuffer: this.options.preserveDrawingBuffer,
      alpha: true,
      depth: false,
      stencil: false,
    };

    // Try WebGL2 first
    const gl2 = this.canvas.getContext("webgl2", attrs);
    if (gl2) {
      this.version = 2;
      return gl2;
    }

    // Fallback to WebGL1
    const gl1 = this.canvas.getContext("webgl", attrs);
    if (gl1) {
      this.version = 1;
      return gl1;
    }

    // WebGL not supported
    throw new ContextError("not_supported");
  }

  /**
   * Enable useful WebGL extensions.
   */
  private enableExtensions(): void {
    // OES_standard_derivatives for dFdx/dFdy in fragment shaders
    this.gl.getExtension("OES_standard_derivatives");

    // Float textures (for future texture support)
    this.gl.getExtension("OES_texture_float");
    this.gl.getExtension("OES_texture_float_linear");

    // VAO extension for WebGL1
    if (this.version === 1) {
      this.gl.getExtension("OES_vertex_array_object");
    }
  }

  /**
   * Set viewport dimensions.
   */
  viewport(x: number, y: number, width: number, height: number): this {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(x, y, width, height);
    this.resolution = [width, height];
    return this;
  }

  /**
   * Update mouse position.
   */
  setMouse(x: number, y: number): this {
    this.mouse = [x, y];
    return this;
  }

  /**
   * Set a uniform value.
   */
  uniform(name: string, value: AnyUniformValue): this {
    this.uniforms.set(name, value);
    return this;
  }

  /**
   * Set multiple uniforms.
   */
  setUniforms(values: Record<string, AnyUniformValue>): this {
    this.uniforms.setMany(values);
    return this;
  }

  /**
   * Get current uniform value.
   */
  getUniform(name: string): AnyUniformValue | undefined {
    return this.uniforms.get(name);
  }

  /**
   * Compile and link shaders.
   */
  shader(vertex: string, fragment: string): this {
    // Compile program
    this.program.compile(vertex, fragment);

    // Update version based on shaders
    this.version = this.program.getVersion();

    // Link attributes to geometry
    this.geometry.linkAttributes(this.program);

    // Attach program to uniforms for location caching
    const webglProgram = this.program.getProgram();
    if (webglProgram) {
      this.uniforms.attachProgram(webglProgram);
    }

    return this;
  }

  /**
   * Start animation loop.
   */
  play(): this {
    if (this.playing) return this;

    this.playing = true;
    this.clock.start(this.onRender);

    return this;
  }

  /**
   * Stop animation loop.
   */
  pause(): this {
    if (!this.playing) return this;

    this.playing = false;
    this.clock.stop();

    return this;
  }

  /**
   * Render a single frame.
   */
  render(): this {
    // Use current clock state for single-shot render
    this.onRender(this.clock.getState());
    return this;
  }

  /**
   * Render at specific time (for deterministic output).
   */
  renderAt(time: number): this {
    this.clock.setTime(time);
    this.onRender(this.clock.getState());
    return this;
  }

  /**
   * Get WebGL context.
   */
  getContext(): WebGLContext {
    return this.gl;
  }

  /**
   * Get detected WebGL version.
   */
  getVersion(): WebGLVersion {
    return this.version;
  }

  /**
   * Cleanup all resources.
   */
  destroy(): void {
    this.pause();
    this.clock.destroy();
    this.geometry.destroy();
    this.program.destroy();
    this.uniforms.destroy();
  }

  /**
   * Internal render callback.
   */
  private onRender(state: ClockState): void {
    const gl = this.gl;

    // Call before render callback
    if (this.options.onBeforeRender) {
      this.options.onBeforeRender(state);
    }

    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use program
    this.program.use();

    // Upload built-in uniforms
    this.uniforms.uploadBuiltIns(state, this.resolution, this.mouse);

    // Upload all other uniforms
    this.uniforms.uploadAll();

    // Draw geometry
    this.geometry.bind();
    this.geometry.draw();

    // Call after render callback
    if (this.options.onAfterRender) {
      this.options.onAfterRender(state);
    }
  }
}
