<script setup lang="ts">
import type { MenubarSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { MenubarSeparator, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const menubarSeparator = tv({
  base: "-mx-1 my-1 h-px bg-muted",
})

interface Props extends MenubarSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <MenubarSeparator
    data-slot="menubar-separator"
    v-bind="forwarded"
    :class="[menubarSeparator(), props.class]"
  />
</template>
