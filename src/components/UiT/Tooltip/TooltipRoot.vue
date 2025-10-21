<script setup lang="ts">
import type { TooltipRootProps as RekaTooltipRootProps } from "reka-ui"
import { TooltipRoot as RekaTooltipRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "TooltipRoot" })

const tooltipRoot = tv({ base: "outline-none" })

type Props = RekaTooltipRootProps
const props = defineProps<Props>()

export type TooltipRootProps = Props
</script>

<template>
  <RekaTooltipRoot v-bind="{ ...props, ...$attrs }">
    <div :class="tooltipRoot()">
      <slot />
    </div>
  </RekaTooltipRoot>
</template>


