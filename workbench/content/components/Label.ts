import type { ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "Associate a readable label with a form control.",
  guidance:
    "Set for to the id of the control. Clicking the label focuses or toggles it. A placeholder does not replace a visible label.",
  examples: [
    { file: "Basic", title: "Labels with form controls", description: "Works with inputs, checkboxes and switches." },
    { file: "Disabled", title: "Next to a disabled control" },
  ],
} satisfies ComponentArticle;
