<script setup lang="ts">
import type { SelectViewportProps as RekaSelectViewportProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectViewport as RekaSelectViewport } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "SelectViewport" })

const viewport = tv({ base: "p-1" })

interface Props extends RekaSelectViewportProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectViewportProps = Props
</script>

<template>
  <RekaSelectViewport v-bind="{ ...props, class: [viewport(), props.class] }">
    <slot />
  </RekaSelectViewport>
</template>


