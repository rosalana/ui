<template>
  <PopoverRoot
    v-slot="slotProps"
    data-slot="popover"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </PopoverRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { PopoverRoot, useForwardPropsEmits } from "reka-ui"
import type { PopoverRootEmits, PopoverRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "Popover" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<PopoverRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<PopoverRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type PopoverProps = typeof props
</script>

