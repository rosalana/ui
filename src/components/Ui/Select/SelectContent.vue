<script setup lang="ts">
import type { SelectContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";

const selectContent = tv({
  base: [
    "relative z-50 max-h-96 min-w-[8rem] overflow-hidden",
    "rounded-xl border bg-background text-foreground p-0.5",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15 dark:shadow-theme/30",
  ],
  variants: {
    position: {
      popper: [
        "data-[side=bottom]:origin-top data-[side=bottom]:[--y-from:-10px]",
        "data-[side=top]:origin-bottom data-[side=top]:[--y-from:10px]",
        "data-[side=left]:origin-right data-[side=left]:[--x-from:10px]",
        "data-[side=right]:origin-left data-[side=right]:[--x-from:-10px]",
      ],

      // "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      "item-aligned": "",
    },
  },
  defaultVariants: {
    position: "popper",
  },
});

const selectViewport = tv({
  base: "p-1",
  variants: {
    position: {
      popper:
        "h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)]",
      "item-aligned": "",
    },
  },
  defaultVariants: {
    position: "popper",
  },
});

interface Props extends SelectContentProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  position: "popper",
  sideOffset: 4,
});

const forwarded = useForwardProps(props);
</script>

<template>
  <SelectPortal>
    <AnimatePresence>
      <SelectContent
        data-slot="select-content"
        v-bind="forwarded"
        :class="[selectContent({ position, class: props.class })]"
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
          <SelectViewport :class="selectViewport({ position })">
            <slot />
          </SelectViewport>
        </motion.div>
      </SelectContent>
    </AnimatePresence>
  </SelectPortal>
</template>
