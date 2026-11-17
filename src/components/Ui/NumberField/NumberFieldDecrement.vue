<script setup lang="ts">
import type { NumberFieldDecrementProps } from "reka-ui";
import { NumberFieldDecrement, useForwardProps } from "reka-ui";
import { computed } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { UiIcon } from "../../index";

// A ghost icon button inside the field, like the ghost UiButton
const numberFieldDecrement = tv({
  base: [
    "cursor-pointer inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-theme hover:text-foreground",
    "border border-transparent transition-all duration-200 ease-out",
    "hover:bg-muted hover:border-border/40 active:scale-[0.92]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  ],
});

interface Props extends NumberFieldDecrementProps {
  icon?: string;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "lucide:minus",
});

const delegated = computed(() => {
  const { class: _, icon, ...rest } = props;
  return rest;
});

const forwarded = useForwardProps(delegated);
</script>

<template>
  <NumberFieldDecrement
    data-slot="number-field-decrement"
    v-bind="forwarded"
    :class="numberFieldDecrement({ class: props.class })"
  >
    <slot>
      <UiIcon :name="icon" />
    </slot>
  </NumberFieldDecrement>
</template>
