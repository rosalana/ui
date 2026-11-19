import { section, type ComponentArticle } from "../schema";

export default {
  category: "Overlays",
  description: "A keyboard-accessible menu of actions and choices.",
  guidance:
    "Wrap a button in UiDropdownMenuTrigger as-child, then list UiDropdownMenuItem entries in UiDropdownMenuContent. Use checkbox and radio items for choices that stay set, and keep action labels specific.",
  sections: [
    section(
      "anatomy",
      "How a dropdown menu is put together",
      "UiDropdownMenu holds the open state, UiDropdownMenuTrigger opens it and UiDropdownMenuContent renders the menu in a portal with full keyboard navigation (arrows, type-ahead, Escape). Inside, UiDropdownMenuItem is an action: handle it with @select, and the menu closes afterwards. UiDropdownMenuLabel, UiDropdownMenuSeparator and UiDropdownMenuGroup structure the list, UiDropdownMenuShortcut shows a key hint on the right. Items have no destructive variant; give dangerous actions the text-destructive class as in the first example.",
    ),
    section(
      "choices",
      "Checkbox and radio items",
      "UiDropdownMenuCheckboxItem takes v-model with a boolean, UiDropdownMenuRadioItem lives in a UiDropdownMenuRadioGroup that takes v-model with the selected value. Both keep the menu open until the user closes it. Shortcut hints are only text; bind the keys yourself.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Actions with shortcuts",
      description: "Label, grouped items, shortcut hints, a disabled item and a destructive action.",
    },
    {
      file: "Choices",
      title: "Checkbox and radio items",
      description: "Sorting through a radio group and filters through checkbox items.",
    },
    {
      file: "Submenu",
      title: "Submenu",
      description: "UiDropdownMenuSub nests a second level of actions and the selected action is reported with @select.",
    },
  ],
} satisfies ComponentArticle;
