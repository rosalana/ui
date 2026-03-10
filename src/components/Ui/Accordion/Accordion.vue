<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui";
import type { ClassValue } from "tailwind-variants";
import { AccordionRoot, useForwardPropsEmits } from "reka-ui";

interface Props extends AccordionRootProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const emit = defineEmits<AccordionRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <AccordionRoot data-slot="accordion" v-bind="forwarded" :class="props.class">
    <slot />
  </AccordionRoot>
</template>
