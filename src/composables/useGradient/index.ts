import { computed, watch, onMounted, onUnmounted } from "vue";
import type {
  GradientBlob,
  GradientColor,
  GradientConfig,
  UseGradientOptions,
  UseGradientReturn,
} from "./types";

export type * from "./types";

// Seeded random number generator (mulberry32)
function createRandom(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Convert string to numeric seed
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash) || 1;
}

// Simplex noise implementation for cloud texture
const GRAD3 = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1],
];

function createNoise(seed: number) {
  const random = createRandom(seed);
  const perm = new Array(512);
  const p = new Array(256);

  for (let i = 0; i < 256; i++) {
    p[i] = Math.floor(random() * 256);
  }

  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  function dot(g: number[], x: number, y: number): number {
    return g[0] * x + g[1] * y;
  }

  return function noise2D(x: number, y: number): number {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;

    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);

    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = x - X0;
    const y0 = y - Y0;

    let i1: number, j1: number;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let n0 = 0,
      n1 = 0,
      n2 = 0;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      const gi0 = perm[ii + perm[jj]] % 12;
      n0 = t0 * t0 * dot(GRAD3[gi0], x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
      n1 = t1 * t1 * dot(GRAD3[gi1], x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
      n2 = t2 * t2 * dot(GRAD3[gi2], x2, y2);
    }

    // Return value in range [-1, 1]
    return 70 * (n0 + n1 + n2);
  };
}

// Fractal Brownian Motion for layered cloud noise
function fbm(
  noise: (x: number, y: number) => number,
  x: number,
  y: number,
  octaves: number = 4,
  lacunarity: number = 2,
  gain: number = 0.5,
): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(x * frequency, y * frequency);
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return value / maxValue;
}

// Generate gradient configuration from seed
function generateConfig(seed: string | number): GradientConfig {
  const seedValue = typeof seed === "string" ? stringToSeed(seed) : seed;
  const random = createRandom(seedValue);

  const harmony: "analogous" | "complementary" = "analogous";

  // Base hue
  const baseHue = random() * 360;

  // Background - LIGHT, low saturation (the canvas)
  const background: GradientColor = {
    h: baseHue,
    s: 20 + random() * 15, // 20-35% saturation - subtle tint
    l: 92 + random() * 6, // 92-98% lightness - almost white
  };

  // Blobs not used in new rendering, but kept for compatibility
  const blobs: GradientBlob[] = [];

  return { background, blobs, harmony };
}

// Render gradient to canvas
function renderGradient(
  ctx: CanvasRenderingContext2D,
  config: GradientConfig,
  size: number,
  position: number = 0,
) {
  const { background } = config;
  const seed = stringToSeed(JSON.stringify(background));
  const noise = createNoise(seed);
  const random = createRandom(seed);
  const animOffset = (position / 100) * Math.PI * 2;

  // Color palette based on saturation (not darkness)
  // Base: light, low saturation
  const baseColor = {
    h: background.h,
    s: background.s,
    l: background.l,
  };
  // Mid: medium saturation for texture
  const midColor = {
    h: background.h,
    s: 45 + random() * 15, // 45-60% saturation
    l: 75 + random() * 10, // 75-85% lightness
  };
  // Saturated: rich color for accents (not dark, but vivid)
  const saturatedColor = {
    h: background.h,
    s: 65 + random() * 20, // 65-85% saturation
    l: 55 + random() * 15, // 55-70% lightness
  };

  const [baseR, baseG, baseB] = hslToRgb(baseColor.h, baseColor.s, baseColor.l);
  const [midR, midG, midB] = hslToRgb(midColor.h, midColor.s, midColor.l);
  const [satR, satG, satB] = hslToRgb(saturatedColor.h, saturatedColor.s, saturatedColor.l);

  // Generate ONE origin point on the edge - all layers come from here
  const edgePos = random();
  let originX: number, originY: number;

  if (edgePos < 0.25) {
    // Top edge
    originX = edgePos / 0.25;
    originY = 0;
  } else if (edgePos < 0.5) {
    // Right edge
    originX = 1;
    originY = (edgePos - 0.25) / 0.25;
  } else if (edgePos < 0.75) {
    // Bottom edge
    originX = 1 - (edgePos - 0.5) / 0.25;
    originY = 1;
  } else {
    // Left edge
    originX = 0;
    originY = 1 - (edgePos - 0.75) / 0.25;
  }

  // Angle pointing inward toward center
  const originAngle = Math.atan2(0.5 - originY, 0.5 - originX);
  // Spread - how wide the smudge fans out
  const spread = 0.3 + random() * 0.3;

  // Create image data
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const nx = px / size;
      const ny = py / size;

      // Cloud noise for texture
      const cloudNoise = fbm(noise, nx * 4 + animOffset * 0.05, ny * 4, 4, 2.0, 0.5);
      const detailNoise = fbm(noise, nx * 8 - animOffset * 0.03, ny * 8, 2, 2.0, 0.5);

      // Calculate influence from the single origin point
      const dx = nx - originX;
      const dy = ny - originY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Angle from origin to this pixel
      const pixelAngle = Math.atan2(dy, dx);
      const angleDiff = Math.abs(pixelAngle - originAngle);
      const normalizedAngleDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);

      // Spread factor (how much the smudge fans out from main direction)
      const spreadFactor = Math.max(0, 1 - normalizedAngleDiff / (Math.PI * spread));

      // Distance falloff with noise distortion (creates cloud ripple)
      const noiseDistort = cloudNoise * 0.12;
      const distortedDist = dist + noiseDistort;

      // Mid color reaches further (covers most of canvas from origin)
      const midFalloff = Math.max(0, 1 - distortedDist / 0.85);
      let midInfluence = midFalloff * midFalloff * spreadFactor;

      // Saturated color stays closer to origin
      const satFalloff = Math.max(0, 1 - distortedDist / 0.5);
      let satInfluence = satFalloff * satFalloff * satFalloff * spreadFactor;

      // Add noise variation to create ripple texture
      const noiseVariation = (cloudNoise * 0.5 + detailNoise * 0.5 + 1) * 0.5; // 0-1 range
      midInfluence *= 0.7 + noiseVariation * 0.5;
      satInfluence *= 0.5 + noiseVariation * 0.7;

      // Clamp influences
      midInfluence = Math.min(1, Math.max(0, midInfluence));
      satInfluence = Math.min(1, Math.max(0, satInfluence * 0.6)); // Keep saturated subtle

      // Blend colors: base -> mid -> saturated
      let r = baseR;
      let g = baseG;
      let b = baseB;

      // Apply mid influence
      r = r + (midR - r) * midInfluence;
      g = g + (midG - g) * midInfluence;
      b = b + (midB - b) * midInfluence;

      // Apply saturated influence on top
      r = r + (satR - r) * satInfluence;
      g = g + (satG - g) * satInfluence;
      b = b + (satB - b) * satInfluence;

      const idx = (py * size + px) * 4;
      data[idx] = Math.round(r);
      data[idx + 1] = Math.round(g);
      data[idx + 2] = Math.round(b);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Apply subtle blur for smoothness
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = size;
  tempCanvas.height = size;
  const tempCtx = tempCanvas.getContext("2d")!;
  tempCtx.drawImage(ctx.canvas, 0, 0);

  ctx.filter = `blur(${size * 0.012}px)`;
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.filter = "none";
}

// HSL to RGB conversion
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

/**
 * Composable for generating beautiful layered mesh gradients
 */
export function useGradient(options: UseGradientOptions): UseGradientReturn {
  const { seed, canvas, size = 256, position } = options;

  const config = computed(() => generateConfig(seed));

  const render = (pos: number = 0) => {
    const cvs = canvas.value;
    if (!cvs) return;

    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    if (cvs.width !== size || cvs.height !== size) {
      cvs.width = size;
      cvs.height = size;
    }

    renderGradient(ctx, config.value, size, pos);
  };

  const toDataURL = (
    format: "png" | "jpeg" | "webp" = "png",
    quality = 0.92,
  ): string => {
    const cvs = canvas.value;
    if (!cvs) return "";
    return cvs.toDataURL(`image/${format}`, quality);
  };

  const toBlob = (
    format: "png" | "jpeg" | "webp" = "png",
    quality = 0.92,
  ): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const cvs = canvas.value;
      if (!cvs) {
        resolve(null);
        return;
      }
      cvs.toBlob(resolve, `image/${format}`, quality);
    });
  };

  let animationFrame: number | null = null;

  if (position) {
    watch(
      position,
      (pos) => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        animationFrame = requestAnimationFrame(() => {
          render(pos);
        });
      },
      { immediate: false },
    );
  }

  onMounted(() => {
    render(position?.value ?? 0);
  });

  onUnmounted(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });

  return {
    config,
    render,
    toDataURL,
    toBlob,
  };
}

/**
 * Generate a gradient as data URL without Vue reactivity
 */
export function generateGradient(
  seed: string | number,
  size: number = 256,
  format: "png" | "jpeg" | "webp" = "png",
): string {
  const config = generateConfig(seed);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  renderGradient(ctx, config, size, 0);
  return canvas.toDataURL(`image/${format}`);
}
