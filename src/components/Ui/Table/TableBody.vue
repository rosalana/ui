<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const tableBody = tv({
  base: "[&_tr:last-child]:border-0",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <tbody data-slot="table-body" :class="[tableBody({ class: props.class })]">
    <slot />
  </tbody>
</template>
