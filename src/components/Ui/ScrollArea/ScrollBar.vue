<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ScrollAreaScrollbar, ScrollAreaThumb, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const scrollbar = tv({
  base: "flex touch-none select-none transition-colors",
  variants: {
    orientation: {
      vertical: "h-full w-2.5 border-l border-l-transparent p-px",
      horizontal: "h-2.5 flex-col border-t border-t-transparent p-px",
    },
  },
});

const thumb = tv({
  base: "relative flex-1 rounded-full bg-border",
});

interface Props extends ScrollAreaScrollbarProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
});

const forwarded = useForwardProps(props);
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-bar"
    v-bind="forwarded"
    :class="[scrollbar({ orientation, class: props.class })]"
  >
    <ScrollAreaThumb :class="thumb()" />
  </ScrollAreaScrollbar>
</template>
