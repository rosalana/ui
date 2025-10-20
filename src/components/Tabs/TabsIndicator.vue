<script setup lang="ts">
import type { TabsIndicatorProps as RekaTabsIndicatorProps } from "reka-ui"
import { TabsIndicator as RekaTabsIndicator } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "TabsIndicator" })

const indicator = tv({ base: "h-0.5 bg-primary" })

type Props = RekaTabsIndicatorProps
const props = defineProps<Props>()

export type TabsIndicatorProps = Props
</script>

<template>
  <RekaTabsIndicator v-bind="{ ...props, class: indicator() }" />
</template>


