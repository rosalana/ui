<script setup lang="ts">
// implemented
import type { DialogContentEmits, DialogContentProps } from "reka-ui";
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  injectDialogRootContext,
  useForwardPropsEmits,
} from "reka-ui";
import { tv, type VariantProps , type ClassValue } from "tailwind-variants";
import { computed } from "vue";
import { AnimatePresence, motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";

const sheetContent = tv({
  base: [
    "fixed z-50 flex flex-col gap-4 bg-background p-6",
    "border-border",
    "shadow-[0_8px_40px_-8px,0_16px_60px_-12px] shadow-black/20",
    "outline-none",
  ],
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b rounded-b-2xl",
      bottom: "inset-x-0 bottom-0 border-t rounded-t-2xl",
      left: "inset-y-0 left-0 h-full w-3/4 border-r rounded-r-2xl sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l rounded-l-2xl sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

type SheetVariants = VariantProps<typeof sheetContent>;

interface Props extends DialogContentProps {
  side?: SheetVariants["side"];
  class?: ClassValue;
  hideCloseButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  side: "right",
  hideCloseButton: false,
});
const emit = defineEmits<DialogContentEmits>();

// Exclude asChild and forceMount from forwarded — we set them explicitly
const { asChild: _a, forceMount: _fm, class: _c, side: _s, hideCloseButton: _h, ...contentProps } = props;
const forwarded = useForwardPropsEmits(contentProps as DialogContentProps, emit);

const { open } = injectDialogRootContext();

const panelInitial = computed(() => {
  if (props.side === "left") return { x: "-100%" };
  if (props.side === "top") return { y: "-100%" };
  if (props.side === "bottom") return { y: "100%" };
  return { x: "100%" };
});
</script>

<template>
  <DialogPortal>
    <AnimatePresence>
      <template v-if="open">
        <!-- Overlay -->
        <DialogOverlay as-child force-mount>
          <motion.div
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            :transition="{ duration: 0.2 }"
            class="fixed inset-0 z-50 bg-black/60"
          />
        </DialogOverlay>

        <!-- Panel -->
        <DialogContent
          data-slot="sheet-content"
          as-child
          force-mount
          v-bind="forwarded"
        >
          <motion.div
            :initial="panelInitial"
            :animate="{ x: 0, y: 0 }"
            :exit="panelInitial"
            :transition="{ type: 'spring', stiffness: 380, damping: 38 }"
            :class="[sheetContent({ side: props.side, class: props.class })]"
          >
            <slot />

            <DialogClose
              v-if="!hideCloseButton"
              class="absolute right-4 top-4 flex items-center justify-center size-8 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:pointer-events-none active:scale-[0.97]"
            >
              <UiIcon name="lucide:x" class="size-4" />
              <span class="sr-only">Close</span>
            </DialogClose>
          </motion.div>
        </DialogContent>
      </template>
    </AnimatePresence>
  </DialogPortal>
</template>
