<script setup lang="ts">
import { RemoteTable, type Column } from "@rosalana/ui";

type Match = { id: number; teams: string; time: string };

const columns: Column<Match>[] = [{ key: "teams", header: "Match" }, { key: "time", header: "Starts" }];
</script>

<template>
  <div class="w-full space-y-6">
    <!-- While loading, the rows are replaced by one skeleton row per page size. -->
    <RemoteTable
      :data="[]"
      :total="20"
      :columns="columns"
      row-key="id"
      :size="3"
      loading
      :show-search="false"
      :column-toggle="false"
      :paginate="false"
    />
    <RemoteTable
      :data="[]"
      :total="0"
      :columns="columns"
      row-key="id"
      :show-search="false"
      :column-toggle="false"
      :paginate="false"
    >
      <template #empty-state>No matches scheduled yet.</template>
    </RemoteTable>
  </div>
</template>
