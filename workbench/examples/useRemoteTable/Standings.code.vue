<script setup lang="ts">
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
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

// The controller answers with only the requested page and the number of all matching records.
const props = defineProps<{ teams: { data: Team[]; total: number } }>();

const columns: Column<Team>[] = [
  { key: "name", header: "Team", toggleable: false },
  { key: "city", header: "City" },
  { key: "points", header: "Points", searchable: false },
];

const loading = ref(false);

function load() {
  const sort = table.state.sort;
  const sortColumn = sort.id ? table.columns.getById(sort.id) : undefined;
  router.get(
    "/teams",
    {
      page: table.paginator.current,
      size: table.paginator.size,
      search: table.state.search || undefined,
      sort: sortColumn?.key,
      direction: sortColumn ? sort.order : undefined,
    },
    {
      only: ["teams"],
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onStart: () => (loading.value = true),
      onFinish: () => (loading.value = false),
    },
  );
}

const table = useRemoteTable<Team>({
  get data() {
    return props.teams.data;
  },
  get total() {
    return props.teams.total;
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
