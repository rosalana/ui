<script setup lang="ts">
import type { TabsContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsContent, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const tabsContent = tv({
  base: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
})

interface Props extends TabsContentProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    v-bind="forwarded"
    :class="[tabsContent(), props.class]"
  >
    <slot />
  </TabsContent>
</template>
