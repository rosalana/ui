<script setup lang="ts">
import type { DropdownMenuSubContentProps as RekaDropdownMenuSubContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuSubContent as RekaDropdownMenuSubContent } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuSubContent" })

const content = tv({
  base:
    "bg-popover text-popover-foreground border rounded-md shadow-md py-2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
})

interface Props extends RekaDropdownMenuSubContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuSubContentProps = Props
</script>

<template>
  <RekaDropdownMenuSubContent v-bind="{ ...props, class: [content(), props.class] }">
    <slot />
  </RekaDropdownMenuSubContent>
</template>


