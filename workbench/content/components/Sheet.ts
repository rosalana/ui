import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "A dialog panel entering from an edge of the viewport.",
  guidance:
    "Use Title and Description just as in Dialog. Pick the edge with the side prop of Content: right (default), left, top or bottom.",
  sections: [
    section(
      "anatomy",
      "How a sheet is put together",
      "A sheet is a modal like UiDialog, with the same Trigger, Close, Title and Description parts, but it slides in from an edge of the screen. UiSheetContent has a close button in the corner (hide-close-button removes it); UiSheetHeader and UiSheetFooter are optional layout helpers with a divider.",
    ),
    section(
      "sides",
      "Choosing the side",
      "right and left make a side panel of up to max-w-sm, good for details, filters and forms. top and bottom span the full width and take the height of their content, good for short messages and actions on small screens.",
    ),
    section(
      "state",
      "Opening and closing from code",
      "Bind v-model:open to close the sheet after the work inside it finished, e.g. after a form was saved.",
    ),
  ],
  examples: [
    {
      file: "Sides",
      title: "Sides",
      description: "All four edges.",
    },
    {
      file: "EditProfile",
      title: "Edit form",
      description:
        "A form in a side panel. The footer keeps Cancel and Save visible and the sheet closes when saving finishes.",
    },
  ],
} satisfies ComponentArticle;
