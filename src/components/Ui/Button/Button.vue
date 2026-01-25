<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "rounded-xl",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "active:scale-[0.97]",
  ],
  variants: {
    variant: {
      default: [
        "bg-primary text-primary-foreground",
        "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-primary/40",
        "hover:shadow-primary",
        "hover:brightness-105",
      ],
      destructive: [
        "bg-destructive text-white",
        "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-destructive/40",
        "hover:shadow-destructive",
        "hover:brightness-105",
        "focus-visible:ring-destructive/30",
      ],
      secondary: [
        "bg-secondary text-secondary-foreground",
        "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-secondary/40",
        "hover:bg-brightness-105",
        "hover:shadow-secondary",
      ],
      outline: [
        "bg-background text-foreground",
        "border border-border",
        "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
        "hover:bg-muted ",
        "hover:shadow-muted",
      ],
      ghost: [
        "text-foreground border border-transparent",
        "hover:bg-muted hover:border-border/40",
      ],
      link: ["text-primary underline-offset-4", "hover:underline"],
    },
    size: {
      default: "h-10 px-5 py-2 has-[>svg]:px-4",
      sm: "h-8 rounded-lg gap-1.5 px-3.5 has-[>svg]:px-2.5 text-xs",
      lg: "h-12 rounded-2xl px-7 has-[>svg]:px-5 text-base",
      icon: "size-10",
      "icon-sm": "size-8 rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="button({ variant, size, class: props.class })"
  >
    <slot />
  </Primitive>
</template>
