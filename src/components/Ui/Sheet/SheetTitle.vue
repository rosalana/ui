<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { DialogTitle, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const sheetTitle = tv({
  base: "text-lg font-semibold text-foreground",
});

interface Props extends DialogTitleProps {
  class?: HTMLAttributes["class"];
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
