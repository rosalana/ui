<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui";
import { DialogTitle, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const dialogTitle = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
});

interface Props extends DialogTitleProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwarded"
    :class="[dialogTitle({ class: props.class })]"
  >
    <slot />
  </DialogTitle>
</template>
