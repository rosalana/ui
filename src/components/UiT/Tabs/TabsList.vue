<script setup lang="ts">
import type { TabsListProps as RekaTabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsList as RekaTabsList } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "TabsList" })

const list = tv({ base: "inline-flex items-center gap-1" })

interface Props extends RekaTabsListProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type TabsListProps = Props
</script>

<template>
  <RekaTabsList v-bind="{ ...props, class: [list(), props.class] }">
    <slot />
  </RekaTabsList>
</template>


