<script setup lang="ts">
import type { DropdownMenuSubContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuPortal, DropdownMenuSubContent, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const dropdownMenuSubContent = tv({
  base: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
})

interface Props extends DropdownMenuSubContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      data-slot="dropdown-menu-sub-content"
      v-bind="forwarded"
      :class="[dropdownMenuSubContent(), props.class]"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
