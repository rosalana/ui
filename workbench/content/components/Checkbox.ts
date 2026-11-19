import type { ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "Select a boolean option or show an indeterminate selection.",
  guidance:
    "Bind v-model and associate a visible UiLabel through id and for. Use the indeterminate value for a parent option whose children are only partly selected.",
  examples: [
    { file: "Terms", title: "Accept the terms", description: "The action stays disabled until the box is checked." },
    { file: "Group", title: "Select all with indeterminate", description: "A parent checkbox shows indeterminate while only some options are selected." },
    { file: "Disabled", title: "Disabled" },
  ],
} satisfies ComponentArticle;
