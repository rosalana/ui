<script setup lang="ts">
import type { DropdownMenuPortalProps as RekaDropdownMenuPortalProps } from "reka-ui"
import { DropdownMenuPortal as RekaDropdownMenuPortal } from "reka-ui"

defineOptions({ name: "DropdownMenuPortal" })

type Props = RekaDropdownMenuPortalProps
const props = defineProps<Props>()

export type DropdownMenuPortalProps = Props
</script>

<template>
  <RekaDropdownMenuPortal v-bind="props">
    <slot />
  </RekaDropdownMenuPortal>
</template>


