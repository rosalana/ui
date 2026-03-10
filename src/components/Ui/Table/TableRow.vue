<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const tableRow = tv({
  base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <tr data-slot="table-row" :class="[tableRow({ class: props.class })]">
    <slot />
  </tr>
</template>
