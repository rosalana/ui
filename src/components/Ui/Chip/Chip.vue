<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { AnimatePresence, motion } from "motion-v";
import { tv, type VariantProps, type ClassValue } from "tailwind-variants";
import tailwindColors from "tailwindcss/colors";
import type { TailwindColorName } from "../../../plugin";

const chip = tv({
  slots: {
    root: "relative inline-flex shrink-0",
    // Positions the indicator, kept apart from `indicator` so motion's scale doesn't fight the translate
    anchor: "pointer-events-none absolute z-10 flex",
    indicator: [
      "flex items-center justify-center rounded-full font-semibold leading-none whitespace-nowrap tabular-nums",
      "ring-2 ring-background",
    ],
    ping: "absolute inset-0 rounded-full opacity-60 animate-ping",
  },
  variants: {
    variant: {
      default: { indicator: "bg-primary text-primary-foreground", ping: "bg-primary" },
      secondary: { indicator: "bg-secondary text-secondary-foreground", ping: "bg-secondary" },
      destructive: { indicator: "bg-destructive text-white", ping: "bg-destructive" },
      success: { indicator: "bg-success text-white", ping: "bg-success" },
      warning: { indicator: "bg-warning text-white", ping: "bg-warning" },
      info: { indicator: "bg-info text-white", ping: "bg-info" },
      neutral: { indicator: "bg-foreground text-background", ping: "bg-foreground" },
      // Any Tailwind palette color, set through `color` (same as UiTag)
      custom: {
        indicator: "bg-(--chip-bg) text-white dark:bg-(--chip-bg-dark)",
        ping: "bg-(--chip-bg) dark:bg-(--chip-bg-dark)",
      },
    },
    size: {
      sm: { indicator: "min-w-2 h-2 text-[9px]" },
      default: { indicator: "min-w-2.5 h-2.5 text-[10px]" },
      lg: { indicator: "min-w-3 h-3 text-[11px]" },
    },
    // A chip with text grows into a small pill
    hasText: {
      true: {},
    },
    position: {
      "top-right": { anchor: "top-0 right-0" },
      "bottom-right": { anchor: "bottom-0 right-0" },
      "top-left": { anchor: "top-0 left-0" },
      "bottom-left": { anchor: "bottom-0 left-0" },
    },
    // Inset keeps the chip inside the element, useful on round avatars
    inset: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    { hasText: true, size: "sm", class: { indicator: "min-w-3.5 h-3.5 px-1" } },
    { hasText: true, size: "default", class: { indicator: "min-w-4 h-4 px-1" } },
    { hasText: true, size: "lg", class: { indicator: "min-w-5 h-5 px-1.5" } },
    { inset: false, position: "top-right", class: { anchor: "translate-x-1/2 -translate-y-1/2" } },
    { inset: false, position: "bottom-right", class: { anchor: "translate-x-1/2 translate-y-1/2" } },
    { inset: false, position: "top-left", class: { anchor: "-translate-x-1/2 -translate-y-1/2" } },
    { inset: false, position: "bottom-left", class: { anchor: "-translate-x-1/2 translate-y-1/2" } },
    { inset: true, position: "top-right", class: { anchor: "translate-x-[15%] -translate-y-[15%]" } },
    { inset: true, position: "bottom-right", class: { anchor: "translate-x-[15%] translate-y-[15%]" } },
    { inset: true, position: "top-left", class: { anchor: "-translate-x-[15%] -translate-y-[15%]" } },
    { inset: true, position: "bottom-left", class: { anchor: "-translate-x-[15%] translate-y-[15%]" } },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    position: "top-right",
    inset: false,
  },
});

type ChipVariants = VariantProps<typeof chip>;

interface Props extends PrimitiveProps {
  variant?: Exclude<ChipVariants["variant"], "custom">;
  /** Any Tailwind palette color. Overrides `variant`. */
  color?: TailwindColorName;
  size?: ChipVariants["size"];
  position?: ChipVariants["position"];
  /** Text inside the chip, e.g. an unread count. Without it (or a `content` slot) the chip is a plain dot. */
  text?: string | number;
  /** Caps a numeric `text`, e.g. `max: 99` shows "99+". */
  max?: number;
  /** Shows or hides the chip with a spring animation. */
  show?: boolean;
  /** Places the chip inside the element's corner instead of on its edge. Use on round elements. */
  inset?: boolean;
  /** Adds a soft pulsing ring to draw attention. */
  pulse?: boolean;
  /** Classes for the chip itself, not the wrapper. */
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  variant: "default",
  size: "default",
  position: "top-right",
  show: true,
  inset: false,
  pulse: false,
});

const slots = defineSlots<{
  /** The element the chip is pinned to, e.g. a button or an avatar. */
  default?: () => any;
  /** Overrides the chip content, which defaults to `text` (capped by `max`). */
  content?: () => any;
}>();

const label = computed(() => {
  if (props.text === undefined || props.text === null || props.text === "") return null;
  if (typeof props.text === "number" && props.max !== undefined && props.text > props.max) {
    return `${props.max}+`;
  }
  return String(props.text);
});

const colorStyle = computed(() => {
  if (!props.color) return undefined;
  const color = tailwindColors[props.color];
  return { "--chip-bg": color[500], "--chip-bg-dark": color[600] };
});

const styles = computed(() =>
  chip({
    variant: props.color ? "custom" : props.variant,
    size: props.size,
    position: props.position,
    inset: props.inset,
    hasText: !!label.value || !!slots.content,
  }),
);
</script>

<template>
  <Primitive
    data-slot="chip"
    :as="as"
    :as-child="asChild"
    :class="styles.root()"
  >
    <slot />
    <span :class="styles.anchor()">
      <AnimatePresence>
        <motion.span
          v-if="show"
          data-slot="chip-indicator"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0, opacity: 0 }"
          :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
          :style="colorStyle"
          :class="styles.indicator({ class: [pulse && 'relative', props.class] })"
        >
          <span v-if="pulse" :class="styles.ping()" />
          <span v-if="slots.content || label" class="relative inline-flex items-center">
            <slot name="content">{{ label }}</slot>
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  </Primitive>
</template>
