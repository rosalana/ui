<script setup lang="ts">
import { ref } from "vue";
import {
  UiPagination,
  UiPaginationList,
  UiPaginationNext,
  UiPaginationPrev,
} from "@rosalana/ui";

const total = 36;
const perPage = 12;
const page = ref(1);
</script>

<template>
  <UiPagination
    v-model:page="page"
    :total="total"
    :items-per-page="perPage"
    class="w-full max-w-xs"
  >
    <UiPaginationList class="gap-3">
      <UiPaginationPrev />
      <span class="text-sm text-theme">
        Page {{ page }} of {{ Math.ceil(total / perPage) }}
      </span>
      <UiPaginationNext />
    </UiPaginationList>
  </UiPagination>
</template>
