<script setup lang="ts">
import type { DropdownMenuRadioGroupProps as RekaDropdownMenuRadioGroupProps } from "reka-ui"
import { DropdownMenuRadioGroup as RekaDropdownMenuRadioGroup } from "reka-ui"

defineOptions({ name: "DropdownMenuRadioGroup" })

type Props = RekaDropdownMenuRadioGroupProps
const props = defineProps<Props>()

export type DropdownMenuRadioGroupProps = Props
</script>

<template>
  <RekaDropdownMenuRadioGroup v-bind="props">
    <slot />
  </RekaDropdownMenuRadioGroup>
</template>


