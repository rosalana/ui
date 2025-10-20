<script setup lang="ts">
import type { DropdownMenuCheckboxItemProps as RekaDropdownMenuCheckboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuCheckboxItem as RekaDropdownMenuCheckboxItem } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuCheckboxItem" })

const item = tv({
  base:
    "relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none transition-colors data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends RekaDropdownMenuCheckboxItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuCheckboxItemProps = Props
</script>

<template>
  <RekaDropdownMenuCheckboxItem v-bind="{ ...props, class: [item(), props.class] }">
    <slot />
  </RekaDropdownMenuCheckboxItem>
</template>


