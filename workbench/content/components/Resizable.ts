import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "Panels whose size can be adjusted by the user.",
  guidance:
    "Compose Panel and Handle under PanelGroup. Set minimum sizes so content remains usable when panels shrink.",
  sections: [
    section(
      "sizing",
      "Sizes",
      "The group fills its parent (size-full), so give it or its parent a height. Panel sizes are percentages and should add up to 100. Use min-size and max-size to keep panels usable, and arrow keys on a focused handle resize by keyboard.",
    ),
  ],
  examples: [
    {
      file: "Horizontal",
      title: "Horizontal with grip",
      description: "with-handle shows a grip on the divider.",
      preview: "fill",
    },
    {
      file: "Vertical",
      title: "Vertical and nested",
      description: "Groups can be nested to build layouts.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
