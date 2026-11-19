import { section, type Article } from "../schema";

export default {
  title: "useSonner",
  description:
    "Show notifications and follow asynchronous work with one toast.",
  sections: [
    section(
      "usage",
      "Usage",
      "Call useSonner in any component or script. default, info, success, warning, error and loading take a title or a message object with description, icon, duration, dismissible, onDismiss and onAutoClose, and return the toast's id. The toaster itself is mounted by the plugin, see Sonner for where and how toasts appear.",
      `import { useSonner } from '@rosalana/ui';

const sonner = useSonner();

const id = sonner.success('Project saved', { description: 'Everyone was notified.' });
sonner.dismiss(id);`,
    ),
    section(
      "promise",
      "Following a promise",
      "promise accepts a promise or a function returning one and shows a loading toast that turns into success or error when it settles. success and error may be functions of the resolved value or the error. It returns the original promise, so the rejection is still yours to catch.",
      `await sonner.promise(saveProject, {
  loading: 'Saving…',
  success: (project) => \`\${project.name} saved\`,
  error: 'Could not save the project',
});`,
    ),
    section(
      "update",
      "Updating and closing",
      "A toast shown with an id that is already open is updated in place, and its timer starts again. dismiss(id) closes one toast, dismiss() closes all of them; onDismiss runs when it was closed by the user or by dismiss, onAutoClose when its duration ran out. Infinity as duration keeps a toast until it is dismissed. Toasts have no action buttons: for actions the user should take, pin them with useDock.",
    ),
  ],
  examples: [
    {
      file: "Promise",
      title: "A toast for a request",
      description:
        "Saving shows a loading toast that becomes success or error. Turn on the lost connection to see the failure.",
    },
    {
      file: "Update",
      title: "Update a toast by id",
      description:
        "The same id keeps one toast alive for the whole upload, from progress to the final result.",
    },
    {
      file: "Dismiss",
      title: "Dismiss and callbacks",
      description:
        "A reminder that stays until closed. Submitting dismisses it by id, closing it by hand runs onDismiss.",
    },
  ],
} satisfies Article;
