<script setup lang="ts">
import type { ContextMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ContextMenuItem, useForwardProps } from "reka-ui"
import { tv, type VariantProps } from "tailwind-variants"

const contextMenuItem = tv({
  base: "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
})

type ContextMenuItemVariants = VariantProps<typeof contextMenuItem>

interface Props extends ContextMenuItemProps {
  class?: HTMLAttributes["class"]
  inset?: ContextMenuItemVariants["inset"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    v-bind="forwarded"
    :class="[contextMenuItem({ inset }), props.class]"
  >
    <slot />
  </ContextMenuItem>
</template>
