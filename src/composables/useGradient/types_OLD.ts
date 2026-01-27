// import type { Ref, ComputedRef } from "vue";

// export interface GradientColor {
//   h: number;
//   s: number;
//   l: number;
// }

// export interface GradientBlob {
//   /** X position (0-1) */
//   x: number;
//   /** Y position (0-1) */
//   y: number;
//   /** Radius relative to canvas size (0-1) */
//   radius: number;
//   /** HSL color */
//   color: GradientColor;
//   /** Animation phase offset */
//   phase: number;
//   /** Animation orbit radius */
//   orbit: number;
// }

// export interface GradientConfig {
//   /** Background color - always filled, never empty */
//   background: GradientColor;
//   /** Layered blobs on top of background */
//   blobs: GradientBlob[];
//   /** Color harmony type */
//   harmony: "analogous" | "complementary";
// }

// export interface UseGradientOptions {
//   /** Seed for deterministic gradient generation */
//   seed: string | number;
//   /** Canvas element ref */
//   canvas: Ref<HTMLCanvasElement | null>;
//   /** Size of the canvas in pixels (default: 256) */
//   size?: number;
//   /** Position for animation (0-100, circular where 0 = 100) */
//   position?: Ref<number>;
// }

// export interface UseGradientReturn {
//   /** The generated gradient configuration */
//   config: ComputedRef<GradientConfig>;
//   /** Manually trigger a render at specific position */
//   render: (position?: number) => void;
//   /** Export canvas as data URL */
//   toDataURL: (format?: "png" | "jpeg" | "webp", quality?: number) => string;
//   /** Export canvas as Blob */
//   toBlob: (
//     format?: "png" | "jpeg" | "webp",
//     quality?: number
//   ) => Promise<Blob | null>;
// }