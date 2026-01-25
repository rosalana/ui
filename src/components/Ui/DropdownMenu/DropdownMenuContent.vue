<script setup lang="ts">
import type { DropdownMenuContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";

const dropdownMenuContent = tv({
  base: [
    "z-50 min-w-[8rem] overflow-hidden",
    "rounded-xl border bg-background p-1.5 text-foreground",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15 dark:shadow-theme/30",
    "data-[side=bottom]:origin-top data-[side=bottom]:[--y-from:-10px]",
    "data-[side=top]:origin-bottom data-[side=top]:[--y-from:10px]",
    "data-[side=left]:origin-right data-[side=left]:[--x-from:10px]",
    "data-[side=right]:origin-left data-[side=right]:[--x-from:-10px]",
  ],
});

interface Props extends DropdownMenuContentProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
});

const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuPortal>
    <AnimatePresence>
      <DropdownMenuContent
        v-bind="forwarded"
        :class="dropdownMenuContent({ class: props.class })"
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
      </DropdownMenuContent>
    </AnimatePresence>
  </DropdownMenuPortal>
</template>
