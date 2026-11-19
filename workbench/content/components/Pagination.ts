import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description: "Navigate between pages in a bounded collection.",
  guidance:
    "Give UiPagination the total number of items and items-per-page, bind the page with v-model:page and render the buttons from the items slot of UiPaginationList.",
  sections: [
    section(
      "items",
      "How the list is built",
      "UiPaginationList hands you items: page numbers and ellipses already computed for the current page. Render a UiPaginationListItem (usually as-child around a UiButton) for each page item and a UiPaginationEllipsis for the rest. sibling-count sets how many pages show next to the current one and show-edges keeps the first and last page visible. UiPaginationFirst, Prev, Next and Last disable themselves at the ends.",
    ),
    section(
      "server",
      "Keeping the page on the server",
      "UiPagination does not fetch anything. Use :page with @update:page to visit the new page (the second example), or v-model:page when the data is already in the browser.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Full pagination",
      description: "Edges, siblings, ellipses and the first, previous, next and last buttons.",
    },
    {
      file: "Compact",
      title: "Compact",
      description: "Only the previous and next buttons with a page counter, for tight spaces.",
    },
    {
      file: "Server",
      title: "A paginated list from the server",
      description: "The page comes from the backend and a visit loads the next one.",
    },
  ],
} satisfies ComponentArticle;
