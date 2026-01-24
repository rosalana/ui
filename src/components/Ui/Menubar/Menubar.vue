<script setup lang="ts">
import type { MenubarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { MenubarRoot, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const menubar = tv({
  base: "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-xs",
})

interface Props extends MenubarRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <MenubarRoot
    data-slot="menubar"
    v-bind="forwarded"
    :class="[menubar(), props.class]"
  >
    <slot />
  </MenubarRoot>
</template>
