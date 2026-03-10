<script setup lang="ts">
// implemented
import type { AccordionTriggerProps } from "reka-ui";
import {
  AccordionHeader,
  AccordionTrigger,
  injectAccordionItemContext,
  useForwardProps,
} from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";
import { computed } from "vue";
import { motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";

const accordionTrigger = tv({
  base: [
    "flex flex-1 items-center justify-between py-4 text-sm font-medium",
    "text-foreground transition-colors duration-150",
    "hover:text-foreground/80",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
});

interface Props extends AccordionTriggerProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const itemContext = injectAccordionItemContext();
const isOpen = computed(() => itemContext.open.value);
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="forwarded"
      :class="[accordionTrigger({ class: props.class })]"
    >
      <slot />
      <motion.span
        :animate="{ rotate: isOpen ? 180 : 0 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
        class="inline-flex shrink-0 text-muted-foreground"
      >
        <UiIcon name="lucide:chevron-down" class="size-4" />
      </motion.span>
    </AccordionTrigger>
  </AccordionHeader>
</template>
