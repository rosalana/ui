import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "A visual boundary between related groups.",
  guidance:
    "Choose horizontal or vertical orientation. Use decorative separators for layout and semantic separators only where a real content boundary exists.",
  examples: [
    {
      file: "Horizontal",
      title: "Horizontal, with text",
      description: "The text prop puts a label in the middle of the line.",
    },
    {
      file: "Vertical",
      title: "Vertical",
      description: "Needs a parent with a height, e.g. h-5 in an inline row.",
    },
  ],
} satisfies ComponentArticle;
