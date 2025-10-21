<script setup lang="ts">
import type { DropdownMenuLabelProps as RekaDropdownMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuLabel as RekaDropdownMenuLabel } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuLabel" })

const label = tv({ base: "px-2 py-1.5 text-sm font-semibold" })

interface Props extends RekaDropdownMenuLabelProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuLabelProps = Props
</script>

<template>
  <RekaDropdownMenuLabel v-bind="{ ...props, class: [label(), props.class] }">
    <slot />
  </RekaDropdownMenuLabel>
</template>


