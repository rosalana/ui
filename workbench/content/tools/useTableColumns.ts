import { section, type Article } from "../schema";

export default {
  title: "useTableColumns",
  description:
    "The shared column controller behind useTable and useRemoteTable, also usable on its own for custom layouts.",
  sections: [
    section(
      "relationship",
      "One column model for local and remote tables",
      "Both useTable and useRemoteTable create this controller internally and expose it as table.columns. Use that existing instance when working with a table. Create useTableColumns directly when you only need column definitions, rendering, visibility and ordering. A standalone instance has no row data, sorting engine, search, selection or pagination.",
    ),
    section(
      "usage",
      "Define typed columns",
      "A column needs a key and header. Keys support nested paths. header may be a string or a render function; render receives the entire row. Input definitions use Column<T>; the controller returns ResolvedColumn<T> objects with identity and raw-value/content readers.",
      `import { h } from 'vue';
import { UiBadge, useTableColumns, type Column } from '@rosalana/ui';
type Project = { id: number; name: string; owner: { name: string }; status: string };
const definitions: Column<Project>[] = [
  { key: 'name', header: 'Project', toggleable: false, bindTo: 'title' },
  { key: 'owner.name', header: 'Owner', hidden: true, relevant: true },
  { key: 'status', header: 'Status', filterable: true,
    render: row => h(UiBadge, { variant: 'outline' }, () => row.status) },
];
const columns = useTableColumns<Project>(definitions);`,
    ),
    section(
      "flags",
      "Choose column behavior",
      "sortable, searchable and toggleable default to true. filterable and hidden default to false. sortable permits sorting controls; searchable opts a relevant column into local search; filterable marks a column for your own filter UI. hidden controls initial visibility. toggleable prevents the toggle helper from hiding a required column. bindTo assigns a semantic position for custom layouts. These flags describe behavior; the standalone controller does not perform sorting or filtering.",
    ),
    section(
      "relevance",
      "Visibility and search relevance",
      "Relevant columns initially include visible columns and explicitly relevant columns. columns.relevant also includes filterable columns. This is distinct from current visibility: hiding an initially visible column does not remove it from search, and revealing an initially hidden column does not automatically make it relevant. Set relevant: true on a hidden column that should participate in useTable search. searchable: false still excludes a relevant column from search.",
    ),
    section(
      "lists",
      "Read the column lists",
      "The getters remain reactive; read them in computed values or templates instead of destructuring a one-time array snapshot. all includes hidden and generated columns. visible and hidden reflect current visibility. toggleable and filterable select their respective flags. relevant is the subset used by local search.",
      `columns.all;
columns.visible;
columns.hidden;
columns.toggleable;
columns.filterable;
columns.relevant;

const owner = columns.getByKey('owner.name');
const sameColumn = owner && columns.getById(owner.id);
if (owner) columns.toggle(owner);`,
    ),
    section(
      "rendering",
      "Raw values and rendered content",
      "Resolved columns expose value(row) for the raw dot-path value and content(row) for custom render output or its fallback. Sorting, local search and operations use raw values. HeaderRender takes the table or your chosen header context; ColumnRender takes the row. Keep render functions pure: the current resolver can evaluate them more than once, and a falsy render result falls back to the raw value. Return an explicit VNode when you need a deliberately empty display.",
      `<HeaderRender :column="column" :context="table" />
<ColumnRender :column="column" :context="row" />`,
      "vue",
    ),
    section(
      "order",
      "Reorder columns",
      "Movement methods take resolved column objects from this controller, not raw definitions or key strings. move clamps the target index to the available range. Order changes are shared by all views reading this controller.",
      `const name = columns.getByKey('name');
const status = columns.getByKey('status');
if (name && status) {
  columns.move(status, 0);
  columns.moveToStart(name);
  columns.moveToEnd(status);
  columns.moveBefore(status, name);
  columns.moveAfter(status, name);
  columns.moveLeft(status);
  columns.moveRight(status);
}`,
    ),
    section(
      "dynamic",
      "Add and remove columns",
      "add accepts a definition with an optional insertion index and returns the resolved column. Added columns have additional: true; normal columns start with additional: false. generated marks internal table columns. Use distinct definitions/keys to avoid ambiguous lookup and generated-ID collisions.",
      `const extra = columns.add({ key: 'id', header: 'ID', index: 0, searchable: false });
columns.remove(extra);`,
    ),
    section(
      "layouts",
      "Use columns in cards or another custom layout",
      "binded(name) returns the visible column bound to that layout position. unbinded() returns visible columns without a binding. These are the current API spellings. A standalone controller can use exactly the same renderers as a table; supply your own rows and layout.",
      `<UiCard v-for="row in projects" :key="row.id">
  <UiCardContent>
    <ColumnRender v-if="columns.binded('title')" :column="columns.binded('title')" :context="row" />
    <div v-for="column in columns.unbinded()" :key="column.id">
      <HeaderRender :column="column" :context="columns" />
      <ColumnRender :column="column" :context="row" />
    </div>
  </UiCardContent>
</UiCard>`,
      "vue",
    ),
  ],
  examples: [
    { file: "CardLayout", title: "Standalone columns in cards", preview: "fill", description: "One column controller, no table: bindTo places the title, the rest follows the controller's order and visibility." },
    { file: "Renderers", title: "Renderers and dynamic columns", preview: "fill", description: "Header and cell render functions, plus add and remove at runtime." },
  ],
} satisfies Article;
