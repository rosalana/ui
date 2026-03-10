<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui";
import { DialogDescription, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const dialogDescription = tv({
  base: "text-sm text-muted-foreground",
});

interface Props extends DialogDescriptionProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwarded"
    :class="[dialogDescription({ class: props.class })]"
  >
    <slot />
  </DialogDescription>
</template>
