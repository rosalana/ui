import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "Show the completion of a bounded task.",
  guidance:
    "Bind model-value to a percentage from 0 to 100 and label the bar, either with aria-label or with visible text next to it. variant colors the bar by meaning; switch it to success when the task finishes.",
  sections: [
    section(
      "when",
      "Use for known progress",
      "Progress describes a task whose completion is known, like an upload or a multi-step form. The bar animates between values. For content that is still loading and has no measurable progress, use Skeleton.",
    ),
  ],
  examples: [
    { file: "Variants", title: "Variants", description:
      "The color follows the meaning of the value." },
    { file: "Upload", title: "Upload", description:
      "A file upload that turns green once it is done." },
    { file: "Steps", title: "Multi-step form", description:
      "Progress as the share of finished steps." },
  ],
} satisfies ComponentArticle;
