<script setup lang="ts">
import { ref } from "vue";
import { DataTable, UiButton, type Column } from "@rosalana/ui";

type Match = { id: number; teams: string; time: string; court: string };

const upcoming = ref<Match[]>([
  { id: 1, teams: "Falcons vs. Wolves", time: "18:00", court: "Court 1" },
  { id: 2, teams: "Ravens vs. Tigers", time: "18:45", court: "Court 2" },
  { id: 3, teams: "Sharks vs. Bears", time: "19:30", court: "Court 1" },
]);

const columns: Column<Match>[] = [
  { key: "teams", header: "Match", sortable: false },
  { key: "time", header: "Starts" },
  { key: "court", header: "Court", sortable: false },
];
</script>

<template>
  <div class="w-full space-y-3">
    <DataTable
      :data="upcoming"
      :columns="columns"
      row-key="id"
      :show-search="false"
      :column-toggle="false"
      :paginate="false"
    >
      <template #empty-state>Everything has been played. See you next round!</template>
    </DataTable>
    <UiButton variant="outline" size="sm" @click="upcoming = []">Finish the evening</UiButton>
  </div>
</template>
