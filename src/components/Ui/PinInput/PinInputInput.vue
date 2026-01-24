<script setup lang="ts">
import type { PinInputInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PinInputInput, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const pinInputInput = tv({
  base: "relative flex size-9 items-center justify-center border-y border-r border-input text-center text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
})

interface Props extends PinInputInputProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <PinInputInput
    data-slot="pin-input-input"
    v-bind="forwarded"
    :class="[pinInputInput(), props.class]"
  />
</template>
