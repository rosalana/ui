<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ColumnRender,
  UiBadge,
  UiButton,
  UiCheckbox,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
  useSonner,
  useTable,
  type Column,
} from "@rosalana/ui";

type Player = { id: number; name: string; team: string; fee: number };

const sonner = useSonner();

const players = ref<Player[]>([
  { id: 1, name: "Anna Nováková", team: "Falcons", fee: 20 },
  { id: 2, name: "Jan Dvořák", team: "Wolves", fee: 20 },
  { id: 3, name: "Eva Králová", team: "Ravens", fee: 25 },
  { id: 4, name: "Petr Svoboda", team: "Tigers", fee: 20 },
  { id: 5, name: "Marie Horáková", team: "Sharks", fee: 25 },
  { id: 6, name: "Tomáš Procházka", team: "Bears", fee: 20 },
]);

const columns: Column<Player>[] = [
  { key: "name", header: "Player", toggleable: false },
  { key: "team", header: "Team" },
  { key: "fee", header: "Fee (EUR)" },
];

const table = useTable<Player>({
  get data() {
    return players.value;
  },
  columns: columns.map((column) => ({ ...column })),
  options: { key: "id" },
  state: { pageSize: 3 },
});

const selectedFees = computed(() =>
  table.data.selected.reduce((sum, player) => sum + (player?.fee ?? 0), 0),
);

function remove() {
  const ids = table.data.selected.map((player) => player?.id);
  players.value = players.value.filter((player) => !ids.includes(player.id));
  table.state.select.clear();
  table.paginator.current = 1;
  sonner.success(`${ids.length} players removed`);
}
</script>

<template>
  <div class="w-full space-y-4">
    <UiTable>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-10 pl-4">
            <UiCheckbox
              :model-value="table.select.isAllOnPage() && table.data.final.length > 0"
              :disabled="!table.data.final.length"
              aria-label="Select the players on this page"
              @update:model-value="table.select.toggleAll()"
            />
          </UiTableHead>
          <UiTableHead v-for="column in table.columns.visible" :key="column.id">
            {{ column.header }}
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="row in table.data.final"
          :key="table.getRowId(row)"
          :data-state="table.select.isSelected(row) ? 'selected' : undefined"
        >
          <UiTableCell class="pl-4">
            <UiCheckbox
              :model-value="table.select.isSelected(row)"
              :aria-label="`Select ${row.name}`"
              @update:model-value="table.select.toggle(row)"
            />
          </UiTableCell>
          <UiTableCell v-for="column in table.columns.visible" :key="column.id">
            <ColumnRender :column="column" :context="row" />
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <UiButton variant="outline" size="sm" :disabled="table.paginator.first" @click="table.paginator.prev()">
          Previous
        </UiButton>
        <UiButton variant="outline" size="sm" :disabled="table.paginator.last" @click="table.paginator.next()">
          Next
        </UiButton>
        <span class="text-sm text-theme">Page {{ table.paginator.current }} of {{ table.paginator.total }}</span>
      </div>
      <div class="flex items-center gap-3">
        <UiBadge variant="outline">
          {{ table.data.selected.length }} selected · {{ selectedFees }} EUR in fees
        </UiBadge>
        <UiButton variant="destructive" size="sm" :disabled="!table.data.selected.length" @click="remove">
          Remove selected
        </UiButton>
      </div>
    </div>
  </div>
</template>
