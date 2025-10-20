<script setup lang="ts">
import type { DropdownMenuGroupProps as RekaDropdownMenuGroupProps } from "reka-ui"
import { DropdownMenuGroup as RekaDropdownMenuGroup } from "reka-ui"

defineOptions({ name: "DropdownMenuGroup" })

type Props = RekaDropdownMenuGroupProps
const props = defineProps<Props>()

export type DropdownMenuGroupProps = Props
</script>

<template>
  <RekaDropdownMenuGroup v-bind="props">
    <slot />
  </RekaDropdownMenuGroup>
</template>


