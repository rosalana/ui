<script setup lang="ts">
import type { ComboboxSeparatorProps } from "reka-ui";
import { ComboboxSeparator, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";

const comboboxSeparator = tv({
  base: "-mx-1.5 my-1.5 h-px bg-border",
});

interface Props extends ComboboxSeparatorProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxSeparator
    data-slot="combobox-separator"
    v-bind="forwarded"
    :class="comboboxSeparator({ class: props.class })"
  />
</template>
