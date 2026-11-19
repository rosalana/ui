import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description: "A horizontal application menu with nested commands.",
  guidance:
    "Put one UiMenubarMenu per top-level menu inside UiMenubar, each with a UiMenubarTrigger and UiMenubarContent. Group commands by task and show shortcuts where they exist.",
  sections: [
    section(
      "behavior",
      "How a menubar behaves",
      "The menubar acts as one control: once a menu is open, hovering or pressing the arrow keys moves to the neighbouring menu. Content supports the same items as UiDropdownMenu: items, shortcuts, labels, separators, checkbox and radio items, and submenus. Items have no destructive variant; give dangerous actions the text-destructive class.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Application menu",
      description: "Three menus with shortcuts, a disabled item and a destructive command.",
    },
    {
      file: "Choices",
      title: "Checkbox, radio and submenu",
      description: "A View menu with toggles and a layout choice, and an Export menu with a submenu.",
    },
  ],
} satisfies ComponentArticle;
