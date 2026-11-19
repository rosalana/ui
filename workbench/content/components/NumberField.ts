import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description:
    "A localized numeric input with increment and decrement controls.",
  guidance:
    "Bind v-model to a number and set min, max and step for the domain. Pair it with a Label through the input's id. The model is undefined or NaN while the field is empty.",
  sections: [
    section(
      "locale-formats",
      "Formatting and locale",
      "The field formats and parses the number in the app language. formatOptions takes the options of Intl.NumberFormat, so a currency, a percentage or a unit needs no extra code; a percent field works with fractions, 0.15 is shown as 15 %. A locale prop overrides the app language for one field.",
    ),
    section(
      "parts",
      "Custom controls",
      "The default layout is a decrement button, the input and an increment button. Put UiNumberFieldDecrement, UiNumberFieldInput and UiNumberFieldIncrement inside the field to change their order or icons. The digits roll on every change; animated=false turns that off.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "min and max keep the value in range." },
    { file: "Formatting", title: "Currency, percent and units" },
    {
      file: "Variants",
      title: "Variants",
      description: "destructive marks a field that needs attention.",
    },
    {
      file: "States",
      title: "Disabled, read-only and custom controls",
    },
  ],
} satisfies ComponentArticle;
