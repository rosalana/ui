<script setup lang="ts">
import type { PaginationFirstProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { PaginationFirst, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const paginationFirst = tv({
  base: "inline-flex size-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
});

interface Props extends PaginationFirstProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <PaginationFirst
    data-slot="pagination-first"
    v-bind="forwarded"
    :class="[paginationFirst({ class: props.class })]"
  >
    <slot>
      <UiIcon name="lucide:chevrons-left" class="size-4" />
    </slot>
  </PaginationFirst>
</template>
