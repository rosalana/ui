<template>
  <SelectRoot
    v-slot="slotProps"
    data-slot="select"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </SelectRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { SelectRoot, useForwardPropsEmits } from "reka-ui"
import type { SelectRootEmits, SelectRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "Select" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<SelectRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type SelectProps = typeof props
</script>

