<script setup lang="ts">
import type { ToggleProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Toggle, useForwardProps } from "reka-ui";
import { tv, type VariantProps } from "tailwind-variants";

const toggle = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 px-3 min-w-9",
      sm: "h-8 px-2 min-w-8",
      lg: "h-10 px-3 min-w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ToggleVariants = VariantProps<typeof toggle>;

interface Props extends ToggleProps {
  variant?: ToggleVariants["variant"];
  size?: ToggleVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
});

const forwarded = useForwardProps(props);
</script>

<template>
  <Toggle
    data-slot="toggle"
    v-bind="forwarded"
    :class="[toggle({ variant, size, class: props.class })]"
  >
    <slot />
  </Toggle>
</template>
