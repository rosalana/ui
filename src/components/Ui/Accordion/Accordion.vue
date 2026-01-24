<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AccordionRoot, useForwardPropsEmits } from "reka-ui"

interface Props extends AccordionRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <AccordionRoot
    data-slot="accordion"
    v-bind="forwarded"
    :class="props.class"
  >
    <slot />
  </AccordionRoot>
</template>
