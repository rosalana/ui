<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { tv, VariantProps, type ClassValue } from "tailwind-variants";

const alertTitle = tv({
  base: "mb-1.5 font-medium leading-none tracking-tight",
  variants: {
    variant: {
      default: "",
      mono: "font-mono mb-0.5 text-[10px] tracking-widest uppercase",
    },
  },
});

type AlertTitleVariants = VariantProps<typeof alertTitle>;

interface Props extends PrimitiveProps {
  class?: ClassValue;
  variant?: AlertTitleVariants["variant"];
}

const props = defineProps<Props>();
</script>

<template>
  <Primitive
    data-slot="alert-title"
    :as="as ?? 'h5'"
    :as-child="asChild"
    :class="[alertTitle({ variant, class: props.class })]"
  >
    <slot />
  </Primitive>
</template>
