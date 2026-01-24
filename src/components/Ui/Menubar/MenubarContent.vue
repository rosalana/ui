<script setup lang="ts">
import type { MenubarContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { MenubarContent, MenubarPortal, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const menubarContent = tv({
  base: "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
})

interface Props extends MenubarContentProps {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  align: "start",
  sideOffset: 8,
  alignOffset: -4,
})

const forwarded = useForwardProps(props)
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      data-slot="menubar-content"
      v-bind="forwarded"
      :class="[menubarContent(), props.class]"
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
