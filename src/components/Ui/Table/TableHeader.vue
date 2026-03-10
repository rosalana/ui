<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const tableHeader = tv({
  base: "[&_tr]:border-b",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <thead
    data-slot="table-header"
    :class="[tableHeader({ class: props.class })]"
  >
    <slot />
  </thead>
</template>
