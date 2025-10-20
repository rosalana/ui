<script setup lang="ts">
import type { DialogPortalProps as RekaDialogPortalProps } from "reka-ui"
import { DialogPortal as RekaDialogPortal } from "reka-ui"

defineOptions({ name: "DialogPortal" })

type Props = RekaDialogPortalProps
const props = defineProps<Props>()

export type DialogPortalProps = Props
</script>

<template>
  <RekaDialogPortal v-bind="props">
    <slot />
  </RekaDialogPortal>
</template>


