import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description: "An expandable inspector for development data.",
  guidance:
    "Pass any value as dump, with an optional title and auto-collapse depth. The header collapses or expands everything, highlights matches, switches to raw JSON and copies the value. Keep it out of production interfaces and never inspect secrets.",
  sections: [
    section(
      "values",
      "What it understands",
      "Besides plain objects and arrays it renders dates, regular expressions, functions, symbols, bigints, NaN and Infinity, each with its own color. A reference back to a parent is marked as circular, so such objects can be inspected safely. Hovering a node reveals a button to copy just that part.",
    ),
    section(
      "collapse",
      "Auto-collapse",
      "auto-collapse is the depth from which nodes start collapsed: 0 collapses everything below the root, a higher number opens more levels. While the highlight search has a query, all matching branches open by themselves.",
    ),
  ],
  examples: [
    {
      file: "Project",
      title: "Inspecting a model",
      description: "A nested tournament with auto-collapse of 2. Try the search and the raw JSON switch in the header.",
      preview: "fill",
    },
    {
      file: "Types",
      title: "Every kind of value",
      description: "Dates, patterns, functions, symbols, special numbers and a circular reference.",
      preview: "fill",
    },
    {
      file: "Inertia",
      title: "Page props",
      description: "A handy place to see what the backend shares with the page.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
