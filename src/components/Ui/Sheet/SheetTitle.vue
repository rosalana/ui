<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui";
import { DialogTitle, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

// implemented
const sheetTitle = tv({
  base: "text-lg font-semibold tracking-tight text-foreground",
});

interface Props extends DialogTitleProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DialogTitle
    data-slot="sheet-title"
    v-bind="forwarded"
    :class="[sheetTitle({ class: props.class })]"
  >
    <slot />
  </DialogTitle>
</template>
