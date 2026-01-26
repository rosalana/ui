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
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
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

    let n0 = 0, n1 = 0, n2 = 0;

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
  gain: number = 0.5
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

  // Always analogous for cloud-like feel
  const harmony: "analogous" | "complementary" = "analogous";

  // Base hue
  const baseHue = random() * 360;

  // Background - medium saturated base color (will be the darker bottom)
  const background: GradientColor = {
    h: baseHue,
    s: 60 + random() * 25,
    l: 55 + random() * 15, // 55-70% - medium brightness for bottom
  };

  // Generate cloud layers with varying depths
  const blobs: GradientBlob[] = [];

  // Layer 1: Deep/dark layer (bottom gradient effect)
  blobs.push({
    x: 0.5,
    y: 1.2, // Below center for bottom-heavy effect
    radius: 0.9 + random() * 0.3,
    color: {
      h: baseHue,
      s: 70 + random() * 20,
      l: 45 + random() * 10, // Darker shade
    },
    phase: random() * Math.PI * 2,
    orbit: 0.01,
  });

  // Layer 2-3: Mid-tone cloud wisps
  for (let i = 0; i < 2; i++) {
    blobs.push({
      x: 0.3 + random() * 0.4,
      y: 0.4 + random() * 0.4,
      radius: 0.4 + random() * 0.3,
      color: {
        h: (baseHue + (random() - 0.5) * 20 + 360) % 360,
        s: 40 + random() * 30,
        l: 70 + random() * 15,
      },
      phase: random() * Math.PI * 2,
      orbit: 0.02 + random() * 0.02,
    });
  }

  // Layer 4-5: Light cloud highlights (top/bright areas)
  for (let i = 0; i < 2; i++) {
    blobs.push({
      x: 0.2 + random() * 0.6,
      y: 0.1 + random() * 0.5,
      radius: 0.3 + random() * 0.4,
      color: {
        h: (baseHue + (random() - 0.5) * 15 + 360) % 360,
        s: 15 + random() * 25,
        l: 88 + random() * 10, // Very light - cloud highlights
      },
      phase: random() * Math.PI * 2,
      orbit: 0.015 + random() * 0.025,
    });
  }

  return { background, blobs, harmony };
}

// Calculate blob position with animation
function getBlobPosition(
  blob: GradientBlob,
  position: number,
  index: number
): { x: number; y: number } {
  const angle = (position / 100) * Math.PI * 2 + blob.phase;

  // Elliptical orbit with variation per blob
  const speed = 1 + (index % 3) * 0.25;
  const xOffset = Math.cos(angle * speed) * blob.orbit;
  const yOffset = Math.sin(angle * speed * 0.8) * blob.orbit * 1.3;

  // Secondary subtle movement for organic feel
  const angle2 = angle * 2.1 + index * 0.9;
  const xOffset2 = Math.cos(angle2) * blob.orbit * 0.35;
  const yOffset2 = Math.sin(angle2) * blob.orbit * 0.35;

  return {
    x: blob.x + xOffset + xOffset2,
    y: blob.y + yOffset + yOffset2,
  };
}

// HSL to CSS string
function hsl(color: GradientColor, alpha?: number): string {
  if (alpha !== undefined) {
    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${alpha})`;
  }
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

// Render gradient to canvas
function renderGradient(
  ctx: CanvasRenderingContext2D,
  config: GradientConfig,
  size: number,
  position: number = 0
) {
  const { blobs, background } = config;

  // 1. Fill entire canvas with background - no empty/black areas
  ctx.fillStyle = hsl(background);
  ctx.fillRect(0, 0, size, size);

  // 2. Create temp canvas for blob layer
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = size;
  tempCanvas.height = size;
  const tempCtx = tempCanvas.getContext("2d")!;

  // Fill temp with transparent
  tempCtx.clearRect(0, 0, size, size);

  // 3. Draw blobs with soft edges
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const pos = getBlobPosition(blob, position, i);

    const centerX = pos.x * size;
    const centerY = pos.y * size;
    const radius = blob.radius * size;

    // Radial gradient with soft falloff
    const gradient = tempCtx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );

    // Soft, layered falloff
    gradient.addColorStop(0, hsl(blob.color, 0.9));
    gradient.addColorStop(0.25, hsl(blob.color, 0.7));
    gradient.addColorStop(0.5, hsl(blob.color, 0.4));
    gradient.addColorStop(0.75, hsl(blob.color, 0.15));
    gradient.addColorStop(1, hsl(blob.color, 0));

    // Use lighter blend for soft layering
    tempCtx.globalCompositeOperation = i === 0 ? "source-over" : "lighter";
    tempCtx.fillStyle = gradient;
    tempCtx.beginPath();
    tempCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    tempCtx.fill();
  }

  // 4. Apply blur for smooth blending
  ctx.filter = `blur(${size * 0.1}px)`;
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = 0.9;
  ctx.drawImage(tempCanvas, 0, 0);

  // 5. Second pass with less blur for definition
  ctx.filter = `blur(${size * 0.035}px)`;
  ctx.globalAlpha = 0.7;
  ctx.drawImage(tempCanvas, 0, 0);

  // 6. Third pass - minimal blur for crisp highlights
  ctx.filter = `blur(${size * 0.015}px)`;
  ctx.globalCompositeOperation = "overlay";
  ctx.globalAlpha = 0.4;
  ctx.drawImage(tempCanvas, 0, 0);

  // 7. Reset context
  ctx.filter = "none";
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
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
    quality = 0.92
  ): string => {
    const cvs = canvas.value;
    if (!cvs) return "";
    return cvs.toDataURL(`image/${format}`, quality);
  };

  const toBlob = (
    format: "png" | "jpeg" | "webp" = "png",
    quality = 0.92
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
      { immediate: false }
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
  format: "png" | "jpeg" | "webp" = "png"
): string {
  const config = generateConfig(seed);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  renderGradient(ctx, config, size, 0);
  return canvas.toDataURL(`image/${format}`);
}