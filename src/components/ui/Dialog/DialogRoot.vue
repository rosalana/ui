<script setup lang="ts">
import type { DialogRootProps as RekaDialogRootProps, DialogRootEmits as RekaDialogRootEmits } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogRoot as RekaDialogRoot } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DialogRoot" })

const rootStyles = tv({ base: "outline-none" })

interface Props extends RekaDialogRootProps { class?: HTMLAttributes["class"] }
const props = defineProps<Props>()
const emit = defineEmits<RekaDialogRootEmits>()

export type DialogRootProps = Props
</script>

<template>
  <RekaDialogRoot v-bind="{ ...props, ...$attrs }" @update:open="emit('update:open', $event)">
    <div :class="rootStyles()">
      <slot />
    </div>
  </RekaDialogRoot>
</template>


