<script setup lang="ts">
import type { DropdownMenuSeparatorProps as RekaDropdownMenuSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuSeparator as RekaDropdownMenuSeparator } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuSeparator" })

const separator = tv({ base: "-mx-1 my-1 h-px bg-border" })

interface Props extends RekaDropdownMenuSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuSeparatorProps = Props
</script>

<template>
  <RekaDropdownMenuSeparator v-bind="{ ...props, class: [separator(), props.class] }" />
</template>


