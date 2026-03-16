<script setup lang="ts">
import { tv, type ClassValue } from "tailwind-variants";

const alertDialogFooter = tv({
  base: "flex items-center sm:justify-end justify-center gap-2",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-slot="alert-dialog-footer"
    :class="[alertDialogFooter({ class: props.class })]"
  >
    <slot />
  </div>
</template>
