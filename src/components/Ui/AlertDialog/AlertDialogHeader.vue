<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const alertDialogHeader = tv({
  base: "flex flex-col space-y-2 text-center sm:text-left",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-slot="alert-dialog-header"
    :class="[alertDialogHeader(), props.class]"
  >
    <slot />
  </div>
</template>
