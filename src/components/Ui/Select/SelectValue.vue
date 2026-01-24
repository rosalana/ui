<script setup lang="ts">
import type { SelectValueProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectValue, useForwardProps } from "reka-ui"

interface Props extends SelectValueProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <SelectValue data-slot="select-value" v-bind="forwarded">
    <slot />
  </SelectValue>
</template>
