import { section, type ComponentArticle } from "../schema";

export default {
  category: "Layout",
  description: "A scrollable viewport with consistent scrollbars.",
  guidance:
    "Constrain the height or width of the viewport. Preserve normal keyboard scrolling and avoid unnecessary nested scroll regions.",
  sections: [
    section(
      "size",
      "Constrain the size",
      "The area only scrolls when its own height or width is limited, e.g. with h-56 or max-w-sm. Both scrollbars are included and appear only when the content overflows. Use viewportClass to style the inner viewport.",
    ),
  ],
  examples: [
    {
      file: "Vertical",
      title: "Vertical list",
      description: "A fixed-height list that scrolls.",
    },
    {
      file: "Horizontal",
      title: "Horizontal",
      description: "Wide content scrolls sideways when it uses w-max.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
