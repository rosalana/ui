<script setup lang="ts">
import type { PopoverAnchorProps as RekaPopoverAnchorProps } from "reka-ui"
import { PopoverAnchor as RekaPopoverAnchor } from "reka-ui"

defineOptions({ name: "PopoverAnchor" })

type Props = RekaPopoverAnchorProps
const props = defineProps<Props>()

export type PopoverAnchorProps = Props
</script>

<template>
  <RekaPopoverAnchor v-bind="props">
    <slot />
  </RekaPopoverAnchor>
</template>


