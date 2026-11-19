import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description:
    "A focused interruption for an action that needs explicit confirmation.",
  guidance:
    "Include Title and Description. Use Cancel for the safe path, Action for a regular confirmation and ActionDanger for a destructive one.",
  sections: [
    section(
      "vs-dialog",
      "Alert dialog or dialog",
      "UiAlertDialog is built for a single question the user has to answer. Unlike UiDialog it has no close button and does not close on a click outside, only Cancel, Action or Escape end it. Reach for UiDialog when the content is a form or a task, and for UiAlertDialog when the user has to confirm or refuse something.",
    ),
    section(
      "actions",
      "Cancel, Action and ActionDanger",
      "UiAlertDialogCancel is the quiet, safe path and also receives the initial focus. UiAlertDialogAction is the primary confirmation, UiAlertDialogActionDanger the red variant for deleting or other irreversible work. Both actions close the dialog after their click handler ran, so put the work in @click.",
    ),
    section(
      "imperative",
      "Confirming from code",
      "When the confirmation is a step inside a function, for example before sending a request, you do not need to place a dialog in the template at all. useConfirm opens the same kind of dialog from code and returns a promise with the answer. See the useConfirm page.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Confirmation",
      description:
        "Cancel and a primary Action, with an icon in the header to set the tone.",
    },
    {
      file: "Destructive",
      title: "Destructive action",
      description:
        "ActionDanger for something that cannot be undone. Each row has its own dialog whose text names the team.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
