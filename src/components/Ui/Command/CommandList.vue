<script setup lang="ts">
import type { ComboboxContentProps } from "reka-ui";
import { ComboboxContent, useForwardProps } from "reka-ui";
import { ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { tv , type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";

const commandList = tv({
  base: "max-h-[300px] scroll-py-1.5 overflow-y-auto overflow-x-hidden",
});

interface Props extends ComboboxContentProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const contentRef = ref<HTMLElement | null>(null);

/** Height the list animates to; `auto` until the content is measured. */
const height = ref<number | "auto">("auto");

useResizeObserver(contentRef, ([entry]) => {
  const list = contentRef.value?.parentElement;
  const maxHeight = list ? parseFloat(getComputedStyle(list).maxHeight) : NaN;
  const contentHeight = entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height;

  // Clamp to max-height, or the spring would spend time animating a height nobody sees.
  height.value = Number.isNaN(maxHeight)
    ? contentHeight
    : Math.min(contentHeight, maxHeight);
});
</script>

<template>
  <ComboboxContent data-slot="command-list" v-bind="forwarded">
    <!-- The scroll container: layoutScroll keeps the sliding highlight in place while it scrolls -->
    <motion.div
      layout-scroll
      :class="[commandList({ class: props.class })]"
      :initial="false"
      :animate="{ height }"
      :transition="{ type: 'spring', stiffness: 500, damping: 40 }"
    >
      <!-- isolate: the highlight sits behind every item's content, not only its own -->
      <div ref="contentRef" data-slot="command-list-content" class="isolate p-1.5 empty:p-0">
        <slot />
      </div>
    </motion.div>
  </ComboboxContent>
</template>
