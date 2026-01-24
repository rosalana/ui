<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AccordionHeader, AccordionTrigger, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"
import UiIcon from "../Icon/Icon.vue"

const accordionTrigger = tv({
  base: "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
})

interface Props extends AccordionTriggerProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="forwarded"
      :class="[accordionTrigger(), props.class]"
    >
      <slot />
      <UiIcon
        name="lucide:chevron-down"
        class="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
