<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import {
  UiButton,
  UiPagination,
  UiPaginationEllipsis,
  UiPaginationList,
  UiPaginationListItem,
  UiPaginationNext,
  UiPaginationPrev,
} from "@rosalana/ui";

const props = defineProps<{
  teams: { data: { id: number; name: string }[]; current_page: number; per_page: number; total: number };
}>();

// The server owns the page: visit the new one and let Inertia swap the props.
function go(page: number) {
  router.get("/teams", { page }, { preserveScroll: true, preserveState: true });
}
</script>

<template>
  <div class="w-full max-w-sm space-y-4">
    <ul class="divide-y rounded-xl border text-sm">
      <li v-for="team in teams.data" :key="team.id" class="px-4 py-2.5">
        {{ team.name }}
      </li>
    </ul>

    <UiPagination
      :page="teams.current_page"
      :total="teams.total"
      :items-per-page="teams.per_page"
      :sibling-count="0"
      @update:page="go"
    >
      <UiPaginationList v-slot="{ items }">
        <UiPaginationPrev />
        <template v-for="(item, index) in items" :key="index">
          <UiPaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
            <UiButton
              size="icon-sm"
              :variant="item.value === teams.current_page ? 'default' : 'outline'"
            >
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
