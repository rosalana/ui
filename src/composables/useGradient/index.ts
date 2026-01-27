import type { GradientColor, GradientOptions } from "./types";
import p5 from "p5";
import { _call, getCanvasDimensions, hsl, toRgb } from "./helpers";
export * from "./types";

import vertSource from "./shaders/shader.vert?raw";
import fragSource from "./shaders/shader.frag?raw";

const WARP_SIZE: number = 0.45;
const WARP_RADIUS: number = 1;
const NOISE_RATIO: number = 0.05;

const COLORS: GradientColor[] = [
  hsl(216.26, 100, 58), // blue
  hsl(24.65, 100, 50), // orange
  hsl(356.95, 96, 58), // red
  hsl(159.74, 100, 37), // emerald
  hsl(240.98, 100, 69), // indigo
];

class Seed {
  private seed: number;
  private baseColorIndex: number = -1;

  constructor(seed?: string | number) {
    this.seed = Seed.hash(seed);
    this.baseColorIndex = Math.floor(this.next() * COLORS.length) % COLORS.length;
  }

  private static hash(seed?: string | number): number {
    if (seed === undefined) seed = Math.floor(Math.random() * 1e9);

    if (typeof seed === "string") {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return Math.abs(hash) || 1;
    }
    return seed;
  }

  public next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public baseColor(): GradientColor {
    return COLORS[this.baseColorIndex];
  }

  public colors(): GradientColor[] {
    const base = this.baseColor();

    return [
      hsl(base.h - 10, base.s * 90, base.l * 100 + 20),
      base,
    ];
  }

  public background(): GradientColor {
    const base = this.baseColor();
    return hsl(base.h, base.s * 40, 90);
  }

  public positions(): number[] {
    const positions: number[] = [];
    for (let i = 0; i < this.points(); i++) {
      positions.push(this.next(), this.next());
    }
    return positions;
  }

  public points(): number {
    return this.colors().length;
  }
}

export function useGradient(options: GradientOptions) {
  const { seed: s, canvas, progress = 100, onRender, onError } = options;

  let p5Instance: p5 | null = null;

  let seed: Seed | null = null;
  let container: HTMLDivElement | null = null;

  _call(_init, onError);

  function _init() {
    seed = new Seed(s);

    if (!container) {
      if (document.querySelector("#use-gradient-container")) {
        container = document.querySelector(
          "#use-gradient-container",
        ) as HTMLDivElement;
      } else {
        container = document.createElement("div");
        container.id = "use-gradient-container";
        container.style.cssText =
          "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;";
        document.body.appendChild(container);
      }
    }
  }

  async function _draw(
    w: number,
    h: number,
    canvasEl: HTMLCanvasElement | null = null,
  ): Promise<HTMLCanvasElement> {
    if (!seed || !container) _init();

    return new Promise((resolve) => {
      const sketch = (p: p5) => {
        let shader: p5.Shader;

        p.setup = () => {
          p.pixelDensity(1);
          p.createCanvas(w, h, p.WEBGL);

          const gl = (p as any).canvas.getContext("webgl");
          if (gl) {
            gl.disable(gl.DEPTH_TEST);
          }

          shader = p.createShader(vertSource, fragSource);
          p.noStroke();
          p.noLoop();
        };

        p.draw = () => {
          p.background(0);

          shader.setUniform("u_resolution", [p.width, p.height]);
          shader.setUniform(
            "u_time",
            seed!.next() * 100 + (progress / 100) * 10,
          );

          shader.setUniform("u_bgColor", toRgb(seed!.background()));

          const colors = seed!.colors().map(toRgb);
          const colorsPadded = Array.from({ length: 10 }, (_, i) => {
            return colors[i] || [0, 0, 0];
          }).flat();
          shader.setUniform("u_colors", colorsPadded);

          const positions = seed!.positions();
          const positionsPadded = Array.from({ length: 10 }, (_, i) => {
            const x = positions[i * 2];
            const y = positions[i * 2 + 1];
            return [x ?? 0, y ?? 0];
          }).flat();
          shader.setUniform("u_positions", positionsPadded);

          shader.setUniform("u_numberPoints", seed!.points());

          shader.setUniform("u_warpSize", WARP_SIZE);
          shader.setUniform("u_warpRatio", WARP_RADIUS);
          shader.setUniform("u_noiseRatio", NOISE_RATIO);

          shader.setUniform("u_mouse", [0, 0]);

          p.shader(shader);
          p.rect(0, 0, p.width, p.height);

          const p5Canvas = container?.querySelector("canvas");

          if (!p5Canvas) throw new Error("p5 canvas not found in container");

          if (canvasEl) {
            const ctx = canvasEl.getContext("2d");
            if (ctx) {
              canvasEl.width = w;
              canvasEl.height = h;
              ctx.drawImage(p5Canvas, 0, 0, w, h);
            }
          }

          resolve(p5Canvas);
        };
      };

      p5Instance = new p5(sketch, container!);
    });
  }

  async function render(): Promise<void> {
    const canvasEl = canvas?.value;
    if (!canvasEl)
      throw new Error(
        "Canvas element has to be provided in options when using render().",
      );

    const { w, h } = getCanvasDimensions(canvasEl);

    if (p5Instance) {
      p5Instance.remove();
      p5Instance = null;
    }

    await _draw(w, h, canvasEl);

    onRender && onRender();
  }

  async function toImage(
    w: number = 500,
    h: number = 500,
    format: "png" | "jpeg" | "webp" = "png",
  ): Promise<string> {
    const canvas = await _draw(w, h);
    const image = canvas.toDataURL(`image/${format}`);
    destroy();

    if (!image) throw new Error("Failed to convert canvas to image data URL");

    return image;
  }

  async function toBlob(
    w: number = 500,
    h: number = 500,
    format: "png" | "jpeg" | "webp" = "png",
    quality?: number,
  ): Promise<Blob> {
    const canvas = await _draw(w, h);
    return new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (b) => {
          destroy();

          if (!b) throw new Error("Failed to convert canvas to Blob");

          resolve(b);
        },
        `image/${format}`,
        quality,
      );
    });
  }

  function destroy(): void {
    if (p5Instance) {
      p5Instance.remove();
      p5Instance = null;
    }
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  }

  return {
    render: _call(render, onError),
    toImage: _call(toImage, onError),
    toBlob: _call(toBlob, onError),
    destroy: _call(destroy, onError),
  };
}
