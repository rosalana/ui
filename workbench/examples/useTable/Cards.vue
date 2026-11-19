<script setup lang="ts">
import { ref } from "vue";
import {
  ColumnRender,
  UiBadge,
  UiButton,
  UiCard,
  UiCardContent,
  UiInput,
  useTable,
  type Column,
} from "@rosalana/ui";

type Team = { id: number; name: string; city: string; players: number };

const teams = ref<Team[]>([
  { id: 1, name: "Falcons", city: "Prague", players: 9 },
  { id: 2, name: "Wolves", city: "Brno", players: 11 },
  { id: 3, name: "Ravens", city: "Ostrava", players: 8 },
  { id: 4, name: "Tigers", city: "Plzeň", players: 10 },
  { id: 5, name: "Sharks", city: "Olomouc", players: 12 },
  { id: 6, name: "Bears", city: "Liberec", players: 9 },
]);

const columns: Column<Team>[] = [
  { key: "name", header: "Team", bindTo: "title" },
  { key: "city", header: "City" },
  { key: "players", header: "Players", searchable: false },
];

// The same controller as for a table, only the template differs.
const table = useTable<Team>({
  get data() {
    return teams.value;
  },
  columns: columns.map((column) => ({ ...column })),
  options: { key: "id" },
  state: { pageSize: 4 },
});

const title = table.columns.binded("title");
const players = table.columns.getByKey("players")!;

function setSearch(value: unknown) {
  table.search = String(value ?? "");
  table.paginator.current = 1;
}
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex flex-wrap items-center gap-3">
      <UiInput
        :model-value="table.search"
        placeholder="Search teams…"
        aria-label="Search teams"
        class="min-w-48 flex-1"
        @update:model-value="setSearch"
      />
      <UiButton variant="outline" @click="table.sort(players)">Sort by players</UiButton>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <UiCard v-for="row in table.data.final" :key="table.getRowId(row)">
        <UiCardContent class="flex items-center justify-between gap-3 pt-6">
          <div>
            <h3 class="font-medium">
              <ColumnRender v-if="title" :column="title" :context="row" />
            </h3>
            <p class="text-sm text-theme">{{ row.city }}</p>
          </div>
          <UiBadge variant="outline">{{ row.players }} players</UiBadge>
        </UiCardContent>
      </UiCard>
    </div>
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm text-theme">{{ table.data.filtered.length }} teams</span>
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
