<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

// implemented
const sheetFooter = tv({
  base: "flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div data-slot="sheet-footer" :class="[sheetFooter({ class: props.class })]">
    <slot />
  </div>
</template>
