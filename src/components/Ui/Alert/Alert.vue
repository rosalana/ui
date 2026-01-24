<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const alert = tv({
  base: "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive:
        "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      success:
        "border-success/50 text-success dark:border-success [&>svg]:text-success",
      warning:
        "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
      info: "border-info/50 text-info dark:border-info [&>svg]:text-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertVariants = VariantProps<typeof alert>;

interface Props extends PrimitiveProps {
  variant?: AlertVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});
</script>

<template>
  <Primitive
    data-slot="alert"
    :as="as ?? 'div'"
    :as-child="asChild"
    role="alert"
    :class="[alert({ variant, class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
