<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui";
import {
  AlertDialogContent,
  AlertDialogPortal,
  AlertDialogOverlay,
  useForwardPropsEmits,
} from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";

const alertDialogOverlay = tv({
  base: "fixed inset-0 z-50 bg-white/20 dark:bg-black/20",
});

const alertDialogContent = tv({
  base: [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "w-full max-w-lg",
    "grid gap-4 p-6",
    "rounded-xl border bg-background",
    "shadow-xl shadow-theme/15",
  ],
});

interface Props extends AlertDialogContentProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const emit = defineEmits<AlertDialogContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <AlertDialogPortal>
    <AnimatePresence>
      <AlertDialogOverlay :class="alertDialogOverlay()" as-child>
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
      </AlertDialogOverlay>
    </AnimatePresence>

    <AnimatePresence>
      <AlertDialogContent
        data-slot="alert-dialog-content"
        v-bind="forwarded"
        :class="alertDialogContent({ class: props.class })"
        as-child
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0.92 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.92 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        >
          <slot />
        </motion.div>
      </AlertDialogContent>
    </AnimatePresence>
  </AlertDialogPortal>
</template>
