<template>
  <TooltipRoot
    v-slot="slotProps"
    data-slot="tooltip"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </TooltipRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { TooltipRoot, useForwardPropsEmits } from "reka-ui"
import type { TooltipRootEmits, TooltipRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "Tooltip" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<TooltipRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<TooltipRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type TooltipProps = typeof props
</script>

