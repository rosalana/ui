<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const skeleton = tv({
  base: "animate-pulse rounded-md bg-primary/10",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-slot="skeleton"
    :class="[skeleton(), props.class]"
  />
</template>
