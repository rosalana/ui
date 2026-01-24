<script setup lang="ts">
import type { ComboboxContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxContent, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const commandList = tv({
  base: "max-h-[300px] overflow-y-auto overflow-x-hidden",
})

interface Props extends ComboboxContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxContent
    data-slot="command-list"
    v-bind="forwarded"
    :class="[commandList(), props.class]"
  >
    <slot />
  </ComboboxContent>
</template>
