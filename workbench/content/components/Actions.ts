import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description:
    "A ready-made dropdown of actions, separators and nested groups.",
  guidance:
    "Pass items with label, icon and onClick. hidden removes an item, disabled keeps it visible but unavailable, children creates a submenu and divider draws a separator. Without a trigger slot the block shows a ghost icon button with a three-dot icon; give your own button an aria-label when it has no text.",
  sections: [
    section(
      "items",
      "Items",
      "items is an array, a ref or a getter returning either. A getter is evaluated again whenever the state it reads changes, so hidden and disabled can follow your data. An item can have label, icon, class (e.g. text-destructive), onClick, disabled, hidden, children, divider and preserve. Items are keyed by their label, so keep the labels in one menu unique.",
    ),
    section(
      "open",
      "Open state",
      "The menu manages its own open state. Bind v-model:open or set default-open to control it, for example to close the menu from an item. An item with preserve keeps the menu open after it is chosen, handy for toggles.",
    ),
    section(
      "empty",
      "Empty menus",
      "When every item is hidden the menu shows an empty message. Set show-empty-state to false to render nothing at all, trigger included.",
    ),
  ],
  examples: [
    {
      file: "ProjectMenu",
      title: "Project menu",
      description:
        "Icons, a submenu, a divider and a destructive item behind a three-dot button, with a label above the list.",
    },
    {
      file: "Conditional",
      title: "Items that follow your data",
      description:
        "A getter hides and disables items by the member's role and state. Archive a member and the menu offers Restore instead.",
    },
    {
      file: "Preserve",
      title: "Toggles in a controlled menu",
      description:
        "preserve keeps the menu open while toggling, v-model:open lets an item close it.",
    },
    {
      file: "Empty",
      title: "Empty menus",
      description: "The empty message, or nothing at all with show-empty-state off.",
    },
  ],
} satisfies ComponentArticle;
