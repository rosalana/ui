import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description: "A searchable list of actions, optionally inside a dialog.",
  guidance:
    "Compose Input, List, Group and Item inside UiCommand, or inside UiCommandDialog for a palette. Add an Empty message, and use Shortcut to hint at keyboard shortcuts.",
  sections: [
    section(
      "anatomy",
      "How a command is put together",
      "UiCommandInput filters the items as you type, and UiCommandList holds UiCommandGroup blocks of UiCommandItem. Every item needs a unique value, which is what the filter matches and what v-model receives when it is chosen. UiCommandEmpty shows when nothing matches, groups without a match hide on their own, and a disabled item cannot be chosen. UiCommandShortcut only displays a hint, it does not bind any key.",
    ),
    section(
      "dialog",
      "Opening the palette with a shortcut",
      "UiCommandDialog takes v-model:open. It closes on Escape and focuses the input when it opens. Bind the key yourself with defineShortcuts, where meta_k means ⌘K on macOS and Ctrl+K elsewhere.",
      `import { defineShortcuts } from "@rosalana/ui";

defineShortcuts({
  meta_k: { usingInput: true, handler: () => (open.value = !open.value) },
});`,
    ),
    section(
      "remote",
      "Remote search",
      "When the results come from a backend, pass ignore-filter so the command stops filtering them and set loading while the request runs. UiCommandLoading shows while loading, and UiCommandEmpty stays hidden until it is done. Render the results yourself from the state you keep.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Groups, shortcuts and empty state",
      description: "Choosing an item runs it; a disabled item stays out of reach.",
    },
    {
      file: "Dialog",
      title: "Command palette",
      description: "UiCommandDialog opened by the button or by ⌘K.",
    },
    {
      file: "Remote",
      title: "Remote search with loading",
      description: "ignore-filter and loading while the results are fetched. The preview simulates the request.",
    },
  ],
} satisfies ComponentArticle;
