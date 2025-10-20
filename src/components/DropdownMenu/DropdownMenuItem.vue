<script setup lang="ts">
import type { DropdownMenuItemProps as RekaDropdownMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuItem as RekaDropdownMenuItem } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuItem" })

const item = tv({
  base:
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends RekaDropdownMenuItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuItemProps = Props
</script>

<template>
  <RekaDropdownMenuItem v-bind="{ ...props, class: [item(), props.class] }">
    <slot />
  </RekaDropdownMenuItem>
</template>


