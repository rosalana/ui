import { section, type ComponentArticle } from "../schema";

export default {
  category: "Actions",
  description: "A pressable control with a persistent on/off state.",
  guidance:
    "Use a toggle for a setting that stays on until it is pressed again, like bold text or watching a tournament. Bind a boolean with v-model, or let it manage itself with default-value. Label icon-only toggles with aria-label. For a set of related choices use UiToggleGroup.",
  sections: [
    section(
      "state",
      "Pressed state",
      "The toggle sets data-state to on or off, which the variants style: the default variant fills with the primary color when pressed, outline and ghost keep their hover look. v-model binds the pressed boolean, update:modelValue reports every press, and default-value starts an uncontrolled toggle pressed.",
      `<UiToggle v-model="watching">Watch</UiToggle>`,
      "vue",
    ),
  ],
  examples: [
    {
      file: "Variants",
      title: "Variants",
      description: "All variants shown pressed. Each uses the color of the button variant of the same name.",
    },
    { file: "Sizes", title: "Sizes", description: "The same sizes as UiButton, including two icon sizes." },
    {
      file: "Bookmark",
      title: "Watch a tournament",
      description: "An icon toggle whose icon and text follow the state.",
    },
    {
      file: "Formatting",
      title: "Text formatting",
      description: "Independent toggles that each switch one style.",
    },
    { file: "Disabled", title: "Disabled" },
  ],
} satisfies ComponentArticle;
