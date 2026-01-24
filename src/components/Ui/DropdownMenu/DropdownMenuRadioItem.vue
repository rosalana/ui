<script setup lang="ts">
import type { DropdownMenuRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const dropdownMenuRadioItem = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends DropdownMenuRadioItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="[dropdownMenuRadioItem(), props.class]"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <span class="size-2 rounded-full bg-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
