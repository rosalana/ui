import type { UploadImageAdjustments, UploadImageFilter } from "./types";

export const FILTERS: Record<
  UploadImageFilter,
  { label: string; icon: string; min: number; max: number; neutral: number; step: number }
> = {
  brightness: { label: "Brightness", icon: "lucide:sun", min: 0.5, max: 1.5, neutral: 1, step: 0.01 },
  contrast: { label: "Contrast", icon: "lucide:contrast", min: 0.5, max: 1.5, neutral: 1, step: 0.01 },
  saturation: { label: "Saturation", icon: "lucide:droplet", min: 0, max: 2, neutral: 1, step: 0.01 },
  grayscale: { label: "Grayscale", icon: "lucide:blend", min: 0, max: 1, neutral: 0, step: 0.01 },
  sepia: { label: "Sepia", icon: "lucide:coffee", min: 0, max: 1, neutral: 0, step: 0.01 },
};

export const FILTER_NAMES = Object.keys(FILTERS) as UploadImageFilter[];

export const neutralAdjustments = (): UploadImageAdjustments => ({
  brightness: 1,
  contrast: 1,
  saturation: 1,
  grayscale: 0,
  sepia: 0,
});

export const PRESETS: { label: string; adjustments: Partial<UploadImageAdjustments> }[] = [
  { label: "Original", adjustments: {} },
  { label: "Vivid", adjustments: { saturation: 1.4, contrast: 1.1 } },
  { label: "Warm", adjustments: { sepia: 0.3, saturation: 1.2, brightness: 1.05 } },
  { label: "Fade", adjustments: { contrast: 0.85, brightness: 1.1, saturation: 0.8 } },
  { label: "Mono", adjustments: { grayscale: 1, contrast: 1.1 } },
  { label: "Noir", adjustments: { grayscale: 1, contrast: 1.4, brightness: 0.9 } },
];

export function isNeutral(adjustments: UploadImageAdjustments): boolean {
  return FILTER_NAMES.every((name) => adjustments[name] === FILTERS[name].neutral);
}

/** CSS `filter` value used for the live preview, in the same order `applyAdjustments` uses. */
export function toCssFilter(a: UploadImageAdjustments): string {
  if (isNeutral(a)) return "none";

  return [
    `brightness(${a.brightness})`,
    `contrast(${a.contrast})`,
    `saturate(${a.saturation})`,
    `grayscale(${a.grayscale})`,
    `sepia(${a.sepia})`,
  ].join(" ");
}

type Matrix = [number, number, number, number, number, number, number, number, number];

const saturateMatrix = (s: number): Matrix => [
  0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s,
  0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s,
  0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s,
];

const grayscaleMatrix = (g: number): Matrix => {
  const a = 1 - g;
  return [
    0.2126 + 0.7874 * a, 0.7152 - 0.7152 * a, 0.0722 - 0.0722 * a,
    0.2126 - 0.2126 * a, 0.7152 + 0.2848 * a, 0.0722 - 0.0722 * a,
    0.2126 - 0.2126 * a, 0.7152 - 0.7152 * a, 0.0722 + 0.9278 * a,
  ];
};

const sepiaMatrix = (s: number): Matrix => {
  const a = 1 - s;
  return [
    0.393 + 0.607 * a, 0.769 - 0.769 * a, 0.189 - 0.189 * a,
    0.349 - 0.349 * a, 0.686 + 0.314 * a, 0.168 - 0.168 * a,
    0.272 - 0.272 * a, 0.534 - 0.534 * a, 0.131 + 0.869 * a,
  ];
};

const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

/**
 * Bakes the adjustments into the canvas pixels. Done by hand instead of `ctx.filter`,
 * which Safari does not support, using the formulas from the Filter Effects spec so the
 * result matches the CSS preview.
 */
export function applyAdjustments(canvas: HTMLCanvasElement, a: UploadImageAdjustments) {
  if (isNeutral(a)) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = image.data;
  const matrices = [saturateMatrix(a.saturation), grayscaleMatrix(a.grayscale), sepiaMatrix(a.sepia)];

  for (let i = 0; i < data.length; i += 4) {
    let r = clamp(data[i] * a.brightness);
    let g = clamp(data[i + 1] * a.brightness);
    let b = clamp(data[i + 2] * a.brightness);

    r = clamp((r - 127.5) * a.contrast + 127.5);
    g = clamp((g - 127.5) * a.contrast + 127.5);
    b = clamp((b - 127.5) * a.contrast + 127.5);

    for (const m of matrices) {
      const nr = m[0] * r + m[1] * g + m[2] * b;
      const ng = m[3] * r + m[4] * g + m[5] * b;
      const nb = m[6] * r + m[7] * g + m[8] * b;
      r = clamp(nr);
      g = clamp(ng);
      b = clamp(nb);
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  ctx.putImageData(image, 0, 0);
}
