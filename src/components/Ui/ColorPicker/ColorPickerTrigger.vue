<script setup lang="ts">
import { Primitive, useForwardProps, type PrimitiveProps } from "reka-ui";
import { type ClassValue, tv } from "tailwind-variants";
import { UiIcon } from "../..";
import { UiAccordion } from "dist";

const colorPickerTrigger = tv({
  base: [
    "cursor-pointer border border-border transition-all",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:shadow-muted",
    "flex gap-2 h-9 w-full items-center justify-between whitespace-nowrap rounded-xl bg-background text-foreground px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-theme focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    "active:scale-[0.99]",
    "hover:bg-muted",
  ],
});

interface Props extends PrimitiveProps {
  class?: ClassValue;
  placeholder?: string;
  value?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Pick a color...",
  value: "",
  text: "",
  as: "button",
});
const forwarded = useForwardProps(props);
</script>
<template>
  <Primitive
    data-slot="color-picker-trigger"
    v-bind="forwarded"
    :class="[colorPickerTrigger({ class: props.class })]"
    type="button"
  >
    <span
      class="size-4 shrink-0 rounded-sm flex items-center justify-center"
      :style="{ background: props.value ?? 'transparent' }"
    />

    <span
      v-if="props.value"
      class="flex-1 truncate text-left font-mono text-xs"
    >
      {{ props.text || props.value }}
    </span>
    <span v-else class="flex-1 truncate text-left text-xs text-theme">
      {{ props.placeholder }}
    </span>

    <UiIcon name="lucide:swatch-book" class="size-4 text-theme" />
  </Primitive>
</template>
