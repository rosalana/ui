<script setup lang="ts">
import type { SelectSeparatorProps as RekaSelectSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectSeparator as RekaSelectSeparator } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "SelectSeparator" })

const separator = tv({ base: "-mx-1 my-1 h-px bg-border" })

interface Props extends RekaSelectSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectSeparatorProps = Props
</script>

<template>
  <RekaSelectSeparator v-bind="{ ...props, class: [separator(), props.class] }" />
</template>


