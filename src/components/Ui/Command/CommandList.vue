<script setup lang="ts">
import type { ListboxContentProps } from "reka-ui";
import { ListboxContent, useForwardProps } from "reka-ui";
import { ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";

const commandList = tv({
  base: "max-h-[300px] scroll-py-1.5 overflow-y-auto overflow-x-hidden",
});

interface Props extends ListboxContentProps {
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
  <ListboxContent
    data-slot="command-list"
    v-bind="forwarded"
    :class="[commandList({ class: props.class })]"
    as-child
  >
    <!-- layoutScroll keeps the sliding highlight in place while the list scrolls -->
    <motion.div
      layout-scroll
      :initial="false"
      :animate="{ height }"
      :transition="{ type: 'spring', stiffness: 500, damping: 40 }"
    >
      <!-- isolate: the highlight sits behind every item's content, not only its own -->
      <div ref="contentRef" class="isolate p-1.5">
        <slot />
      </div>
    </motion.div>
  </ListboxContent>
</template>
