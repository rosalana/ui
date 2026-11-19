<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { RemoteTable, type Column } from "@rosalana/ui";

type Tournament = { id: number; name: string; city: string; teams: number };

const all: Tournament[] = Array.from({ length: 27 }, (_, index) => ({
  id: index + 1,
  name: ["Spring Cup", "Summer Open", "Autumn Classic", "Winter League", "City Derby"][index % 5] + ` ${2020 + Math.floor(index / 5)}`,
  city: ["Prague", "Brno", "Ostrava", "Plzeň", "Olomouc", "Zlín"][index % 6],
  teams: 8 + ((index * 3) % 9),
}));

const columns: Column<Tournament>[] = [
  { key: "name", header: "Tournament", toggleable: false },
  { key: "city", header: "City" },
  { key: "teams", header: "Teams", searchable: false },
];

const rows = ref<Tournament[]>([]);
const total = ref(0);
const loading = ref(true);
const query = reactive({
  page: 1,
  size: 5,
  search: "",
  sort: { id: null as string | null, order: "asc" as "asc" | "desc" },
});

// Stands in for the server: it filters, sorts and slices, then answers after a short delay.
function load() {
  loading.value = true;
  setTimeout(() => {
    const needle = query.search.toLowerCase();
    const key = query.sort.id as keyof Tournament | null;
    const matching = all
      .filter((row) => `${row.name} ${row.city}`.toLowerCase().includes(needle))
      .sort((a, b) =>
        key ? String(a[key]).localeCompare(String(b[key]), "en", { numeric: true }) * (query.sort.order === "asc" ? 1 : -1) : 0,
      );
    total.value = matching.length;
    rows.value = matching.slice((query.page - 1) * query.size, query.page * query.size);
    loading.value = false;
  }, 500);
}

onMounted(load);
</script>

<template>
  <RemoteTable
    class="w-full"
    :data="rows"
    :total="total"
    :columns="columns"
    row-key="id"
    :page="query.page"
    :size="query.size"
    :page-size-options="[5, 10]"
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
