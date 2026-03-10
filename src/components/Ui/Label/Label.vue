<script setup lang="ts">
import type { LabelProps } from "reka-ui";
import { Label } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const label = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

interface Props extends LabelProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
</script>

<template>
  <Label
    data-slot="label"
    v-bind="props"
    :class="[label({ class: props.class })]"
  >
    <slot />
  </Label>
</template>
