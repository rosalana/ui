import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "A short inline status with a compact footprint.",
  guidance:
    "Use for small hints or validation near a control. Use Alert when the explanation needs a title and more space. Each variant has a default icon that icon can replace.",
  examples: [
    { file: "Variants", title: "Variants", description:
      "All variants; icon replaces the default one." },
    { file: "FieldHint", title: "Hint under a field", description:
      "Validation feedback that follows what the user types." },
  ],
} satisfies ComponentArticle;
