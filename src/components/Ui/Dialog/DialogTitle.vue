<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogTitle, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const dialogTitle = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
})

interface Props extends DialogTitleProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwarded"
    :class="[dialogTitle(), props.class]"
  >
    <slot />
  </DialogTitle>
</template>
