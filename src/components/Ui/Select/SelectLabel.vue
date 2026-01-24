<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectLabel, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const selectLabel = tv({
  base: "px-2 py-1.5 text-sm font-semibold",
})

interface Props extends SelectLabelProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    v-bind="forwarded"
    :class="[selectLabel(), props.class]"
  >
    <slot />
  </SelectLabel>
</template>
