import type { Ref } from "vue";
import p5 from "p5";

// ============================================================================
// Types
// ============================================================================

export interface GradientColor {
  h: number;
  s: number;
  l: number;
}

export interface GradientOptions {
  /** Seed for deterministic gradient generation */
  seed: string | number;
  /** Canvas element ref */
  canvas?: Ref<HTMLCanvasElement | null>;
  /** Progress of the gradient animation (0-100) default: 100 */
  progress?: number;
  /** Fires when the gradient is rendered */
  onRender?: () => void;
  /** Fires when an error occurs during gradient generation */
  onError?: (error: Error) => void;
}

export interface GradientConfig {
  /** Background color - always filled, never empty */
  background: GradientColor;
  /** Array of gradient colors */
  colors: GradientColor[];
  /** Size of the warp effect */
  warpSize: number;
  /** Radius of the warp effect */
  warpRadius: number;
  /** Ratio of noise applied to the gradient */
  noiseRatio: number;
  /** Canvas dimensions */
  width: number;
  /** Canvas dimensions */
  height: number;
  /** Random seed used for generation */
  random: number;
}

// ============================================================================
// Shader Sources
// ============================================================================

const vertSource = `#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 
  gl_Position = positionVec4;
}`;

const fragSource = `#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_bgColor;
uniform vec3 u_colors[10];
uniform vec2 u_positions[10];
uniform int u_numberPoints;
uniform float u_noiseRatio;
uniform float u_warpRatio;
uniform float u_warpSize;
uniform vec2 u_mouse;

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.y=1.-st.y;
  vec3 noise=vec3(rand(vec2(st.x*5.+u_time,st.y*5.-u_time)));
  
  float warp=snoise(vec3(st.xy*u_warpSize,u_time))*u_warpRatio;
  st+=warp;
  
  float pointGradient=0.;
  vec3 colorGradient=vec3(0.);
  float totalLight=1.;

  for(int i=0;i<10;i++){
    if(i<u_numberPoints){
      vec3 color=u_colors[i];
      vec2 pointPos=u_positions[i];
      float dist=1.-distance(st,pointPos)*1.1;
      pointGradient+=clamp(dist,0.,1.);
      colorGradient+=color*clamp(dist,0.,1.);
      totalLight*=(1.-dist)*(1.-dist);
    }
  }
  
  totalLight=smoothstep(0.,1.,clamp(1.-totalLight,0.,1.));
  colorGradient=(colorGradient/pointGradient)*totalLight;
  vec3 bgGradient=(1.-totalLight)*u_bgColor;
  vec3 total=mix(clamp(colorGradient,0.,1.)+bgGradient,noise,u_noiseRatio);
  gl_FragColor = vec4(vec3(total),1.);
}`;

// ============================================================================
// Constants
// ============================================================================

const WARP_SIZE: GradientConfig["warpSize"] = 1;
const WARP_RADIUS: GradientConfig["warpRadius"] = 0.8;
const NOISE_RATIO: GradientConfig["noiseRatio"] = 0.05;
const NUMBER_POINTS = 3;

const BACKGROUND: GradientColor = hsl(0, 0, 100); // white

const COLORS: GradientColor[] = [
  hsl(216.26, 100, 58), // blue
  hsl(24.65, 100, 50), // orange
  hsl(356.95, 96, 58), // red
  hsl(159.74, 100, 37), // emerald
  hsl(240.98, 100, 69), // indigo
];

// ============================================================================
// Seeded Random Generator
// ============================================================================

class SeededRandom {
  private seed: number;

  constructor(seed: string | number) {
    this.seed = SeededRandom.hashSeed(seed);
  }

  private static hashSeed(seed: string | number): number {
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

  /** Returns a deterministic random number between 0 and 1 */
  next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Returns the initial hash value (useful for shader time uniform) */
  getInitialValue(): number {
    return SeededRandom.hashSeed(this.seed) / 4294967296;
  }
}

// ============================================================================
// Color Utilities
// ============================================================================

function hsl(h: number, s: number, l: number): GradientColor {
  return clampHsl({ h, s: s / 100, l: l / 100 });
}

function clampHsl(color: GradientColor): GradientColor {
  return {
    h: ((color.h % 360) + 360) % 360,
    s: Math.max(0, Math.min(1, color.s)),
    l: Math.max(0, Math.min(1, color.l)),
  };
}

function hslToRgb(color: GradientColor): [number, number, number] {
  const { h, s, l } = clampHsl(color);

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));

  let r1 = 0,
    g1 = 0,
    b1 = 0;

  if (hh >= 0 && hh < 1) [r1, g1, b1] = [c, x, 0];
  else if (hh >= 1 && hh < 2) [r1, g1, b1] = [x, c, 0];
  else if (hh >= 2 && hh < 3) [r1, g1, b1] = [0, c, x];
  else if (hh >= 3 && hh < 4) [r1, g1, b1] = [0, x, c];
  else if (hh >= 4 && hh < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const m = l - c / 2;
  return [r1 + m, g1 + m, b1 + m];
}

// ============================================================================
// Gradient Generation
// ============================================================================

function generateColors(rng: SeededRandom): GradientColor[] {
  const baseIndex = Math.floor(rng.next() * COLORS.length) % COLORS.length;
  const base = COLORS[baseIndex];

  return [
    clampHsl({ h: base.h - 50, s: base.s * 0.9, l: base.l + 0.2 }),
    clampHsl({ h: base.h, s: base.s * 1.05, l: base.l - 0.4 }),
    base,
  ];
}

function generatePositions(rng: SeededRandom, count: number): number[] {
  const positions: number[] = [];
  for (let i = 0; i < count; i++) {
    positions.push(rng.next(), rng.next());
  }
  return positions;
}

// ============================================================================
// Canvas Utilities
// ============================================================================

function getCanvasDimensions(canvas: HTMLCanvasElement) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const cssW = canvas.clientWidth || canvas.width || 1;
  const cssH = canvas.clientHeight || canvas.height || 1;

  const w = Math.max(1, Math.floor(cssW * dpr));
  const h = Math.max(1, Math.floor(cssH * dpr));

  return { w, h, dpr };
}

// ============================================================================
// Main Composable
// ============================================================================

export function useGradient(options: GradientOptions) {
  const { seed, canvas, progress = 100, onRender, onError } = options;

  let p5Instance: p5 | null = null;
  let offscreenCanvas: HTMLCanvasElement | null = null;

  /**
   * Creates a p5 sketch that renders the gradient to a canvas
   */
  function createSketch(
    targetCanvas: HTMLCanvasElement,
    width: number,
    height: number,
    renderOnce: boolean = false
  ): Promise<p5> {
    return new Promise((resolve, reject) => {
      const rng = new SeededRandom(seed);
      const timeValue = rng.next() * 100;
      const gradientColors = generateColors(rng);
      const positions = generatePositions(rng, NUMBER_POINTS);

      const sketch = (p: p5) => {
        let theShader: p5.Shader;

        p.setup = function () {
          p.pixelDensity(1);
          
          // Create canvas with WEBGL mode
          const cnv = p.createCanvas(width, height, p.WEBGL);
          
          // Disable depth test for 2D rendering
          const gl = (p as any).canvas.getContext("webgl");
          if (gl) {
            gl.disable(gl.DEPTH_TEST);
          }

          // Create shader
          theShader = p.createShader(vertSource, fragSource);

          p.noStroke();

          if (renderOnce) {
            // Single render mode - draw once and resolve
            renderFrame();
            resolve(p);
          } else {
            resolve(p);
          }
        };

        p.draw = function () {
          if (!renderOnce) {
            renderFrame();
          }
        };

        function renderFrame() {
          p.background(0);

          // Set shader uniforms
          theShader.setUniform("u_resolution", [p.width, p.height]);
          theShader.setUniform("u_time", timeValue + (progress / 100) * 10);
          theShader.setUniform("u_bgColor", hslToRgb(BACKGROUND));

          // Flatten colors array
          const colorsUniform: number[] = [];
          for (let i = 0; i < NUMBER_POINTS; i++) {
            colorsUniform.push(...hslToRgb(gradientColors[i]));
          }
          theShader.setUniform("u_colors", colorsUniform);

          theShader.setUniform("u_positions", positions);
          theShader.setUniform("u_numberPoints", NUMBER_POINTS);
          theShader.setUniform("u_noiseRatio", NOISE_RATIO);
          theShader.setUniform("u_warpRatio", WARP_RADIUS);
          theShader.setUniform("u_warpSize", WARP_SIZE);
          theShader.setUniform("u_mouse", [0, 0]);

          // Apply shader and draw
          p.shader(theShader);
          p.rect(0, 0, p.width, p.height);
        }
      };

      try {
        // Create a container div for p5
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        document.body.appendChild(container);

        const instance = new p5(sketch, container);

        // Clean up container after setup
        setTimeout(() => {
          if (container.parentNode) {
            // Move the canvas to the target if needed
            const p5Canvas = container.querySelector("canvas");
            if (p5Canvas && targetCanvas !== p5Canvas) {
              const ctx = targetCanvas.getContext("2d");
              if (ctx) {
                targetCanvas.width = width;
                targetCanvas.height = height;
                ctx.drawImage(p5Canvas, 0, 0);
              }
            }
            container.remove();
          }
        }, 100);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Renders the gradient to the provided canvas ref
   */
  async function render(): Promise<void> {
    try {
      const canvasEl = canvas?.value;
      if (!canvasEl) {
        throw new Error("Canvas element not available");
      }

      const { w, h } = getCanvasDimensions(canvasEl);

      // Clean up previous instance
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
      }

      // Create offscreen rendering
      await renderToCanvas(canvasEl, w, h);

      onRender?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      onError?.(error);
    }
  }

  /**
   * Internal: Renders gradient to a canvas element
   */
  async function renderToCanvas(
    targetCanvas: HTMLCanvasElement,
    width: number,
    height: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const rng = new SeededRandom(seed);
      const timeValue = rng.next() * 100;
      const gradientColors = generateColors(rng);
      const positions = generatePositions(rng, NUMBER_POINTS);

      // Create temporary container
      const container = document.createElement("div");
      container.style.cssText =
        "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;";
      document.body.appendChild(container);

      const sketch = (p: p5) => {
        let theShader: p5.Shader;

        p.setup = function () {
          p.pixelDensity(1);
          p.createCanvas(width, height, p.WEBGL);

          const gl = (p as any).canvas.getContext("webgl");
          if (gl) {
            gl.disable(gl.DEPTH_TEST);
          }

          theShader = p.createShader(vertSource, fragSource);
          p.noStroke();
          p.noLoop(); // Single frame mode
        };

        p.draw = function () {
          p.background(0);

          theShader.setUniform("u_resolution", [p.width, p.height]);
          theShader.setUniform("u_time", timeValue + (progress / 100) * 10);
          theShader.setUniform("u_bgColor", hslToRgb(BACKGROUND));

          const colorsUniform: number[] = [];
          for (let i = 0; i < NUMBER_POINTS; i++) {
            colorsUniform.push(...hslToRgb(gradientColors[i]));
          }
          theShader.setUniform("u_colors", colorsUniform);
          theShader.setUniform("u_positions", positions);
          theShader.setUniform("u_numberPoints", NUMBER_POINTS);
          theShader.setUniform("u_noiseRatio", NOISE_RATIO);
          theShader.setUniform("u_warpRatio", WARP_RADIUS);
          theShader.setUniform("u_warpSize", WARP_SIZE);
          theShader.setUniform("u_mouse", [0, 0]);

          p.shader(theShader);
          p.rect(0, 0, p.width, p.height);

          // Copy to target canvas
          setTimeout(() => {
            try {
              const p5Canvas = container.querySelector("canvas");
              if (p5Canvas) {
                const ctx = targetCanvas.getContext("2d");
                if (ctx) {
                  targetCanvas.width = width;
                  targetCanvas.height = height;
                  ctx.drawImage(p5Canvas, 0, 0);
                }
              }
              p.remove();
              container.remove();
              resolve();
            } catch (err) {
              reject(err);
            }
          }, 50);
        };
      };

      try {
        new p5(sketch, container);
      } catch (err) {
        container.remove();
        reject(err);
      }
    });
  }

  /**
   * Renders to an offscreen canvas and returns as data URL
   */
  async function toImg(
    w: number = 500,
    h: number = 500,
    format: "png" | "jpeg" | "webp" = "png"
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const rng = new SeededRandom(seed);
      const timeValue = rng.next() * 100;
      const gradientColors = generateColors(rng);
      const positions = generatePositions(rng, NUMBER_POINTS);

      const container = document.createElement("div");
      container.style.cssText =
        "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;";
      document.body.appendChild(container);

      const sketch = (p: p5) => {
        let theShader: p5.Shader;

        p.setup = function () {
          p.pixelDensity(1);
          p.createCanvas(w, h, p.WEBGL);

          const gl = (p as any).canvas.getContext("webgl");
          if (gl) {
            gl.disable(gl.DEPTH_TEST);
          }

          theShader = p.createShader(vertSource, fragSource);
          p.noStroke();
          p.noLoop();
        };

        p.draw = function () {
          p.background(0);

          theShader.setUniform("u_resolution", [p.width, p.height]);
          theShader.setUniform("u_time", timeValue + (progress / 100) * 10);
          theShader.setUniform("u_bgColor", hslToRgb(BACKGROUND));

          const colorsUniform: number[] = [];
          for (let i = 0; i < NUMBER_POINTS; i++) {
            colorsUniform.push(...hslToRgb(gradientColors[i]));
          }
          theShader.setUniform("u_colors", colorsUniform);
          theShader.setUniform("u_positions", positions);
          theShader.setUniform("u_numberPoints", NUMBER_POINTS);
          theShader.setUniform("u_noiseRatio", NOISE_RATIO);
          theShader.setUniform("u_warpRatio", WARP_RADIUS);
          theShader.setUniform("u_warpSize", WARP_SIZE);
          theShader.setUniform("u_mouse", [0, 0]);

          p.shader(theShader);
          p.rect(0, 0, p.width, p.height);

          setTimeout(() => {
            try {
              const p5Canvas = container.querySelector("canvas") as HTMLCanvasElement;
              if (p5Canvas) {
                const mimeType = `image/${format}`;
                const dataUrl = p5Canvas.toDataURL(mimeType);
                p.remove();
                container.remove();
                resolve(dataUrl);
              } else {
                throw new Error("Canvas not found");
              }
            } catch (err) {
              p.remove();
              container.remove();
              reject(err);
            }
          }, 50);
        };
      };

      try {
        new p5(sketch, container);
      } catch (err) {
        container.remove();
        reject(err);
      }
    });
  }

  /**
   * Renders to an offscreen canvas and returns as Blob
   */
  async function toBlob(
    w: number = 500,
    h: number = 500,
    format: "png" | "jpeg" | "webp" = "png",
    quality?: number
  ): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
      const rng = new SeededRandom(seed);
      const timeValue = rng.next() * 100;
      const gradientColors = generateColors(rng);
      const positions = generatePositions(rng, NUMBER_POINTS);

      const container = document.createElement("div");
      container.style.cssText =
        "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;";
      document.body.appendChild(container);

      const sketch = (p: p5) => {
        let theShader: p5.Shader;

        p.setup = function () {
          p.pixelDensity(1);
          p.createCanvas(w, h, p.WEBGL);

          const gl = (p as any).canvas.getContext("webgl");
          if (gl) {
            gl.disable(gl.DEPTH_TEST);
          }

          theShader = p.createShader(vertSource, fragSource);
          p.noStroke();
          p.noLoop();
        };

        p.draw = function () {
          p.background(0);

          theShader.setUniform("u_resolution", [p.width, p.height]);
          theShader.setUniform("u_time", timeValue + (progress / 100) * 10);
          theShader.setUniform("u_bgColor", hslToRgb(BACKGROUND));

          const colorsUniform: number[] = [];
          for (let i = 0; i < NUMBER_POINTS; i++) {
            colorsUniform.push(...hslToRgb(gradientColors[i]));
          }
          theShader.setUniform("u_colors", colorsUniform);
          theShader.setUniform("u_positions", positions);
          theShader.setUniform("u_numberPoints", NUMBER_POINTS);
          theShader.setUniform("u_noiseRatio", NOISE_RATIO);
          theShader.setUniform("u_warpRatio", WARP_RADIUS);
          theShader.setUniform("u_warpSize", WARP_SIZE);
          theShader.setUniform("u_mouse", [0, 0]);

          p.shader(theShader);
          p.rect(0, 0, p.width, p.height);

          setTimeout(() => {
            try {
              const p5Canvas = container.querySelector("canvas") as HTMLCanvasElement;
              if (p5Canvas) {
                const mimeType = `image/${format}`;
                p5Canvas.toBlob(
                  (blob) => {
                    p.remove();
                    container.remove();
                    resolve(blob);
                  },
                  mimeType,
                  quality
                );
              } else {
                throw new Error("Canvas not found");
              }
            } catch (err) {
              p.remove();
              container.remove();
              reject(err);
            }
          }, 50);
        };
      };

      try {
        new p5(sketch, container);
      } catch (err) {
        container.remove();
        reject(err);
      }
    });
  }

  /**
   * Cleanup function - call when component unmounts
   */
  function destroy(): void {
    if (p5Instance) {
      p5Instance.remove();
      p5Instance = null;
    }
    if (offscreenCanvas) {
      offscreenCanvas = null;
    }
  }

  return {
    render,
    toImg,
    toBlob,
    destroy,
  };
}