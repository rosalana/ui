<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";

const scrollArea = tv({
  base: "relative overflow-hidden",
});

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

interface Props extends ScrollAreaRootProps {
  class?: HTMLAttributes["class"];
  viewportClass?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="forwarded"
    :class="[scrollArea({ class: props.class })]"
  >
    <ScrollAreaViewport
      class="h-full w-full rounded-[inherit]"
      :class="viewportClass"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      :class="scrollbar({ orientation: 'vertical' })"
      orientation="vertical"
    >
      <ScrollAreaThumb :class="thumb()" />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      :class="scrollbar({ orientation: 'horizontal' })"
      orientation="horizontal"
    >
      <ScrollAreaThumb :class="thumb()" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
