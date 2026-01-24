<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsList, useForwardProps } from "reka-ui"
import { tv } from "tailwind-variants"

const tabsList = tv({
  base: "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
})

interface Props extends TabsListProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardProps(props)
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="forwarded"
    :class="[tabsList(), props.class]"
  >
    <slot />
  </TabsList>
</template>
