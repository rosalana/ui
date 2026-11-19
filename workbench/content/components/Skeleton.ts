import { section, type ComponentArticle } from "../schema";

export default {
  category: "Feedback",
  description: "A placeholder that preserves layout while content loads.",
  guidance:
    "UiSkeleton is a pulsing block; size and shape it with classes (h-4 w-32, size-12 rounded-full). Build the placeholder with the same layout as the final content so nothing jumps when it loads. Put role=\"status\" and one aria-label on the wrapper rather than announcing every block.",
  examples: [
    { file: "ProfileCard", title: "Profile card", description:
      "The loading layout next to the loaded card it stands for.", preview: "fill" },
    { file: "LoadingList", title: "Loading a list", description:
      "Skeleton rows are replaced by the data once it arrives." },
  ],
} satisfies ComponentArticle;
