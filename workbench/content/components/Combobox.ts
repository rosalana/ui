import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "A searchable selection control with local or remote items.",
  guidance:
    "Pass the options as items and bind v-model to the picked value. The input, list, empty and loading states are all built in; use search for results from the server.",
  sections: [
    section(
      "items",
      "Items",
      "items is the single source of the list, of what the filter matches and of the text in the input once something is picked. Each item has a value and a label, and optionally an icon, a shortcut hint, keywords that the filter matches too and disabled. Items and groups ({ heading, items }) can be mixed; groups are split by a separator. Extra keys, such as a team or an email, ride along with the item and come back typed in the item slot.",
    ),
    section(
      "filtering",
      "Client-side filtering",
      "By default the label and keywords are matched anywhere in the text, ignoring case and accents in the app language, so \"cesko\" finds \"Česko\". filter=\"startsWith\" matches the beginning only, a function gets the text and the search and returns whether they match, and filter=false turns filtering off when the app filters items itself.",
    ),
    section(
      "remote",
      "Server-side search",
      "Pass a search function and the combobox stops filtering: it calls search(term, signal) once the list opens and, debounced (debounce, 300 ms by default), after every change of the text. The function fetches the results and puts them into items. The returned promise drives the loading state, and a newer search aborts the older one through the signal, so a slow answer never replaces a newer one. Pass the picked option in the first items so its label shows before any search ran. The preview simulates the request, the Code tab shows the real one.",
      `async function searchPlayers(search: string, signal: AbortSignal) {
  const response = await fetch(\`/players?search=\${encodeURIComponent(search)}\`, { signal });
  players.value = await response.json();
}`,
      "ts",
    ),
    section(
      "custom",
      "Custom parts",
      "Every part has a ready default and can be replaced by a slot: input, content, item (the inside of an option), empty and loading. The default slot replaces everything and gets the filtered groups and options, so a fully custom list can be built from UiComboboxInput, UiComboboxContent, UiComboboxItem and the rest.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Basic",
      description: "Prefilled, clearable, matching keywords, with a disabled option.",
    },
    {
      file: "Groups",
      title: "Groups, icons and shortcuts",
    },
    {
      file: "Filter",
      title: "Filter modes",
      description: "startsWith, or your own function.",
    },
    {
      file: "RemoteSearch",
      title: "Server-side search",
      description: "Debounced requests with the loading state, a custom option and an empty text.",
    },
  ],
} satisfies ComponentArticle;
