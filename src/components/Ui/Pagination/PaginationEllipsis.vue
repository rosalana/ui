<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { tv } from "tailwind-variants"
import UiIcon from "../Icon/Icon.vue"

const paginationEllipsis = tv({
  base: "flex size-9 items-center justify-center",
})

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <span
    data-slot="pagination-ellipsis"
    aria-hidden
    :class="[paginationEllipsis(), props.class]"
  >
    <UiIcon name="lucide:more-horizontal" class="size-4" />
    <span class="sr-only">More pages</span>
  </span>
</template>
