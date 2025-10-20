<script setup lang="ts">
import type { SelectRootProps as RekaSelectRootProps } from "reka-ui"
import { SelectRoot as RekaSelectRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "SelectRoot" })

const root = tv({ base: "outline-none" })

type Props = RekaSelectRootProps
const props = defineProps<Props>()

export type SelectRootProps = Props
</script>

<template>
  <RekaSelectRoot v-bind="{ ...props, ...$attrs }">
    <div :class="root()">
      <slot />
    </div>
  </RekaSelectRoot>
</template>


