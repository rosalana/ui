import type { ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "Select exactly one option from a visible set.",
  guidance:
    "Give each UiRadioGroupItem a stable value and a visible UiLabel, and name the group with aria-labelledby. Use a Select for long lists.",
  examples: [
    { file: "Basic", title: "Choosing a format", description: "Items with a description." },
    { file: "Layout", title: "Horizontal and disabled", description: "orientation and class change the layout; disabled locks the group." },
  ],
} satisfies ComponentArticle;
