<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const tableCell = tv({
  base: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <td data-slot="table-cell" :class="[tableCell({ class: props.class })]">
    <slot />
  </td>
</template>
