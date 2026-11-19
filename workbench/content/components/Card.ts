import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "A content surface with optional header, body and footer.",
  guidance:
    "Compose Header, Title, Description, Content and Footer. Use spacing and hierarchy to group a single idea rather than nesting many cards.",
  sections: [
    section(
      "hover",
      "Hover and active state",
      'The card brightens and shows an accent line on hover. Set data-state="active" to keep that look, for example for a selected card. Cards render a div by default; pass as="button" or as="a" for a clickable card.',
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Header, content and footer",
      description: "All card parts together.",
    },
    {
      file: "Selectable",
      title: "Selectable cards",
      description: "Buttons rendered as cards, the chosen one uses the active state.",
    },
  ],
} satisfies ComponentArticle;
