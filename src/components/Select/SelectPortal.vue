<script setup lang="ts">
import type { SelectPortalProps as RekaSelectPortalProps } from "reka-ui"
import { SelectPortal as RekaSelectPortal } from "reka-ui"

defineOptions({ name: "SelectPortal" })

type Props = RekaSelectPortalProps
const props = defineProps<Props>()

export type SelectPortalProps = Props
</script>

<template>
  <RekaSelectPortal v-bind="props">
    <slot />
  </RekaSelectPortal>
</template>


