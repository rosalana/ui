<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  useForwardPropsEmits,
} from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const sheetOverlay = tv({
  base: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
});

const sheetContent = tv({
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

type SheetVariants = VariantProps<typeof sheetContent>;

interface Props extends DialogContentProps {
  side?: SheetVariants["side"];
  class?: HTMLAttributes["class"];
  hideCloseButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  side: "right",
  hideCloseButton: false,
});
const emit = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DialogPortal>
    <DialogOverlay :class="sheetOverlay()" />
    <DialogContent
      data-slot="sheet-content"
      v-bind="forwarded"
      :class="[sheetContent({ side, class: props.class })]"
    >
      <slot />

      <DialogClose
        v-if="!hideCloseButton"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <UiIcon name="lucide:x" class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
