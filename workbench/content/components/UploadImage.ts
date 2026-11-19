import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description: "Select, crop, adjust and export an image before upload.",
  guidance:
    "The model is the cropped File, or null. Pick the shape with aspect-ratio and radius, the output with size, format and quality, and what the editor offers with rotate, flip, zoom and filters. The block only prepares the file; sending it stays the application's job.",
  sections: [
    section(
      "flow",
      "How it works",
      "A picked image opens in the editor, where it is cropped and optionally adjusted. Confirming exports a File in the chosen format, writes it to the model and emits cropped. size is the longest side in pixels. radius only shapes the preview (the saved image is always a rectangle), so use it to show how the image will be displayed, e.g. full for an avatar.",
    ),
    section(
      "ratio",
      "Aspect ratio",
      "aspect-ratio fixes the crop, e.g. 1 or 16 / 9. Without it, the user chooses from aspect-ratios, a list of { label, value } where an item without value is a free crop.",
    ),
    section(
      "filters",
      "Adjustments",
      "filters enables adjustments: true for all of them or a list of brightness, contrast, saturation, grayscale and sepia. presets adds one-click looks when filters are on.",
    ),
    section(
      "upload",
      "Saving the image",
      "Bind the model to an Inertia form field and post it with forceFormData. removed fires when the user removes the image, so you can delete it on the server. rejected reports a wrong type or a file over max-size.",
    ),
  ],
  examples: [
    {
      file: "Avatar",
      title: "Profile picture",
      description: "A round 1:1 crop with all adjustments, saved as a 512 px image.",
    },
    {
      file: "Cover",
      title: "Wide cover",
      description: "A fixed 16:9 crop, only brightness and contrast, exported as JPEG.",
      preview: "fill",
    },
    {
      file: "Ratios",
      title: "The user picks the ratio",
      description: "Custom aspect-ratios, a free crop among them, and no rotating or flipping.",
      preview: "fill",
    },
    {
      file: "Existing",
      title: "Replacing an existing image",
      description: "src shows the current image until a new one is cropped.",
    },
    {
      file: "Editing",
      title: "Form around the editor",
      description: "v-model:editing lets the rest of the form step aside while the editor is open.",
    },
    {
      file: "SkipEditor",
      title: "Skip the editor and disabled",
      description: "skip-editor crops by default right away, and the crop can still be adjusted later.",
    },
  ],
} satisfies ComponentArticle;
