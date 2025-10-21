<script setup lang="ts">
import type { AlertDialogProps as RekaAlertDialogRootProps } from "reka-ui"
import { AlertDialogRoot as RekaAlertDialogRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "AlertDialogRoot" })

const root = tv({ base: "outline-none" })

type Props = RekaAlertDialogRootProps
const props = defineProps<Props>()

export type AlertDialogRootProps = Props
</script>

<template>
  <RekaAlertDialogRoot v-bind="{ ...props, ...$attrs }">
    <div :class="root()">
      <slot />
    </div>
  </RekaAlertDialogRoot>
</template>


