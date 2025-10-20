<script setup lang="ts">
import type { SelectValueProps as RekaSelectValueProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectValue as RekaSelectValue } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "SelectValue" })

const value = tv({ base: "text-foreground" })

interface Props extends RekaSelectValueProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectValueProps = Props
</script>

<template>
  <RekaSelectValue v-bind="{ ...props, class: [value(), props.class] }" />
</template>


