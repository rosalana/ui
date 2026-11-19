import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "A modal surface for a focused task.",
  guidance:
    "Use Trigger as-child around a button. Always include Title and Description, and keep the form action visible inside Content.",
  sections: [
    section(
      "anatomy",
      "How a dialog is put together",
      "UiDialog holds the open state. UiDialogTrigger opens it, UiDialogContent is the modal itself: it renders in a portal over the page, traps the focus and closes on Escape, on a click outside and with its close button. Inside, UiDialogHeader groups an optional UiDialogIcon, UiDialogTitle and UiDialogDescription, and UiDialogFooter holds the actions. Any element inside UiDialogClose closes the dialog.",
    ),
    section(
      "state",
      "Opening and closing from code",
      "Bind v-model:open when the app decides, e.g. to close the dialog after a form was saved. Without it the dialog keeps its own state.",
    ),
    section(
      "size",
      "Size and long content",
      "The content is max-w-lg by default; pass a class such as max-w-2xl for more room. Content taller than the screen scrolls inside the dialog, the header and actions scroll with it.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Basic",
      description: "Title, description and the actions in the footer.",
    },
    {
      file: "WithIcon",
      title: "With an icon",
      description: "UiDialogIcon above the title gives the dialog a quick visual cue.",
    },
    {
      file: "NoCloseButton",
      title: "Without the close button",
      description:
        "hide-close-button removes the corner button; Escape and a click outside still close it.",
    },
  ],
} satisfies ComponentArticle;
