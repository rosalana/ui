<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ColumnRender,
  HeaderRender,
  UiButton,
  UiIcon,
  UiInput,
  UiSkeleton,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
  useRemoteTable,
  type Column,
} from "@rosalana/ui";

type Team = { id: number; name: string; city: string; points: number };

const league: Team[] = [
  ["Falcons", "Prague", 21], ["Wolves", "Brno", 15], ["Ravens", "Ostrava", 12], ["Tigers", "Plzeň", 3],
  ["Sharks", "Olomouc", 18], ["Bears", "Liberec", 9], ["Eagles", "Zlín", 14], ["Foxes", "Pardubice", 6],
  ["Lions", "Ostrava", 11], ["Hawks", "Brno", 7],
].map(([name, city, points], index) => ({ id: index + 1, name, city, points }) as Team);

const columns: Column<Team>[] = [
  { key: "name", header: "Team", toggleable: false },
  { key: "city", header: "City" },
  { key: "points", header: "Points", searchable: false },
];

const rows = ref<Team[]>([]);
const total = ref(0);
const loading = ref(true);
let version = 0;

// Stands in for the request: the server filters, sorts and slices, then answers.
function load() {
  const current = ++version;
  loading.value = true;
  const sort = table.state.sort;
  const key = sort.id ? (table.columns.getById(sort.id)?.key as keyof Team | undefined) : undefined;
  const search = table.state.search.toLowerCase();
  const size = Number(table.paginator.size);
  setTimeout(() => {
    if (current !== version) return;
    const matching = league
      .filter((team) => `${team.name} ${team.city}`.toLowerCase().includes(search))
      .sort((a, b) =>
        key ? String(a[key]).localeCompare(String(b[key]), "en", { numeric: true }) * (sort.order === "asc" ? 1 : -1) : 0,
      );
    total.value = matching.length;
    rows.value = matching.slice((table.paginator.current - 1) * size, table.paginator.current * size);
    loading.value = false;
  }, 400);
}

const table = useRemoteTable<Team>({
  get data() {
    return rows.value;
  },
  get total() {
    return total.value;
  },
  columns: columns.map((column) => ({ ...column })),
  options: { key: "id", id: "standings" },
  state: { pageSize: 4 },
  on: { page: load, pageSize: load, sort: load, search: load },
});

function sortIcon(id: string) {
  if (table.state.sort.id !== id) return "lucide:arrows-up-down";
  return table.state.sort.order === "asc" ? "lucide:arrow-up" : "lucide:arrow-down";
}

onMounted(load);
</script>

<template>
  <div class="w-full space-y-4">
    <UiInput
      :model-value="table.search"
      placeholder="Search teams or cities…"
      aria-label="Search teams"
      class="max-w-sm"
      @update:model-value="table.search = String($event ?? '')"
    />
    <UiTable>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead v-for="column in table.columns.visible" :key="column.id">
            <UiButton variant="clear" size="sm" class="-ml-3 h-8" @click="table.sort(column)">
              <HeaderRender :column="column" :context="table" />
              <UiIcon :name="sortIcon(column.id)" class="ml-2 size-4" />
            </UiButton>
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <template v-if="loading">
          <UiTableRow v-for="i in 4" :key="i">
            <UiTableCell v-for="column in table.columns.visible" :key="column.id">
              <UiSkeleton class="my-2 h-4 w-full" />
            </UiTableCell>
          </UiTableRow>
        </template>
        <UiTableRow v-else-if="!table.data.final.length">
          <UiTableCell :colspan="table.columns.visible.length" class="h-24 text-center text-theme">
            No team found.
          </UiTableCell>
        </UiTableRow>
        <UiTableRow v-else v-for="row in table.data.final" :key="table.getRowId(row)">
          <UiTableCell v-for="column in table.columns.visible" :key="column.id">
            <ColumnRender :column="column" :context="row" />
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm text-theme">
        {{ table.data.total }} teams, page {{ table.paginator.current }} of {{ table.paginator.total }}
      </span>
      <div class="flex gap-2">
        <UiButton variant="outline" size="sm" :disabled="table.paginator.first" @click="table.paginator.prev()">
          Previous
        </UiButton>
        <UiButton variant="outline" size="sm" :disabled="table.paginator.last" @click="table.paginator.next()">
          Next
        </UiButton>
      </div>
    </div>
  </div>
</template>
