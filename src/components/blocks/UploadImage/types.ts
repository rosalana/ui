export type UploadImageFilter =
  | "brightness"
  | "contrast"
  | "saturation"
  | "grayscale"
  | "sepia";

export type UploadImageAdjustments = Record<UploadImageFilter, number>;

export type UploadImageAspectRatio = {
  label: string;
  /** Width divided by height. Leave undefined for a free crop. */
  value?: number;
};

export type UploadImageRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "full"
  | number;

export type UploadImageFormat = "image/webp" | "image/png" | "image/jpeg";

export type UploadImageProps = {
  /** URL of the current image, shown until a new one is cropped. */
  src?: string;
  /** Fixed aspect ratio (width / height). Without it the user picks one from `aspectRatios`. */
  aspectRatio?: number;
  aspectRatios?: UploadImageAspectRatio[];
  /**
   * Shape of the crop preview. The saved image is always a plain rectangle,
   * the radius only shows how it is going to be displayed.
   */
  radius?: UploadImageRadius;
  /** Longest side of the saved image in pixels. */
  size?: number;
  format?: UploadImageFormat;
  quality?: number;
  accept?: string;
  /** Maximum size of the picked file in bytes. */
  maxSize?: number;
  rotate?: boolean;
  flip?: boolean;
  zoom?: boolean;
  /** Enables image adjustments: `true` for all of them, or a list of the ones to show. */
  filters?: boolean | UploadImageFilter[];
  /** Shows one-click filter presets when filters are enabled. */
  presets?: boolean;
  disabled?: boolean;
  title?: string;
  subtext?: string;
  icon?: string;
};

export type UploadImageEmits = {
  cropped: [file: File];
  removed: [];
  rejected: [file: File, reason: "type" | "size"];
};
