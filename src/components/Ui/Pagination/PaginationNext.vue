<script setup lang="ts">
import type { PaginationNextProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { PaginationNext, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const paginationNext = tv({
  base: "inline-flex size-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
});

interface Props extends PaginationNextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    v-bind="forwarded"
    :class="[paginationNext({ class: props.class })]"
  >
    <slot>
      <UiIcon name="lucide:chevron-right" class="size-4" />
    </slot>
  </PaginationNext>
</template>
