<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui";
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  useForwardPropsEmits,
} from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";
import Button from "../Button/Button.vue";

const dialogOverlay = tv({
  base: "fixed inset-0 z-50 bg-white/20 dark:bg-black/20",
});

const dialogContent = tv({
  base: [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "w-full max-w-lg",
    "grid gap-4 p-6",
    "rounded-xl border bg-background",
    "shadow-xl shadow-theme/15",
  ],
});

interface Props extends DialogContentProps {
  class?: ClassValue;
  hideCloseButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideCloseButton: false,
});
const emit = defineEmits<DialogContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DialogPortal>
    <AnimatePresence>
      <DialogOverlay :class="dialogOverlay()" as-child>
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.15 }"
        >
          <!-- Grid overlay -->
          <div
            class="pointer-events-none absolute inset-0 bg-size-[72px_72px] opacity-[0.3]"
            style="
              background-image:
                linear-gradient(var(--color-border) 1px, transparent 1px),
                linear-gradient(
                  to right,
                  var(--color-border) 1px,
                  transparent 1px
                );
            "
          />

          <!-- Gradient accent -->
          <div
            class="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-secondary/15"
          />
        </motion.div>
      </DialogOverlay>
    </AnimatePresence>

    <AnimatePresence>
      <DialogContent
        data-slot="dialog-content"
        v-bind="forwarded"
        :class="dialogContent({ class: props.class })"
        as-child
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0.92 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.92 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        >
          <slot />

          <DialogClose
            v-if="!hideCloseButton"
            as-child
            class="absolute right-4 top-4"
          >
            <Button variant="ghost" size="icon-sm">
              <UiIcon name="lucide:x" class="size-4" />
              <span class="sr-only">Close</span>
            </Button>
          </DialogClose>
        </motion.div>
      </DialogContent>
    </AnimatePresence>
  </DialogPortal>
</template>
