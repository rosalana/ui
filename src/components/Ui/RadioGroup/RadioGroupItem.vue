<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const radioGroupItem = tv({
  base: "aspect-square size-4 rounded-full border border-primary text-primary shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
})

interface Props extends RadioGroupItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwarded"
    :class="[radioGroupItem(), props.class]"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <span class="size-2 rounded-full bg-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
