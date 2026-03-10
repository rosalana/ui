<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const alertDialogFooter = tv({
  base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
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
