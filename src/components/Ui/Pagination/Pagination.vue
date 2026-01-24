<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PaginationRoot, useForwardPropsEmits } from "reka-ui"
import { tv } from "tailwind-variants"

const pagination = tv({
  base: "mx-auto flex w-full justify-center",
})

interface Props extends PaginationRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<PaginationRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <PaginationRoot
    data-slot="pagination"
    v-bind="forwarded"
    :class="[pagination(), props.class]"
  >
    <slot />
  </PaginationRoot>
</template>
