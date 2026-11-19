<script setup lang="ts">
import { reactive, ref } from "vue";
import { router } from "@inertiajs/vue3";
import { RemoteTable, type Column } from "@rosalana/ui";

type Tournament = { id: number; name: string; city: string; teams: number };

// The controller answers with only the requested page and the number of all matching records.
const props = defineProps<{
  tournaments: { data: Tournament[]; total: number };
  filters: { page: number; size: number; search: string; sort: string | null; direction: "asc" | "desc" };
}>();

const columns: Column<Tournament>[] = [
  { key: "name", header: "Tournament", toggleable: false },
  { key: "city", header: "City" },
  { key: "teams", header: "Teams", searchable: false },
];

const loading = ref(false);
const query = reactive({
  page: props.filters.page,
  size: props.filters.size,
  search: props.filters.search,
  sort: { id: props.filters.sort, order: props.filters.direction },
});

function load() {
  router.get(
    "/tournaments",
    {
      page: query.page,
      size: query.size,
      search: query.search || undefined,
      sort: query.sort.id ?? undefined,
      direction: query.sort.id ? query.sort.order : undefined,
    },
    {
      only: ["tournaments", "filters"],
      preserveState: true,
      preserveScroll: true,
      replace: true,
      onStart: () => (loading.value = true),
      onFinish: () => (loading.value = false),
    },
  );
}
</script>

<template>
  <RemoteTable
    class="w-full"
    :data="props.tournaments.data"
    :total="props.tournaments.total"
    :columns="columns"
    row-key="id"
    :page="query.page"
    :size="query.size"
    :search="query.search"
    :sort="query.sort"
    :loading="loading"
    @update:page="query.page = $event"
    @update:size="(query.size = $event), (query.page = 1)"
    @update:search="(query.search = $event), (query.page = 1)"
    @update:sort="query.sort = $event"
    @update="load"
  >
    <template #empty-state>No tournament matches your search.</template>
  </RemoteTable>
</template>
