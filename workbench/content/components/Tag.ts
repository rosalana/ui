import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "A small label for categorizing content.",
  guidance:
    "Use concise category names. Tag is a Badge tinted with any Tailwind palette color, set by color (blue by default). The colors adapt to dark mode. Keep status information explicit rather than communicating it by color alone.",
  examples: [
    { file: "Colors", title: "Colors", description:
      "Pick any Tailwind palette color name." },
    { file: "Sizes", title: "Sizes and icons" },
    { file: "Categories", title: "Categorizing content", description:
      "Tags in a card describe a tournament." },
  ],
} satisfies ComponentArticle;
