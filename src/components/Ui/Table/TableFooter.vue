<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { tv } from "tailwind-variants";

const tableFooter = tv({
  base: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
});

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <tfoot
    data-slot="table-footer"
    :class="[tableFooter({ class: props.class })]"
  >
    <slot />
  </tfoot>
</template>
