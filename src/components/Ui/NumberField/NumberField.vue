<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui";
import { NumberFieldRoot, useForwardPropsEmits } from "reka-ui";
import { computed } from "vue";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import NumberFieldDecrement from "./NumberFieldDecrement.vue";
import NumberFieldIncrement from "./NumberFieldIncrement.vue";
import NumberFieldInput from "./NumberFieldInput.vue";
import { useLocale } from "../../../composables/useLocale";

// Same frame as UiInput
const numberField = tv({
  base: [
    "flex h-9 w-full items-center gap-1 rounded-xl border border-border bg-background px-1 text-sm text-foreground",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:shadow-muted dark:shadow-muted/20 dark:hover:shadow-muted/80",
    "transition-shadow duration-200 ease-out",
    "focus-within:ring-1 focus-within:ring-ring",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ],
  variants: {
    variant: {
      default: "",
      destructive: "border-destructive focus-within:ring-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type NumberFieldVariants = VariantProps<typeof numberField>;

interface Props extends NumberFieldRootProps {
  variant?: NumberFieldVariants["variant"];
  /** Rolls the digits of the default input on every change. */
  animated?: boolean;
  placeholder?: string;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  animated: true,
});

const emit = defineEmits<NumberFieldRootEmits>();

const delegated = computed(() => {
  const { class: _, variant, animated, placeholder, ...rest } = props;
  return rest;
});

const forwarded = useForwardPropsEmits(delegated, emit);

// The app locale unless the `locale` prop overrides it
const { locale } = useLocale(() => props.locale);
</script>

<template>
  <NumberFieldRoot
    v-slot="slotProps"
    data-slot="number-field"
    v-bind="forwarded"
    :locale="locale"
    :class="numberField({ variant, class: props.class })"
  >
    <slot v-bind="slotProps">
      <slot name="decrement">
        <NumberFieldDecrement />
      </slot>
      <slot name="input">
        <NumberFieldInput :animated="animated" :placeholder="placeholder" />
      </slot>
      <slot name="increment">
        <NumberFieldIncrement />
      </slot>
    </slot>
  </NumberFieldRoot>
</template>
