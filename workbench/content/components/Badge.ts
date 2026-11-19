import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "A compact label for status and metadata.",
  guidance:
    "Keep text short. Use semantic variants to communicate meaning and never rely on color alone, the text must say it too. Badge is not interactive; use Chip for a count on another element and Tag for free categories.",
  examples: [
    { file: "Variants", title: "Variants", description:
      "Solid default and secondary for neutral info, tinted variants for state." },
    { file: "Sizes", title: "Sizes and icons", description:
      "icon adds a leading icon." },
    { file: "Status", title: "Status in a list", description:
      "A badge next to each row tells the state at a glance." },
  ],
} satisfies ComponentArticle;
