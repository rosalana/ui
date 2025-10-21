<script setup lang="ts">
import type { SelectItemProps as RekaSelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectItem as RekaSelectItem } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "SelectItem" })

const item = tv({
  base:
    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
})

interface Props extends RekaSelectItemProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectItemProps = Props
</script>

<template>
  <RekaSelectItem v-bind="{ ...props, class: [item(), props.class] }">
    <slot />
  </RekaSelectItem>
</template>


