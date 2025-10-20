<script setup lang="ts">
import type { SelectGroupProps as RekaSelectGroupProps } from "reka-ui"
import { SelectGroup as RekaSelectGroup } from "reka-ui"

defineOptions({ name: "SelectGroup" })

type Props = RekaSelectGroupProps
const props = defineProps<Props>()

export type SelectGroupProps = Props
</script>

<template>
  <RekaSelectGroup v-bind="props">
    <slot />
  </RekaSelectGroup>
</template>


