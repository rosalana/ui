import type { Ref } from "vue";
export type Hello = "world";

// export interface GradientColor {
//   h: number;
//   s: number;
//   l: number;
// }

// export interface GradientOptions {
//   /** Seed for deterministic gradient generation */
//   seed: string | number;

//   /** Canvas element ref */
//   canvas?: Ref<HTMLCanvasElement | null>;

//   /** Progress of the gradient animation (0-100) default: 100 */
//   progress?: number;

//   /** Fires when the gradient is rendered */
//   onRender?: () => void;

//   /** Fires when an error occurs during gradient generation */
//   onError?: (error: Error) => void;
// }

// export interface GradientConfig {
//   /** Background color - always filled, never empty */
//   background: GradientColor;

//   /** Array of gradient colors */
//   colors: GradientColor[];

//   /** Size of the warp effect */
//   warpSize: number;

//   /** Radius of the warp effect */
//   warpRadius: number;

//   /** Ratio of noise applied to the gradient */
//   noiseRatio: number;

//   /** Canvas dimensions */
//   width: number;

//   /** Canvas dimensions */
//   height: number;

//   /** Random seed used for generation */
//   random: number;
// }

// export type GradientInstance = ReturnType<typeof import("./index").useGradient>;
