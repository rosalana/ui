<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { AlertDialogDescription, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const alertDialogDescription = tv({
  base: "text-sm text-muted-foreground",
});

interface Props extends AlertDialogDescriptionProps {
  class?: HTMLAttributes["class"];
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
