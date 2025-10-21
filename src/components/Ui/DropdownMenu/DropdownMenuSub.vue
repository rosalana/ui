<script setup lang="ts">
import type { DropdownMenuSubProps as RekaDropdownMenuSubProps } from "reka-ui"
import { DropdownMenuSub as RekaDropdownMenuSub } from "reka-ui"

defineOptions({ name: "DropdownMenuSub" })

type Props = RekaDropdownMenuSubProps
const props = defineProps<Props>()

export type DropdownMenuSubProps = Props
</script>

<template>
  <RekaDropdownMenuSub v-bind="props">
    <slot />
  </RekaDropdownMenuSub>
</template>


