<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";
import { UiIcon } from "../../index";

const badge = tv({
  base: [
    "inline-flex cursor-default items-center rounded-xl border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "transition-all duration-200 ease-out",
    "[&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground shadow-[0_1px_8px_-2px,0_2px_20px_-2px] shadow-primary/40 hover:bg-primary/90",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground shadow-[0_1px_8px_-2px,0_2px_20px_-2px] shadow-secondary/40 hover:bg-secondary/90",
      destructive:
        "border-destructive/30 bg-destructive/20 text-destructive shadow-[0_1px_8px_-2px,0_2px_20px_-2px] shadow-destructive/40 hover:bg-destructive/30",
      success:
        "border-success/30 bg-success/20 text-success shadow-[0_1px_8px_-2px,0_2px_20px_-2px] shadow-success/40 hover:bg-success/30",
      warning:
        "border-warning/30 bg-warning/20 text-warning shadow-[0_1px_8px_-2px,0_2px_20px_-2px] shadow-warning/40 hover:bg-warning/30",
      info: "border-info/30 bg-info/20 text-info shadow-[0_1px_8px_-2px,0_2px_20px_-2px] shadow-info/40 hover:bg-info/30",
      outline: "text-foreground hover:bg-muted border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeVariants = VariantProps<typeof badge>;

interface Props extends PrimitiveProps {
  variant?: BadgeVariants["variant"];
  class?: HTMLAttributes["class"];
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
