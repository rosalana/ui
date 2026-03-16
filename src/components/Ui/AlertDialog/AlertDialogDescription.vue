<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "reka-ui";
import { AlertDialogDescription, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";

const alertDialogDescription = tv({
  base: "text-sm text-theme",
});

interface Props extends AlertDialogDescriptionProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="forwarded"
    :class="[alertDialogDescription({ class: props.class })]"
  >
    <slot />
  </AlertDialogDescription>
</template>
