import type { ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description:
    "A table connected to server-side pagination, sorting and search.",
  guidance:
    "Pass current-page rows and total. Handle update:page, update:size, update:search and update:sort, then replace data after the request. The block does not fetch by itself.",
  examples: [
    { file: "Tournaments", title: "Server-side paging, search and sort", preview: "fill", description: "Every change emits update:*, then update. The app loads the new page and passes data, total and loading back. The Code tab shows the Inertia version." },
    { file: "Actions", title: "Row and header actions", preview: "fill", description: "rowActions and headerActions add an actions menu; the header function receives the loading ref." },
    { file: "LoadingEmpty", title: "Loading and empty", preview: "fill", description: "While loading, the rows are replaced by skeletons; the empty-state slot explains an empty page." },
  ],
} satisfies ComponentArticle;
