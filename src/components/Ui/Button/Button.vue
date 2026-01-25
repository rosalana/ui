<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { computed, ref } from "vue";
import { Primitive } from "reka-ui";
import { AnimatePresence, motion } from "motion-v";
import { VariantProps, tv } from "tailwind-variants";
import { UiIcon } from "../../index";

const button = tv({
  base: [
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "rounded-xl",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
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
        "hover:bg-muted",
        "hover:shadow-muted",
      ],
      ghost: [
        "text-foreground border border-transparent",
        "hover:bg-muted hover:border-border/40",
      ],
      link: [
        "text-primary",
        "relative no-underline! after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
      ],
      clear: [
        "bg-transparent text-foreground",
      ],
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
  disabled?: boolean;
  loading?: boolean;
  arrow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  disabled: false,
  loading: false,
  arrow: false,
});

const isDisabled = computed(() => props.loading || props.disabled);
const isHovered = ref<boolean>(false);
</script>
<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :disabled="isDisabled || undefined"
    :class="button({ variant, size, class: props.class })"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :data-loading="props.loading || undefined"
  >
    <!-- Loading spinner -->
    <AnimatePresence>
      <motion.span
        v-if="loading"
        :initial="{ opacity: 0, scale: 0.8, width: 0, marginRight: -8 }"
        :animate="{ opacity: 1, scale: 1, width: 'auto', marginRight: 0 }"
        :exit="{ opacity: 0, scale: 0.8, width: 0, marginRight: -8 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        class="inline-flex -mr-2 items-center overflow-hidden"
      >
        <UiIcon name="lucide:loader" class="flex-shrink-0 animate-spin" />
      </motion.span>
    </AnimatePresence>

    <!-- Content -->
    <span class="inline-flex items-center gap-2">
      <slot />
    </span>

    <AnimatePresence>
      <motion.span
        v-if="arrow"
        :initial="{ opacity: 0, width: 0, marginLeft: -8 }"
        :animate="
          isHovered
            ? { opacity: 1, width: 'auto', marginLeft: 0 }
            : { opacity: 0.5, width: 0, marginLeft: -8 }
        "
        :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        class="inline-flex -ml-2 items-center overflow-hidden"
      >
        <UiIcon class="flex-shrink-0" name="lucide:arrow-right" />
      </motion.span>
    </AnimatePresence>
  </Primitive>
</template>
