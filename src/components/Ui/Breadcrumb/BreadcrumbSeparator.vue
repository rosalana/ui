<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { tv } from "tailwind-variants"
import UiIcon from "../Icon/Icon.vue"

const breadcrumbSeparator = tv({
  base: "[&>svg]:size-3.5",
})

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Primitive
    data-slot="breadcrumb-separator"
    :as="as ?? 'li'"
    :as-child="asChild"
    role="presentation"
    aria-hidden="true"
    :class="[breadcrumbSeparator(), props.class]"
  >
    <slot>
      <UiIcon name="lucide:chevron-right" />
    </slot>
  </Primitive>
</template>
