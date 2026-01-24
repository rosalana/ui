<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuSeparator, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const dropdownMenuSeparator = tv({
  base: "-mx-1 my-1 h-px bg-muted",
})

interface Props extends DropdownMenuSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="forwarded"
    :class="[dropdownMenuSeparator(), props.class]"
  />
</template>
