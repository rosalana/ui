import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "An anchored panel for lightweight interactive content.",
  guidance:
    "Compose Trigger and Content, and optionally Anchor or Close. Use a Dialog for tasks that need a modal workflow.",
  sections: [
    section(
      "behavior",
      "How a popover behaves",
      "The content renders in a portal next to the trigger, closes on Escape and on a click outside, and returns the focus to the trigger. Unlike a Tooltip or a HoverCard it opens on click and may hold interactive content such as inputs and buttons. Put UiPopoverClose around any element that should close it.",
    ),
    section(
      "placement",
      "Placement",
      "side (top, right, bottom, left), align (start, center, end) and side-offset on UiPopoverContent choose where it opens. It flips to the opposite side when there is not enough room. The default width is w-72; pass a class to change it.",
    ),
    section(
      "state",
      "Controlling the state",
      "Bind v-model:open to open or close the popover from code, or listen to @update:open to react when it opens, e.g. to reset a draft.",
    ),
  ],
  examples: [
    {
      file: "Form",
      title: "Quick edit",
      description:
        "A small form with a Label and an Input. The draft resets every time the popover opens, Cancel and Save close it through PopoverClose.",
    },
    {
      file: "Placement",
      title: "Placement",
      description: "Side and align choose where the panel opens.",
    },
    {
      file: "Anchor",
      title: "Anchor",
      description:
        "PopoverAnchor positions the panel against a different element than the trigger.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
