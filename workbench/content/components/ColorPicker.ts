import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "Select and edit colors with palettes, sliders and a canvas.",
  guidance:
    "Bind a string to v-model and choose its format with format. The popover holds a color canvas, sliders and a text input, so the user can pick by eye or type a value.",
  sections: [
    section(
      "output-format",
      "Output format",
      "format (hex by default, or rgb, hsl, oklch) is the format of the string the picker emits. A value in any supported format is understood on the way in, but once the user changes the color the model is written in format. The text input accepts every format too, and falls back to the last valid color when it can't read what was typed.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "A team color with a live preview." },
    { file: "Formats", title: "Formats", description: "hex, rgb, hsl and oklch." },
    { file: "Options", title: "Palettes and input", description: "palette adds ready-made swatches, input hides the text field." },
  ],
} satisfies ComponentArticle;
