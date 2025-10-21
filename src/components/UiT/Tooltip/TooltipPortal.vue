<script setup lang="ts">
import type { TooltipPortalProps as RekaTooltipPortalProps } from "reka-ui"
import { TooltipPortal as RekaTooltipPortal } from "reka-ui"

defineOptions({ name: "TooltipPortal" })

type Props = RekaTooltipPortalProps
const props = defineProps<Props>()

export type TooltipPortalProps = Props
</script>

<template>
  <RekaTooltipPortal v-bind="props">
    <slot />
  </RekaTooltipPortal>
</template>


