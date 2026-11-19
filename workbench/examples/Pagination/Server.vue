<script setup lang="ts">
import { computed, ref } from "vue";
import {
  UiButton,
  UiPagination,
  UiPaginationEllipsis,
  UiPaginationList,
  UiPaginationListItem,
  UiPaginationNext,
  UiPaginationPrev,
} from "@rosalana/ui";

// The docs simulate the server: the app code asks Inertia for the page instead.
const names = ["Northern Lights", "Harbor Hawks", "Red Foxes", "Iron Wolves", "Blue Herons"];
const all = Array.from(
  { length: 47 },
  (_, i) => `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
);

const page = ref(1);
const perPage = 5;
const rows = computed(() => all.slice((page.value - 1) * perPage, page.value * perPage));
</script>

<template>
  <div class="w-full max-w-sm space-y-4">
    <ul class="divide-y rounded-xl border text-sm">
      <li v-for="team in rows" :key="team" class="px-4 py-2.5">{{ team }}</li>
    </ul>

    <UiPagination
      v-model:page="page"
      :total="all.length"
      :items-per-page="perPage"
      :sibling-count="0"
    >
      <UiPaginationList v-slot="{ items }">
        <UiPaginationPrev />
        <template v-for="(item, index) in items" :key="index">
          <UiPaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
            <UiButton size="icon-sm" :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </UiButton>
          </UiPaginationListItem>
          <UiPaginationEllipsis v-else />
        </template>
        <UiPaginationNext />
      </UiPaginationList>
    </UiPagination>
  </div>
</template>
