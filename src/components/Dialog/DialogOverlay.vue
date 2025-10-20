<script setup lang="ts">
import type { DialogOverlayProps as RekaDialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogOverlay as RekaDialogOverlay } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DialogOverlay" })

const overlay = tv({
  base:
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
})

interface Props extends RekaDialogOverlayProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DialogOverlayProps = Props
</script>

<template>
  <RekaDialogOverlay v-bind="{ ...props, class: [overlay(), props.class] }">
    <slot />
  </RekaDialogOverlay>
</template>


