import { section, type ComponentArticle } from "../schema";

export default {
  category: "Actions",
  description: "A related set of single or multiple toggle choices.",
  guidance:
    "Set type to single when one choice is active (the value is a string) or multiple when any number can be (the value is an array). Variant and size are set once on the group and shared by every item. Label icon-only items with aria-label.",
  sections: [
    section(
      "value",
      "Value and selection",
      "v-model holds the value of the active item, or an array of values with type=\"multiple\"; default-value starts it uncontrolled. In single mode pressing the active item again clears the value to an empty string, so handle that when one choice must always stay selected. Disable the whole group with disabled, or a single item with its own disabled.",
    ),
    section(
      "styling",
      "Variant and size",
      "UiToggleGroup passes variant and size to its items when it is created, so set them on the group rather than on items. The values are the same as UiToggle's.",
    ),
  ],
  examples: [
    { file: "Variants", title: "Variants" },
    { file: "Sizes", title: "Sizes" },
    {
      file: "Single",
      title: "Single choice",
      description: "A segmented filter that changes the list below it.",
    },
    {
      file: "Multiple",
      title: "Multiple choices",
      description: "type=\"multiple\" gives an array of the active values.",
    },
    { file: "Disabled", title: "Disabled group and item" },
  ],
} satisfies ComponentArticle;
