<template>
  <RadioGroupRoot
    v-slot="slotProps"
    data-slot="radio-group"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </RadioGroupRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "RadioGroup" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<RadioGroupRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type RadioGroupProps = typeof props
</script>

