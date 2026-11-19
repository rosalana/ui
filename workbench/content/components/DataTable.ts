import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description:
    "A complete client-side table with search, sorting and selection.",
  guidance:
    "Pass the full data set, stable row-key and fresh column definitions. Events expose search, sort, page, pageSize and select. The table controller is exposed through a template ref.",
  sections: [
    section(
      "implementation-notes",
      "Current implementation notes",
      "showFilters and hello are present in the public props type but currently do not render additional UI. Filtering through the table controller is separate from a built-in filter panel.",
    ),
  ],
  examples: [
    { file: "Teams", title: "Search, sort and paginate", preview: "fill", description: "Search, sortable headings, the column toggle and pagination with a render function for the status column." },
    { file: "Registrations", title: "Selection and actions", preview: "fill", description: "selectable adds a checkbox column, rowActions and headerActions add an actions menu. The table exposes its controller through a ref." },
    { file: "Minimal", title: "Minimal table and empty state", preview: "fill", description: "Turn off the search, column toggle and pagination; the empty-state slot replaces the default text." },
  ],
} satisfies ComponentArticle;
