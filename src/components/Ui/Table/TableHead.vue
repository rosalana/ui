<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { tv } from "tailwind-variants";

const tableHead = tv({
  base: "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5",
});

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <th data-slot="table-head" :class="[tableHead({ class: props.class })]">
    <slot />
  </th>
</template>
