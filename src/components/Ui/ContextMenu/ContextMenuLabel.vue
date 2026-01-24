<script setup lang="ts">
import type { ContextMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ContextMenuLabel, useForwardProps } from "reka-ui"
import { tv, type VariantProps } from "tailwind-variants"

const contextMenuLabel = tv({
  base: "px-2 py-1.5 text-sm font-semibold text-foreground",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
})

type ContextMenuLabelVariants = VariantProps<typeof contextMenuLabel>

interface Props extends ContextMenuLabelProps {
  class?: HTMLAttributes["class"]
  inset?: ContextMenuLabelVariants["inset"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    v-bind="forwarded"
    :class="[contextMenuLabel({ inset }), props.class]"
  >
    <slot />
  </ContextMenuLabel>
</template>
