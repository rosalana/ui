<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const table = tv({
  base: "w-full caption-bottom text-sm",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table
      data-slot="table"
      :class="[table(), props.class]"
    >
      <slot />
    </table>
  </div>
</template>
