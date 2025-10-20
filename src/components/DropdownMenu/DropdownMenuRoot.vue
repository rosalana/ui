<script setup lang="ts">
import type { DropdownMenuRootProps as RekaDropdownRootProps } from "reka-ui"
import { DropdownMenuRoot as RekaDropdownMenuRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuRoot" })

const root = tv({ base: "outline-none" })

type Props = RekaDropdownRootProps
const props = defineProps<Props>()

export type DropdownMenuRootProps = Props
</script>

<template>
  <RekaDropdownMenuRoot v-bind="{ ...props, ...$attrs }">
    <div :class="root()">
      <slot />
    </div>
  </RekaDropdownMenuRoot>
</template>


