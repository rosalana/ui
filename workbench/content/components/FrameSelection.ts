import { section, type ComponentArticle } from "../schema";

export default {
  category: "Actions",
  description: "Drag a rectangle to select a group of items.",
  guidance:
    "Wrap a group of UiFrameSelectionItem in UiFrameSelection. Dragging over it draws a frame, and the events report which items it touches. The component keeps no selection itself, keep it in your own state and style the items from it.",
  sections: [
    section(
      "how",
      "How it works",
      "Each UiFrameSelectionItem needs a selection-key, which comes back in selectedKeys. The frame starts after the pointer moves more than 10px, so a plain click is not a drag; a click still ends a selection at that point, so it selects the item under the pointer and clears the rest when released over empty space. An item counts as selected as soon as the frame touches it. The frame follows the mouse (not touch) and is drawn over the page, add select-none to the group to stop text from being selected while dragging.",
    ),
    section(
      "events",
      "Events",
      "start:selection fires when the drag begins, update:selection on every move, end:selection when the mouse is released, and selecting reports true or false. update:selection and end:selection give { startX, startY, endX, endY, selected, selectedKeys }, where selected are the elements and selectedKeys their keys.",
      `<UiFrameSelection
  @update:selection="({ selectedKeys }) => (selected = selectedKeys)"
  @end:selection="({ selectedKeys }) => (selected = selectedKeys)"
/>`,
      "vue",
    ),
  ],
  examples: [
    {
      file: "Teams",
      title: "Select teams",
      description: "The cards highlight while the frame touches them, then a button acts on the selection.",
      preview: "fill",
    },
    {
      file: "Disabled",
      title: "Disabled",
      description: "disabled turns the frame off, for example while an action is running or the list is locked.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
