import type { ComponentArticle } from "../schema";

export default {
  category: "Data display",
  description: "Composable table markup for structured rows and columns.",
  guidance:
    "The table is only markup: compose Header, Body, Row, Head and Cell, with an optional Caption and Footer, and keep the data and the behavior in your own code. Give a row data-state='selected' to highlight it. Reach for DataTable when you want search, sorting and pagination out of the box.",
  examples: [
    { file: "Standings", title: "Standings", preview: "fill", description: "Caption, header, body and footer, with right-aligned numbers and a badge in a cell." },
    { file: "Selectable", title: "Selectable rows", preview: "fill", description: "A checkbox column; a selected row gets data-state='selected' and the footer button waits for a selection." },
  ],
} satisfies ComponentArticle;
