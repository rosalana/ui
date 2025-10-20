<script setup lang="ts">
import type { DropdownMenuSubTriggerProps as RekaDropdownMenuSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuSubTrigger as RekaDropdownMenuSubTrigger } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuSubTrigger" })

const trigger = tv({
  base:
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends RekaDropdownMenuSubTriggerProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuSubTriggerProps = Props
</script>

<template>
  <RekaDropdownMenuSubTrigger v-bind="{ ...props, class: [trigger(), props.class] }">
    <slot />
  </RekaDropdownMenuSubTrigger>
</template>


