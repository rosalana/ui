<script setup lang="ts">
import type { DropdownMenuSubContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  DropdownMenuPortal,
  DropdownMenuSubContent,
  useForwardProps,
} from "reka-ui";
import { tv } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";

const dropdownMenuSubContent = tv({
  base: [
    "z-50 min-w-[8rem] overflow-hidden",
    "rounded-xl border bg-background p-1.5 text-foreground",
    "shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-black/15 dark:shadow-black/30",
    "data-[side=bottom]:origin-top data-[side=bottom]:[--y-from:-10px]",
    "data-[side=top]:origin-bottom data-[side=top]:[--y-from:10px]",
    "data-[side=left]:origin-right data-[side=left]:[--x-from:10px]",
    "data-[side=right]:origin-left data-[side=right]:[--x-from:-10px]",
  ],
});

interface Props extends DropdownMenuSubContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuPortal>
    <AnimatePresence>
      <DropdownMenuSubContent
        data-slot="dropdown-menu-sub-content"
        v-bind="forwarded"
        :class="[dropdownMenuSubContent({ class: props.class })]"
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
      </DropdownMenuSubContent>
    </AnimatePresence>
  </DropdownMenuPortal>
</template>
