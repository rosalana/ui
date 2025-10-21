<script setup lang="ts">
import type { RadioGroupIndicatorProps as RekaRadioGroupIndicatorProps } from "reka-ui"
import { RadioGroupIndicator as RekaRadioGroupIndicator } from "reka-ui"

defineOptions({ name: "RadioGroupIndicator" })

type Props = RekaRadioGroupIndicatorProps
const props = defineProps<Props>()

export type RadioGroupIndicatorProps = Props
</script>

<template>
  <RekaRadioGroupIndicator v-bind="props">
    <slot />
  </RekaRadioGroupIndicator>
</template>


