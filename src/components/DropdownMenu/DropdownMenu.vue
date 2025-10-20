<template>
  <DropdownMenuRoot
    v-slot="slotProps"
    data-slot="dropdown-menu"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </DropdownMenuRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { DropdownMenuRoot, useForwardPropsEmits } from "reka-ui"
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenu" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<DropdownMenuRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<DropdownMenuRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type DropdownMenuProps = typeof props
</script>

