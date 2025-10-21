<script setup lang="ts">
import type { DialogDescriptionProps as RekaDialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogDescription as RekaDialogDescription } from "reka-ui"
import { tv } from "tailwind-variants"

defineOptions({ name: "DialogDescription" })

const description = tv({ base: "text-sm text-muted-foreground" })

interface Props extends RekaDialogDescriptionProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DialogDescriptionProps = Props
</script>

<template>
  <RekaDialogDescription v-bind="{ ...props, class: [description(), props.class] }">
    <slot />
  </RekaDialogDescription>
</template>


