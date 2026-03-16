<script setup lang="ts">
import type { AlertDialogTitleProps } from "reka-ui";
import { AlertDialogTitle, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const alertDialogTitle = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
});

interface Props extends AlertDialogTitleProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="forwarded"
    :class="[alertDialogTitle({ class: props.class })]"
  >
    <slot />
  </AlertDialogTitle>
</template>
