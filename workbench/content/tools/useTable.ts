import { section, type Article } from "../schema";

export default {
  title: "useTable",
  description:
    "Build a client-side table, card grid or list with shared sorting, search, filters, pagination and row selection.",
  sections: [
    section(
      "overview",
      "Choose the right table tool",
      "useTable owns the behavior; your Vue template owns the layout. It processes the full dataset in the browser. DataTable composes this controller with the library’s table UI. useRemoteTable shares the column controller but delegates data processing to your server. Both expose useTableColumns as table.columns. You can also use useTableColumns alone for a custom grid without table state.",
    ),
    section(
      "usage",
      "Create a reactive table",
      "Supply the complete dataset, fresh column definitions and a stable unique string or number key. A getter keeps replacement of the source array reactive. The controller adds an internal hidden row-id column to the supplied columns array; copy shared definitions for each instance.",
      `import { ref } from 'vue';
import { useTable, type Column } from '@rosalana/ui';

type Project = { id: number; name: string; owner: { name: string }; budget: number; status: string };
const rows = ref<Project[]>([
  { id: 1, name: 'Website', owner: { name: 'Anna' }, budget: 2400, status: 'active' },
  { id: 2, name: 'Dashboard', owner: { name: 'Jan' }, budget: 1800, status: 'planned' },
]);
const definitions: Column<Project>[] = [
  { key: 'name', header: 'Project', toggleable: false },
  { key: 'owner.name', header: 'Owner' },
  { key: 'budget', header: 'Budget', searchable: false },
  { key: 'status', header: 'Status', filterable: true },
];
const table = useTable<Project>({
  get data() { return rows.value; },
  columns: definitions.map(column => ({ ...column })),
  options: { key: 'id', id: 'projects' },
  state: { pageSize: 10 },
});`,
    ),
    section(
      "data",
      "Understand the data pipeline",
      "Rows flow through original → sorted → filtered → paginated. Search and your filter predicate are combined in the filtered stage. data.final is the paginated result to render. data.original is the supplied dataset; processed rows carry an internal _row_unique_id used by selection. data.selected resolves selected IDs across the original dataset, including rows outside the current page or filter.",
      `table.data.original;   // Source rows, without internal IDs
table.data.sorted;     // All rows after sorting
table.data.filtered;   // Sorted rows matching search AND the predicate
table.data.paginated;  // Current page
table.data.final;      // Same result as paginated
table.data.selected;   // Selected rows across pages`,
    ),
    section(
      "render",
      "Render your own layout",
      "Render table.columns.visible and table.data.final. HeaderRender accepts the table as context; ColumnRender accepts the row. These render string headers, header functions and custom cell content consistently. The same controller can drive UiTable, a card grid or a compact list.",
      `<UiTable>
  <UiTableHeader>
    <UiTableRow>
      <UiTableHead v-for="column in table.columns.visible" :key="column.id">
        <UiButton v-if="column.sortable" variant="ghost" @click="table.sort(column)">
          <HeaderRender :column="column" :context="table" />
        </UiButton>
        <HeaderRender v-else :column="column" :context="table" />
      </UiTableHead>
    </UiTableRow>
  </UiTableHeader>
  <UiTableBody>
    <UiTableRow v-for="row in table.data.final" :key="table.getRowId(row)">
      <UiTableCell v-for="column in table.columns.visible" :key="column.id">
        <ColumnRender :column="column" :context="row" />
      </UiTableCell>
    </UiTableRow>
  </UiTableBody>
</UiTable>`,
      "vue",
    ),
    section(
      "search",
      "Search across relevant columns",
      "Bind an input to table.search. Search matches raw string and numeric values and string items in arrays, ignoring case. Only searchable columns from columns.relevant participate. Custom render output is presentation only. Datasets with more than 2,000 rows debounce search by 500 ms; smaller datasets update immediately. Reset the current page in your search handler when you want each new query to start at page one.",
      `<UiInput
  :model-value="table.search"
  placeholder="Search projects…"
  @update:model-value="value => { table.search = String(value ?? ''); table.paginator.current = 1; }"
/>`,
      "vue",
    ),
    section(
      "filters",
      "Combine filters with search",
      "table.filter(predicate) replaces the existing predicate. Combine all active filters in one function; it runs together with search. Setting filterable on a column exposes it in columns.filterable, but does not create a filter control or predicate. Use operation.uniqueOf to build choices. An out-of-range page is reset during pagination, but explicitly resetting the page gives predictable behavior whenever criteria change.",
      `const status = ref('all');
const minimumBudget = ref(0);
function applyFilters() {
  table.filter(row =>
    (status.value === 'all' || row.status === status.value) &&
    row.budget >= minimumBudget.value,
  );
  table.paginator.current = 1;
}
// Reset only the predicate. Search is independent.
function resetFilters() {
  status.value = 'all';
  minimumBudget.value = 0;
  table.filter(() => true);
  table.paginator.current = 1;
}`,
    ),
    section(
      "sorting",
      "Sort by a resolved column",
      "Pass a resolved column object, not a key string. Repeated calls cycle ascending → descending → unsorted. state.sort.id stores the generated column ID. Numeric values sort numerically; strings use JavaScript comparisons; arrays are compared element by element. render does not change the raw sort value. There is no custom-comparator option in the current API.",
      `const budget = table.columns.getByKey('budget');
if (budget?.sortable) table.sort(budget);

// Set an initial/programmatic sort using a resolved ID.
if (budget) table.state.sort = { id: budget.id, order: 'desc' };
// Assigning the whole sort object suppresses the next sort callback.
// User interaction should call table.sort(column).`,
    ),
    section(
      "pagination",
      "Control the current page and page size",
      "paginator.current is a one-based page number. paginator.total is the number of pages, not records; use data.filtered.length for the matching record count. The local paginator reports zero total pages for an empty result. size is a string getter/setter for convenient select bindings. next and prev respect the boundaries; first and last are booleans.",
      `table.paginator.current = 1;
table.paginator.size = '20';
table.paginator.next();
table.paginator.prev();

const recordCount = table.data.filtered.length;
const pageCount = table.paginator.total;
const atStart = table.paginator.first;
const atEnd = table.paginator.last;`,
    ),
    section(
      "selection",
      "Select rows across pages",
      "Pass processed rows from data.final or data.filtered to select.toggle and select.isSelected. They contain the internal ID required by selection. toggleAll works on the current page rather than selecting every matching row on other pages; when its count-based all-selected check succeeds, it clears the whole selection. isAllOnPage checks the visible page, isAllSelected compares selection and matching-row counts, and isIndeterminate reports a partial selection of the original dataset. Selection survives changes to search, filters and pages. Clear it when replacing a dataset that removes selected records, so data.selected cannot contain unresolved entries. The public Set type currently differs from its stored row IDs; use the selection helpers and data.selected to read rows.",
      `<UiCheckbox
  :model-value="table.select.isAllOnPage()"
  @update:model-value="table.select.toggleAll()"
/>
<UiCheckbox
  v-for="row in table.data.final"
  :key="table.getRowId(row)"
  :model-value="table.select.isSelected(row)"
  @update:model-value="table.select.toggle(row)"
/>
<UiButton @click="table.state.select.clear()">Clear selection</UiButton>`,
      "vue",
    ),
    section(
      "columns",
      "Manage visibility and column order",
      "table.columns is the useTableColumns controller, shared with useRemoteTable. It exposes resolved columns, visibility lists, lookup and movement methods. table.toggle(column) changes visibility and invokes on.toggle; table.columns.toggle(column) changes visibility directly. Read the useTableColumns page for column flags, rendering, layout bindings and standalone use.",
      `const owner = table.columns.getByKey('owner.name');
if (owner) {
  table.toggle(owner);
  table.columns.moveToEnd(owner);
}
const extra = table.columns.add({ key: 'status', header: 'Status copy' });
table.columns.remove(extra);`,
    ),
    section(
      "operations",
      "Summaries and filter choices",
      "Operations read the entire original dataset, independently of search, filters and pagination. sum flattens arrays and sums numbers, ignoring numeric strings. uniqueOf flattens arrays, removes null, undefined and empty strings, deduplicates and uses JavaScript’s default sort. valuesOf preserves each raw cell value, including arrays. For summaries of only matching rows, reduce data.filtered yourself.",
      `const budget = table.columns.getByKey('budget');
const statusColumn = table.columns.getByKey('status');
if (budget) {
  table.operation.sum(budget);
  table.operation.valuesOf(budget);
}
if (statusColumn) table.operation.uniqueOf(statusColumn);
const matchingBudget = table.data.filtered.reduce((sum, row) => sum + row.budget, 0);`,
    ),
    section(
      "events",
      "React to state changes",
      "Callbacks observe changes to sort, page, pageSize, filter, search and selection. toggle is called by table.toggle. The select callback receives selected rows. This state is local; saving preferences or synchronizing a URL belongs to your app. Page size and page getters under state are read-only: write through paginator; write search through table.search.",
      `const table = useTable({
  data: rows.value,
  columns: definitions.map(column => ({ ...column })),
  options: { key: 'id', debug: false },
  on: {
    sort: sort => console.log('Sort', sort),
    page: page => console.log('Page', page),
    pageSize: size => console.log('Page size', size),
    search: query => console.log('Search', query),
    filter: predicate => console.log('Filter changed', predicate),
    select: selectedRows => console.log('Selection', selectedRows),
    toggle: column => console.log('Visibility', column.key),
  },
});`,
    ),
    section(
      "identity",
      "Stable identity and data updates",
      "options.key supports nested paths and should identify each row uniquely. Invalid or missing keys fall back to a hash of the row’s JSON, with warnings; changing row content can therefore change identity. Prefer an explicit ID. getRowId(row), getValueByPath(row, path) and getInstanceId() are available for custom renderers. Column definitions are resolved at creation: use table.columns methods for later changes instead of replacing the original definitions array.",
    ),
    section(
      "blocks",
      "Use the DataTable block when it fits",
      "DataTable uses this same composable and adds selection/action columns and an integrated UI. Its exposed table property gives access to the controller through a component ref. The block’s search, column-toggle, pagination and empty-state slots are not scoped; read the exposed controller if your replacement controls need it. Use the headless composable when building another layout or coordinating several views of the same table state.",
    ),
  ],
  examples: [
    { file: "Projects", title: "Search, sort, filter and paginate", preview: "fill", description: "A custom table layout over the controller, with a status filter combined with search." },
    { file: "PlayerSelection", title: "Selection across pages", preview: "fill", description: "Selected rows stay selected when you change pages; data.selected resolves them from the whole dataset." },
    { file: "Cards", title: "Cards instead of a table", preview: "fill", description: "The same controller drives a card grid with search, sorting and pagination." },
  ],
} satisfies Article;
