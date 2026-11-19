import type { ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "An on/off control for an immediately understandable setting.",
  guidance:
    "Bind a boolean with v-model and give the switch a visible UiLabel. A switch applies immediately; use a Checkbox for choices submitted with a form.",
  examples: [
    { file: "Settings", title: "Settings", description: "Each switch explains what its current state means." },
    { file: "Disabled", title: "Disabled" },
  ],
} satisfies ComponentArticle;
