// import type { GradientColor, GradientOptions } from "./types";
// import p5 from "p5";
// export * from "./types";

// import vertSource from "./shaders/shader.vert?raw";
// import fragSource from "./shaders/shader.frag?raw";

// /** Warp size */
// const WARP_SIZE = 0.5;
// /** Warp radius */
// const WARP_RADIUS = 0.7;
// /** Noise ratio */
// const NOISE_RATIO = 0.04;

// /** Predefined color options */
// const COLORS: GradientColor[] = [
//   { h: 210, s: 0.7, l: 0.5 },
//   { h: 330, s: 0.7, l: 0.5 },
//   { h: 90, s: 0.7, l: 0.5 },
//   { h: 30, s: 0.7, l: 0.5 },
//   { h: 180, s: 0.7, l: 0.5 },
// ];

// /**
//  * Deterministic random number from seed (mulberry-ish)
//  */
// function random(seed: string | number): number {
//   if (typeof seed === "string") {
//     let hash = 0;
//     for (let i = 0; i < seed.length; i++) {
//       const char = seed.charCodeAt(i);
//       hash = (hash << 5) - hash + char;
//       hash |= 0;
//     }
//     seed = Math.abs(hash) || 1;
//   }

//   let t = (seed += 0x6d2b79f5);
//   t = Math.imul(t ^ (t >>> 15), t | 1);
//   t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
//   return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
// }

// function clamp01(n: number) {
//   return Math.max(0, Math.min(1, n));
// }

// function clampHue(n: number) {
//   return ((n % 360) + 360) % 360;
// }

// function hslToRgb01(h: number, s: number, l: number): [number, number, number] {
//   h = ((h % 360) + 360) % 360;
//   s = clamp01(s);
//   l = clamp01(l);

//   const c = (1 - Math.abs(2 * l - 1)) * s;
//   const hh = h / 60;
//   const x = c * (1 - Math.abs((hh % 2) - 1));

//   let r1 = 0,
//     g1 = 0,
//     b1 = 0;

//   if (hh >= 0 && hh < 1) [r1, g1, b1] = [c, x, 0];
//   else if (hh >= 1 && hh < 2) [r1, g1, b1] = [x, c, 0];
//   else if (hh >= 2 && hh < 3) [r1, g1, b1] = [0, c, x];
//   else if (hh >= 3 && hh < 4) [r1, g1, b1] = [0, x, c];
//   else if (hh >= 4 && hh < 5) [r1, g1, b1] = [x, 0, c];
//   else [r1, g1, b1] = [c, 0, x];

//   const m = l - c / 2;
//   return [r1 + m, g1 + m, b1 + m];
// }

// /**
//  * White + 2 shades (light/dark) of one chosen base color (by seed)
//  */
// function palette(rand: number): GradientColor[] {
//   const baseIndex = Math.floor(rand * COLORS.length) % COLORS.length;
//   const base = COLORS[baseIndex];

//   const light: GradientColor = {
//     h: clampHue(base.h - 50),
//     s: clamp01(base.s * 0.95),
//     l: clamp01(Math.max(base.l, 0.55) + 0.2),
//   };

//   const dark: GradientColor = {
//     h: base.h,
//     s: clamp01(base.s * 1.05),
//     l: clamp01(Math.min(base.l, 0.55) - 0.4),
//   };

//   // vždy 3 barvy: white, light, dark
//   return [
//     { h: base.h, s: base.s, l: 0.9 }, // white
//     light,
//     base,
//     dark,
//   ];
// }

// function derivedSeed(seed: string | number, salt: string): string | number {
//   return typeof seed === "string"
//     ? `${seed}:${salt}`
//     : seed + salt.length * 999;
// }

// function getCanvasPixelSize(el: HTMLCanvasElement) {
//   const dpr = Math.min(2, window.devicePixelRatio || 1);
//   const cssW = el.clientWidth || el.width || 1;
//   const cssH = el.clientHeight || el.height || 1;
//   const w = Math.max(1, Math.floor(cssW * dpr));
//   const h = Math.max(1, Math.floor(cssH * dpr));
//   return { w, h, dpr };
// }

// function ensure2DContext(canvas: HTMLCanvasElement) {
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Canvas 2D context is not available.");
//   return ctx;
// }

// export function useGradient(baseOptions: GradientOptions) {
//   // internal state
//   let options: GradientOptions = { ...baseOptions };
//   let host: HTMLDivElement | null = null;

//   let p: p5 | null = null;
//   let ready: Promise<void> | null = null;

//   let gfx: any = null; // p5.Graphics (WEBGL)
//   let shader: any = null; // p5.Shader

//   let lastSeed: string | number | null = null;
//   let lastPalette: GradientColor[] | null = null;
//   let targetPositions: number[] | null = null; // normalized [x1,y1,x2,y2,x3,y3]

//   function ensureP5(): Promise<void> {
//     if (ready) return ready;

//     ready = new Promise<void>((resolve) => {
//       host = document.createElement("div");
//       host.style.position = "fixed";
//       host.style.left = "-99999px";
//       host.style.top = "-99999px";
//       host.style.width = "1px";
//       host.style.height = "1px";
//       host.style.overflow = "hidden";
//       document.body.appendChild(host);

//       p = new p5((pp: p5) => {
//         pp.setup = () => {
//           pp.pixelDensity(1);

//           // malý hidden canvas jen aby p5 mělo WEBGL renderer (bez toho občas shader API zlobí)
//           const cnv = pp.createCanvas(1, 1, (pp as any).WEBGL) as any;
//           if (cnv?.elt) cnv.elt.style.display = "none";

//           gfx = pp.createGraphics(2, 2, (pp as any).WEBGL);
//           gfx.pixelDensity(1);
//           gfx.noStroke();

//           // shader jako stringy (bez loadShader/preload)
//           shader = (gfx as any).createShader(vertSource, fragSource);

//           resolve();
//         };
//       }, host);
//     });

//     return ready;
//   }

//   function recomputeDeterministicState(seed: string | number) {
//     // palette
//     const rand = random(seed);
//     lastPalette = palette(rand);

//     // 3 target positions (normalized 0..1), deterministically derived from seed
//     // rozumný rozsah aby body nebyly moc u okraje
//     const r1 = random(derivedSeed(seed, "p1x"));
//     const r2 = random(derivedSeed(seed, "p1y"));
//     const r3 = random(derivedSeed(seed, "p2x"));
//     const r4 = random(derivedSeed(seed, "p2y"));
//     const r5 = random(derivedSeed(seed, "p3x"));
//     const r6 = random(derivedSeed(seed, "p3y"));

//     const map = (r: number) => 0.18 + r * 0.64;

//     targetPositions = [map(r1), map(r2), map(r3), map(r4), map(r5), map(r6)];
//   }

//   function currentPositions(progress: number): number[] {
//     const t = clamp01(progress / 100);
//     const base = targetPositions ?? [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

//     // vystavění: start v centru, končí v cílové pozici
//     const cx = 0.5;
//     const cy = 0.5;

//     return [
//       cx + (base[0] - cx) * t,
//       cy + (base[1] - cy) * t,
//       cx + (base[2] - cx) * t,
//       cy + (base[3] - cy) * t,
//       cx + (base[4] - cx) * t,
//       cy + (base[5] - cy) * t,
//     ];
//   }

//   async function generate(override?: Partial<GradientOptions>) {
//     options = { ...options, ...(override ?? {}) };

//     const canvasEl = options.canvas.value;
//     if (!canvasEl) throw new Error("options.canvas.value is null");

//     await ensureP5();

//     const seed = options.seed;
//     const progress = options.progress ?? 100;

//     // (re)compute deterministic state if seed changed
//     if (lastSeed !== seed) {
//       lastSeed = seed;
//       recomputeDeterministicState(seed);
//     }

//     const { w, h } = getCanvasPixelSize(canvasEl);

//     // resize output canvas (pixels)
//     if (canvasEl.width !== w) canvasEl.width = w;
//     if (canvasEl.height !== h) canvasEl.height = h;

//     // resize webgl graphics
//     if (gfx.width !== w || gfx.height !== h) {
//       gfx.resizeCanvas(w, h);
//     }

//     // uniforms
//     const pal = lastPalette ?? palette(random(seed));
//     const whiteRgb = hslToRgb01(pal[0].h, pal[0].s, pal[0].l);
//     const c1 = hslToRgb01(pal[1].h, pal[1].s, pal[1].l);
//     const c2 = hslToRgb01(pal[2].h, pal[2].s, pal[2].l);

//     const colorsUniform = [...whiteRgb, ...c1, ...c2]; // 3 colors => 9 floats
//     const positionsUniform = currentPositions(progress); // 3 points => 6 floats

//     // u_time – deterministické + reaguje na progress (jemná animace)
//     const timeBase = random(derivedSeed(seed, "time")) * 1000;
//     const time = timeBase + (progress / 100) * 10;

//     gfx.shader(shader);

//     shader.setUniform("u_resolution", [w, h]);
//     shader.setUniform("u_time", time);

//     // bgColor: držíme bílé pozadí (můžeš změnit na jinou konstantu)
//     shader.setUniform("u_bgColor", [1, 1, 1]);

//     shader.setUniform("u_colors", colorsUniform);
//     shader.setUniform("u_positions", positionsUniform);
//     shader.setUniform("u_numberPoints", 3);

//     shader.setUniform("u_noiseRatio", NOISE_RATIO);
//     shader.setUniform("u_warpRatio", WARP_RADIUS);
//     shader.setUniform("u_warpSize", WARP_SIZE);

//     // myš není relevantní, ale shader může uniform očekávat
//     shader.setUniform("u_mouse", [w / 2, h / 2]);

//     // render full-rect
//     gfx.rect(0, 0, w, h);

//     // copy to provided canvas
//     const ctx = ensure2DContext(canvasEl);
//     ctx.clearRect(0, 0, w, h);
//     ctx.drawImage(gfx.elt as HTMLCanvasElement, 0, 0, w, h);
//   }

//   function toImg(): string {
//     const canvasEl = options.canvas.value;
//     if (!canvasEl) throw new Error("options.canvas.value is null");
//     return canvasEl.toDataURL("image/png");
//   }

//   function destroy() {
//     try {
//       p?.remove();
//     } finally {
//       p = null;
//       ready = null;
//       gfx = null;
//       shader = null;

//       if (host?.parentNode) host.parentNode.removeChild(host);
//       host = null;
//     }
//   }

//   return { generate, toImg, destroy };
// }
