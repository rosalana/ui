import type { ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "A multiline text field.",
  guidance:
    "Provide a visible label and a fitting number of rows. variant=\"destructive\" marks invalid content; pair it with aria-invalid and a message.",
  examples: [
    { file: "Basic", title: "Character limit" },
    { file: "Modifiers", title: "Lazy and trim", description: "v-model.lazy.trim updates once the field loses focus." },
    { file: "Disabled", title: "Disabled and read-only" },
  ],
} satisfies ComponentArticle;
