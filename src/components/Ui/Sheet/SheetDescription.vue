<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui";
import { DialogDescription, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

// implemented
const sheetDescription = tv({
  base: "text-sm text-theme",
});

interface Props extends DialogDescriptionProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DialogDescription
    data-slot="sheet-description"
    v-bind="forwarded"
    :class="[sheetDescription({ class: props.class })]"
  >
    <slot />
  </DialogDescription>
</template>
