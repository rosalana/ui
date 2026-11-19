import { section, type Article } from "../schema";

export default {
  title: "useShortcuts",
  description:
    "Register keyboard shortcuts and read the shared keyboard context.",
  sections: [
    section(
      "usage",
      "Usage",
      "defineShortcuts registers keydown shortcuts for the lifetime of the component that calls it. Each key maps to a handler, or to an object with the handler and conditions.",
      `import { defineShortcuts, useShortcuts } from '@rosalana/ui';

defineShortcuts({
  meta_k: { usingInput: true, handler: openSearch },
  'g-h': () => router.visit('/'),
});

const { metaSymbol, usingInput } = useShortcuts();`,
    ),
    section(
      "keys",
      "Writing the keys",
      "Join modifiers with an underscore: meta_k, shift_a, alt_enter. Chain two keys with a dash: g-h means pressing g and then h within chainDelay (800 ms by default, the second argument of defineShortcuts). meta is ctrl outside macOS, so one definition covers both platforms. Keys are the values of KeyboardEvent.key in lowercase, such as escape, enter or arrowup.",
    ),
    section(
      "conditions",
      "When a shortcut runs",
      "By default a shortcut is ignored while a text field has the focus, so typing a letter doesn't trigger it. usingInput: true lets it run in any field, and a string lets it run only in the field with that name. whenever takes refs or getters that must all be true. A shortcut that runs calls preventDefault on the event.",
    ),
    section(
      "context",
      "Keyboard context",
      "useShortcuts returns what every component shares: macOS, metaSymbol (the symbol of the meta key, a command sign on macOS and Ctrl elsewhere), activeElement and usingInput, which is the focused field's name, true for a field without a name, or false. metaSymbol is filled after mounting so the server and the first render agree; show it in hints rather than hard-coding a key.",
    ),
  ],
  examples: [
    {
      file: "Shortcuts",
      title: "Shortcuts for a match desk",
      description:
        "Ctrl K focuses the search from anywhere, N and G then S work outside fields, Ctrl Enter saves only inside the note, and Escape discards it while it is being edited.",
    },
    {
      file: "Hints",
      title: "Show the right key",
      description:
        "The hint on the button follows the platform through metaSymbol.",
    },
  ],
} satisfies Article;
