import { ResolvedSandboxOptions } from "../types";
import Clock from "./clock";
import Geometry from "./geometry";
import Program from "./program";
import Uniforms from "./uniforms";

export default class WebGL {
  private gl!: WebGLRenderingContext;
  private program!: Program;
  private geometry!: Geometry;
  private uniforms!: Uniforms;
  private clock!: Clock;

  playing: boolean = false;

  constructor(canvas: HTMLCanvasElement, options: ResolvedSandboxOptions) {
    const gl =
      canvas.getContext("webgl2", {
        antialias: options.antialias,
        preserveDrawingBuffer: options.preserveDrawingBuffer,
      }) ||
      canvas.getContext("webgl", {
        antialias: options.antialias,
        preserveDrawingBuffer: options.preserveDrawingBuffer,
      });

    if (!gl) {
      throw new Error("WebGL is not supported in this environment.");
    }

    this.gl = gl;
  }

  static setup(
    canvas: HTMLCanvasElement,
    options: ResolvedSandboxOptions,
  ): WebGL {
    const webgl = new WebGL(canvas, options);

    // init everything i guess

    if (options.vertex && options.fragment) {
      // Initialize shaders
    }

    // now it should be ready to play

    return webgl;
  }

  viewport(x: number, y: number, width: number, height: number) {
    this.gl.viewport(x, y, width, height);
  }

  resolution(width: number, height: number) {
    this.uniform("u_resolution", [width, height]);
  }

  mouse(x: number, y: number) {
    this.uniform("u_mouse", [x, y]);
  }

  uniform(name: string, value: any) {
    //
  }

  shader(vertex: string, fragment: string) {
    //
  }

  play() {
    //
  }

  pause() {}

  destroy() {
    //
  }
}
