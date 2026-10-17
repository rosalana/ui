<script setup lang="ts">
import type { ToggleGroupItemProps } from "reka-ui";
import { ToggleGroupItem, useForwardProps } from "reka-ui";
import { tv, type VariantProps , type ClassValue } from "tailwind-variants";
import { inject } from "vue";

const toggleGroupItem = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "rounded-lg border border-transparent",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.97]",
  ],
  variants: {
    variant: {
      // Off like the ghost UiButton, pressed like the UiButton variant of the same name
      default: [
        "bg-transparent text-foreground",
        "data-[state=off]:hover:bg-muted data-[state=off]:hover:border-border/40",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        "data-[state=on]:shadow-[0_2px_8px_-3px,0_4px_20px_-4px] data-[state=on]:shadow-primary/40",
        "data-[state=on]:hover:shadow-primary data-[state=on]:hover:brightness-105",
      ],
      destructive: [
        "bg-transparent text-foreground",
        "data-[state=off]:hover:bg-muted data-[state=off]:hover:border-border/40",
        "data-[state=on]:bg-destructive data-[state=on]:text-white",
        "data-[state=on]:shadow-[0_2px_8px_-3px,0_4px_20px_-4px] data-[state=on]:shadow-destructive/40",
        "data-[state=on]:hover:shadow-destructive data-[state=on]:hover:brightness-105",
        "focus-visible:ring-destructive/30",
      ],
      secondary: [
        "bg-transparent text-foreground",
        "data-[state=off]:hover:bg-muted data-[state=off]:hover:border-border/40",
        "data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground",
        "data-[state=on]:shadow-[0_2px_8px_-3px,0_4px_20px_-4px] data-[state=on]:shadow-secondary/40",
        "data-[state=on]:hover:shadow-secondary",
      ],
      // Off like the outline UiButton, pressed keeps its hover look
      outline: [
        "bg-background text-foreground border-border",
        "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
        "hover:bg-muted hover:shadow-muted",
        "data-[state=on]:bg-muted data-[state=on]:shadow-muted",
      ],
      // Off like the ghost UiButton, pressed keeps its hover look
      ghost: [
        "bg-transparent text-foreground",
        "hover:bg-muted hover:border-border/40",
        "data-[state=on]:bg-muted data-[state=on]:border-border/40",
      ],
    },
    // Same sizes as UiButton
    size: {
      default: "h-10 px-5 py-2 has-[>svg]:px-4",
      sm: "h-8 rounded-lg gap-1.5 px-3.5 has-[>svg]:px-2.5 text-xs",
      xs: "h-7 rounded-md gap-1 px-2 has-[>svg]:px-1.5 text-xs",
      lg: "h-12 rounded-xl px-7 has-[>svg]:px-5 text-base",
      icon: "size-10",
      "icon-sm": "size-8 rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ToggleGroupItemVariants = VariantProps<typeof toggleGroupItem>;

interface Props extends ToggleGroupItemProps {
  variant?: ToggleGroupItemVariants["variant"];
  size?: ToggleGroupItemVariants["size"];
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const variant = inject<ToggleGroupItemVariants["variant"]>(
  "toggleGroupVariant",
  props.variant ?? "default",
);
const size = inject<ToggleGroupItemVariants["size"]>(
  "toggleGroupSize",
  props.size ?? "default",
);
</script>

<template>
  <ToggleGroupItem
    data-slot="toggle-group-item"
    v-bind="forwarded"
    :class="[toggleGroupItem({ variant, size, class: props.class })]"
  >
    <slot />
  </ToggleGroupItem>
</template>
