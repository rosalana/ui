<script setup lang="ts">
import type { SeparatorProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Separator } from "reka-ui";
import { tv } from "tailwind-variants";

const separator = tv({
  base: "shrink-0 bg-border",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

interface Props extends SeparatorProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
});
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="props"
    :class="[separator({ orientation, class: props.class })]"
  />
</template>
