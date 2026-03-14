<script setup lang="ts">
import type { SeparatorProps } from "reka-ui";
import { Separator } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

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
  class?: ClassValue;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
});
</script>

<template>
  <div v-if="text" class="relative flex items-center">
    <Separator
      data-slot="separator"
      v-bind="props"
      :class="[separator({ orientation, class: props.class })]"
    />
    <span class="absolute left-1/2 -translate-x-1/2 bg-background px-3 font-mono text-[10px] uppercase tracking-widest text-foreground/20">
      {{ text }}
    </span>
  </div>
  <Separator
    v-else
    data-slot="separator"
    v-bind="props"
    :class="[separator({ orientation, class: props.class })]"
  />
</template>
