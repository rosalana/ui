<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui";
import { SelectLabel, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const selectLabel = tv({
  base: "px-2.5 py-2 text-xs font-semibold text-theme",
});

interface Props extends SelectLabelProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    v-bind="forwarded"
    :class="[selectLabel({ class: props.class })]"
  >
    <slot />
  </SelectLabel>
</template>
