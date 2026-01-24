<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const dialogHeader = tv({
  base: "flex flex-col space-y-1.5 text-center sm:text-left",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="[dialogHeader(), props.class]"
  >
    <slot />
  </div>
</template>
