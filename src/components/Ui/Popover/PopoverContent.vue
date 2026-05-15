<script setup lang="ts">
import type { PopoverContentProps } from "reka-ui";
import { PopoverContent, PopoverPortal, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";

const popoverContent = tv({
  base: [
    "relative z-50 w-72 overflow-hidden",
    "rounded-xl border bg-background text-foreground p-1",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15",
    "data-[side=bottom]:origin-top data-[side=bottom]:[--y-from:-8px]",
    "data-[side=top]:origin-bottom data-[side=top]:[--y-from:8px]",
    "data-[side=left]:origin-right data-[side=left]:[--x-from:8px]",
    "data-[side=right]:origin-left data-[side=right]:[--x-from:-8px]",
  ],
});

interface Props extends PopoverContentProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
  align: "center",
});

const forwarded = useForwardProps(props);
</script>

<template>
  <PopoverPortal>
    <AnimatePresence>
      <PopoverContent
        data-slot="popover-content"
        v-bind="forwarded"
        :class="[popoverContent({ class: props.class })]"
        as-child
      >
        <motion.div
          :initial="{
            opacity: 0,
            y: 'var(--y-from, 0)',
            x: 'var(--x-from, 0)',
            scale: 0.9,
          }"
          :animate="{ opacity: 1, y: 0, x: 0, scale: 1 }"
          :exit="{
            opacity: 0,
            y: 'var(--y-from, 0)',
            x: 'var(--x-from, 0)',
            scale: 0.9,
          }"
          :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        >
          <slot />
        </motion.div>
      </PopoverContent>
    </AnimatePresence>
  </PopoverPortal>
</template>
