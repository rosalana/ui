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

// Generate gradient configuration from seed
function generateConfig(seed: string | number): GradientConfig {
  const seedValue = typeof seed === "string" ? stringToSeed(seed) : seed;
  const random = createRandom(seedValue);

  // Decide harmony type - analogous (similar colors) or complementary (opposite)
  const harmony: "analogous" | "complementary" =
    random() > 0.5 ? "analogous" : "complementary";

  // Base hue
  const baseHue = random() * 360;

  // Background - light, saturated base color (never dark/black)
  const background: GradientColor = {
    h: baseHue,
    s: 50 + random() * 30,
    l: 75 + random() * 15, // 75-90% lightness - always light
  };

  // Generate 4-5 layered blobs
  const numBlobs = 4 + Math.floor(random() * 2);
  const blobs: GradientBlob[] = [];

  for (let i = 0; i < numBlobs; i++) {
    let hue: number;

    if (harmony === "analogous") {
      // Analogous: colors within ±40° of base hue
      hue = (baseHue + (random() - 0.5) * 80 + 360) % 360;
    } else {
      // Complementary: base hue or opposite (180°)
      if (random() > 0.4) {
        // 60% chance of complementary color
        hue = (baseHue + 180 + (random() - 0.5) * 30 + 360) % 360;
      } else {
        // 40% chance of base color variation
        hue = (baseHue + (random() - 0.5) * 30 + 360) % 360;
      }
    }

    // Vary saturation and lightness for depth
    const isHighlight = random() > 0.7;

    blobs.push({
      x: 0.1 + random() * 0.8,
      y: 0.1 + random() * 0.8,
      radius: 0.35 + random() * 0.4,
      color: {
        h: hue,
        s: isHighlight ? 20 + random() * 30 : 60 + random() * 35,
        l: isHighlight ? 90 + random() * 8 : 55 + random() * 25,
      },
      phase: random() * Math.PI * 2,
      orbit: 0.02 + random() * 0.04,
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