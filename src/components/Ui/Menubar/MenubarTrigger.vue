<script setup lang="ts">
import type { MenubarTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { MenubarTrigger, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const menubarTrigger = tv({
  base: "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
})

interface Props extends MenubarTriggerProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    v-bind="forwarded"
    :class="[menubarTrigger(), props.class]"
  >
    <slot />
  </MenubarTrigger>
</template>
