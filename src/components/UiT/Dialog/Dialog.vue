<template>
  <DialogRoot
    v-slot="slotProps"
    data-slot="dialog"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { DialogRoot, useForwardPropsEmits } from "reka-ui"
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "Dialog" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<DialogRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type DialogProps = typeof props
</script>

