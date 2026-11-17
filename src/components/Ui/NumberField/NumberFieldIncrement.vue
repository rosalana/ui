<script setup lang="ts">
import type { NumberFieldIncrementProps } from "reka-ui";
import { NumberFieldIncrement, useForwardProps } from "reka-ui";
import { computed } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { UiIcon } from "../../index";

// A ghost icon button inside the field, like the ghost UiButton
const numberFieldIncrement = tv({
  base: [
    "cursor-pointer inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-foreground",
    "border border-transparent transition-all duration-200 ease-out",
    "hover:bg-muted hover:border-border/40 active:scale-[0.92]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  ],
});

interface Props extends NumberFieldIncrementProps {
  icon?: string;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "lucide:plus",
});

const delegated = computed(() => {
  const { class: _, icon, ...rest } = props;
  return rest;
});

const forwarded = useForwardProps(delegated);
</script>

<template>
  <NumberFieldIncrement
    data-slot="number-field-increment"
    v-bind="forwarded"
    :class="numberFieldIncrement({ class: props.class })"
  >
    <slot>
      <UiIcon :name="icon" />
    </slot>
  </NumberFieldIncrement>
</template>
