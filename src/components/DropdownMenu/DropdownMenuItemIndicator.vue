<script setup lang="ts">
import type { DropdownMenuItemIndicatorProps as RekaDropdownMenuItemIndicatorProps } from "reka-ui"
import { DropdownMenuItemIndicator as RekaDropdownMenuItemIndicator } from "reka-ui"

defineOptions({ name: "DropdownMenuItemIndicator" })

type Props = RekaDropdownMenuItemIndicatorProps
const props = defineProps<Props>()

export type DropdownMenuItemIndicatorProps = Props
</script>

<template>
  <RekaDropdownMenuItemIndicator v-bind="props">
    <slot />
  </RekaDropdownMenuItemIndicator>
</template>


