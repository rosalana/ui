<script setup lang="ts">
import type { AccordionItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { AccordionItem, useForwardProps } from "reka-ui";
import { tv } from "tailwind-variants";

const accordionItem = tv({
  base: "border-b",
});

interface Props extends AccordionItemProps {
  class?: HTMLAttributes["class"];
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
