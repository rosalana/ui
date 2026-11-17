<script setup lang="ts">
import type { ComboboxContentProps } from "reka-ui";
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardProps } from "reka-ui";
import { ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";

const comboboxContent = tv({
  base: [
    "relative z-50 min-w-[var(--reka-combobox-trigger-width)] overflow-hidden",
    "rounded-xl border bg-background text-foreground",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15",
    "data-[side=bottom]:origin-top data-[side=bottom]:[--y-from:-10px]",
    "data-[side=top]:origin-bottom data-[side=top]:[--y-from:10px]",
  ],
});

interface Props extends ComboboxContentProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  position: "popper",
  sideOffset: 6,
});
const forwarded = useForwardProps(props);

const contentRef = ref<HTMLElement | null>(null);

/** Height the list animates to as items filter in and out; `auto` until measured. */
const height = ref<number | "auto">("auto");

useResizeObserver(contentRef, ([entry]) => {
  height.value = entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height;
});
</script>

<template>
  <ComboboxPortal>
    <AnimatePresence>
      <ComboboxContent
        data-slot="combobox-content"
        v-bind="forwarded"
        :class="comboboxContent({ class: props.class })"
        as-child
      >
        <motion.div
          :initial="{ opacity: 0, y: 'var(--y-from, 0)', scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: 'var(--y-from, 0)', scale: 0.95 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        >
          <!-- layoutScroll keeps the sliding highlight in place while the list scrolls -->
          <ComboboxViewport as-child>
            <motion.div
              layout-scroll
              class="max-h-72 scroll-py-1.5 overflow-y-auto overflow-x-hidden"
              :initial="false"
              :animate="{ height }"
              :transition="{ type: 'spring', stiffness: 500, damping: 40 }"
            >
              <!-- isolate: the highlight sits behind every item's content, not only its own -->
              <div
                ref="contentRef"
                data-slot="combobox-list"
                class="isolate p-1.5"
              >
                <slot />
              </div>
            </motion.div>
          </ComboboxViewport>
        </motion.div>
      </ComboboxContent>
    </AnimatePresence>
  </ComboboxPortal>
</template>
