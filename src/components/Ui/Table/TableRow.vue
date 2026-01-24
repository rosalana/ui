<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const tableRow = tv({
  base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="[tableRow(), props.class]"
  >
    <slot />
  </tr>
</template>
