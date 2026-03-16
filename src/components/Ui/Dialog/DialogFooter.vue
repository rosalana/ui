<script setup lang="ts">
import { tv, type ClassValue } from "tailwind-variants";

const dialogFooter = tv({
  base: "flex items-center sm:justify-end justify-center gap-2",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="[dialogFooter({ class: props.class })]"
  >
    <slot />
  </div>
</template>
