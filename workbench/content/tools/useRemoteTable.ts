import { section, type Article } from "../schema";

export default {
  title: "useRemoteTable",
  description:
    "Coordinate server-side sorting, search and pagination with the same column model as useTable.",
  sections: [
    section(
      "relationship",
      "Local and remote responsibilities",
      "useTable processes the complete dataset in the browser. useRemoteTable receives an already processed page from your backend and owns only table state and columns. It does not fetch, sort, filter or slice rows. It exposes useTableColumns as table.columns, with the same definitions, renderers, visibility controls and movement helpers. Unlike useTable it has no selection, predicate filter or aggregation API. RemoteTable is the ready-made UI block around this controller.",
    ),
    section(
      "usage",
      "Create a reactive remote controller",
      "data contains only the current server page. total is the total number of matching records, not this page’s length. Read refs through getters so new responses update the controller. Keep loading and errors in your application.",
      `import { ref } from 'vue';
import { useRemoteTable } from '@rosalana/ui';
type Project = { id: number; name: string; budget: number };
const rows = ref<Project[]>([]);
const total = ref(0);
const loading = ref(false);
const error = ref('');
const table = useRemoteTable<Project>({
  get data() { return rows.value; },
  get total() { return total.value; },
  columns: [
    { key: 'name', header: 'Project', toggleable: false },
    { key: 'budget', header: 'Budget' },
  ],
  options: { key: 'id', id: 'remote-projects' },
  state: { pageSize: 10 },
  on: { page: load, pageSize: load, sort: load, search: load },
});`,
    ),
    section(
      "request",
      "Map state to your backend contract",
      "Translate the resolved sort ID back to the column key before sending it to your server. The headless sort callback receives a generated ID; the RemoteTable block performs this translation for its update:sort emit. Whitelist sortable fields on the server. This example uses a request version to ignore stale responses; it assumes your endpoint returns { data, total }.",
      `let requestVersion = 0;
async function load() {
  const version = ++requestVersion;
  loading.value = true;
  error.value = '';
  const sort = table.state.sort;
  const sortColumn = sort.id ? table.columns.getById(sort.id) : undefined;
  const params = new URLSearchParams({
    page: String(table.paginator.current),
    per_page: table.paginator.size,
    search: table.state.search,
  });
  if (sortColumn) {
    params.set('sort', sortColumn.key);
    params.set('direction', sort.order);
  }
  try {
    const response = await fetch('/api/projects?' + params);
    if (!response.ok) throw new Error('Could not load projects');
    const payload: { data: Project[]; total: number } = await response.json();
    if (version !== requestVersion) return;
    rows.value = payload.data;
    total.value = payload.total;
  } catch (cause) {
    if (version === requestVersion) error.value = String(cause);
  } finally {
    if (version === requestVersion) loading.value = false;
  }
}
// Call once after setup (or use onMounted in an SSR application).
void load();`,
    ),
    section(
      "search",
      "Debounced search and page reset",
      "Assign table.search from your search input. Changes are debounced by 500 ms, then state.search updates and the page resets to one. The reset suppresses a separate page callback, so fetch from on.search. The search getter reflects committed state after debounce; use a separate input ref when you need the typed value immediately. searchable is column metadata here; the server decides which fields actually match.",
    ),
    section(
      "sorting",
      "Sort without reordering the current page locally",
      "table.sort(resolvedColumn) cycles ascending → descending → unsorted and invokes on.sort. data.final remains the last server response until your request finishes. Assigning the complete state.sort object suppresses the next sort callback, so perform an explicit load after programmatic initialization. Unlike the DataTable block’s initial key-based sort prop, this headless state uses generated column IDs.",
      `const budget = table.columns.getByKey('budget');
if (budget) table.sort(budget);
// To initialize from a URL:
if (budget) table.state.sort = { id: budget.id, order: 'desc' };
void load();`,
    ),
    section(
      "pagination",
      "Server totals and pagination",
      "paginator.current is one-based; paginator.size is a string getter/setter. total is the page count derived from config.total, with a minimum of one even for empty results. first and last are booleans; prev and next respect bounds. The server should return totals for the active search and filters. If deletion reduces the total below the requested page, move to a valid page and request it again.",
    ),
    section(
      "filters",
      "Add application-specific remote filters",
      "There is no table.filter predicate in the remote controller. Store filter state in your app, add it to the request parameters, reset the page and load again. Coordinate page callbacks with your request function to avoid duplicate requests when both a filter and page change together. The example’s request version prevents older responses from replacing newer results.",
    ),
    section(
      "render",
      "Reuse columns and renderers",
      "Render data.final as received, using columns.visible, HeaderRender and ColumnRender exactly as in useTable. data.total is the matching record count. getRowId uses the configured dot-path key, falling back to a JSON hash; prefer stable server IDs. Visibility, custom cells and column order are local presentation state and do not require a new request unless your app chooses to synchronize them.",
    ),
    section(
      "block",
      "Use the RemoteTable block",
      "The block accepts rows, total and loading, emits page/pageSize/search/sort updates, and exposes its controller as table through a template ref. It does not issue network requests either. Its sort emit uses the data key rather than the generated column ID. Choose the composable for custom layouts and the block for a complete table UI.",
    ),
  ],
  examples: [
    { file: "Standings", title: "Headless remote table", preview: "fill", description: "The controller keeps the state, your template renders it and your request fills data and total. The preview simulates the server; the Code tab shows the Inertia request." },
  ],
} satisfies Article;
