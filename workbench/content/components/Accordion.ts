import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "A vertically stacked set of expandable content panels.",
  guidance:
    "Compose Item, Trigger and Content under the root. Choose single or multiple expansion and give every item a stable value.",
  sections: [
    section(
      "modes",
      "Single and multiple",
      'type="single" keeps one item open at a time; add collapsible so the open item can be closed again. type="multiple" lets several items stay open and v-model is then an array of item values. Every UiAccordionItem needs a unique, stable value.',
    ),
  ],
  examples: [
    {
      file: "Single",
      title: "Single, collapsible",
      description: "One answer open at a time; default-value opens an item at the start.",
    },
    {
      file: "Multiple",
      title: "Multiple, controlled",
      description: "Several items open at once, with v-model driving an expand all button.",
    },
    {
      file: "Disabled",
      title: "Disabled item",
      description: "A disabled item cannot be opened or focused.",
    },
  ],
} satisfies ComponentArticle;
