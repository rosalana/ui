import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "A styled text input with state and model modifiers.",
  guidance:
    "Pair every input with a UiLabel, pick the native type that fits and report errors with variant=\"destructive\", aria-invalid and a nearby message. class sizes the whole field.",
  sections: [
    section(
      "modifiers",
      "Model modifiers",
      "v-model accepts .lazy (update on change instead of every keystroke), .number (cast to a number), .trim (strip surrounding whitespace) and .debounce (wait 300 ms after the last keystroke). They can be combined.",
    ),
  ],
  examples: [
    { file: "Variants", title: "Variants and validation", description: "A destructive input with its error message." },
    { file: "Icons", title: "Icon, clear and password toggle", description: "icon adds a leading hint, show-clear empties the field, password-toggle reveals the password." },
    { file: "Modifiers", title: "Model modifiers", description: ".trim, .number and .debounce work on UiInput as on a native input." },
    { file: "Disabled", title: "Disabled and read-only" },
  ],
} satisfies ComponentArticle;
