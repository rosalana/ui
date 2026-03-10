<script setup lang="ts">
import type { PaginationLastProps } from "reka-ui";
import { PaginationLast, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const paginationLast = tv({
  base: "inline-flex size-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
});

interface Props extends PaginationLastProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <PaginationLast
    data-slot="pagination-last"
    v-bind="forwarded"
    :class="[paginationLast({ class: props.class })]"
  >
    <slot>
      <UiIcon name="lucide:chevrons-right" class="size-4" />
    </slot>
  </PaginationLast>
</template>
