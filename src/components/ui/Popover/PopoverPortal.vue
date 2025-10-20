<script setup lang="ts">
import type { PopoverPortalProps as RekaPopoverPortalProps } from "reka-ui"
import { PopoverPortal as RekaPopoverPortal } from "reka-ui"

defineOptions({ name: "PopoverPortal" })

type Props = RekaPopoverPortalProps
const props = defineProps<Props>()

export type PopoverPortalProps = Props
</script>

<template>
  <RekaPopoverPortal v-bind="props">
    <slot />
  </RekaPopoverPortal>
</template>


