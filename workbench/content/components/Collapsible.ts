import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "Toggle the visibility of a content region.",
  guidance:
    "Compose Trigger and Content under the root. Preserve keyboard focus when the region closes. This family still requires Rosalana implementation.",
  sections: [
    section(
      "state",
      "Controlled or not",
      "UiCollapsible keeps its own open state. Bind v-model:open to read it, e.g. to change the label of the trigger, or pass default-open to start expanded. Use UiCollapsibleTrigger as-child around a UiButton so the button keeps its styling.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Show more",
      description: "Part of a list is always visible, the rest expands on demand.",
    },
    {
      file: "Filters",
      title: "Advanced filters",
      description: "Hide secondary options with a Checkbox and Label inside the collapsible.",
    },
  ],
} satisfies ComponentArticle;
