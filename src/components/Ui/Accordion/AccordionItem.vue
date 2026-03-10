<script setup lang="ts">
// implemented
import type { AccordionItemProps } from "reka-ui";
import { AccordionItem, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

const accordionItem = tv({
  base: "border-b border-border",
});

interface Props extends AccordionItemProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionItem
    data-slot="accordion-item"
    v-bind="forwarded"
    :class="[accordionItem({ class: props.class })]"
  >
    <slot />
  </AccordionItem>
</template>
