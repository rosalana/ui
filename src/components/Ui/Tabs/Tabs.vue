<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsRoot, useForwardPropsEmits } from "reka-ui"

interface Props extends TabsRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <TabsRoot
    data-slot="tabs"
    v-bind="forwarded"
    :class="props.class"
  >
    <slot />
  </TabsRoot>
</template>
