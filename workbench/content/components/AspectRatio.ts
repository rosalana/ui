import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "Keep content at a fixed width-to-height ratio.",
  guidance:
    "Set a numeric ratio such as 16 / 9. Images still need object-cover and meaningful alt text.",
  examples: [
    {
      file: "Ratios",
      title: "Ratios",
      description: "The ratio is width divided by height, so 16 / 9 is wider than it is tall.",
    },
    {
      file: "Cover",
      title: "Image cover",
      description: "Clip the image with a rounded class and object-cover so it fills the box.",
    },
  ],
} satisfies ComponentArticle;
