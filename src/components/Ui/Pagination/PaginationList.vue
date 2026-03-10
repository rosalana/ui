<script setup lang="ts">
import type { PaginationListProps } from "reka-ui";
import { PaginationList, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const paginationList = tv({
  base: "flex flex-row items-center gap-1",
});

interface Props extends PaginationListProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <PaginationList
    data-slot="pagination-list"
    v-bind="forwarded"
    :class="[paginationList({ class: props.class })]"
  >
    <slot />
  </PaginationList>
</template>
