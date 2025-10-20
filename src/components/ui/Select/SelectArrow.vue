<script setup lang="ts">
import type { SelectArrowProps as RekaSelectArrowProps } from "reka-ui"
import { SelectArrow as RekaSelectArrow } from "reka-ui"

defineOptions({ name: "SelectArrow" })

type Props = RekaSelectArrowProps
const props = defineProps<Props>()

export type SelectArrowProps = Props
</script>

<template>
  <RekaSelectArrow v-bind="props" />
</template>


