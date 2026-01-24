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

const selectContent = tv({
  base: "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-background text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  variants: {
    position: {
      popper:
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
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
    <SelectContent
      data-slot="select-content"
      v-bind="forwarded"
      :class="[selectContent({ position, class: props.class })]"
    >
      <SelectViewport :class="selectViewport({ position })">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>
