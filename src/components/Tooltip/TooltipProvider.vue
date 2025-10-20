<script setup lang="ts">
import type { TooltipProviderProps as RekaTooltipProviderProps } from "reka-ui"
import { TooltipProvider as RekaTooltipProvider } from "reka-ui"

defineOptions({ name: "TooltipProvider" })

type Props = RekaTooltipProviderProps
const props = defineProps<Props>()

export type TooltipProviderProps = Props
</script>

<template>
  <RekaTooltipProvider v-bind="props">
    <slot />
  </RekaTooltipProvider>
</template>


