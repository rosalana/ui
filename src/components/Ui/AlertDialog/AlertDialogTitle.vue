<script setup lang="ts">
import type { AlertDialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AlertDialogTitle, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const alertDialogTitle = tv({
  base: "text-lg font-semibold",
})

interface Props extends AlertDialogTitleProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="forwarded"
    :class="[alertDialogTitle(), props.class]"
  >
    <slot />
  </AlertDialogTitle>
</template>
