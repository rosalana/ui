<script setup lang="ts">
import type { PopoverArrowProps as RekaPopoverArrowProps } from "reka-ui"
import { PopoverArrow as RekaPopoverArrow } from "reka-ui"

defineOptions({ name: "PopoverArrow" })

type Props = RekaPopoverArrowProps
const props = defineProps<Props>()

export type PopoverArrowProps = Props
</script>

<template>
  <RekaPopoverArrow v-bind="props" />
</template>


