<script setup lang="ts">
import type { SelectLabelProps as RekaSelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectLabel as RekaSelectLabel } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "SelectLabel" })

const label = tv({ base: "px-2 py-1.5 text-sm font-semibold" })

interface Props extends RekaSelectLabelProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectLabelProps = Props
</script>

<template>
  <RekaSelectLabel v-bind="{ ...props, class: [label(), props.class] }">
    <slot />
  </RekaSelectLabel>
</template>


