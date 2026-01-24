<script setup lang="ts">
import type { ComboboxSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxSeparator, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const commandSeparator = tv({
  base: "-mx-1 h-px bg-border",
})

interface Props extends ComboboxSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxSeparator
    data-slot="command-separator"
    v-bind="forwarded"
    :class="[commandSeparator(), props.class]"
  />
</template>
