<script setup lang="ts">
import type { DropdownMenuRadioItemProps as RekaDropdownMenuRadioItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuRadioItem as RekaDropdownMenuRadioItem } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuRadioItem" })

const item = tv({
  base:
    "relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none transition-colors data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends RekaDropdownMenuRadioItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuRadioItemProps = Props
</script>

<template>
  <RekaDropdownMenuRadioItem v-bind="{ ...props, class: [item(), props.class] }">
    <slot />
  </RekaDropdownMenuRadioItem>
</template>


