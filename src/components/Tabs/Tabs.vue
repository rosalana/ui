<template>
  <TabsRoot
    v-slot="slotProps"
    data-slot="tabs"
    v-bind="forwarded"
    :class="rootStyles({ class: props.class })"
  >
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { TabsRoot, useForwardPropsEmits } from "reka-ui"
import type { TabsRootEmits, TabsRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

defineOptions({ name: "Tabs" })

const rootStyles = tv({ base: "outline-none" })

const props = defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>()
const emit = defineEmits<TabsRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emit)

export type TabsProps = typeof props
</script>

