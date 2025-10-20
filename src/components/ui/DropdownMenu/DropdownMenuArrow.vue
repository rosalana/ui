<script setup lang="ts">
import type { DropdownMenuArrowProps as RekaDropdownMenuArrowProps } from "reka-ui"
import { DropdownMenuArrow as RekaDropdownMenuArrow } from "reka-ui"

defineOptions({ name: "DropdownMenuArrow" })

type Props = RekaDropdownMenuArrowProps
const props = defineProps<Props>()

export type DropdownMenuArrowProps = Props
</script>

<template>
  <RekaDropdownMenuArrow v-bind="props" />
</template>


