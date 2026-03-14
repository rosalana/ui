<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv, type VariantProps , type ClassValue } from "tailwind-variants";
import { UiIcon } from "../../index";

const badge = tv({
  base: [
    "inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "transition-all duration-200 ease-out",
    "[&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default: [
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        // "shadow-[0_1px_8px_-2px,0_1px_15px_-2px] shadow-primary/40",
      ],
      secondary: [
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        // "shadow-[0_1px_8px_-2px,0_1px_15px_-2px] shadow-secondary/40",
      ],
      destructive: [
        "border-destructive-200 bg-destructive-50 text-destructive text-destructive hover:bg-destructive-100 dark:bg-destructive-950 dark:hover:bg-destructive-900 dark:border-destructive-700",
        // "shadow-[0_1px_3px_-2px,0_1px_15px_-2px] shadow-destructive/30",
      ],
      success: [
        "border-success-200 bg-success-50 text-success hover:bg-success-200 dark:bg-success-950 dark:hover:bg-success-800 dark:border-success-700",
        // "shadow-[0_1px_3px_-2px,0_1px_15px_-2px] shadow-success/30",
      ],
      warning: [
        "border-warning-200 bg-warning-50 text-warning hover:bg-warning-200 dark:bg-warning-950 dark:hover:bg-warning-900 dark:border-warning-700",
        // "shadow-[0_1px_3px_-2px,0_1px_15px_-2px] shadow-warning/30",
      ],
      info: [
        "border-info-200 bg-info-50 text-info hover:bg-info-200 dark:bg-info-950 dark:hover:bg-info-900 dark:border-info-700",
        // "shadow-[0_1px_3px_-2px,0_1px_15px_-2px] shadow-info/30",
      ],
      outline: "text-foreground hover:bg-muted border-border bg-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeVariants = VariantProps<typeof badge>;

interface Props extends PrimitiveProps {
  variant?: BadgeVariants["variant"];
  class?: ClassValue;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});
</script>

<template>
  <Primitive
    data-slot="badge"
    :as="props.as ?? 'div'"
    :as-child="asChild"
    :class="[badge({ variant, class: props.class })]"
  >
    <UiIcon v-if="icon" :name="icon" class="size-3 mr-1" />
    <slot />
  </Primitive>
</template>
