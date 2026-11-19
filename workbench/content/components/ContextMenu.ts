import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "Actions attached to a right-click or long-press area.",
  guidance:
    "Wrap the area in UiContextMenuTrigger and describe the actions in UiContextMenuContent. A context menu is hidden by default, so keep essential actions reachable through a visible control as well.",
  sections: [
    section(
      "trigger",
      "What opens the menu",
      "UiContextMenuTrigger is the area itself, not a button: right-click opens the menu at the pointer, long-press opens it on touch devices. Give the trigger a size and a visible hint. The content has the same parts as UiDropdownMenu: items, labels, separators, shortcuts, checkbox and radio items, and submenus.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Actions on a team card",
      description: "Items with shortcut hints, a disabled item and a destructive action.",
      preview: "fill",
    },
    {
      file: "Choices",
      title: "Checkbox and radio items",
      description: "Checkbox items for toggles, a submenu with a radio group for the layout.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
