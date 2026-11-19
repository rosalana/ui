<script setup lang="ts">
import { ref } from "vue";
import {
  ColumnRender,
  HeaderRender,
  UiBadge,
  UiButton,
  UiIcon,
  UiInput,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
  useTable,
  type Column,
} from "@rosalana/ui";

type Project = { id: number; name: string; owner: string; budget: number; status: "active" | "planned" | "done" };

const projects = ref<Project[]>([
  { id: 1, name: "Website refresh", owner: "Anna", budget: 2400, status: "active" },
  { id: 2, name: "Customer portal", owner: "Jan", budget: 1800, status: "planned" },
  { id: 3, name: "Brand guidelines", owner: "Eva", budget: 900, status: "done" },
  { id: 4, name: "Mobile app", owner: "Anna", budget: 5200, status: "active" },
  { id: 5, name: "Analytics", owner: "Jan", budget: 3100, status: "planned" },
  { id: 6, name: "Help center", owner: "Eva", budget: 1200, status: "done" },
  { id: 7, name: "Newsletter", owner: "Petr", budget: 600, status: "active" },
]);

const definitions: Column<Project>[] = [
  { key: "name", header: "Project", toggleable: false },
  { key: "owner", header: "Owner" },
  { key: "budget", header: "Budget", searchable: false },
  { key: "status", header: "Status", searchable: false },
];

const table = useTable<Project>({
  get data() {
    return projects.value;
  },
  columns: definitions.map((column) => ({ ...column })),
  options: { key: "id", id: "projects" },
  state: { pageSize: 4 },
});

const status = ref<Project["status"] | "all">("all");

function setSearch(value: unknown) {
  table.search = String(value ?? "");
  table.paginator.current = 1;
}

function setStatus(value: Project["status"] | "all") {
  status.value = value;
  table.filter((row) => value === "all" || row.status === value);
  table.paginator.current = 1;
}

function sortIcon(id: string) {
  if (table.state.sort.id !== id) return "lucide:arrows-up-down";
  return table.state.sort.order === "asc" ? "lucide:arrow-up" : "lucide:arrow-down";
}
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex flex-wrap items-center gap-3">
      <UiInput
        :model-value="table.search"
        placeholder="Search projects or owners…"
        aria-label="Search projects"
        class="min-w-48 flex-1"
        @update:model-value="setSearch"
      />
      <div class="flex gap-2" role="group" aria-label="Filter by status">
        <UiButton
          v-for="option in ['all', 'active', 'planned', 'done'] as const"
          :key="option"
          size="sm"
          class="capitalize"
          :variant="status === option ? 'default' : 'outline'"
          :aria-pressed="status === option"
          @click="setStatus(option)"
        >
          {{ option }}
        </UiButton>
      </div>
    </div>

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
        <UiTableRow v-for="row in table.data.final" :key="table.getRowId(row)">
          <UiTableCell v-for="column in table.columns.visible" :key="column.id">
            <UiBadge v-if="column.key === 'status'" variant="outline" class="capitalize">
              {{ row.status }}
            </UiBadge>
            <ColumnRender v-else :column="column" :context="row" />
          </UiTableCell>
        </UiTableRow>
        <UiTableRow v-if="!table.data.final.length">
          <UiTableCell :colspan="table.columns.visible.length" class="h-24 text-center text-theme">
            No project matches.
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>

    <div class="flex items-center justify-between gap-3">
      <span class="text-sm text-theme">
        {{ table.data.filtered.length }} projects, page {{ table.paginator.current }} of {{ Math.max(table.paginator.total, 1) }}
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
