<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const tableBody = tv({
  base: "[&_tr:last-child]:border-0",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <tbody
    data-slot="table-body"
    :class="[tableBody(), props.class]"
  >
    <slot />
  </tbody>
</template>
