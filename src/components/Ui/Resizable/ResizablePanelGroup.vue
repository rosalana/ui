<script setup lang="ts">
import type { SplitterGroupEmits, SplitterGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SplitterGroup, useForwardPropsEmits } from "reka-ui"
import { tv } from "tailwind-variants"

const resizablePanelGroup = tv({
  base: "flex size-full data-[panel-group-direction=vertical]:flex-col",
})

interface Props extends SplitterGroupProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<SplitterGroupEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <SplitterGroup
    data-slot="resizable-panel-group"
    v-bind="forwarded"
    :class="[resizablePanelGroup(), props.class]"
  >
    <slot />
  </SplitterGroup>
</template>
