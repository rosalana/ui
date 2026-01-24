<script setup lang="ts">
import type { ComboboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ComboboxItem, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const commandItem = tv({
  base: "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
})

interface Props extends ComboboxItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxItem
    data-slot="command-item"
    v-bind="forwarded"
    :class="[commandItem(), props.class]"
  >
    <slot />
  </ComboboxItem>
</template>
