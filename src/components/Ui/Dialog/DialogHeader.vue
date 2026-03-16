<script setup lang="ts">
import { tv, type ClassValue } from "tailwind-variants";

const dialogHeader = tv({
  base: "flex flex-col gap-1 text-center sm:text-left",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="[dialogHeader({ class: props.class })]"
  >
    <slot />
  </div>
</template>
