<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui";
import { AccordionContent, useForwardProps } from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";

// implemented
const accordionContent = tv({
  base: "overflow-hidden text-sm text-foreground/80 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
});

interface Props extends AccordionContentProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="forwarded"
    :class="accordionContent()"
  >
    <div :class="['pb-4 pt-0', props.class]">
      <slot />
    </div>
  </AccordionContent>
</template>
