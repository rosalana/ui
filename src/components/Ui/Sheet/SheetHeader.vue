<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

// implemented
const sheetHeader = tv({
  base: "flex flex-col gap-1.5 border-b border-border pb-4",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div data-slot="sheet-header" :class="[sheetHeader({ class: props.class })]">
    <slot />
  </div>
</template>
