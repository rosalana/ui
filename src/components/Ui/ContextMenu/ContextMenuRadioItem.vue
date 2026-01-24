<script setup lang="ts">
import type { ContextMenuRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ContextMenuItemIndicator, ContextMenuRadioItem, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const contextMenuRadioItem = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends ContextMenuRadioItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    v-bind="forwarded"
    :class="[contextMenuRadioItem(), props.class]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <span class="size-2 rounded-full bg-current" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
