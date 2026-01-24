<script setup lang="ts">
import type { DialogPortalProps } from "reka-ui"
import { DialogPortal, useForwardProps } from "reka-ui"

const props = defineProps<DialogPortalProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogPortal v-bind="forwarded">
    <slot />
  </DialogPortal>
</template>
