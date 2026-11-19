<script setup lang="ts">
import { ref } from "vue";
import {
  UiButton,
  UiPagination,
  UiPaginationEllipsis,
  UiPaginationFirst,
  UiPaginationLast,
  UiPaginationList,
  UiPaginationListItem,
  UiPaginationNext,
  UiPaginationPrev,
} from "@rosalana/ui";

const page = ref(5);
</script>

<template>
  <UiPagination
    v-model:page="page"
    :total="240"
    :items-per-page="10"
    :sibling-count="1"
    show-edges
    class="w-full max-w-md"
  >
    <UiPaginationList v-slot="{ items }">
      <UiPaginationFirst />
      <UiPaginationPrev />
      <template v-for="(item, index) in items" :key="index">
        <UiPaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
          <UiButton
            size="icon-sm"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </UiButton>
        </UiPaginationListItem>
        <UiPaginationEllipsis v-else />
      </template>
      <UiPaginationNext />
      <UiPaginationLast />
    </UiPaginationList>
  </UiPagination>
</template>
