<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AlertDialogContent, AlertDialogPortal, AlertDialogOverlay, useForwardPropsEmits } from "reka-ui"
import { tv } from "tailwind-variants"

const alertDialogOverlay = tv({
  base: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
})

const alertDialogContent = tv({
  base: "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
})

interface Props extends AlertDialogContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<AlertDialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay :class="alertDialogOverlay()" />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      v-bind="forwarded"
      :class="[alertDialogContent(), props.class]"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
