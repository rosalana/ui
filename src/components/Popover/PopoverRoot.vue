<script setup lang="ts">
import type { PopoverRootProps as RekaPopoverRootProps } from "reka-ui"
import { PopoverRoot as RekaPopoverRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "PopoverRoot" })

const popoverRoot = tv({ base: "outline-none" })

type Props = RekaPopoverRootProps
const props = defineProps<Props>()

export type PopoverRootProps = Props
</script>

<template>
  <RekaPopoverRoot v-bind="{ ...props, ...$attrs }">
    <div :class="popoverRoot()">
      <slot />
    </div>
  </RekaPopoverRoot>
</template>


