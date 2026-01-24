<script setup lang="ts">
import type { ContextMenuRootEmits, ContextMenuRootProps } from "reka-ui"
import { ContextMenuRoot, useForwardPropsEmits } from "reka-ui"

const props = defineProps<ContextMenuRootProps>()
const emit = defineEmits<ContextMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <ContextMenuRoot data-slot="context-menu" v-bind="forwarded">
    <slot />
  </ContextMenuRoot>
</template>
