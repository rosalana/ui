import { section, type Article } from "../schema";

export default {
  title: "useDock",
  description:
    "Actions pinned under the toasts while a condition holds, such as bulk actions for a selection.",
  sections: [
    section(
      "usage",
      "Usage",
      "Call useDock in setup with a condition and the dock's content. The condition and the content may be refs or getters; the dock follows them, e.g. the count of selected items in its title.",
      `import { useDock } from '@rosalana/ui';

useDock(
  () => selected.value.length > 0,
  () => ({
    title: \`\${selected.value.length} selected\`,
    actions: [{ label: 'Archive', onClick: archive }],
  }),
);`,
    ),
    section(
      "lifecycle",
      "When it shows and when it goes",
      "The dock shows while the condition holds and goes away when it stops holding or the component unmounts, e.g. on navigating to another page. The user can't close it: to let them dismiss it, add an action that changes the state, like Clear for a selection. Several docks stack in their own stack like toasts: the newest in front, the older ones peeking out behind it until the pointer rests on the stack.",
    ),
    section(
      "actions",
      "Actions and their result",
      "An action that returns a promise shows a spinner until it settles, and the dock stays until then even if the condition stops holding meanwhile. A success toast shown while an action runs, for example the flash message of the request's response, replaces the dock in place. Without one the dock just leaves. An error toast never replaces it: the state is unchanged, so the dock stays.",
    ),
    section(
      "toasts",
      "Toasts and layout",
      "The docks live in the toast stack, at its edge, and toasts stack above them. The page can keep its end clear of the docks with padding-bottom: var(--dock-height, 0px).",
    ),
  ],
  examples: [
    {
      file: "Selection",
      title: "Bulk actions for a selection",
      description:
        "Select matches to get the dock. Copy links shows a toast above the dock, which stays while the selection does. Archive waits for the request, then its flash message replaces the dock.",
    },
    {
      file: "Condition",
      title: "An action the state offers",
      description:
        "Check in the last team: each check-in shows a toast, and once every team is in, the dock offers to start the tournament right where the organizer is.",
    },
  ],
} satisfies Article;
