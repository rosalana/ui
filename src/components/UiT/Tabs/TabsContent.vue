<script setup lang="ts">
import type { TabsContentProps as RekaTabsContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsContent as RekaTabsContent } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "TabsContent" })

const content = tv({ base: "mt-2" })

interface Props extends RekaTabsContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type TabsContentProps = Props
</script>

<template>
  <RekaTabsContent v-bind="{ ...props, class: [content(), props.class] }">
    <slot />
  </RekaTabsContent>
</template>


