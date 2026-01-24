<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { tv } from "tailwind-variants";

const sheetHeader = tv({
  base: "flex flex-col space-y-2 text-center sm:text-left",
});

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <div data-slot="sheet-header" :class="[sheetHeader({ class: props.class })]">
    <slot />
  </div>
</template>
