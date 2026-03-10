<script setup lang="ts">
import type { SelectValueProps } from "reka-ui";
import type { ClassValue } from "tailwind-variants";
import { SelectValue, useForwardProps } from "reka-ui";

interface Props extends SelectValueProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SelectValue data-slot="select-value" v-bind="forwarded">
    <slot />
  </SelectValue>
</template>
