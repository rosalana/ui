<script setup lang="ts">
import type { TooltipArrowProps as RekaTooltipArrowProps } from "reka-ui"
import { TooltipArrow as RekaTooltipArrow } from "reka-ui"

defineOptions({ name: "TooltipArrow" })

type Props = RekaTooltipArrowProps
const props = defineProps<Props>()

export type TooltipArrowProps = Props
</script>

<template>
  <RekaTooltipArrow v-bind="props" />
</template>


