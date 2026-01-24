<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"

const tableCaption = tv({
  base: "mt-4 text-sm text-muted-foreground",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <caption
    data-slot="table-caption"
    :class="[tableCaption(), props.class]"
  >
    <slot />
  </caption>
</template>
