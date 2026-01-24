<script setup lang="ts">
import type { PaginationListItemProps } from "reka-ui";
import { PaginationListItem, useForwardProps } from "reka-ui";

const props = defineProps<PaginationListItemProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <PaginationListItem data-slot="pagination-list-item" v-bind="forwarded">
    <slot />
  </PaginationListItem>
</template>
