<script setup lang="ts">
import type { RadioGroupRootProps as RekaRadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { RadioGroupRoot as RekaRadioGroupRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "RadioGroupRoot" })

const root = tv({ base: "flex flex-col gap-2 outline-none" })

interface Props extends RekaRadioGroupRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type RadioGroupRootProps = Props
</script>

<template>
  <RekaRadioGroupRoot v-bind="{ ...props, class: [root(), props.class] }">
    <slot />
  </RekaRadioGroupRoot>
</template>


