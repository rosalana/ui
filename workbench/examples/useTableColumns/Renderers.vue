<script setup lang="ts">
import { h } from "vue";
import {
  ColumnRender,
  HeaderRender,
  UiBadge,
  UiButton,
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
  useTableColumns,
  type Column,
} from "@rosalana/ui";

type Match = { id: number; home: string; away: string; score: [number, number]; finished: boolean };

const matches: Match[] = [
  { id: 101, home: "Falcons", away: "Wolves", score: [3, 1], finished: true },
  { id: 102, home: "Ravens", away: "Tigers", score: [2, 2], finished: true },
  { id: 103, home: "Sharks", away: "Bears", score: [0, 0], finished: false },
];

const definitions: Column<Match>[] = [
  { key: "home", header: "Home" },
  { key: "away", header: "Away" },
  {
    key: "score",
    header: () => h("span", { class: "font-semibold" }, "Result"),
    render: (row) => (row.finished ? `${row.score[0]} : ${row.score[1]}` : h("span", { class: "text-theme" }, "not played")),
  },
  {
    key: "finished",
    header: "Status",
    render: (row) => h(UiBadge, { variant: row.finished ? "default" : "secondary" }, () => (row.finished ? "Final" : "Upcoming")),
  },
];

const columns = useTableColumns<Match>(definitions);
let extra: ReturnType<typeof columns.add> | undefined;

function toggleId() {
  if (extra) {
    columns.remove(extra);
    extra = undefined;
  } else {
    extra = columns.add({ key: "id", header: "Match no.", index: 0 });
  }
}
</script>

<template>
  <div class="w-full space-y-4">
    <UiButton variant="outline" size="sm" @click="toggleId">Toggle match number column</UiButton>
    <UiTable>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead v-for="column in columns.visible" :key="column.id">
            <HeaderRender :column="column" :context="columns" />
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="match in matches" :key="match.id">
          <UiTableCell v-for="column in columns.visible" :key="column.id">
            <ColumnRender :column="column" :context="match" />
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </div>
</template>
