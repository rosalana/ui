<script setup lang="ts">
import type { TooltipContentProps } from "reka-ui";
import { TooltipContent, TooltipPortal, useForwardProps } from "reka-ui";
import { tv, VariantProps, type ClassValue } from "tailwind-variants";

const tooltipContent = tv({
  base: "z-50 overflow-hidden border rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive-200 bg-destructive-50 text-destructive dark:bg-destructive-950 dark:border-destructive-700",
      success: "border-success-200 bg-success-50 text-success dark:bg-success-950 dark:border-success-700",
      warning: "border-warning-200 bg-warning-50 text-warning dark:bg-warning-950 dark:border-warning-700",
      info: "border-info-200 bg-info-50 text-info dark:bg-info-950 dark:border-info-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TooltipContentVariants = VariantProps<typeof tooltipContent>;

interface Props extends TooltipContentProps {
  class?: ClassValue;
  variant?: TooltipContentVariants["variant"];
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
  variant: "default",
});

const forwarded = useForwardProps(props);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="forwarded"
      :class="[tooltipContent({ variant, class: props.class })]"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
