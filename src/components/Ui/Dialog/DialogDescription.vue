<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogDescription, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const dialogDescription = tv({
  base: "text-sm text-muted-foreground",
})

interface Props extends DialogDescriptionProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="forwarded"
    :class="[dialogDescription(), props.class]"
  >
    <slot />
  </DialogDescription>
</template>
