<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const table = tv({
  base: "w-full caption-bottom text-sm",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table data-slot="table" :class="[table({ class: props.class })]">
      <slot />
    </table>
  </div>
</template>
