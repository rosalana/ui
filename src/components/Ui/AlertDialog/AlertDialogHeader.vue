<script setup lang="ts">
import { tv , type ClassValue } from "tailwind-variants";

const alertDialogHeader = tv({
  base: "flex flex-col gap-1 text-center sm:text-left",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    data-slot="alert-dialog-header"
    :class="[alertDialogHeader({ class: props.class })]"
  >
    <slot />
  </div>
</template>
